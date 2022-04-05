let canvas;
let ctx;
window.onload = function(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownEvent);
    let x = 8;
    //let: variaveis globais limitadas no scopo do bloco
    setInterval(desenharJogo, 1000 / x);
};

 //teclas
function keyDownEvent(event){
    // nextX e nextY representam as direções que a cobra irá percorrer
    // nos eixos X e Y, respectivamente
    switch(event.keyCode){
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
    }
}
//serpente
let defaultTamanhoCauda = 3;
let tamanhoCauda = defaultTamanhoCauda;
let caminhoCobra = [];
let cobraEixoX = cobraEixoY = 10;


//Criação da tela de jogo
let tamanhoTela = tamanhoCaminho = 20;
let nextX = nextY = 0;


//Criação da comida
let appleX = (appleY = 15);

//desenhar a tela 
function desenharJogo(){
    cobraEixoX += nextX;
    cobraEixoY += nextY;
    if (cobraEixoX < 0){
        cobraEixoX = tamanhoTela -1;
    }
    
    if (cobraEixoX > tamanhoTela - 1){
        cobraEixoX = 0;
    }
    
    if (cobraEixoY < 0){
        cobraEixoY = tamanhoTela -1;
    }
    
    if (cobraEixoY > tamanhoTela - 1){
        cobraEixoY = 0;
    }
}

//Se a cobra comer o alimento
if (cobraEixoX == appleX && cobraEixoY == appleY){
    tamanhoCauda++;
    appleX = Math.floor(Math.random() * tamanhoTela);
    appleY = Math.floor(Math.random() * tamanhoTela);
}

//aumento da cobra 
ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "green";
    for (let i = 0; i < caminhoCobra.length; i++){
        ctx.fillRect(
            caminhoCobra[i].x * tamanhoCaminho,
            caminhoCobra[i].y * tamanhoCaminho,
            tamanhoCaminho,
            tamanhoCaminho
        );
        if (caminhoCobra[i].x == cobraEixoX && caminhoCobra[i].y == cobraEixoY){
            tamanhoCauda = defaultTamanhoCauda;
        }
    }

//pintar a maça
ctx.fillStyle = "red";
ctx.fillRect(appleX * tamanhoCaminho, appleY * tamanhoCaminho, tamanhoCaminho, tamanhoCaminho);

//caso a cobra eceda o tamanho da tela a cauda dela se "dobrara para o lado "
caminhoCobra.push({
    x:cobraEixoX,
    y:cobraEixoY
});
while (caminhoCobra.length > tamanhoCauda){
    caminhoCobra.shift(); }

