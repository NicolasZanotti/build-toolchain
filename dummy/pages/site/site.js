// Test the usage of a Marko template included in the site-wide script.
var input = require('../../components/basic-input');
input.render({
	label: 'Input'
}).then(function(result) {
	result.appendTo(document.body);
});
