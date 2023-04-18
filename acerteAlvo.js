var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
var raio = 10; // raio da circunferência
var velocidade = 1000; // Velocidade em milisegundos
var iniciar = false;

var xAleatorio;
var yAleatorio;
var altura = window.innerHeight;
var largura = window.innerWidth;

tela.width = largura;
tela.height = altura;

function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

function desenhaAlvo(x ,y) {
    desenhaCirculo(x, y, raio + 20, '#800404');
    desenhaCirculo(x, y, raio + 10, 'white');
    desenhaCirculo(x, y, raio, '#800404');
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
    
    if((x > xAleatorio - raio) && (x < xAleatorio + raio) && 
    (y > yAleatorio - raio) && (y < yAleatorio + raio)){
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
}

function escondeAcerto() {
    var acerto = document.getElementById("acerto");
    acerto.style.display = "none";
    apresentaCanvas();
}

tela.onclick = dispara;

setInterval(atualizaTela, velocidade);