var tela = document.querySelector("canvas");
var pincel = tela.getContext("2d");
var raio = 10; // raio da circunferência
var iniciar = false;
var contemUsuario = false;
var nomeUsuario = undefined;

const listaVelocidade = [2000,1500,1000,500,250]; // Velocidade em milisegundos
const listaErros = [5,3,2,1,0];
const listaPontuacao = [10,20,30,50,100];
const listaTotalPontos = [50,100,150,200,250];
const listaNivel = [1,2,3,4,5];
const listaTituloNivel = ["Nível 1: Fácil","Nível 2: Médio","Nível 3: Difícil","Nível 4: Extremo","Nível 5: Insano"];
const listaMensagemNivel = ["Excelente trabalho, agora tente um nível mais difícil!","Muito bem, agora tente um nível mais desafiador!",
"Impressionante, você está progredindo muito bem!","Você é um verdadeiro atirador de elite!","Incrível, você completou o nível mais difícil de todos!"];
const listaMunicao = ["ilimitado",20,10,5,0];

var municao;
var velocidade;
var erros;
var pontosAdicionais;
var totalPontos;
var nivel = 1;
var errosAtuais = 0;
var municaoAtual = 0;

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
function atualizaDados(){
    municao = listaMunicao[nivel-1];
    velocidade = listaVelocidade[nivel-1];   
    erros = listaErros[nivel-1];    
    pontosAdicionais = listaPontuacao[nivel-1];   
    totalPontos = listaTotalPontos[nivel-1];
}

function verificaMunicao(){
    if(municaoAtual > municao){
        return true;
    }
    else{
        return false;
    }
}

function verificaErros(){
    if(errosAtuais > erros){
        return true;
    }
    else{
        return false;
    }
}

function verificaTotalPontos(){
    if(pontuacao >= totalPontos){
        return true;
    }
    else{
        return false;
    }
}

function verificaTempo(){

}

function verificaGeral(){
    if(((verificaMunicao()) || (verificaErros())) && (verificaTotalPontos() == false)){
        apresentaGameOver();
    }
    else if((verificaMunicao() == false) && (verificaMunicao() == false) && (verificaTotalPontos())){
        apresentaProximoNivel();
    }
}

function atualizaTela() {
    atualizaDados();
    if (iniciar == true){
        limpaTela();
        xAleatorio = sorteiaPosicaoX(largura);
        yAleatorio = sorteiaPosicaoY(altura);
        desenhaAlvo(xAleatorio, yAleatorio);
    }
}

function dispara(evento){
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;

    /* adicionando/subtraindo a altura da tela nas comparações dos valores do eixo Y */
    if (x > xAleatorio - raio && x < xAleatorio + raio &&
        y > yAleatorio - raio - tela.offsetTop && y < yAleatorio + raio - tela.offsetTop) {
        municaoAtual++;
        pontuacao += pontosAdicionais;
        pontos.innerHTML = "<h2>"+pontuacao+" pontos</h2>";
    } 

    else if (x > xAleatorio - (raio + 10) && x < xAleatorio + (raio + 10) &&
            y > yAleatorio - (raio + 10) - tela.offsetTop && y < yAleatorio + (raio + 10) - tela.offsetTop) {
        municaoAtual++;
        pontuacao += pontosAdicionais;
        pontos.innerHTML = "<h2>"+pontuacao+" pontos</h2>";
    } 

    else if (x > xAleatorio - (raio + 20) && x < xAleatorio + (raio + 20) &&
            y > yAleatorio - (raio + 20) - tela.offsetTop && y < yAleatorio + (raio + 20) - tela.offsetTop) {
        municaoAtual++;
        pontuacao += pontosAdicionais;
        pontos.innerHTML = "<h2>"+pontuacao+" pontos</h2>";
    }

    else{
        municaoAtual++;
        errosAtuais++;
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

function apresentaGameOver() {
    escondeCanvas();
    var acerto = document.getElementById("gameOver");
    acerto.style.display = "flex";
}

function escondeGameOver() {
    var acerto = document.getElementById("gameOver");
    acerto.style.display = "none";
}

function apresentaPontuacao(){
    var pontuacao = document.getElementById("pontuacao");
    pontuacao.style.display = "flex";
}

function escondePontuacao(){
    var pontuacao = document.getElementById("pontuacao");
    pontuacao.style.display = "none";
}

function apresentaIniciar(){
    var inicio = document.getElementById("inicio");
    inicio.style.display = "flex";
}

function escondeIniciar(){
    var inicio = document.getElementById("inicio");
    inicio.style.display = "none";
}

function apresentaUsuario(){
    escondeIniciar();
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

function apagaInput(){
    var usuario = document.getElementById("nomeUsuario").value = "";
}

function apresentaNome(){
    var nome = document.getElementById("insiraNome");
    nome.style.display = "block";
}

function escondeNome(){
    var nome = document.getElementById("insiraNome");
    nome.style.display = "nome";
}

function reiniciarJogo(){
    pontuacao = 0;
    errosAtuais = 0;
    municaoAtual = 0;
    pontuacao = 0;
    pontos.innerHTML = "<h2>0 pontos</h2>";
    escondeGameOver();
    apresentaCanvas();
}

function menuPrincipal(){
    nivel = 1;
    pontuacao = 0;
    errosAtuais = 0;
    pontuacao = 0;
    pontos.innerHTML = "<h2>0 pontos</h2>";
    escondeGameOver();
    escondePontuacao();
    apagaInput();
    apresentaIniciar();
}

function apresentaProximoNivel(){
    escondeCanvas();
    var tituloNivel = document.getElementById("tituloNivel");
    tituloNivel.innerHTML = "<h2>"+ listaTituloNivel[nivel-1] + "</h2>";

    var mensagemNivel = document.getElementById("mensagemNivel");
    mensagemNivel.innerHTML = "<p>"+ listaMensagemNivel[nivel-1] + "</p>";

    var acerto = document.getElementById("proximoNivel");
    acerto.style.display = "flex";
}

function escondeProximoNivel(){
    var acerto = document.getElementById("proximoNivel");
    acerto.style.display = "none";
}

function proximoNivel(){
    nivel++;
    pontuacao = 0;
    errosAtuais = 0;
    pontuacao = 0;
    municaoAtual = 0;
    pontos.innerHTML = "<h2>0 pontos</h2>";
    escondeProximoNivel();
    apresentaCanvas();
}

tela.onclick = dispara;
atualizaTela();
setInterval(verificaGeral, 250);
setInterval(atualizaTela, velocidade);