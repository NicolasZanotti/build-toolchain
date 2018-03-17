module.exports = class RandomNumber {
	construct() {
		console.log('Random constucted');
	}

	render() {
		var fragment = document.createDocumentFragment();
		var div = document.createElement('div');
		div.classList.add('random');
		div.textContent = Math.random();
		fragment.appendChild(div);

		return fragment;
	}
}
