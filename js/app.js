var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var timer;


// вешаем событие для отрисовки бактерий 
canvas.onclick = function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    // Разбиваем поле на сектора по 10px
    x = Math.floor(x / 10);
    y = Math.floor(y / 10);
    //заполняем игровое поле
    mas[y][x] = 1;
    drawField();
    drawCell();
}
//создаем игровое поле
function gameField() {

    var rows = 80, colums = 80;
    for (var i=0; i<rows; i++) {
        mas[i]=[];
        for (var j=0; j<colums; j++){
            mas[i][j]=0;
        }
    }
}
gameField();
drawCell();

// рисуем прямоугольник
function drawField() {
    ctx.clearRect(0, 0, 800 , 800);
    drawCell();
     for(var i=1; i<79; i++) {
        for (var j=1; j<79; j++){
            if (mas[i][j]==1) {
                ctx.fillStyle = "white";
                ctx.fillRect(j*10, i*10, 10, 10);
            } 
        }
    }
}

 //Рисуем сетку
function drawCell(){
for (var x = 0.5; x< 800; x+=10) {
    ctx.moveTo(x,0);
    ctx.lineTo(x, 800);
}
for (var y = 0.5; y< 800; y+=10) {
    ctx.moveTo(0, y);
    ctx.lineTo(800, y);
}
ctx.strokeStyle = "#888";
ctx.stroke();
}


function createLife() {
    // моделирование жизни
    var mas2 = [];
    for(var i=0; i<80; i++) {
        mas2[i]=[];
        for (var j=0; j<80; j++)
            mas2[i][j]=0;
        }

        for(var i=1; i<79; i++) 
        for (var j=1; j<79; j++){
            // подсчет количества соседей
            var neigbours = mas[i+1][j] + mas[i-1][j] + mas[i][j+1] + mas[i][j-1] + mas[i+1][j+1] + mas[i+1][j-1] + mas[i-1][j+1] + mas[i-1][j-1];

            //правила жизни
	       if ((neigbours === 3) || (neigbours === 2) && (mas[i][j] === 1)) mas2[i][j] = 1;
                else mas2[i][j] = 0;
        }
    
    mas = mas2;
    drawField();
    count++;
    document.getElementById('count').innerHTML = count;
    timer = setTimeout(createLife, 50);
}


// Кнопки

document.getElementById("start").onclick = function() {
        createLife();
}

document.getElementById("pause").onclick = function() {
        clearTimeout(timer);
}

document.getElementById("clear").onclick = function() {
    document.getElementById('count').innerHTML = 0;
    count = 0;
    clearTimeout(timer);
    ctx.clearRect(0, 0, 800 , 800);
    gameField();
    drawCell();
}