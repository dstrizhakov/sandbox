// Интересный пример поясняющий особенность работы event loop:
// Макрозадача setTimeout никогда не выполнится из-за того
// что очередь микротасков будет постоянно заполнена рекурсивной функцией
// а микротаски как известно выполняются перед макротасками...

function recursivePromise(promise) {
	return promise.then(() => {
		console.log('Promise 1')
		recursivePromise(Promise.resolve())
	})
}

recursivePromise(Promise.resolve());

setTimeout(() => console.log('I will never fulfill!'), 0)