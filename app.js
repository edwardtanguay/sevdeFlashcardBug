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
	displayCards(cards);
});

// CLEAR BUTTON
clearBtn.addEventListener('click', () => {
	localStorage.clear();
	containerElem.innerHTML = '';
	window.location.reload();
});

// DISPLAY CARDS
function displayCards(cards) {
	containerElem.innerHTML = '<div class="card">';
	containerElem.innerHTML += 'okok';
// 	cards.forEach((card) => {
// 		containerElem.innerHTML += `
// <div class="card-front">
// 	<p>${card.front}</p>
// </div>
// <div class="card-back none">
// 	<p>${card.back}</p>
// </div>
// `;
// 	});
	containerElem.innerHTML += '</div>';
	const frontCards = document.querySelectorAll('.card-front')
	const backCards = document.querySelectorAll('.card-back')

	frontCards.forEach((frontCard, index) => {
		frontCard.addEventListener('click', (e) => {
			frontCard.classList.add('none');
			backCards[index].classList.remove('none');
		});
	});

	backCards.forEach((backCard,index) => {
		backCard.addEventListener('click', (e) => {
			backCard.classList.add('none');
			frontCards[currentCardIndex].classList.remove('none');
		});
	});

	currentEl.innerHTML = `${currentCardIndex + 1}/${cards.length} `
};