(function(define) {
define(function() {
	
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
//necessary for buster unit tests where 'define' is undefined 
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));