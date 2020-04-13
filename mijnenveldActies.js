function toonAlleSpeelbordWaarden(bord) {
    if (bord.speelbordStatus == 'gemaakt') {
        // let rndBlok = randomBlok();
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
    } else {
        window.alert('Er staat nog niets hoor!')
    };    
};

function maakBlauw(bord) {
    // Maakt een random blok blauw van kleur
    if (bord.speelbordStatus == 'gemaakt') {
        let rndBlok = randomBlok();
        document.getElementById("blok" + rndBlok).style.backgroundColor = "powderblue";
    } else {
        window.alert('Er staat nog niets hoor!')
    };    
};

function maakBom(bord) {
    // Maakt een random blok enn bom
    if (bord.speelbordStatus == 'gemaakt') {
        let rndBlok = randomBlok();
        bord[rndBlok].bom = true;
    } else {
        window.alert('Er staat nog niets hoor!')
    };    
};

function randomBlok() {
    // Geeft een random blok
    let max = speelbord.length;
    let rndBlok = Math.floor(Math.random() * (max - 1 ) ) + 1;
    console.log(rndBlok);
    return rndBlok;
};
