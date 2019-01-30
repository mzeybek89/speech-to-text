var setLayout = function(){

chrome.tabs.getSelected(null, function(tab) {
				tabId = tab.id;

				// send a request to the background page to store a new tabId
				chrome.runtime.sendMessage({type:"new tabid", tabid:tabId});
			});





	 document.getElementById('toggle_button').onclick = function () {       
	
		var val = document.getElementById('toggle_button').value
				
		if(val.trim()=="Refresh")
		{
			chrome.runtime.sendMessage({type:"refresh"});
			
			 if(localStorage.status == 1){
				 document.getElementById('toggle_button').value = "Disable" ;
				 chrome.browserAction.setIcon({path:  "ico.png"});
			 }
			 else{
				 document.getElementById('toggle_button').value = "Enable" ;
				 chrome.browserAction.setIcon({path:  "ico_disabled.png"});
			 }
			
			return false;

		}
	
        toggle(localStorage.status);
    };


 if(!localStorage.status) localStorage['status'] = 1;
	toggle(2);
	function toggle(n){
		if((n == 0) ){
			document.getElementById('toggle_button').value = "Refresh" ;
			//chrome.browserAction.setIcon({path:  "ico.png"});
			localStorage.status = 1;
		}else if((n == 1) ){
			document.getElementById('toggle_button').value = "Refresh" ;
			//chrome.browserAction.setIcon({path:  "ico_disabled.png"});
			localStorage.status = 0;
		}else if((n == 2) ){
			 var enabled = localStorage.status;
			 if(localStorage.status == 1){
				 document.getElementById('toggle_button').value = "Disable" ;
				 chrome.browserAction.setIcon({path:  "ico.png"});
			 }
			 else{
				 document.getElementById('toggle_button').value = "Enable" ;
				 chrome.browserAction.setIcon({path:  "ico_disabled.png"});
			 }
					
		}else{
			return;
		}
		
		//alert(localStorage.status);
	}



};

document.addEventListener('DOMContentLoaded', setLayout, false);

