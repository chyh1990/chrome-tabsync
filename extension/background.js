var pollInterval = 1000 * 2; // 1 minute
var REMOTE = 'http://10.0.0.2:4567/posttab'
var timerId;
var urls = [];

function hasupdate(oldurl, newurl){
	if(oldurl.length != newurl.length)
		return true;
	var thesame = true;
	$.each(oldurl, function(i,e){
		if(e != newurl[i]){
			thesame = false;
			return false;
		}
	});
	return !thesame;
}

function sendAllTabs(){
	window.setTimeout(function(){
	chrome.tabs.query({}, function(tabs){
		$.post(REMOTE, {tabs: tabs, id: 'ffff'}, function(data, status){
	});
	});
	}, 300);

}

function startRequest() {
	chrome.tabs.query({}, function(tabs) {
		//console.log(tabs);
		var newurls = []
		$.each(tabs, function(i,e){
			newurls.push(e.url);
		});
		if(hasupdate(urls, newurls)){
			console.log("shouldUpdate");
		$.post(REMOTE, {tabs: tabs, id: 'ffff'}, function(data, status){
			//console.log(data);
		});
		urls = newurls;
		}
	});
	timerId = window.setTimeout(startRequest, pollInterval);
}

function stopRequest() {
	  window.clearTimeout(timerId);
}

$(function(){
	//startRequest();
	chrome.tabs.onCreated.addListener(function(){sendAllTabs()});	
	chrome.tabs.onUpdated.addListener(function(){sendAllTabs()});	
	chrome.tabs.onMoved.addListener(function(){sendAllTabs()});	
	chrome.tabs.onRemoved.addListener(function(){sendAllTabs()});	
	chrome.tabs.onReplaced.addListener(function(){sendAllTabs()});	
});

