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
    let opgeslagenSpeelborden = [];
    // Voeg alle speelborden die getoond moeten worden toe aan de lijst
    for (var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substring(0,9) == 'speelbord') {
            opgeslagenSpeelborden.push(localStorage.key(i));
        };
    };

    OpgeslagenBordenScherm.innerHTML = JSON.stringify(opgeslagenSpeelborden);
}

function bouwHelper() {
    //Deze bouwhelper is tijdelijk en vervangt de console.log functie. Hij toont steeds de laatste informatie van het speelbord
    bouwHelperBommen = document.getElementById("bouwHelperBommen");
    bouwHelperBommen.innerHTML = "Bommen: " + JSON.stringify(bommen);
    bouwHelperBord = document.getElementById("bouwHelperBord");
    bouwHelperBord.innerHTML = "Status: " + speelbord.speelbordStatusAangemaakt;
};

function toonBouwHelper() {
    bouwHelperScherm = document.getElementById("bouwHelperScherm");
    if (bouwHelperScherm.style.display === "none") {
        bouwHelperScherm.style.display = "block";
    } else {
        bouwHelperScherm.style.display = "none";
    }
};

function toonOpgeslagenSpeelborden() {
    OpgeslagenBordenScherm = document.getElementById("OpgeslagenBordenScherm");
    if (OpgeslagenBordenScherm.style.display === "none") {
        OpgeslagenBordenScherm.style.display = "block";
    } else {
        OpgeslagenBordenScherm.style.display = "none";
    };
    speelborden();
};