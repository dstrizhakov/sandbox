/* 
?EVENT LOOP не является частью JavaScript, движков, таких как V8.
!EVENT LOOP это отдельный механизм который подволяет использовать
!неблокирующую модель ввода-вывода. Он предоставляется средой (браузер, node js)
EVENT LOOP в браузерах работает по следующему алгоритму:
1) сначала выполняется синхронный код (задачи);
!Задачи из очереди выполняются только после вызова всех функций из стека.
2) выполняются все микротаски (Promises, queueMicrotask, mutationObserver)
3) Выполняется ОДНА макротаска.
3а) Если вополненная макротаска порождает MICROTASK то переходим на пункт 2
3б) Если очередь MICROTASK пуста выполняем следующий MACROTASK те пункт 3
4) посторяем пока не закончатся макротаски...
Макротаски попадают через Call stack в очередь макротасков через WebAPI.
*/

// Пример 1
function first() {
	console.log('first')
}
function second() {
	console.log('second')
	first()
}
function third() {
	console.log('third')
	second();
}

third();

//порядок попадания в Call stack third()->second()->first()
//порядок выполнения first()->second()->third()

//Пример 2
function factorial(n) {
	if (n < 2) {
		return 1
	}
	return n * factorial(n - 1)
}
factorial(5);

//порядок попадания в Call stack factorial(5)->factorial(4)->factorial(3)->factorial(2)->factorial(1)
//порядок выполнения factorial(1)->factorial(2)->factorial(3)->factorial(4)->factorial(5)

// рекурсивное решение может вызывать переполнение Call stack
// чтобы переполнения не было можно переписать так

function factorial(n) {
	let result = 1;
	for (let i = n; i > 1; i--) {
		result *= i;
	}
	return result;
}

factorial(1000000);

//Пример 3
function log(value) {
	console.log(value)
}
log('start');
setTimeout(() => { log('timeout') }, 3000);
log('end');

/* Порядок выполенения:
 1) start
 2) end
 3) timeout
 */