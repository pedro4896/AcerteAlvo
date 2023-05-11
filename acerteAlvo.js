/* ----- Configuração do canvas ---- */
    var tela = document.querySelector("canvas");
    var pincel = tela.getContext("2d");

    var altura = window.innerHeight; // retorna a altura da tela
    var largura = window.innerWidth; // retorna a largura da tela

    tela.width = largura; // informa o tamanho da largura do canvas
    tela.height = altura; // informa o tamanho da altura do canvas
/* ----- /Configuração do canvas ---- */

/* ----- Variáveis Padrão ---- */
    const listaNivel = [1,2,3,4,5]; // lista de níveis
    const listaVelocidade = [2000,1500,1000,500,250]; // Velocidade de aparição do alvo por nível
    

    const listaPontuacao = [10,20,30,50,100]; // pontuação de acerto por nível
    const listaTotalPontos = [50,100,150,200,250]; // pontuação total por nível

    const listaErros = [5,3,2,1,0]; // Erros ao alvo por nível
    const listaMunicao = ["ilimitado",20,10,5,3]; // munição por nível
    
    const listaTituloNivel = ["Nível 1: Fácil","Nível 2: Médio","Nível 3: Difícil","Nível 4: Extremo","Nível 5: Insano"]; // título do nível
    const listaMensagemNivel = ["Excelente trabalho, agora tente um nível mais difícil!","Muito bem, agora tente um nível mais desafiador!",
    "Impressionante, você está progredindo muito bem!","Você é um verdadeiro atirador de elite!","Incrível, você completou o nível mais difícil de todos!"]; // mensagem do nível 
/* ----- Variáveis Padrão ---- */

/* ----- Variáveis de controle -----*/
    var iniciar = false;
    var contemUsuario = false; // identifica se o usuário foi digitado

    var nomeUsuario; // recebe o nome do usuário
    var municao; // recebe o valor de munições disponíveis

    var velocidade; // recebe da velocidade de aparição dos alvos 
    var erros; // recebe a quantidade de erros ao alvo disponíveis

    var pontosAdicionais; // recebe a pontuação por acerto
    var totalPontos; // recebe a pontuação total do nível

    var nivel = 1; // nível do jogo
    var errosAtuais = 0; // erros atuais

    var municaoAtual = 0; // munição atual
    var atualiza_Velocidade; // variável de atualização de velocidade

    var xAleatorio; // recebe a posição X de aparição do alvo
    var yAleatorio; // recebe a posição Y de aparição do alvo

    var raio = 10; //raio da circunferência
    var pontuacao = 0; // valor inicial da pontuação

    // atribui a pontuação no dashboard
    var pontos = document.getElementById("pontos");
    pontos.innerHTML = "<h2>"+ pontuacao +" pontos</h2>"; 
/* ----- /Variáveis de controle ----- */

function limpaTela() {
    pincel.clearRect(0, 0, largura, altura); // limpa a tela
}

/* ----- Cria alvo na tela ----- */
    function desenhaCirculo(x, y, raio, cor) { // cria os circulo que compõe o alvo
        pincel.fillStyle = cor;
        pincel.beginPath();
        pincel.arc(x, y, raio, 0, 2 * Math.PI);
        pincel.fill();
    }

    function desenhaAlvo(x ,y) { // cria o alvo
        desenhaCirculo(x, y, raio + 20, '#800404');
        desenhaCirculo(x, y, raio + 10, 'white');
        desenhaCirculo(x, y, raio, '#800404'); 
    }

    function sorteiaPosicaoX(maximo) { //sorteia o valor de X
        minimo = 0;
        return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    }

    function sorteiaPosicaoY(maximo) { //sorteia o valor de Y
        minimo = 130;
        return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    }
/* ----- /Cria alvo na tela ----- */

/* ----- /Atribuí as especficações de acordo com o nível as varíaveis de controle ----- */
    function atualizaDados(){
        municao = listaMunicao[nivel-1];  
        erros = listaErros[nivel-1];    
        pontosAdicionais = listaPontuacao[nivel-1];   
        totalPontos = listaTotalPontos[nivel-1];
        atualizaUtilitarios(); // Atualiza os dados na tela do jogo
    }
/* ----- /Atribuí as especficações de acordo com o nível as varíaveis de controle ----- */ 

/* ----- Atualiza dados na tela do jogo ---- */
      function atualizaUtilitarios(){
        var apresentaNivel = document.getElementById("utilitariosNivel");
        var ultimoNivel = listaNivel.length - 1;
        apresentaNivel.innerHTML = "<p> Nível: "+ nivel + " / "+ listaNivel[ultimoNivel] + "</p>";

        var apresentaErros = document.getElementById("utilitariosErros");
        apresentaErros.innerHTML = "<p> Erros: "+ errosAtuais + " / "+ erros + "</p>";

        var apresentaMunicao = document.getElementById("utilitariosMunicao");
        apresentaMunicao.innerHTML = "<p> Munição: "+ municaoAtual + " / "+ municao + "</p>";
    }
/* ----- /Atualiza dados na tela do jogo ---- */

/* ----- Atualiza o valor de aparição de alvos na tela de acordo com o nível do jogo ----- */
    function atualizaVelocidade(){
        velocidade = listaVelocidade[nivel-1];
        clearInterval(atualiza_Velocidade);
        atualiza_Velocidade = setInterval(atualizaTela, velocidade);
    }
/* ----- /Atualiza o valor de aparição de alvos na tela de acordo com o nível do jogo ----- */

/* ----- Atualiza o alvo na tela ----- */
    function atualizaTela() {
        atualizaDados();
        if (iniciar == true){
            limpaTela();
            xAleatorio = sorteiaPosicaoX(largura);
            yAleatorio = sorteiaPosicaoY(altura);
            desenhaAlvo(xAleatorio, yAleatorio);
        }
        atualizaVelocidade();
    }
/* ----- /Atualiza o alvo na tela ----- */

/* ----- Verificação de acerto de alvo ----- */
    function dispara(evento){
        var x = evento.pageX - tela.offsetLeft;
        var y = evento.pageY - tela.offsetTop;

        /* ----- Verifica se o disparo acertou o alvo ----- */
            if (x > xAleatorio - raio && x < xAleatorio + raio &&
                y > yAleatorio - raio - tela.offsetTop && y < yAleatorio + raio - tela.offsetTop) {
                municaoAtual++; // adiciona uso de 1 munição
                pontuacao += pontosAdicionais; // adiciona a pontuação de acerto
                pontos.innerHTML = "<h2>"+pontuacao+" pontos</h2>"; // atualiza pontuação na tela
                atualizaUtilitarios(); // atualiza dados na tela
            } 

            else if (x > xAleatorio - (raio + 10) && x < xAleatorio + (raio + 10) &&
                    y > yAleatorio - (raio + 10) - tela.offsetTop && y < yAleatorio + (raio + 10) - tela.offsetTop) {
                municaoAtual++; // adiciona uso de 1 munição
                pontuacao += pontosAdicionais; // adiciona a pontuação de acerto
                pontos.innerHTML = "<h2>"+pontuacao+" pontos</h2>"; // atualiza pontuação na tela
                atualizaUtilitarios(); // atualiza dados na tela
            } 

            else if (x > xAleatorio - (raio + 20) && x < xAleatorio + (raio + 20) &&
                    y > yAleatorio - (raio + 20) - tela.offsetTop && y < yAleatorio + (raio + 20) - tela.offsetTop) {
                municaoAtual++; // adiciona uso de 1 munição
                pontuacao += pontosAdicionais; // adiciona a pontuação de acerto
                pontos.innerHTML = "<h2>"+pontuacao+" pontos</h2>"; // atualiza pontuação na tela
                atualizaUtilitarios(); // atualiza dados na tela
            }

            else{
                municaoAtual++; // adiciona uso de 1 munição
                errosAtuais++; // adicionar um erro ao alvo
                atualizaUtilitarios(); // atualiza dados na tela
            }
        /* ----- Verifica se acertou o alvo ----- */
    }
/* ----- /Verificação de acerto de alvo ----- */

/* ----- Verificações requisitos de nível ---- */
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
/* ----- /Verificação de requisitos de nível ---- */

/* ----- Verificação de gameOver/PróximoNível ----- */
    function verificaGeral(){
        if(nivel > 5){
            endGame();
        }

        if(((verificaMunicao()) || (verificaErros())) && (verificaTotalPontos() == false)){
            apresentaGameOver();
        }
        else if((verificaMunicao() == false) && (verificaMunicao() == false) && (verificaTotalPontos())){
            apresentaProximoNivel();
        }
    }
/* ----- Verificação de gameOver/PróximoNível ----- */

/* ----- Controle de Exibição e Ocultação dos dashboards ----- */

    /* ----- Canvas ----- */
        function apresentaCanvas() {
            verificaUsuario();
            if(contemUsuario == true){
                escondeNome();
                escondeUsuario();
                iniciar = true;
                tela.style.display = "block";
                apresentaPontuacao();
                apresentaUtilitarios();
            }else{
                apresentaNome();
            }
        }

        function escondeCanvas() {
            tela.style.display = "none";
            iniciar = false;
        }
    /* ----- /Canvas ----- */

    /* ----- GameOver ----- */
        function apresentaGameOver() {
            escondeCanvas();
            var gameOver = document.getElementById("gameOver");
            gameOver.style.display = "flex";
        }
        
        function escondeGameOver() {
            var gameOver = document.getElementById("gameOver");
            gameOver.style.display = "none";
        }
    /* ----- /GameOver ----- */   
    
    /* ----- Pontuação ----- */
        function apresentaPontuacao(){
            var pontuacao = document.getElementById("pontuacao");
            pontuacao.style.display = "flex";
        }
        
        function escondePontuacao(){
            var pontuacao = document.getElementById("pontuacao");
            pontuacao.style.display = "none";
        }
    /* ----- /Pontuação ----- */

    /* ----- Início ----- */
        function apresentaIniciar(){
            var inicio = document.getElementById("inicio");
            inicio.style.display = "flex";
        }
        
        function escondeIniciar(){
            var inicio = document.getElementById("inicio");
            inicio.style.display = "none";
        }
    /* ----- Início ----- */

    /* ----- Usuário ----- */
        function apresentaUsuario(){
            escondeIniciar();
            var usuario = document.getElementById("usuario");
            usuario.style.display = "flex";
        }
        
        function escondeUsuario(){
            var usuario = document.getElementById("usuario");
            usuario.style.display = "none";
        }
    /* ----- /Usuário ----- */

    /* ----- Insira Nome ----- */
        function apresentaNome(){
            var nome = document.getElementById("insiraNome");
            nome.style.display = "block";
        }
        
        function escondeNome(){
            var nome = document.getElementById("insiraNome");
            nome.style.display = "nome";
        }
    /* ----- /Insira Nome ----- */

    /* ----- Próximo Nível ----- */
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
    /* ----- /Próximo Nível ----- */

    /* ----- Utilitários ----- */
        function apresentaUtilitarios(){
            var utilitarios = document.getElementById("utilitarios");
            utilitarios.style.display = "flex";
            atualizaUtilitarios();
        }
        
        function escondeUtilitarios(){
            var utilitarios = document.getElementById("utilitarios");
            utilitarios.style.display = "none";
        }
    /* ----- /Utilitários ----- */

/* ----- /Controle de Exibição e Ocultação dos dashboards ----- */
    
/* ----- Verificação de usuário digitado ----- */
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
/* ----- /Verificação de usuário digitado ----- */

/* ----- Funções de apoio -----*/
    function zeraUtilitarios(){
        pontuacao = 0;
        errosAtuais = 0;
        municaoAtual = 0;
        pontos.innerHTML = "<h2>0 pontos</h2>";
    }

    function apagaInput(){
        var usuario = document.getElementById("nomeUsuario").value = ""; // zera o valor do input
    }
/* ----- /Funções de apoio -----*/

/* ----- Botões ----- */
    function reiniciarJogo(){
        zeraUtilitarios();
        atualizaUtilitarios();
        escondeGameOver();
        apresentaCanvas();
    }

    function menuPrincipal(){
        zeraUtilitarios();
        escondeGameOver();
        escondePontuacao();
        apagaInput();
        apresentaIniciar();
        nivel = 1;
    }

    function proximoNivel(){
        nivel++;
        zeraUtilitarios();
        atualizaUtilitarios();
        escondeProximoNivel();
        apresentaCanvas();
    }

    function endGame(){
        escondeCanvas();
        escondePontuacao();
        escondeUtilitarios();
        var credits = document.getElementById('credit-roll');

        function finalizarCreditos(){
            credits.style.display = "none";
            menuPrincipal();
        }

        credits.addEventListener('animationend',finalizarCreditos);

        credits.style.display = "block";
    }
/* ----- /Botões ----- */

tela.onclick = dispara;// atribui ao canvas um evento de click(mouse) que chama a função "dispara"

atualizaTela(); //chama a função de atualizar a tela
setInterval(verificaGeral, 250); // chama a função de vericação a cada 250 ms
setInterval(atualizaDados, 250); // chama a função de atualizar dados a cada 250 ms