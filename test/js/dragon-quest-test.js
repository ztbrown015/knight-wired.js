(function(define) {
define(function() {

	var buster, quest;

	buster = require('buster');
	quest = require('../../js/dragon-quest');

	buster.testCase('js/dragon-quest', {

		'should set the innerHTML of message node to supplied message': function() {
			var message, messageNode;

			messageNode = {};
			message = "this is the message";
			
			var q = new quest(messageNode, message);
        	q.embark();
        	assert.equals(messageNode.innerHTML, message);
		}
	});

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

