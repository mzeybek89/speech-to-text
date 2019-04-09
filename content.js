//console.log('try trigger authorization');
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then((mediaStream) => { 
    //in promise will be triggered user permission request                
})
.catch((error) => {
   //manage error
});





var fn = function(){
	

//var iFrame  = document.createElement ("iframe");
//iFrame.src  = chrome.extension.getURL ("search.htm");
//iFrame.id = "searchIframeSpeechtoText";
//document.body.insertBefore (iFrame, document.body.firstChild)

var searchBar = '<div class="spch s2tb" id="spch" style="background-color: rgba(255, 255, 255, 0.9); display:none">\
	<button class="close-button" id="spchx" aria-label="close">×</button>\
	<div class="spchc s2ra" id="spchc" style="box-sizing: unset;">\
		<div class="inner-container">\
			<div class="button-container">\
				<span class="r8s4j" id="spchl" style="transition: -webkit-transform 0.174s ease-in-out 0s; transform: scale(0.955701);"></span>\
				<span class="button" id="spchb" >\
					<div class="microphone">\
						<span class="receiver"></span>\
						<div class="wrapper">\
							<span class="stem"></span>\
							<span class="shell" style="box-sizing: unset;"></span>\
						</div>\
					</div>\
				</span>\
			</div>\
			<div class="text-container">\
				<span class="spcht" id="spchi" style="color:#777">Şimdi konuşun</span>\
				<span class="spcht" id="spchf" style="color:#000"></span>\
			</div>\
			<!--<div class="google-logo"></div>-->\
		</div>\
		<div class="permission-bar">\
			<div class="permission-bar-gradient"></div>\
		</div>\
	</div>\
</div>\
';

$('body').append(searchBar);



try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
}


var inFocus = false;
$('input, textarea').focus(function() {
  inFocus = true;
  $(this).addClass('voiceWriteHere');
  recognition.start();
});

$('input, textarea').blur(function() {
  inFocus = false;
  $(this).removeClass('voiceWriteHere');
  recognition.stop();
});
	


var noteContent = '';


/*-----------------------------
      Voice Recognition 
------------------------------*/

// If false, the recording will stop after a few seconds of silence.
// When true, the silence period is longer (about 15 seconds),
// allowing us to keep recording even when the user pauses. 
recognition.continuous = true;
recognition.interimResults = true;
// This block is called every time the Speech APi captures a line. 

	//$('body').append("<div id='textAreaSpeech'></div>");
var r = true;
recognition.onresult = function(event) {
var final_transcript = '';

	$('#spchl').css('transform','scale('+Math.random()+')');

  // event is a SpeechRecognitionEvent object.
  // It holds all the lines we have captured so far. 
  // We only need the current one.
	var current = event.resultIndex;
  var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    //final_span.innerHTML = linebreak(final_transcript);
    //interim_span.innerHTML = linebreak(interim_transcript);
	
 
  
  //console.log(transcript);
  if(final_transcript.toLowerCase().indexOf(stopCmd)>-1)
  {
	recognition.stop();	
	$('#spch').hide();
	return false;
  }
  
  if(final_transcript.toLowerCase().indexOf("selam ver")>-1  )
  {
	recognition.stop();	
	alert("Selam Dünyalı");
	$('#spch').hide();
	return false;
	
  }
  
  
   
    if(final_transcript.toLowerCase().indexOf(key1.toLowerCase())>-1 && key1.toLowerCase()!="" )
	  {		
   
		final_transcript = val1;	
		$('.voiceWriteHere').val("");
		$('.voiceWriteHere').attr("type","password");
	  }
 

  // Add the current transcript to the contents of our Note.
  // There is a weird bug on mobile, where everything is repeated twice.
  // There is no official solution so far so we have to handle an edge case.
  var mobileRepeatBug = (current == 1 && final_transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    $('#spch').show();
    $('#spchi').html(linebreak(interim_transcript));
	//$('#spchf').html(final_transcript);
		
	
	if($('#spchi').height()==0){
		$('#spchi').removeClass('spch-5l');
		r =true;	
	}
		
	if($('#spchi').height()==96){
		$('#spchi').addClass('spch-2l');		
	}
	
	if($('#spchi').height()==128 && r){
		$('#spchi').removeClass('spch-2l')			
		$('#spchi').addClass('spch-3l');					
	}

	if($('#spchi').height()>128 && r){
		$('#spchi').removeClass('spch-3l')			
		$('#spchi').addClass('spch-5l');					
		r=false;		
	}
	

	
	
	if(final_transcript.length>0){		
		$('.voiceWriteHere').val($('.voiceWriteHere').val()+final_transcript);
		$('#spch').hide();
	}
  }
};

//recognition.start();


recognition.onstart = function() { 
  //alert('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  //alert('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    //alert('No speech was detected. Try again.');  
  };
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
	
	
};
/*fn function bitti*/


var stopCmd= "Duraklat";
chrome.runtime.sendMessage({type: "stopCmd"}, function(response) {		
	if (typeof response.stopCmd != "undefined")
	{		
		stopCmd = response.stopCmd;
	}
	
	stopCmd = stopCmd.toLowerCase();
    return;
});


var key1= "";
chrome.runtime.sendMessage({type: "key1"}, function(response) {		
	if (typeof response.key1 != "undefined")
	{		
		key1 = response.key1;
	}
	
	key1 = key1.toLowerCase();
    return;
});


var val1= "";
chrome.runtime.sendMessage({type: "val1"}, function(response) {		
	if (typeof response.val1 != "undefined")
	{		
		val1 = response.val1;
	}
	
	val1 = val1;
    return;
});



chrome.runtime.sendMessage({type: "status"}, function(response) {	

    if(response.status == 0) 
	{		
	}
	else{		
		fn();
	}
    return;
});




