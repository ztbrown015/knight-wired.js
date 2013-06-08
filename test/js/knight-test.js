(function(define) {
define(function() {

	var buster, knight;

	buster = require('buster');
	knight = require('../../js/knight');

	buster.testCase('js/knight', {
		'should call quest embark method when knight calls embarkOnQuest': function() {
			var quest = {embark : function(){}}
			this.stub(quest, "embark");	
			var k = new knight(quest)
        	k.embarkOnQuest();
        	assert.calledOnce(quest.embark);
		}
	});

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

