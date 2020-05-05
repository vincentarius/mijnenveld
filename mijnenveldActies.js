function randomBlok() {
    // Geeft een random blok
    let max = speelbord.length;
    let rndBlok = Math.floor(Math.random() * (max - 1 ) ) + 1;
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
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substring(0,9) == 'speelbord') {
            teVerwijderenSpeelborden.push(localStorage.key(i));
        };
    };

    // Maak de lijst met te verwijderen speelborden leeg
    for (let i = 0; i < teVerwijderenSpeelborden.length; i++) {
        localStorage.removeItem(teVerwijderenSpeelborden[i]);
    };
    speelborden();
};

function speelborden() {
    let opgeslagenSpeelborden = [];
    // Voeg alle speelborden die getoond moeten worden toe aan de lijst
    for (let i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substring(0,9) == 'speelbord') {
            opgeslagenSpeelborden.push(localStorage.key(i));
        };
    };
    OpgeslagenBordenSubScherm.innerHTML = JSON.stringify(opgeslagenSpeelborden);
}

function bouwHelper() {
    //Deze bouwhelper is tijdelijk en vervangt de console.log functie. Hij toont steeds de laatste informatie van het speelbord
    bouwHelperSpeelbordLengte.innerHTML = "Speelbord grootte: " + aantalBlokjes;
    bouwHelperBommen.innerHTML = "Bommen: " + JSON.stringify(bommen);
    bouwHelperBord.innerHTML = "Status: " + speelbord.speelbordStatusAangemaakt;
    bouwHelperEindeSpel.innerHTML = "Bezig...";
};

function toonBouwHelper() {        
    let stijl = getComputedStyle(bouwHelperSubScherm);
    if (stijl.display === "none" ) {
        bouwHelperSubScherm.style.display = "block";
    } else {
        bouwHelperSubScherm.style.display = "none";
    };
};

function toonOpgeslagenSpeelborden() {
    let stijl = getComputedStyle(OpgeslagenBordenSubScherm);
    if (stijl.display === "none") {
        OpgeslagenBordenSubScherm.style.display = "block";
    } else {
        OpgeslagenBordenSubScherm.style.display = "none";
    };
    speelborden();
};

function klikActie(gekliktBlokje) {
    blokElement = document.getElementById("blok" + gekliktBlokje );
    if ( aangeklikteBlokjes.length === aantalBlokjes ) {
        window.alert("Het spel is klaar!");
        bouwHelperEindeSpel.innerHTML = "klaar";
    } else {    
        if ( !speelbord[gekliktBlokje].aangeklikt ) {
            speelbord[gekliktBlokje].aangeklikt = true;
            aangeklikteBlokjes.push(gekliktBlokje);
            if (speelbord[gekliktBlokje].bom ) {
                blokElement.style.backgroundColor = "red";
                toonBom(gekliktBlokje);
            } else {
                blokElement.style.backgroundColor = "green";
                toonGeenBom(gekliktBlokje);
            }
        } else {
            window.alert("Deze is al aangeklikt!");
        };
    };

    bouwHelperGekliktBlokje.innerHTML = "Geklikt: " + gekliktBlokje;
    bouwHelperBom.innerHTML = "Bevat Bom: " +  speelbord[gekliktBlokje].bom;
    bouwHelperAangeklikteBlokjes.innerHTML = "Aangeklikte blokjes: " + JSON.stringify(aangeklikteBlokjes);
    bouwHelperAantalAangeklikteBlokjes.innerHTML = "Aantal aangeklikte blokjes: " + aangeklikteBlokjes.length;
};

function toonBom(ditBlokje) {
    let bomElement = document.createElement("i");
    bomElement.classList.add("material-icons");
    let bomElementTekst = document.createTextNode("error");
    bomElement.appendChild(bomElementTekst);
    bomElement.id = "bomblok"
    let element = document.getElementById("blok" + ditBlokje);
    element.appendChild(bomElement);
};

function toonGeenBom(ditBlokje) {
    let bomElement = document.createElement("i");
    bomElement.classList.add("material-icons");
    let bomElementTekst = document.createTextNode("mood");
    bomElement.appendChild(bomElementTekst);
    bomElement.id = "GeenBomblok"
    let element = document.getElementById("blok" + ditBlokje);
    element.appendChild(bomElement);
};