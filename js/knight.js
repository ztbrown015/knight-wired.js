define([], function() {
	
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