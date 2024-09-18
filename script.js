let cliquesRestantes = 12; 
let vidasRestantes = 7;     

function iniciarJogo() {
    let tamMatriz = 9;

    let botao = document.getElementById('botao');
    let jogo = document.getElementById('jogo');
    let coracoesContainer = document.getElementById('coracoes');
    let botoesControle = document.getElementById('botoes-controle');

    botao.style.display = 'none';
    jogo.style.display = 'block';
    coracoesContainer.style.display = 'flex';
    botoesControle.style.display = 'flex';

    // Limpa o contêiner de corações antes de adicionar novos corações
    coracoesContainer.innerHTML = '';

    let totalQuadrados = tamMatriz * tamMatriz;
    let quadradoCorreto = Math.floor(Math.random() * totalQuadrados);

    for (let i = 0; i < tamMatriz; i++) {
        let linha = document.createElement('div');
        linha.classList.add('linha');
        jogo.appendChild(linha);

        for (let k = 0; k < tamMatriz; k++) {
            let coluna = document.createElement('div');
            coluna.classList.add('coluna');
            coluna.dataset.index = i * tamMatriz + k;

            coluna.addEventListener('click', function() {
                if (cliquesRestantes > 0) {
                    verificarDistancia(i * tamMatriz + k, quadradoCorreto, tamMatriz);
                }
            });

            linha.appendChild(coluna);

        }
    }

    for (let i = 0; i < vidasRestantes; i++) {
        let coracao = document.createElement('div');
        coracao.classList.add('coracao');
        coracao.innerHTML = '&#9829';
        coracoesContainer.appendChild(coracao);
    }
}

function verificarDistancia(index, quadradoCorreto, tamMatriz) {
    let maxDistancia = tamMatriz * 2;
    let corretoX = quadradoCorreto % tamMatriz;
    let corretoY = Math.floor(quadradoCorreto / tamMatriz);
    let clicadoX = index % tamMatriz;
    let clicadoY = Math.floor(index / tamMatriz);

    let distancia = Math.abs(corretoX - clicadoX) + Math.abs(corretoY - clicadoY);

    let quadradoClicado = document.querySelector(`.coluna[data-index='${index}']`);

    if (distancia === 0) {
        quadradoClicado.style.backgroundColor = 'turquoise'; 
        alert('Parabéns! Você encontrou o quadrado certo!');
    } else {
        let intensidadeAzul = Math.round(255 * (1 - distancia / maxDistancia));
        quadradoClicado.style.backgroundColor = `rgb(${255 - intensidadeAzul}, 0, ${intensidadeAzul})`;
        cliquesRestantes--;  

        if (cliquesRestantes === 0 && distancia !== 0) {
            perderVida();
        }
    }
}

function perderVida() {
    if (vidasRestantes > 1) {
        alert('Você perdeu uma vida!');
        vidasRestantes--;

        let coracoes = document.querySelectorAll('.coracao');
        coracoes[vidasRestantes].remove();  

        reiniciarJogo();  
    } else {
        alert('Você perdeu todas as vidas! Fim de jogo.');
        voltarMenu();  
    }
}

function voltarMenu() {
    location.reload(); 
}

function reiniciarJogo() {
    document.getElementById('jogo').innerHTML = ''; 
    iniciarJogo();
    cliquesRestantes = 12;  
}

$(document).ready(function() {});