// Test the usage of transpiled ES6 classes
var RandomNumber = require('../../components/random-number.es6');
var randomNumber = new RandomNumber();
document.body.appendChild(
	randomNumber.render()
);

// Test the usage of Marko templates from a separate file.
var button = require('../../components/basic-button');
button.render({
	label: 'Button'
}).then(function(result) {
	result.appendTo(document.body);
});
