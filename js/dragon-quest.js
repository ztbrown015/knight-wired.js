define([], function() {
	
	function SlayDragonQuest(messageNode, message) {
    this._messageNode = messageNode;
    this._message = message;
	}
	
	SlayDragonQuest.prototype = {
	  embark: function() {
	    this._messageNode.innerHTML = this._message;
	  }
	};
	
	return SlayDragonQuest;

});