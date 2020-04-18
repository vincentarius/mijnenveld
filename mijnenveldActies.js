function toonAlleSpeelbordWaarden(bord) {
    for (i = 0; i < bord.length; i++) {
        var canvas = document.getElementById("blok" + bord[i].id);
        var ctx = canvas.getContext('2d');
        if (bord[i].bom) {
            ctx.font = 'italic 20px sans-serif';
            ctx.fillText(bord[i].waarde, 10, 50);
            var grd = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, "white");

            // Fill with gradient
            ctx.fillStyle = grd;
            ctx.fillRect(10, 10, 150, 80);
        }
        else {
            ctx.font = 'italic 20px sans-serif';
            ctx.fillText("geen bom", 10, 50);
        };
    };
};

function randomBlok() {
    // Geeft een random blok
    let max = speelbord.length;
    let rndBlok = Math.floor(Math.random() * (max - 1 ) ) + 1;
    console.log(rndBlok);
    return rndBlok;
};

function slaOp(bord) {
    var date = new Date();
    localStorage.setItem("speelbord" + date, JSON.stringify(bord));
    // window.display("Uw speelbord is opgeslagen");
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