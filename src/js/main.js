const headerHeight = document
	.querySelector('header')
	.getBoundingClientRect().height;
const sections = document.querySelectorAll('.custom-section');
let currentSection = sections[0];
let isBlack = true;

const whiteClipOuter = document.querySelector('.white.clip-outer');
const whiteClipInner = document.querySelector('.white.clip-inner');
const blackClipOuter = document.querySelector('.black.clip-outer');
const blackClipInner = document.querySelector('.black.clip-inner');

document.addEventListener('scroll', () => {
	findCurrentSections();
	isBlack = currentSection.classList.contains('black');
	moveLogos();
});

function moveLogos() {
	let percent = (getPosition(currentSection) / headerHeight) * 100;

	if (percent < 0) percent = 0;
	if (percent > 100) percent = 100;

	offsetLogo(percent);
}

function offsetLogo(percent) {
	if (isBlack) {
		whiteClipOuter.style.transform = `translateY(${percent}%)`;
		whiteClipInner.style.transform = `translateY(-${percent}%)`;
		blackClipOuter.style.transform = `translateY(-${100 - percent}%)`;
		blackClipInner.style.transform = `translateY(${100 - percent}%)`;
	} else {
		whiteClipOuter.style.transform = `translateY(-${100 - percent}%)`;
		whiteClipInner.style.transform = `translateY(${100 - percent}%)`;
		blackClipOuter.style.transform = `translateY(${percent}%)`;
		blackClipInner.style.transform = `translateY(-${percent}%)`;
	}
}

function findCurrentSections() {
	sections.forEach((section) => {
		const position = getPosition(section);
		if (position <= headerHeight && position > 0) {
			currentSection = section;
		}
	});
}

function getPosition(section) {
	return section.getBoundingClientRect().bottom;
}
