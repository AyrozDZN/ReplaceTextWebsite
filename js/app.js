function UpperText(letter){
    //Fonction qui détecte si une lettre est en majuscule ou non
    //Prend en argument, letter une lettre en majuscule ou minuscule
    //Renvoie 1 si la lettre est en majuscule
    //Renvoie 0 si la lettre est en minuscule

    exceptionList = [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "*", "-", "+", ".", ",", "²", "&", '"', "'", "(", "-", "_", ")", "=", "~", "#", "{", "[", "|", "`", "^", "@", "]", "}", "<", ">", "^", "$", "£", "¤", "ù", "%", "µ", "?", ";", ":", "!", "§", "'"]

    if (exceptionList.indexOf(letter) != -1) return 0 //Si la lettre est dans la liste 'exceptionList' alors retourne 0

    var UpperLetter = letter.toUpperCase(); //Création d'une variable qui prend comme valeur la lettre en majuscule

    if (UpperLetter === letter) {

        return 1 //Si la lettre est en majuscule

    } else {

        return 0 //Si la lettre es en minuscule

    };

}

function decal(tab_D, index, lettre) {
    //Calcule le décalage a partir d'une table de décalage
    //Prend en argument tab_D correspond a la table de décalage, index correspond a l'index de la lettre dans le motif et lettre correspond a la lettre dans le texte
    //Renvoie un nombre qui correspond au décalage a effectuer

    var lettre;
    
    if (tab_D[index]['lettre'].indexOf(lettre) != -1) {
    
        var decal = tab_D[index]['decal'][tab_D[index]['lettre'].indexOf(lettre)];
        
        return index - decal;
    
    } else {
    
        return index + 1;
    
    };

};

function table_decal(motif) {
    //Crée une table de décalage a partir d'un motif
    //motif: mot qui est a chercher dans le texte
    //renvoie la table de décalage, une liste de dictionnaire

    var tab = [];
  
    for (let i = 0; i < motif.length; i++) {
  
        tab.push({lettre: [], decal: []}); //Ajout d'un dictionnaire pour chaque lettre du motif
  
    }
  
    for (let i = 0; i < motif.length; i++) {
  
        for (let j = 0; j < i; j++) {
  
            if (tab[i]['lettre'].indexOf(motif[j]) != -1) {
  
                var pos = tab[i]['lettre'].indexOf(motif[j]);
                
                tab[i]['lettre'].splice(pos, 1);
                tab[i]['decal'].splice(pos, 1);
  
            };
  
            tab[i]['lettre'].push(motif[j]);
          	tab[i]['decal'].push(j);
  
        };
  
    }; //Calcul de la table de décalage et ajout dans celle ci
  
    return tab; //Renvoie de la table de décalage

};

function remplace(t,m,r,o=0) {
    //Fonction qui remplace dans un texte un motif et un autre
    //Prend en arguement t qui correspond au texte, m qui correspond au motif a remplacer, r qui correspond au motif qui remplace et o qui correspond a l'occurence par défaut 0
    //Renvoie la chaine de caractère modifier

    var n = 1;
    var tab_D = table_decal(m); //Création de la table de décalage
    var end = 0;

    if (o == -1) {
        return t //Détection si aucune occurence pour éviter trop de calcul
    }

    while (end <= t.length - m.length) {

        var decalage = 0;

        for (let i = m.length-1; i > -1; i--) {

            if (t[end + i].toLowerCase() != m[i].toLowerCase()) {

                decalage = decal(tab_D,i,t[end + i].toLowerCase());
                break;

            };

        }; //Detection d'un motif si non le décalage reste a 0

        if (decalage == 0) {

            if (o == 0) {

                var tStart = t.substring(0, end)
                var tMotif = t.substring(end, end+m.length)
                var tEnd = t.substring(end+m.length)

                var tReplace = ""

                if (UpperText(tMotif) == 1) {
                    tReplace = r.toUpperCase()
                } else {
                    for (var i = 0; i < r.length; i++) {
                        if (tMotif[i] == null) {
                            tReplace += r[i]
                        } else {
                            if (UpperText(tMotif[i]) == 1) {
                                tReplace += r[i].toUpperCase()
                            } else {
                                tReplace += r[i].toLowerCase()
                            }
                        }
                    }
                } //Ajout a une variable tReplace d'une chaine de caractère qui pour chaque lettre du motif si elle est en majuscule mettras la lettre du motif a remplacer en majuscule sinon elle sera en minuscule

                t = tStart + tReplace + tEnd //la variable du texte avec le motif remplacer

            } else {

                if (o == n) {

                    var tStart = t.substring(0, end)
                    var tMotif = t.substring(end, end+m.length)
                    var tEnd = t.substring(end+m.length)

                    var tReplace = ""

                    if (UpperText(tMotif) == 1) {
                        tReplace = r.toUpperCase()
                    } else {
                        for (var i = 0; i < r.length; i++) {
                            if (tMotif[i] == null) {
                                tReplace += r[i]
                            } else {
                                if (UpperText(tMotif[i]) == 1) {
                                    tReplace += r[i].toUpperCase()
                                } else {
                                    tReplace += r[i].toLowerCase()
                                }
                            }
                        }
                    }

                    t = " "
                    t = tStart + tReplace + tEnd

                };

            }; //Même chose que précédemment mais pour une occurence précise et non pour tout le texte

            n = n + 1;
            decalage = 1;

        };

        end = end + decalage;

    };

    return t; //Renvoie le texte modifier

};

function countOccurence(t,m) {
    //Fonction qui compte le nombre d'occurence d'un motif dans un texte
    //t correspond au texte et m correspond au motif a compter dans le texte
    //Renvoie le nombre d'occurence du motif dans le texte

    t = t.toLowerCase()
    m = m.toLowerCase()
    var n = 0;
    var tab_D = table_decal(m);
    var end = 0;

    if (t == '' || m == '') {
        return 0 //Si le texte ou le motif est vide renvoie 0
    }

    while (end <= t.length - m.length) {

        var decalage = 0;

        for (let i = m.length-1; i > -1; i--) {

            if (t[end + i] != m[i]) {

                decalage = decal(tab_D,i,t[end + i]);
                break;

            };

        };

        if (decalage == 0) {

            n = n + 1;
            decalage = 1;

        };

        end = end + decalage;

    }; //Calcul du nombre d'occurence en utilisant la table de décalage

    return n; //Renvoie le nombre d'occurence dans le texte

};

$('#Texte').on('input', () => {
    //Récupération des valeurs des différentes textarea et input
    var inputText = document.getElementById("Texte").value;
    var inputMotif = document.getElementById("Motif").value;
    var inputReplace = document.getElementById("Replace").value;
    var inputOccurence = document.getElementById("Occurence").value;
    //Modification du texte dans la textarea du résultat par le résultat
    document.getElementById("Result").innerHTML = remplace(inputText, inputMotif, inputReplace, inputOccurence);
    //Calcul du nombre d'occurence dans le texte et modification du selecteur en temps réel
    t = ``
    if (countOccurence(inputText, inputMotif) != 0) {
        for (let i = 0; i <= countOccurence(inputText, inputMotif); i++) {
            if (i == 0) {
                t = t + `<option value="0">Tous</option>`
            } else {
                t = t + `<option value="${i}">${i}</option>`
            };
        };
        $('#Occurence').html(
            t
        );
    } else {
        $('#Occurence').html(
            `<option value="-1">Aucun</option>`
        );
    }
}); //Si il y a une modification dans la textarea du texte

$('#Motif').on('input', () => {
    //Récupération des valeurs des différentes textarea et input
    var inputText = document.getElementById("Texte").value;
    var inputMotif = document.getElementById("Motif").value;
    var inputReplace = document.getElementById("Replace").value;
    var inputOccurence = document.getElementById("Occurence").value;
    //Modification du texte dans la textarea du résultat par le résultat
    document.getElementById("Result").innerHTML = remplace(inputText, inputMotif, inputReplace, inputOccurence);
    //Calcul du nombre d'occurence dans le texte et modification du selecteur en temps réel
    t = ``
    if (countOccurence(inputText, inputMotif) != 0) {
        for (let i = 0; i <= countOccurence(inputText, inputMotif); i++) {
            if (i == 0) {
                t = t + `<option value="0">Tous</option>`
            } else {
                t = t + `<option value="${i}">${i}</option>`
            };
        };
        $('#Occurence').html(
            t
        );
    } else {
        $('#Occurence').html(
            `<option value="-1">Aucun</option>`
        );
    }
}); //Si il y a une modification dans l'input du motif

$('#Replace').on('input', () => {
    //Récupération des valeurs des différentes textarea et input
    var inputText = document.getElementById("Texte").value;
    var inputMotif = document.getElementById("Motif").value;
    var inputReplace = document.getElementById("Replace").value;
    var inputOccurence = document.getElementById("Occurence").value;
    //Modification du texte dans la textarea du résultat par le résultat
    document.getElementById("Result").innerHTML = remplace(inputText, inputMotif, inputReplace, inputOccurence);
    //Calcul du nombre d'occurence dans le texte et modification du selecteur en temps réel
    t = ``
    if (countOccurence(inputText, inputMotif) != 0) {
        for (let i = 0; i <= countOccurence(inputText, inputMotif); i++) {
            if (i == 0) {
                t = t + `<option value="0">Tous</option>`
            } else {
                t = t + `<option value="${i}">${i}</option>`
            };
        };
        $('#Occurence').html(
            t
        );
    } else {
        $('#Occurence').html(
            `<option value="-1">Aucun</option>`
        );
    }
}); //Si il y a une modification dans l'input du mot qui remplaçant

$('#Occurence').on('input', () => {
    //Récupération des valeurs des différentes textarea et input
    var inputText = document.getElementById("Texte").value;
    var inputMotif = document.getElementById("Motif").value;
    var inputReplace = document.getElementById("Replace").value;
    var inputOccurence = document.getElementById("Occurence").value;
    //Modification du texte dans la textarea du résultat par le résultat
    document.getElementById("Result").innerHTML = remplace(inputText, inputMotif, inputReplace, inputOccurence);
}); //Si il y a une modification dans le sélectionneur d'occurence
