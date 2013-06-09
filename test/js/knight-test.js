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
		},
		'should throw exception if quest is undefined': function(){
			//call knight constructor without passing in a quest
			var k = new knight()
			
			this.spy(k, "embarkOnQuest");
			//Expect to throw TypeError
			try{
				k.embarkOnQuest();	
			}
			catch(e){
			}

			assert.threw(k.embarkOnQuest, 'TypeError')
		}
	});

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

