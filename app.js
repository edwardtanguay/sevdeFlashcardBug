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

function displayCards(cards) {
	containerElem.innerHTML = '<div class="card">';
	cards.forEach((card) => {
		containerElem.innerHTML += `
<div class="card-front">
	<p>${card.front}</p>
</div>
<div class="card-back none">
	<p>${card.back}</p>
</div>
`;
	});
	containerElem.innerHTML += '</div>';
	const frontCards = document.querySelectorAll('.card-front')
	const backCards = document.querySelectorAll('.card-back')

	frontCards.forEach(frontCard => {
		frontCard.addEventListener('click', function (e) {
			frontCard.classList.add('none')
			backCards[currentCardIndex].classList.remove('none')
		});
	});

	backCards.forEach(backCard => {
		backCard.addEventListener('click', function (e) {
			backCard.classList.add('none')
			frontCards[currentCardIndex].classList.remove('none')
		});
	});

	currentEl.innerHTML = `${currentCardIndex + 1}/${cards.length} `
};


addButton.addEventListener('click', function (e) {
	cards.push({
		front: frontText.value,
		back: backText.value,
	});

	displayCards(cards);
	updateCurrentIndex();
	//addCardsToStorage(cards)
	frontText.value = ''
	backText.value = ''
});

/*
function getCardsFromStorage() {
  let words;
  if (localStorage.getItem("cards") === null) {
	words = [];
  } else {
	words = JSON.parse(localStorage.getItem("cards"));
  }
  return words;
}

function addCardsToStorage(cards) {
  let words = getCardsFromStorage();
  words.push(cards);
  localStorage.setItem("cards", JSON.stringify(words));
}

//add card from local storage to ui-----------------------
function loadAllCardsToUI() {
  let words = getCardsFromStorage();
  console.log(words[words.length - 1]);
  displayCards(words[words.length - 1]);
}
*/

clearBtn.addEventListener('click', () => {
	localStorage.clear();
	containerElem.innerHTML = '';
	window.location.reload();
});