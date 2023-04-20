var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
var raio = 10; // raio da circunferência
var velocidade = 1000; // Velocidade em milisegundos
var iniciar = false;

var xAleatorio;
var yAleatorio;
var altura = window.innerHeight;
var largura = window.innerWidth;

var pontuacao = 0;
var pontos = document.getElementById("pontos");
pontos.innerHTML = "<h2>0 pontos</h2>";

tela.width = largura;
tela.height = altura;

function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function desenhaAlvo(x ,y) {
    desenhaCirculo(x, y, raio + 20, '#800404'); // pontuação 20
    desenhaCirculo(x, y, raio + 10, 'white'); // pontuação 50
    desenhaCirculo(x, y, raio, '#800404'); // pontuação 100
}

function sorteiaPosicao(maximo) {
    return Math.floor(Math.random() * maximo);
}

function limpaTela() {
    pincel.clearRect(0, 0, largura, altura);
}

function atualizaTela() {
    if (iniciar == true) {
        limpaTela();
        xAleatorio = sorteiaPosicao(largura);
        yAleatorio = sorteiaPosicao(altura);
        desenhaAlvo(xAleatorio, yAleatorio);  
    }
}

function dispara(evento){
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;

    /* adicionando/subtraindo a altura da tela nas comparações dos valores do eixo Y */
    if (x > xAleatorio - raio && x < xAleatorio + raio &&
        y > yAleatorio - raio - tela.offsetTop && y < yAleatorio + raio - tela.offsetTop) {
    pontuacao += 100;
    escondeCanvas();
    apresentaAcerto();
    } 

    else if (x > xAleatorio - (raio + 10) && x < xAleatorio + (raio + 10) &&
            y > yAleatorio - (raio + 10) - tela.offsetTop && y < yAleatorio + (raio + 10) - tela.offsetTop) {
        pontuacao += 50;
        escondeCanvas();
        apresentaAcerto();
    } 

    else if (x > xAleatorio - (raio + 20) && x < xAleatorio + (raio + 20) &&
            y > yAleatorio - (raio + 20) - tela.offsetTop && y < yAleatorio + (raio + 20) - tela.offsetTop) {
        pontuacao += 20;
        escondeCanvas();
        apresentaAcerto();
    }
}

function apresentaCanvas() {
    var inicio = document.getElementById("inicio");
    inicio.style.display = "none";
    iniciar = true;
    tela.style.display = "block";
}

function escondeCanvas() {
    tela.style.display = "none";
    iniciar = false;
}

function apresentaAcerto() {
    var acerto = document.getElementById("acerto");
    acerto.style.display = "flex";
    pontos.innerHTML = "<h2>"+pontuacao+" pontos</h2>";
}

function escondeAcerto() {
    var acerto = document.getElementById("acerto");
    acerto.style.display = "none";
    apresentaCanvas();
}

tela.onclick = dispara;

setInterval(atualizaTela, velocidade);