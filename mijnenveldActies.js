function randomBlok() {
    // Geeft een random blok
    let max = speelbord.length;
    let rndBlok = Math.floor(Math.random() * (max - 1 ) ) + 1;
    console.log(rndBlok);
    return rndBlok;
};

function slaOp() {
    var date = new Date();
    localStorage.setItem("speelbord" + date , JSON.stringify(speelbord));
    speelborden();
};

function verwijderAlleSpeelborden() {
    let teVerwijderenSpeelborden = [];
    // Voeg alle speelborden die verwijderd moeten worden toe aan de lijst
    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substring(0,9) == 'speelbord') {
            teVerwijderenSpeelborden.push(localStorage.key(i));
        };
    };

    // Maak de lijst met te verwijderen speelborden leeg
    for (var i = 0; i < teVerwijderenSpeelborden.length; i++) {
        localStorage.removeItem(teVerwijderenSpeelborden[i]);
    };
    speelborden();
};

function speelborden() {
    OpgeslagenBordenScherm = document.getElementById("OpgeslagenBordenScherm");
    OpgeslagenBorden = document.getElementById("OpgeslagenBorden");
    let opgeslagenSpeelborden = [];
    // Voeg alle speelborden die getoond moeten worden toe aan de lijst
    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substring(0,9) == 'speelbord') {
            opgeslagenSpeelborden.push(localStorage.key(i));
        };
    };
    OpgeslagenBorden.innerHTML = JSON.stringify(opgeslagenSpeelborden);
}

function bouwHelper() {
    //Deze bouwhelper is tijdelijk en vervangt de console.log functie. Hij toont steeds de laatste informatie van het speelbord
    bouwHelperSpeelbordLengte = document.getElementById("bouwHelperSpeelbordLengte");
    bouwHelperSpeelbordLengte.innerHTML = "Speelbord grootte: " + aantalBlokjes;
    
    bouwHelperBommen = document.getElementById("bouwHelperBommen");
    bouwHelperBommen.innerHTML = "Bommen: " + JSON.stringify(bommen);
    
    bouwHelperBord = document.getElementById("bouwHelperBord");
    bouwHelperBord.innerHTML = "Status: " + speelbord.speelbordStatusAangemaakt;
    
    bouwHelperGekliktBlokje = document.getElementById("bouwHelperGekliktBlokje");
    bouwHelperBom = document.getElementById("bouwHelperBom");
    bouwHelperEindeSpel.innerHTML = "Bezig...";
    
};

function toonBouwHelper() {
    bouwHelperScherm = document.getElementById("bouwHelperScherm");    
    let stijl = getComputedStyle(bouwHelperScherm);
    console.log(stijl.display);
    if (stijl.display === "none") {
        bouwHelperScherm.style.display = "block";
    } else {
        bouwHelperScherm.style.display = "none";
    };
};

function toonOpgeslagenSpeelborden() {    
    OpgeslagenBordenScherm = document.getElementById("OpgeslagenBordenScherm");
    let stijl = getComputedStyle(OpgeslagenBordenScherm);
    if (stijl.display === "none") {
        OpgeslagenBordenScherm.style.display = "block";
    } else {
        OpgeslagenBordenScherm.style.display = "none";
    };
    speelborden();
};

function klikActie(gekliktBlokje) {
    blokElement = document.getElementById("blok" + gekliktBlokje );
    
    //als er geklikt is, eerst kijken of er een bom zit. Dan wordt het hokje rood
    if ( speelbord[gekliktBlokje].bom) {
        blokElement.style.backgroundColor = "red";
        toonBom(gekliktBlokje);
        } else {
            blokElement.style.backgroundColor = "green";
        };

    // Zodra het laatste blokje is aangeklikt, is het spel afgelopen
    if ( aangeklikteBlokjes.length === aantalBlokjes ) {
        window.alert("Het spel is klaar!");
        bouwHelperEindeSpel.innerHTML = "klaar";
        } else {
            //Blokjes die als zijn aangeklikt, mogen niet nogmaals worden aangeklikt
            if ( speelbord[gekliktBlokje].aangeklikt ) {
                window.alert("Deze is al aangeklikt!");
            } else {                
                speelbord[gekliktBlokje].aangeklikt = true;
                aangeklikteBlokjes.push(gekliktBlokje);                
        };

    bouwHelperGekliktBlokje.innerHTML = "Geklikt: " + gekliktBlokje;
    bouwHelperBom.innerHTML = "Bevat Bom: " +  speelbord[gekliktBlokje].bom;
    bouwHelperAangeklikteBlokjes = document.getElementById("bouwHelperAangeklikteBlokjes");
    bouwHelperAangeklikteBlokjes.innerHTML = "Aangeklikte blokjes: " + JSON.stringify(aangeklikteBlokjes);
    bouwHelperAantalAangeklikteBlokjes = document.getElementById("bouwHelperAantalAangeklikteBlokjes");
    bouwHelperAantalAangeklikteBlokjes.innerHTML = "Aantal aangeklikte blokjes: " + aangeklikteBlokjes.length;
    bouwHelperEindeSpel = document.getElementById("bouwHelperEindeSpel");
    };    
};

function toonBom(ditBlokje) {
    let bomElement = document.createElement("i");
    bomElement.classList.add("material-icons");
    let bomElementTekst = document.createTextNode("error");
    bomElement.appendChild(bomElementTekst);
    bomElement.id = "bomblok"
    let element = document.getElementById("blok" + ditBlokje);
    element.appendChild(bomElement);
}