const cards = document.querySelectorAll('.cards-medium');

function flipCard() {
   this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));