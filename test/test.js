const containerElem = document.querySelector('.container');

const flashcards = [
	{
		front: 'fff1',
		back: 'bbb1'
	},
	{
		front: 'fff2',
		back: 'bbb2'
	},
	{
		front: 'fff3',
		back: 'bbb3'
	}
];

containerElem.innerHTML = `
${flashcards.map(flashcard => {
	return `
		<div class="flashcard">
			<div class="front">${flashcard.front}</div>	
			<div class="back">${flashcard.back}</div>	
		</div>	
	`;
}).join('')}
`;

const flashcardFrontElems = document.querySelectorAll('.front');
const flashcardBackElems = document.querySelectorAll('.back');
flashcardFrontElems.forEach((m, index) => {
	flashcardBackElems[index].style.display = 'none';
	m.addEventListener('click', (e) => {
		if (flashcardBackElems[index].style.display === 'none') {
			flashcardBackElems[index].style.display = 'block';
		} else {
			flashcardBackElems[index].style.display = 'none';
		}
	})
});	
