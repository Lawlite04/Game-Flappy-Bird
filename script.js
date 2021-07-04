var bird = new Image();
bird.src = "./Img/Bird.png";

var bird2 = new Image();
bird2.src = "./Img/Bird2.png";

var bg = new Image();
bg.src = "./Img/Background.png";

var tiang = new Image();
tiang.src = "./Img/Tiang.png";

var mati = new Image();
mati.src = "./Img/Mati.png";

var judul = new Image();
judul.src = "./Img/Tittle.png";

var point = new Audio();
point.src = "./audio/point.wav";

var dead = new Audio();
dead.src = "./audio/hit.wav";

var bird001 = new Audio();
bird001.src = "./audio/birds001.mp3";

var soundGame = new Audio();
soundGame.src = "./audio/game.wav";

var soundSplash = new Audio();
soundSplash.src = "./audio/Happy_Clappy.mp3";

function mulaiKanvas() {
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');

    cvs.width = cvs.scrollWidth;
    cvs.height = cvs.scrollHeight;

    var cw = cvs.width;
    var ch = cvs.height;

    var bgX = 0;
    var z = 180;
    var start = false;
    function splash() {
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(bg, bgX -= 2, 0);

        if (bgX <= -1000) {
            bgX = 0;
        }
        
        ctx.font = "Bold 20px arial";
        ctx.fillText("KLIK UNTUK MEMULAI", 300, 400);

        ctx.drawImage(judul, 230, 120);
        ctx.drawImage(bird, 350, z += 2);
        if (z >= 220) {
            z = 180;
        }
    }

    var intervalSplash = setInterval(splash, 30);

    window.addEventListener('click', function () {
        if (start == false) {
            clearInterval(intervalSplash);
            utama();
            start = true;
            if (typeof soundGame.loop == 'boolean') {
                soundGame.loop = true;
            } else {
                soundGame.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }
            soundGame.play();
        }
    });

    function utama() {
        var gantiGambar = false;

        function backGround() {
            this.x = 0;
            this.render = function () {
                ctx.drawImage(bg, this.x--, 0);

                if (this.x == -1000) {
                    this.x = 0;
                }
            }
        }

        var latar = new backGround();

        function character() {
            this.x = 100;
            this.y = 200;
            this.w = 100;
            this.h = 100;
            this.i = 0;
            this.render = function () {
                if (gantiGambar) {
                    ctx.drawImage(bird2, this.x, this.y += 5);
                    this.i++;
                    bird001.play();
                    if (this.i == 5) {
                        gantiGambar = false;
                        this.i = 0;
                    }
                    gantiGambar = false;
                } else {
                    ctx.drawImage(bird, this.x, this.y += 5);
                }
            }
        }

        var karakter = new character();

        var banyakTiang = [];

        tambahTiang();
        function tambahTiang() {
            var x = 800, y = 0, w = 59, h = 306;
            var acak = Math.floor(Math.random() * 250);
            banyakTiang.push({ "x": x, "y": y - acak, "w": w, "h": h });
        }

        var hitung = 0;
        var tambahNilai = true;
        var skor = 0;

        function tambahSkor() {
            skor++;
            point.play();
        }

        function selesai() {
            clearInterval(interval);
            ctx.clearRect(0, 0, cw, ch);
            latar.render();
            renderTiang();

            ctx.font = "Bold 60px Arial";
            ctx.fillText("GAME OVER", 250, 250);

            ctx.font = "Bold 30px Arial";
            ctx.fillText("Skor Yang Diperoleh " + skor, 275, 300);

            ctx.font = "Bold 25px Arial";
            ctx.fillText("REPLY", 400, 360);

            ctx.drawImage(mati, karakter.x, karakter.y);

            dead.play();
            soundGame.pause();

            window.addEventListener('click', function () {
                window.location.href = "";
            });
        }
        function kena() {
            for (var i = 0; i < banyakTiang.length; i++) {
                var t = banyakTiang[i];
                if ((karakter.x + karakter.w > t.x && karakter.y < t.y + t.h && karakter.x < t.x + t.w) ||
                    (karakter.x + karakter.w > t.x && karakter.y + karakter.h > t.y + t.h + 230 && karakter.x < t.x + t.w)) {
                    selesai();
                } else if (t.x + t.w < karakter.x) {
                    if (tambahNilai) {
                        tambahSkor();
                        tambahNilai = false;
                    }
                }
            }

            if (karakter.y < 0) { selesai(); }
            if (karakter.y > ch) { selesai(); }
        }

        function renderTiang() {
            for (var i = 0; i < banyakTiang.length; i++) {
                var t = banyakTiang[i];
                ctx.drawImage(tiang, t.x--, t.y);
                ctx.drawImage(tiang, t.x--, t.y + t.h + 230);

                if (t.x + t.w < 0) {
                    banyakTiang.splice(i, 1);
                    tambahNilai = true;
                }
            }
            hitung++;
            if (hitung == 200) {
                tambahTiang();
                hitung = 0;
            }
        }

        function animasi() {
            ctx.save();
            ctx.clearRect(0, 0, cw, ch);
            latar.render();
            karakter.render();
            renderTiang();
            ctx.font = "Normal 30px Arial";
            ctx.fillText("Skor : " + skor, 20, 60);
            kena();
            ctx.restore();
        }

        var interval = setInterval(animasi, 30);

        window.addEventListener('click', function () {
            karakter.y -= 50;
            gantiGambar = true;
        });
    }//utama

}

window.addEventListener('load', function () {
    mulaiKanvas();
    
});