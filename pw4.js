$(document).ready( function () {
    $('head').append("<link rel='stylesheet' href='power4.css'>");

    $('#PW4').prepend("<div class='header'><h1> Puissance 4 </h1> <div class ='formulaire'></div></div>");
    $('.formulaire').append("<h3>Qui veut jouer ?</h3> <div class='j1'> <label for='j1'>Nom du joueur 1 : </label> <input type='text' id='nom_j1'> <label for='couleur_j1'>Couleur</label> <select name='couleur' id=select1> <option value='red'>Rouge</option> <option value='grey'>Gris</option> <option value='green'>Vert</option> <option value='black'>Noir</option> <option value='yellow'>Jaune</option> <option value='purple'>Violet</option> </select> </div> <div class='j2'> <label for='j1'>Nom du joueur 2 : </label> <input type='text' id='nom_j2'> <label for='couleur_j2'>Couleur</label> <select name='couleur2' id=select2> <option value='red'>Rouge</option> <option value='grey'>Gris</option> <option value='green'>Vert</option> <option value='black'>Noir</option> <option value='yellow'>Jaune</option> <option value='purple'>Violet</option> </select> </div> <div class='jeu'><span> Grille : </span> <label for='ligne'> Lignes : </label> <select name='ligne' class='nb_ligne'> <option value='4'>4</option> <option value='5'>5</option> <option value='6'>6</option> <option value='7'>7</option> <option value='8'>8</option> <option value='9'>9</option> <option value='10'>10</option> </select> <label for='ligne'> Colonnes : </label> <select name='col' class='nb_col'> <option value='4'>4</option> <option value='5'>5</option> <option value='6'>6</option> <option value='7'>7</option> <option value='8'>8</option> <option value='9'>9</option> <option value='10'>10</option> </select> </div> <button id='btn_start'>Commencer la partie !</button> ");



    $("#btn_start").on('click', function (){

        if ($('input').val() == '') {
            $('.champ').remove();
            $('h3').after("<span  class='champ'> Veuillez indiquer les noms des joueurs !<span>");
        } else if ($('#select1')[0].value == $("#select2")[0].value ) {
            $('.SameColor').remove();
            $('.champ').remove();
            $("h3").after("<span class='SameColor'> Veuillez choisir 2 couleurs différentes !</span>");
        }
        else {
            $('.header').hide(2000);
            var j1_nom = $("#nom_j1").val();
            var j2_nom = $("#nom_j2").val();
            var j1_color = $("#select1")[0].value;
            var j2_color = $("#select2")[0].value;
            var ligne = $(".nb_ligne")[0].value;
            var colonne = $(".nb_col")[0].value;
            const jeu = new PW4(j1_nom, j2_nom, j1_color, j2_color, ligne, colonne);
        }
    });
});