

// Background do game
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;

// A minhoca
const wormHeadRight = new Image(32,32); wormHeadRight.src = "img/minhoca-cabeca-right.png";
const wormHeadDown = new Image(32,32); wormHeadDown.src = "img/minhoca-cabeca-down.png";
const wormHeadLeft = new Image(32,32); wormHeadLeft.src = "img/minhoca-cabeca-left.png";
const wormHeadUp = new Image(32,32); wormHeadUp.src = "img/minhoca-cabeca-up.png";
const wormBody = new Image(32,32); wormBody.src = "img/minhoca.png";
const worm = [];
worm[0] = {
    x: box,
    y: box,
}
// Direção inicial da minhoca
let direction = "right";

// A maçã
const appleImage = new Image(32,32);
appleImage.src = "img/maca.png";
const apple = {
    x: 8 * box,
    y: 8 * box,
}

// Contador das maçãs comidas
let appleCount = 0;

// Div oculta Game-Over
const gameOver = document.querySelector(".game-over");


// Funções que desenham os elementos do jogo
function createBG() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createWorm() {
    for (let i = 0; i < worm.length; i++) {
        if (i == 0 && direction == "right") 
            context.drawImage(wormHeadRight, worm[i].x, worm[i].y, box, box);
        if (i == 0 && direction == "down") 
            context.drawImage(wormHeadDown, worm[i].x, worm[i].y, box, box);
        if (i == 0 && direction == "left") 
            context.drawImage(wormHeadLeft, worm[i].x, worm[i].y, box, box);
        if (i == 0 && direction == "up") 
            context.drawImage(wormHeadUp, worm[i].x, worm[i].y, box, box);
        if (i != 0) 
            context.drawImage(wormBody, worm[i].x, worm[i].y, box, box);
    }
}

function createFood() {
    context.drawImage(appleImage, apple.x, apple.y, box, box);
}

// Função chamada quando a minhoca pega uma maçã
function grabbedFood() {

    // Colocando a maçã em outro ponto aleatório
    apple.x = Math.floor(Math.random() * 15 + Math.random()) * box;
    apple.y = Math.floor(Math.random() * 15 + Math.random()) * box;
    // Loop para impedir que a maçã apareça em um espaço ocupado pela minhoca
    for (let i = 0; i < worm.length; i++) {
        if (apple.x == worm[i].x && apple.y == worm[i].y) {
            apple.x = Math.floor(Math.random() * 15 + Math.random()) * box;
            apple.y = Math.floor(Math.random() * 15 + Math.random()) * box;
            i = 0;
        }
    }
    // Adiciona +1 no contador de maçãs
    appleCount++;
    // Aumentando a dificuldade do game até chegar em 50ms
    if (interval > 50) {
        interval -= 10;
        clearInterval(game);
        game = setInterval(startGame, interval);
    } else if (appleCount == 40) {
    // Else da Vitória
        clearInterval(game);
        gameOver.classList.add("victory");
        gameOver.innerHTML = `
            <h2 class="titulo">Parabéns! &#129351</h2>
            <p class="subtitulo">A minhoca comeu <span>40</span> maçãs</p>
            <button id="btn" onclick="restartGame()">Jogar de novo</button>
        `;
    }
}

// Função que determina as teclas pressionadas 
document.addEventListener('keydown', newDirection);
function newDirection(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Função que executa o jogo
function startGame() {
    // Resetando a posição da minhoca quando ela passa as bordas
    if (worm[0].x > 15 * box) worm[0].x = 0;
    if (worm[0].x < 0) worm[0].x = 15 * box;
    if (worm[0].y > 15 * box) worm[0].y = 0;
    if (worm[0].y < 0) worm[0].y = 15 * box;
    // Loop para checar se a minhoca se chocou com ela mesma
    for (let i = 1; i < worm.length; i++) {
        if (worm[0].x == worm[i].x && worm[0].y == worm[i].y) {
            clearInterval(game);
            wormScream.play();
            bgMusic.pause();
            gameOver.innerHTML = `
                <h2 class="titulo">Game Over &#128557</h2>
                <p class="subtitulo">A minhoca comeu só <span>${appleCount}</span> maçãs</p>
                <button id="btn" onclick="restartGame()">Tentar de novo</button>
            `;
            return;
        }
    }
    // Executando as funções que desenham os elementos do jogo
    createBG();
    createWorm();
    createFood();
    // Coordenadas da minhoca
    let wormX = worm[0].x;
    let wormY = worm[0].y;
    if (direction == "right") wormX += box;
    if (direction == "left") wormX -= box;
    if (direction == "up") wormY -= box;
    if (direction == "down") wormY += box;
    // Condição que determinam se a minhoca pegou ou não a comida
    if (worm[0].x == apple.x && worm[0].y == apple.y) grabbedFood();
    else worm.pop();
    // Adicionar uma nova posição no começo do Array
    const newPosition = {
        x: wormX,
        y: wormY,
    }
    worm.unshift(newPosition);
}
// Chama a função que executa o game
let interval = 250;
let game = setInterval(startGame, interval);

// Tentar de novo
function restartGame() {
    document.location.reload();
}