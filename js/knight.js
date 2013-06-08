(function(define) {
define(function() {
	
	function Knight(quest) {
	  this._quest = quest;
	}
	
	Knight.prototype = {
	  embarkOnQuest: function() {
	    this._quest.embark();
	  }
	};
	
	return Knight;

});
//necessary for buster unit tests where 'define' is undefined 
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));