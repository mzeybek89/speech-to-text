var tabId = null;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	  // maintaining state in the background


	  //alert(localStorage.status)
    if (request.type == "status") sendResponse({status: localStorage.status});
	
	
	// if this is a store request, save the tabid
        if(request.type == "new tabid") {
            tabId = request.tabid;
        }

        // if this is a refresh request, refresh the tab if it has been set
        else if(request.type == "refresh" && tabId !== null) {
            chrome.tabs.reload(tabId);
        }
	
	
	 if (request.type == "stopCmd") sendResponse({stopCmd: localStorage.stopCmd});
	 
	 if (request.type == "key1") sendResponse({key1: localStorage.key1});
	 if (request.type == "val1") sendResponse({val1: localStorage.val1});
	
});




