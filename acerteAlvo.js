var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
var raio = 10; // raio da circunferência
var velocidade = 1000; // Velocidade em milisegundos
var iniciar = false;
var contemUsuario = false;
var nomeUsuario = undefined;

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

function sorteiaPosicaoX(maximo) {
    minimo = 0;
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}

function sorteiaPosicaoY(maximo) {
    minimo = 130;
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
}

function limpaTela() {
    pincel.clearRect(0, 0, largura, altura);
}

function atualizaTela() {
    if (iniciar == true){
        limpaTela();
        xAleatorio = sorteiaPosicaoX(largura);
        yAleatorio = sorteiaPosicaoY(altura);
        desenhaAlvo(xAleatorio, yAleatorio); 
    }
}

function parabens(){
    const parabens = document.getElementById("parabens");
    parabens.innerHTML = "Parabéns "+ nomeUsuario +", Você Acertou o Alvo!";
}

function dispara(evento){
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;

    /* adicionando/subtraindo a altura da tela nas comparações dos valores do eixo Y */
    if (x > xAleatorio - raio && x < xAleatorio + raio &&
        y > yAleatorio - raio - tela.offsetTop && y < yAleatorio + raio - tela.offsetTop) {
    pontuacao += 100;
    escondeCanvas();
    parabens();
    apresentaAcerto();
    } 

    else if (x > xAleatorio - (raio + 10) && x < xAleatorio + (raio + 10) &&
            y > yAleatorio - (raio + 10) - tela.offsetTop && y < yAleatorio + (raio + 10) - tela.offsetTop) {
        pontuacao += 50;
        escondeCanvas();
        parabens();
        apresentaAcerto();
    } 

    else if (x > xAleatorio - (raio + 20) && x < xAleatorio + (raio + 20) &&
            y > yAleatorio - (raio + 20) - tela.offsetTop && y < yAleatorio + (raio + 20) - tela.offsetTop) {
        pontuacao += 20;
        escondeCanvas();
        parabens();
        apresentaAcerto();
    }
}

function apresentaCanvas() {
    verificaUsuario();
    if(contemUsuario == true){
        escondeNome();
        escondeUsuario();
        iniciar = true;
        tela.style.display = "block";
        apresentaPontuacao();
    }else{
        apresentaNome();
    }
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

function apresentaPontuacao(){
    var pontuacao = document.getElementById("pontuacao");
    pontuacao.style.display = "flex";
}

function apresentaUsuario(){
    var inicio = document.getElementById("inicio");
    inicio.style.display = "none";

    var usuario = document.getElementById("usuario");
    usuario.style.display = "flex";
}

function escondeUsuario(){
    var usuario = document.getElementById("usuario");
    usuario.style.display = "none";
}

function verificaUsuario() {
    var usuario = document.getElementById("nomeUsuario").value;
    if(usuario == ""){
        contemUsuario = false;
    }
    else{
        contemUsuario = true;
        nomeUsuario = usuario;
    }
}

function apresentaNome(){
    var nome = document.getElementById("insiraNome");
    nome.style.display = "block";
}

function escondeNome(){
    var nome = document.getElementById("insiraNome");
    nome.style.display = "nome";
}

tela.onclick = dispara;
setInterval(atualizaTela, velocidade);