function laadSpeelveld() {
    // Definieert alle elementen die in de DOM voorkomen worden geladen, zodat deze overal gebruikt kunnen worden
    formSpeelbordSelectie = document.getElementById("formSpeelbordSelectie");
    selectieSpeelbordGrootte = document.getElementById("selectieSpeelbordGrootte");
    
    speelbordLocatie = document.getElementById("speelbord");
    
    knopSpeelbordOpslaan = document.getElementById("knopSpeelbordOpslaan");
    knopVerwijderSpeelborden = document.getElementById('knopVerwijderSpeelborden');
    knopMaakNieuwSpeelbord = document.getElementById('knopMaakNieuwSpeelbord');
    
    opgeslagenSpeelborden = document.getElementById('opgeslagenSpeelborden');
    OpgeslagenBordenScherm = document.getElementById("OpgeslagenBordenScherm");
    OpgeslagenBordenSubScherm = document.getElementById("OpgeslagenBordenSubScherm");
    
    bouwHelperSpeelbordLengte = document.getElementById("bouwHelperSpeelbordLengte");
    bouwHelperBommen = document.getElementById("bouwHelperBommen");
    bouwHelperBord = document.getElementById("bouwHelperBord");
    bouwHelperGekliktBlokje = document.getElementById("bouwHelperGekliktBlokje");
    bouwHelperBom = document.getElementById("bouwHelperBom");
    bouwHelperScherm = document.getElementById("bouwHelperScherm");
    bouwHelperSubScherm = document.getElementById("bouwHelperSubScherm");
    bouwHelperAangeklikteBlokjes = document.getElementById("bouwHelperAangeklikteBlokjes");
    bouwHelperAantalAangeklikteBlokjes = document.getElementById("bouwHelperAantalAangeklikteBlokjes");
    bouwHelperEindeSpel = document.getElementById("bouwHelperEindeSpel");
    
    creeerLeegSpeelbord();
    klaar = false;
};

function creeerLeegSpeelbord() {
    speelbord = [];
    bommen = [];
    aangeklikteBlokjes = [];
    speelbord.speelbordStatusAangemaakt = false;
    speelbord.blokGrootte = 50;
    speelbord.aantalBommen = 2;
    // Hier bepaal je de locatie van het speelbord
    speelbord.rijPositie = 80;
    speelbord.kolomPositie = 10;
};

function plaatsSpeelbord() {
    geselecteerdeBordGrootte = selectieSpeelbordGrootte.options[selectieSpeelbordGrootte.selectedIndex].text;
    // Creeer een speelbord met de opgegeven grootte
    definieerSpeelbord();

    // Plaats het speelbord op het scherm
    if (!speelbord.speelbordStatusAangemaakt) {
        for (var i = 0; i < aantalBlokjes; i++) {
            plaatsBlokje(speelbord,i);
        };
    };
    
    // Verberg de knoppen waarmee een nieuw speelbord kan worden gemaakt
    formSpeelbordSelectie.style.display = "none";
    knopSpeelbordOpslaan.style.display = "inline";
    knopVerwijderSpeelborden.style.display = "inline";
    knopMaakNieuwSpeelbord.style.display = "inline";
    speelbord.speelbordStatusAangemaakt = true;
    bouwHelper();
};

function definieerSpeelbord() {
    speelbordGrootte = geselecteerdeBordGrootte * geselecteerdeBordGrootte;;
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

    // Vul de posities van alle blokjes in het speelbord array
    let index = 0;
    let kolomPositie = speelbord.kolomPositie;
    let rijPositie = speelbord.rijPositie;

    for (let rij = 0; rij < geselecteerdeBordGrootte; rij++) {
        for (let kolom = 0; kolom < geselecteerdeBordGrootte; kolom++){
            speelbord[index].yPositie = rijPositie + "px";
            speelbord[index].xPositie = kolomPositie + "px";
            kolomPositie = kolomPositie + speelbord.blokGrootte;
            index = index + 1;
        };
        rijPositie = rijPositie + speelbord.blokGrootte;
        kolomPositie = speelbord.kolomPositie;
    };

    // Plaats de bommen random in de blokjes. De HTML elementen worden pas aangemaakt bij het klikken, oomdat anders in de DOM
    // zichtbaar gemaakt zou kunnen worden  
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
    var klikEvent = function(){ klikActie(speelbord[identifier].id); };
    blok.setAttributeNode(dataCy);
        blok.id = "blok" + speelbord[identifier].id;
        blok.classList.add("blok");
        blok.style.left = speelbord[identifier].xPositie;
        blok.style.top = speelbord[identifier].yPositie;
        blok.style.width = speelbord.blokGrootte + "px";
        blok.style.height = speelbord.blokGrootte + "px";
        blok.addEventListener("click", klikEvent);
    // Plaats het element in het speelbord
    document.body.insertBefore(blok,speelbordLocatie);
};

function maakNieuwSpeelbord() {
    // Verwijder eerst de juiste knoppen uit het scherm
    formSpeelbordSelectie.style.display = "inline";
    knopSpeelbordOpslaan.style.display = "none";
    knopVerwijderSpeelborden.style.display = "none";
    knopMaakNieuwSpeelbord.style.display = "none";
    // Verwijder het aangemaakte speelbord van het scherm
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