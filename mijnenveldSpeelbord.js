var speelbord = [];
var blokGrootte = 100;
var aantalBommen = 5;
// Dit zijn de startposties van het speelbord op het scherm
var rijPositie = 100;
var kolomPositie = 100;


function plaatsSpeelbord(bord) {
    selectieSpeelbordGrootte = document.getElementById("selectieSpeelbordGrootte");
    bordGrootte = selectieSpeelbordGrootte.options[selectieSpeelbordGrootte.selectedIndex].text;    
    speelbordLocatie = document.getElementById("speelbord");
    formSpeelbordSelectie = document.getElementById("formSpeelbordSelectie");
    knopSpeelbordWaarden = document.getElementById("knopSpeelbordWaarden");
    knopSpeelbordOpslaan = document.getElementById("knopSpeelbordOpslaan");
    knopVerwijderSpeelborden = document.getElementById('knopVerwijderSpeelborden');
    knopToonOpgeslagenSpeelborden = document.getElementById('knopToonOpgeslagenSpeelborden');

    definieerSpeelbord(bord);

    if (bord.speelbordStatus != 'gemaakt') {
        for (var i = 0; i < aantalBlokjes; i++) {
            plaatsBlokje(bord,i);
        };
    };
    formSpeelbordSelectie.style.display = "none";
    knopSpeelbordWaarden.style.display = "inline";
    knopSpeelbordOpslaan.style.display = "inline";
    knopVerwijderSpeelborden.style.display = "inline";
    knopToonOpgeslagenSpeelborden.style.display = "inline";
    bord.speelbordStatusAangemaakt = true;
    console.log(bord);
};

function definieerSpeelbord(bord) {
    let speelbordGrootte = bordGrootte * bordGrootte;;
    // Maak het benodigde aantal blokjes aan.
    for (var i=0; i<speelbordGrootte; i++) {
        bord[i] = {
            id: i,
            xPositie: "",
            yPositie: "",
            bom : false,
            zichtbaar : true,
            verplaatsbaar: true
        };        
    };
    aantalBlokjes = bord.length;
    bepaalPosities(bord);
    legBommen(bord);
};

function bepaalPosities(bord) {
    // De index is nodig om door alle blokjes op het speelbord te lopen
    var index = 0;

    for (let rij = 0; rij < bordGrootte; rij++) {
        for (let kolom = 0; kolom < bordGrootte; kolom++){
            bord[index].yPositie = rijPositie + "px";
            bord[index].xPositie = kolomPositie + "px";
            kolomPositie = kolomPositie + blokGrootte;
            index = index + 1;
        };
        rijPositie = rijPositie + blokGrootte;
        kolomPositie = 100;
    };
};

function legBommen(bord) {
    var rndBlok;
    var aantal = aantalBommen * 2;

    for (let i = 0;i < aantal; i++) {
        rndBlok = Math.floor(Math.random() * (aantalBlokjes - 1 ) ) + 1;
        bord[rndBlok].bom = true;
    };
};

function plaatsBlokje(bord,identifier) {
    let blok = document.createElement("canvas");
        blok.id = "blok" + bord[identifier].id;
        blok.style.position = "absolute";
        blok.style.left = bord[identifier].xPositie;
        blok.style.top = bord[identifier].yPositie;
        blok.width = blokGrootte;
        blok.height = blokGrootte;
        blok.style.backgroundColor = "red";
        blok.style.border = "solid";
        blok.draggable = bord[identifier].verplaatsbaar;
    // Plaats het canvas element
    document.body.insertBefore(blok,speelbordLocatie);
};



