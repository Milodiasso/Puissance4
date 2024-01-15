class PW4 {

    constructor(j1_nom, j2_nom, j1_color, j2_color, row = 4, col = 4) {
        this.j1_nom = j1_nom;
        this.j2_nom = j2_nom;
        this.j1_color = j1_color;
        this.j2_color = j2_color;
        this.ligne = row;
        this.col = col;
        this.jeton = j1_color;
        this.comp;
        this.x;
        this.y;
        this.lastButton;
        this.createBoard(j1_nom, j2_nom, j1_color, j2_color);
        this.createGrid(row, col);
        this.createButton(row);
        this.buttonclick(this.comp,j1_color,j2_color);
        this.verify(j1_color, j2_color, j1_nom, j2_nom, row);
        this.Undo(j1_color,j2_color);

    }

    createGrid(row, col) {
        $('#PW4').append("<div id=power4></div>").css({
            width: '90%',
        })

        // $('#power4').append("<button class='button-29 replay'>Rejouer</button>").css({
        //     width: '90%',
        // })
        for (let i = 0; i < row; i++) {
            $('#power4').append("<div class='row" + i + "'></div>");
            $('.row' + i).css({
                'display': 'flex',
                'width': 'fit-content',
                'background-color': 'blue',
                'padding': '10px 0px',

            });
            for (let o = 0; o < col; o++) {
                $('.row' + i).append("<div class='col empty' data-x=" + i + " data-y=" + o + " ></div>");
            }
        }

        $('.col').css({
            'border': '5px solid black',
            'height': '50px',
            'width': '50px',
            'border-radius': '100%',
            'margin': '0 5px'

        });
        $('.empty').css({
            'background-color': 'white',
        });



    }

    createBoard(j1_nom, j2_nom, j1_color, j2_color) {
        $("#PW4").prepend("<div class='board'> <div class='score'> <table id='score'> <h4>Récapitulatif</h4> <tr> <td class='nom'><h6>Nom </h6></td> <td class='couleur'><h6>Couleur</h6> </td> <td class='score'><h6>Score</h6></td> </tr> <tr> <td class='nom_j1'>" + j1_nom + "</td> <td class='couleur_j1'>" + j1_color + "</td> <td class='score_j1'>Score</td> </tr> <tr> <td class='nom_j2'>" + j2_nom + "</td> <td class='couleur_j2'>" + j2_color + "</td> <td class='score_j2'>Score</td> </tr> </table> </div> <input type='button' hidden id='undo' value='Annuler'>  </div>");

    }

    createButton(row) {
        let lastDiv = $('.row' + (row - 1));
        lastDiv.after("<div class='all-btn'></div>");
        $(".all-btn").css({
            display: 'flex'
        });
        for (let i = $('.row0 .col').length - 1; i >= 0; i--) {
            $(".all-btn").prepend("<button class='btn" + i + "'>Click</button>");
            $('.btn' + i).css({
                'width': '46px',
                'margin': '12.5px',
                'border-radius': '50%',
                'outline': 'none',
                appearance: 'none',
                'background-image': 'radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)',
                border: 0,
                'border-radius': '6px',
                'box-shadow': 'rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset',
                'box-sizing': 'border-box',
                'color': '#fff',
                'cursor': 'pointer',
            });
            

        }
        $('.row0').before("<div class='all-fleche'></div>");
        for (let p = 0; p < $('.row0 .col').length; p++) {
            $('.all-fleche').append("<div class='flech" + p + "'><p class = 'fleche'>&#11015</p></div>");
            $('.flech' + p).css({
                display: 'flex',
                'flex-direction': 'column',
                margin: '2px 3px',
                padding: '10px 5px',
            });
            $(".btn" + p).on('mouseenter', () => {
                $(".flech" + p).append("<div class ='jeton" + p + "'></div>");
                $('.jeton' + p).css({
                    display: 'block',
                    position: 'absolute',
                    top: '80px',
                    border: '1px solid black',
                    height: '50px',
                    width: '50px',
                    borderRadius: '100%',
                    backgroundColor: this.jeton,
                });

            });
            $(".btn" + p).on('mouseleave', () => {
                $(".jeton" + p).css({
                    display: 'none',
                    backgroundColor: "none"
                });
            });

        }

    }

    buttonclick(comp = 0, j1_color, j2_color) {
        $('button').on('click', (e, jeton = '') => {
            let y = e.target.className.substr(3, 1);
            this.y = parseInt(y);
            if (comp % 2 == 0) {
                jeton = j1_color;
            } else {
                jeton = j2_color;
            }
            let colEmptyY = $(".empty.col[data-y='" + y + "']");
            if (colEmptyY.last().hasClass("empty") && jeton == j1_color) {
                colEmptyY.last().removeClass('empty');
                colEmptyY.last().addClass(jeton);
                $('.' + jeton).css({
                    'background': jeton,
                    transition : 'background-color 1s, width 2s, transform 2s',

                });
                jeton = j2_color;
                this.jeton = j2_color;
            }
            if (colEmptyY.last().hasClass("empty") && jeton == j2_color) {
                colEmptyY.last().removeClass('empty');
                colEmptyY.last().addClass(jeton);
                $('.' + jeton).css({
                    'background': jeton,
                    transition : 'background-color 1s, width 2s, transform 2s',

                });
                jeton = j1_color;
                this.jeton = j1_color;
            }
            comp++;
            this.comp = comp;
        });

        // $('.replay').on('click', (e)=>{
        //     console.log(e)
        // })
    }

    // Undo(j1_color,j2_color){
    //     $("#undo").on('click', ()=>{
    //         let jeton;
    //         if (this.jeton == j1_color) {
    //             jeton = j2_color;
    //         } else {
    //             jeton = j1_color;
    //         }
    //         let lastCase = $("."+jeton+"[data-x='"+this.x+"'][data-y='"+this.y+"']");

    //         lastCase.removeClass(jeton);
    //         lastCase.addClass('empty');
    //         $(".empty").css('background-color', 'white');
    //         this.jeton = jeton;
    //         let comp = this.comp-1;
    //         console.log(this.comp);
    //         console.log(comp);

    //         this.comp = comp;
    //         console.log(this.comp);

    //     });
    // }

    verify(j1_color, j2_color, j1_nom, j2_nom, row) {
        $('button').on('click', () => {
            let jeton;
            let turn;
            if (this.jeton == j1_color) {
                jeton = j2_color;
                turn = j1_nom;
            } else {
                jeton = j1_color;
                turn = j2_nom;
            }

            
            $(".turn").remove();
            $(".board").append("<div class='turn'><p> C'est le tour de " + turn + "</p></div>");

            let thisCOL = $(".col[data-y='" + this.y + "']");
            let Pcolonne = '';
            for (let i = 0; i < row; i++) {
                const colY = thisCOL[i];
                if (colY.className == 'col ' + j1_color) {
                    Pcolonne += 'a';
                }
                if (colY.className == 'col ' + j2_color) {
                    Pcolonne += 'b';
                }
                if (colY.className == 'col empty') {
                    Pcolonne += 'O';
                }

            }
            if (Pcolonne.includes('aaaa')) {
                $("#power4").after("<div class='win' id='" + j1_nom + "'> <p>" + j1_nom + " win !</p> <button class='reset'>Rejouer</button></div>");
                $('button').remove();
            }
            if (Pcolonne.includes('bbbb')) {
                $("#power4").after("<div class='win' id='" + j2_nom + "'> <p>" + j2_nom + " win !</p> <button class='reset'>Rejouer</button></div>");
                $('button').remove();
            }

            let Pligne = '';
            let thiscase = $("." + jeton + "[data-y='" + this.y + "']").first();
            let data_x = thiscase[0].dataset.x;
            this.x = parseInt(data_x);
            let thisROW = $(".col[data-x='" + data_x + "']");
            thisROW.each((element) => {
                let ligne = thisROW[element];
                if (ligne.className == ('col ' + j1_color)) {
                    Pligne += 'a';
                }
                if (ligne.className == ('col ' + j2_color)) {
                    Pligne += 'b';
                }
                if (ligne.className == 'col empty') {
                    Pligne += 'O';
                }

            });
            if (Pligne.includes('aaaa')) {
                $("#power4").after("<div class='win' id='" + j1_nom + "'> <p>" + j1_nom + " win !</p> <button class='reset'>Rejouer</button></div>");
                $('button').remove();
            }
            if (Pligne.includes('bbbb')) {
                $("#power4").after("<div class='win' id='" + j2_nom + "'> <p>" + j2_nom + " win !</p> <button class='reset'>Rejouer</button></div>");
                $('button').remove();
            }

            let Pdiag = '';
            let Pdiag2 = '';
            let mirror = 8;
            for (let i = -4; i <= 4; i++) {
                let x = this.x + i;
                let y = this.y + i;
                let y2 = this.y + i + mirror;
                mirror -= 2;
                let diag = $(".col[data-x='" + x + "'][data-y='" + y + "']");
                let diag2 = $(".col[data-x='" + x + "'][data-y='" + y2 + "']");
                if (diag.hasClass(j1_color)) {
                    Pdiag += 'a';
                }
                if (diag.hasClass(j2_color)) {
                    Pdiag += 'b';
                }
                if (diag.hasClass('empty')) {
                    Pdiag += 'O';
                }
                if (diag2.hasClass(j1_color)) {
                    Pdiag2 += 'a';
                }
                if (diag2.hasClass(j2_color)) {
                    Pdiag2 += 'b';
                }
                if (diag2.hasClass('empty')) {
                    Pdiag2 += 'O';
                }
            }
            if (Pdiag.includes('aaaa') || Pdiag2.includes('aaaa')) {
                $("#power4").after("<div class='win' id='" + j1_nom + "'> <p>" + j1_nom + " win !</p> <button class='reset'>Rejouer</button></div>");
                $('button').remove();
            }
            if (Pdiag.includes('bbbb') || Pdiag2.includes('bbbb')) {
                $("#power4").after("<div class='win' id='" + j2_nom + "'> <p>" + j2_nom + " win !</p> <button class='reset'>Rejouer</button></div>");
                $('button').remove();
            }

            $(".win").css({
                position: 'absolute',
                display: 'flex',
                'justify-content': 'center',
                fontSize : '60px',
                top : '0',
                left : '0',
                width : '100%',
                height: '100%',
                backgroundColor : jeton,
                transform: 'rotate(1turn)',
                transition: 'width 2s, transform 3s, background-color 5s',
            })
        });

    }
}