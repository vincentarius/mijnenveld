speelbordLocatie = document.getElementById("speelbord");
creeerLeegSpeelbord();
klaar = false;

function creeerLeegSpeelbord() {
    speelbord = [];
    speelbord.speelbordStatusAangemaakt = false;
    speelbord.blokGrootte = 50;
    speelbord.aantalBommen = 5;
    // Hier bepaal je de locatie van het speelbord
    speelbord.rijPositie = 50;
    speelbord.kolomPositie = 50;
    bommen = [];
};

function plaatsSpeelbord() {
    selectieSpeelbordGrootte = document.getElementById("selectieSpeelbordGrootte");
    bordGrootte = selectieSpeelbordGrootte.options[selectieSpeelbordGrootte.selectedIndex].text;    
    formSpeelbordSelectie = document.getElementById("formSpeelbordSelectie");
    knopSpeelbordOpslaan = document.getElementById("knopSpeelbordOpslaan");
    knopVerwijderSpeelborden = document.getElementById('knopVerwijderSpeelborden');
    knopMaakNieuwSpeelbord = document.getElementById('knopMaakNieuwSpeelbord');
    knopToonOpgeslagenSpeelborden = document.getElementById('knopToonOpgeslagenSpeelborden');
    opgeslagenSpeelborden = document.getElementById('opgeslagenSpeelborden');

    definieerSpeelbord(speelbord);

    if (speelbord.speelbordStatus != 'gemaakt') {
        for (var i = 0; i < aantalBlokjes; i++) {
            plaatsBlokje(speelbord,i);
        };
    };
    formSpeelbordSelectie.style.display = "none";
    knopSpeelbordOpslaan.style.display = "inline";
    knopVerwijderSpeelborden.style.display = "inline";
    knopMaakNieuwSpeelbord.style.display = "inline";
    knopToonOpgeslagenSpeelborden.style.display = "inline";
    speelbord.speelbordStatusAangemaakt = true;
    bouwHelper();
};

function definieerSpeelbord(speelbord) {
    let speelbordGrootte = bordGrootte * bordGrootte;;
    // Maak het benodigde aantal blokjes aan.
    for (var i=0; i<speelbordGrootte; i++) {
        speelbord[i] = {
            id: i,
            xPositie: "",
            yPositie: "",
            bom : false,
            zichtbaar : true,
            aangeklikt : false
        };        
    };
    aantalBlokjes = speelbord.length;
    aangeklikteBlokjes = [];
    bepaalPosities(speelbord);
    legBommen(speelbord);
};

function bepaalPosities(speelbord) {
    // De index is nodig om door alle blokjes op het speelbord te lopen
    let index = 0;
    let kolomPositie = speelbord.kolomPositie;
    let rijPositie = speelbord.rijPositie;

    for (let rij = 0; rij < bordGrootte; rij++) {
        for (let kolom = 0; kolom < bordGrootte; kolom++){
            speelbord[index].yPositie = rijPositie + "px";
            speelbord[index].xPositie = kolomPositie + "px";
            kolomPositie = kolomPositie + speelbord.blokGrootte;
            index = index + 1;
        };
        rijPositie = rijPositie + speelbord.blokGrootte;
        kolomPositie = speelbord.kolomPositie;
    };
};

function legBommen(speelbord) {
    let rndBlok;
    let aantal = speelbord.aantalBommen * 2;
    bommen = [];

    for (let i = 0;i < aantal; i++) {
        rndBlok = Math.floor(Math.random() * (aantalBlokjes - 1 ) ) + 1;
        speelbord[rndBlok].bom = true;
        if ( !bommen.includes(rndBlok) ) { bommen.push(rndBlok); }
    };
};

function plaatsBlokje(speelbord,identifier) {
    let blok = document.createElement("div");
    let dataCy = document.createAttribute("data-cy");
    dataCy.value = "geplaatstBlokje";
    blok.setAttributeNode(dataCy);
        blok.id = "blok" + speelbord[identifier].id;
        blok.classList.add("blok");
        blok.style.position = "absolute";
        blok.style.left = speelbord[identifier].xPositie;
        blok.style.top = speelbord[identifier].yPositie;
        blok.style.width = speelbord.blokGrootte + "px";
        blok.style.height = speelbord.blokGrootte + "px";
        blok.addEventListener("click", function(){
                klikActie(speelbord[identifier].id);            
            });
    // Plaats het element in het speelbord
    document.body.insertBefore(blok,speelbordLocatie);
};

function maakNieuwSpeelbord() {
    // Verwijder eerst de juiste knoppen uit het scherm
    formSpeelbordSelectie.style.display = "inline";
    knopSpeelbordOpslaan.style.display = "none";
    knopVerwijderSpeelborden.style.display = "none";
    knopMaakNieuwSpeelbord.style.display = "none";
    knopToonOpgeslagenSpeelborden.style.display = "none";
    opgeslagenSpeelborden.style.display = "none";
    // Verwijder het aangemaakte speelbord van het scherm
    let speelbordGrootte = bordGrootte * bordGrootte;;
    // Verwijder ieder blokje
    for (var i=0; i<speelbordGrootte; i++) {
        let verwijderBlok = document.getElementById("blok" + speelbord[i].id);
        verwijderBlok.parentNode.removeChild(verwijderBlok);        
    };
    // Maak het speelbord leeg
    creeerLeegSpeelbord();
    bommen = [];
    aangeklikteBlokjes = [];
    aantalBlokjes = "";
    klaar = false;
    bouwHelper();
    bouwHelperGekliktBlokje.innerHTML = "Geklikt: " ;
    bouwHelperBom.innerHTML = "Bevat Bom: ";
    bouwHelperAangeklikteBlokjes.innerHTML = "Aangeklikte blokjes: " + JSON.stringify(aangeklikteBlokjes);
    bouwHelperAantalAangeklikteBlokjes.innerHTML = "Aantal aangeklikte blokjes: " + aangeklikteBlokjes.length;
    bouwHelperEindeSpel.innerHTML = "Nieuw spel...";
};