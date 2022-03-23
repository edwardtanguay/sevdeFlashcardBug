// HTML ELEMENT VARIABLES
const addButton = document.querySelector('#add-button')
const frontText = document.querySelector('#front-word')
const backText = document.querySelector('#back-word')
const currentEl = document.getElementById('current');
const containerElem = document.querySelector('.cards-container')
const buttonLeftElem = document.querySelector('.buttonLeft');
const buttonRightElem = document.querySelector('.buttonRight');
const clearBtn = document.querySelector('#clear')

// GLOBAL VARIABLES
let currentCardIndex = 0;
const cards = []

// RIGHT BUTTON
buttonRightElem.addEventListener('click', function (e) {
	currentCardIndex++;
	if (currentCardIndex > cards.length - 1) {
		currentCardIndex = cards.length - 1;
	}
	displayCards();
});

// LEFT BUTTON
buttonLeftElem.addEventListener('click', function (e) {
	currentCardIndex--;
	if (currentCardIndex < 1) {
		currentCardIndex = 0;
	}
	displayCards();
});

// ADD BUTTON
addButton.addEventListener('click', function (e) {
	cards.push({
		front: frontText.value,
		back: backText.value,
	});
	displayCards();
	frontText.value = '';
	backText.value = '';
});

// CLEAR BUTTON
clearBtn.addEventListener('click', () => {
	localStorage.clear();
	containerElem.innerHTML = '';
	window.location.reload();
});

// DISPLAY CARDS
function displayCards() {

	// add all cards into container
	containerElem.innerHTML = `
	${cards.map((card) => {
		return `
<div class="card">
	<div class="card-front">
		<p>${card.front}</p>
	</div>
	<div class="card-back none">
		<p>${card.back}</p>
	</div>
</div>	
`;
	}).join('')}
`;

	// add event handlers to front and back of cards
	const frontCardElems = document.querySelectorAll('.card-front')
	const backCardElems = document.querySelectorAll('.card-back')
	frontCardElems.forEach((frontCard, index) => {
		frontCard.addEventListener('click', (e) => {
			frontCard.classList.add('none');
			backCardElems[index].classList.remove('none');
		});
	});
	backCardElems.forEach((backCard, index) => {
		backCard.addEventListener('click', (e) => {
			backCard.classList.add('none');
			frontCardElems[currentCardIndex].classList.remove('none');
		});
	});

	// hide all cards except current card
	const cardElems = document.querySelectorAll('.card');
	cardElems.forEach(cardElem => cardElem.style.display = 'none');
	Array.from(cardElems)[currentCardIndex].style.display = 'block';

	currentEl.innerHTML = `${currentCardIndex + 1}/${cards.length} `
};