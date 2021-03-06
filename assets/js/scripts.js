const cards = document.querySelectorAll('.cards');

let matchCount = 0;
let gameOver = false;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameStart = false;

/*-------------------Flip cards-------------------*/

function flipCard() {
    if (lockBoard == true || gameStart == false) return;
    if (this === firstCard) return;

   this.classList.toggle('flip');

   if(!hasFlippedCard) {
       hasFlippedCard = true;
       firstCard = this;

       return;
   } 

    secondCard = this;
       checkForMatch();
}

/*-------------------Check if cards match-------------------*/

function checkForMatch(){
    let isMatch = firstCard.dataset.name === secondCard.dataset.name

    isMatch ? disableCards() : unflipCards();
    }

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchCount++;
    if (matchCount === 6){
        setTimeout(() => {
            gameOver = true;
        }, 1000);
    }
    
    resetBoard();
}

/*-------------------Unmatched cards unflip-------------------*/

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

/*-------------------Reset Board-------------------*/

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/*-------------------Shuffle Cards-------------------*/

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function refreshPage() {
  window.location.reload();
}

/*-------------------Refresh Page Buttons-------------------*/

$('#closeBtn').click(function(){
    location.reload();
});

$('#closeBtn2').click(function(){
    location.reload();
});

/*-------------------Start Game / Timer--------------------*/

$('.start').click(function() {
    gameStart = true;
    var seconds = document.getElementById("countdown").textContent;
    var countdown = setInterval(function(){
        seconds--;
        (seconds == 1) ? document.getElementById("plural").textContent = "" : document.getElementById("plural").textContent = "s";
        document.getElementById("countdown").textContent = seconds;
        if (seconds === 0){
            $('#myModal').modal();
            clearInterval(countdown);
        };
        if (gameOver === true){
            $('#winModal').modal();
            clearInterval(countdown);
        };
        if (seconds <= 0) clearInterval(countdown);
    },1000);
});
