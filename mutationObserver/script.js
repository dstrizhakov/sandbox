const header = document.getElementById('header');
const button = document.getElementById('button');

let counter = 0;

button.addEventListener('click', () => {
	counter++;
	header.innerText = counter.toString();
	const div = document.createElement('div');
	header.appendChild(div);
})

const mutationObserver = new MutationObserver((mutations) => {
	console.log(mutations);
})

mutationObserver.observe(header, {
	subtree: true,
	childList: true,
	attributeOldValue: true
})