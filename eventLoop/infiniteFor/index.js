// Интересный пример поясняющий особенность работы event loop:
// Промис никогда не выполнится из-за того
// что очередь call stack будет постоянно заполнена циклом for...

for (let i = 0; i < Infinity; i++) {
	console.log(i);
	Promise.resolve().then(() => console.log('I will never fulfill!'))
}