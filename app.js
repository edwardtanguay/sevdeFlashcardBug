const addButton = document.querySelector('#add-button')
const frontText = document.querySelector('#front-word')
const backText = document.querySelector('#back-word')
const currentEl = document.getElementById('current');
const containerElem = document.querySelector('.cards-container')
const buttonLeftElem = document.querySelector('.buttonLeft');
const buttonRightElem = document.querySelector('.buttonRight');
const clearBtn = document.querySelector('#clear')

let currentCardIndex = 0;
const cards = []

//document.addEventListener("DOMContentLoaded", loadAllCardsToUI);

//direction buttons--------------------------------------------------------
buttonRightElem.addEventListener('click', function (e) {

	currentCardIndex++;

	if (currentCardIndex > cards.length - 1) {
		currentCardIndex = cards.length - 1;
	}

	containerElem.children[currentCardIndex].classList.add('show')
	containerElem.children[currentCardIndex - 1].classList.remove('show')

	updateCurrentIndex();

});

buttonLeftElem.addEventListener('click', function (e) {
	currentCardIndex--;

	if (currentCardIndex < 1) {
		currentCardIndex = 0;
	}

	containerElem.children[currentCardIndex + 1].classList.remove('show')
	containerElem.children[currentCardIndex].classList.add('show')


	updateCurrentIndex();

});

function updateCurrentIndex() {
	currentEl.innerHTML = `${currentCardIndex + 1}/${cards.length} `
}

function displayCards(cards) {
	const elem = document.createElement('div')
	elem.className = 'inner-card'
	cards.forEach((card) => {
		elem.innerHTML = `
        <div class="card-front ">
          <p>
            ${card.front}
          </p>
        </div>
        <div class="card-back none">
          <p>
            ${card.back}
          </p>
        </div>
        `;
		containerElem.appendChild(elem)
		containerElem.children[0].className = 'inner-card show'
		if (cards.length > 1 && currentCardIndex > 0) {
			containerElem.children[0].className = 'inner-card'
		}
		const frontCards = document.querySelectorAll('.card-front')
		const backCards = document.querySelectorAll('.card-back')
		const innerCard = document.getElementsByClassName('inner-card')

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

	});
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