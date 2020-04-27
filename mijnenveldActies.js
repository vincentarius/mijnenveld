function randomBlok() {
    // Geeft een random blok
    let max = speelbord.length;
    let rndBlok = Math.floor(Math.random() * (max - 1 ) ) + 1;
    console.log(rndBlok);
    return rndBlok;
};

function slaOp(bord) {
    var date = new Date();
    localStorage.setItem("speelbord" /*+ date */, JSON.stringify(bord));
    alert("Speelbord is opgeslagen!");
};

function verwijderAlleSpeelborden() {
    var teVerwijderenSpeelborden = [];
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

    // Verwijder ook de bestaande lijst op het scherm    
    while (opgeslagenSpeelborden.hasChildNodes()) {  
        opgeslagenSpeelborden.removeChild(opgeslagenSpeelborden.firstChild);
    };
};

function toonSpeelborden() {
    // deze lijst toont de speelborden die zijn opgeslagen. 
    // TODO kan worden gerefactored naar eenvoudigere manier, zodat de lijst niet steeds hoeft te worden leeg gemaakt
    var aantalOpgeslagen = localStorage.length;
    var lijstOpgeslagen = [];

    // Verwijder eerst de bestaande lijst op het scherm    
    while (opgeslagenSpeelborden.hasChildNodes()) {  
        opgeslagenSpeelborden.removeChild(opgeslagenSpeelborden.firstChild);
    };
    
    // Haal dan de lijst met alle speelborden die zijn opgeslagen in de localstorage op
    for (let i = 0; i < aantalOpgeslagen; i++ ){
        lijstOpgeslagen.push(localStorage.key(i));        
    };

    // Maak een lijst aan om de opgehaalde lijst met opgeslagen speelborden te tonen
    ul = document.createElement('ul');
    opgeslagenSpeelborden.appendChild(ul);

    //En maak voor ieder opgeslagen speelbord een list item
    lijstOpgeslagen.forEach(function (opgeslagen) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += opgeslagen;
    });

    // Maak nu de lijst met opgeslagen speelborden zichtbaar
    opgeslagenSpeelborden.style.display = "inline";
};

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
