//jogo do Dinossauro exibido no navegador (???) quando o computador não está conectado a internet. O dinossauro deve pular os cactos, ou perde.
const dino = document.querySelector('.dino'); //API(css e html)
const background = document.querySelector('.background'); //API(css e html)

let isJumping = false; //isJump é falso por padrão, será verdadeiro quando executada a função jump abaixo
let isGameOver = false; //isGameOver é falso por padrão, será verdadeiro quando executada a função createCactus abaixo
let position = 0; //a posição do dinossauro inicia em 0

function handleKeyUp(event) { //Ativando o salto atraves da função jump abaixo, usando o espaço
    if (event.keyCode === 32) { //espaç é o caractere 32
        if (!isJumping) { //se não estiver pulando...
            jump(); //...pule
        }
    }
} 

function jump() { //função que fará com que o dinossauro pule
    isJumping = true; //isJump é verdadeiro quando a função jump é executada

    let upInterval = setInterval(() => { //para fazer a animação. Cria uma repetição em determinado intervalo
        if (position >= 150) { //se a posição do dinossauro for maior ou igual a 150 px...
            clearInterval(upInterval); //...parar de subir

            let downInterval = setInterval(() => { //para fazer ele descer
                if (position <= 0) { ///para descer a 0...
                    clearInterval(downInterval); //para de descer se chegar a 0
                    isJumping = false; //...e não está pulando mais, a função pode ser ativada novamente
                } else {
                    position -= 20; // pega o valor da posição e subtrai 20 a ca 20 m de s, até 0 px
                    dino.style.bottom = position + 'px';
                }
            }, 20); 
        } else {
            position += 20; //pega o valor da posição e adiciona 20 a cada 20 m de seg, aumentando a posição até 150 px
            dino.style.bottom = position + 'px';
        }
    }, 20); //o código será executado repetidamente a cada 20 milisegundos
}

function createCactus() {
    const cactus = document.createElement('div'); //html
    let cactusPosition = 1000; //???
    let randomTime = Math.random() * 6000; //faz com que os cactos apareçam aleatoriamente

    if (isGameOver) return; //se o jogo acabou retorne ??

    cactus.classList.add('cactus'); //css
    background.appendChild(cactus); //cria classe filho
    cactus.style.left = cactusPosition + 'px';

    let leftTimer = setInterval(() => { //faz com que o cactus apareça mais de uma vez
        if (cactusPosition < -60) { //se sair totalmente da tela
            clearInterval(leftTimer); //limpar o intervalo
            background.removeChild(cactus); //remove o elemento filho cactus
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //se a posição do caco estiver estiver entre 1 e 59 e a do dinossauro abaixo de 60(usamos 60 pois é a largura do dinossauro)
            clearInterval(leftTimer); //limpe o intervalo da esquerda e...
            isGameOver = true; //...o jogo acabou, pois o dinossauro não pulou o cacto
            document.body.innerHTML = '<h1 class="game-over">Game Over!</h1>'; //html, retorna Game Over!
        }else {
            cactusPosition -= 10; //velocidade que se move para a esquerda
            cactus.style.left = cactusPosition + 'px'; //faz com que se mova
        }
    }, 20); //executado repetidamente a cad 20
    setTimeout(createCactus, randomTime); //executa a função createCactus após um tempo aleatório (randomTime), utiliza recursividade
}

createCactus(); //assim que o jogo começar o cacto já será criado
document.addEventListener('keyup', handleKeyUp); //quando ativado keyup,