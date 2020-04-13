var speelbord = [];
var blokGrootte = 100;
var aantalBommen = 5;


function plaatsSpeelbord(bord) {
    var obj = document.getElementById("knopPlaatsSpeelbord");
    var grootte = obj.options[obj.selectedIndex].text;
    definieerSpeelbord(bord,grootte);
    let speelbordMarker = document.getElementById("speelbord");
    let knopPlaatsSpeelbord = document.getElementById("plaatsSpeelbord");
    var aantal = bord.length;
    if (bord.speelbordStatus != 'gemaakt') {
        for (var i = 0; i < aantal; i++) {
            plaatsBlokje(bord,i);
        };
        knopPlaatsSpeelbord.style.display = "none";
        bord.speelbordStatus = ("gemaakt");
    };    
    console.log(bord);
};

function definieerSpeelbord(bord,aantal) {
    speelbordGrootte = aantal * aantal;
    bord.speelbordStatus = ("leeg");
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
    // TODO Hier moet nog een nested loop worden gemaakt
    bepaalPosities(bord);
    legBommen(bord);
};

function bepaalPosities(bord) {
    var aantal = Math.sqrt(bord.length);
    // Dit zijn de startposties van het speelbord op het scherm
    var rijPositie = 100;
    var kolomPositie = 100;
    // De index is nodig om door alle blokjes op het speelbord te lopen
    var index = 0;

    for (let rij = 0; rij < aantal; rij++) {
        for (let kolom = 0; kolom < aantal; kolom++){
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
    let max = bord.length;
    var rndBlok;
    var aantal = aantalBommen * 2;

    for (let i = 0;i < aantal; i++) {
        rndBlok = Math.floor(Math.random() * (max - 1 ) ) + 1;
        bord[rndBlok].bom = true;
    };
};

function plaatsBlokje(bord,identifier) {
    let speelbordMarker = document.getElementById("speelbord");
    var blok = document.createElement("canvas");
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
    document.body.insertBefore(blok,speelbordMarker);
};



