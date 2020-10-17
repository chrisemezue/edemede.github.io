$(document).ready(function(){
	
	if($(window).width() < 600){
		$('#write').prop('readonly', true);
		//console.log("Less than 360");
		$("#tab-btn").replaceWith('<button type="button" class="tab btn btn-outline-secondary" id="tab-btn"><img src="images/tab.png"></button>');
		$("#del-btn").replaceWith('<button type="button" class="delete lastitem btn btn-outline-secondary" id="del-btn"><img src="images/del.png"></button>');
		$("#caps-btn").replaceWith('<button type="button" class="capslock btn btn-outline-secondary" id="caps-btn"><img src="images/caps.png"></button>');
		$("#return-btn").replaceWith('<button type="button" class="return lastitem btn btn-outline-secondary" id="return-btn"><img src="images/return.png"></button>');
		$("#shift-btn").replaceWith('<button type="button" class="left-shift btn btn-outline-secondary" id="shift-btn"><img src="images/shift.png"></button>');
		$("#rshift-btn").replaceWith(' <button type="button" class="right-shift lastitem btn btn-outline-secondary" id="rshift-btn"><img src="images/rshift.png"></button>');
		
	}
});

jQuery.get('essentials/ig-vocab.txt', function(data) {
$(function(){
	
	//Constants for suggestion box
	const lines = data.replace(/(\r\n|\n|\r)/gm," ").split(" ");
	//alert(lines.length);
		
	var words = lines.join(' ');
	var toEnd = false;
	var strCompare=''
	var sArray='<div id="suggestions">';
	
	
	//var $write = $('#write'),
		var shift = false,
		capslock = false;
		keyCapsLock=false;
		
		var toCheck=false;
		
		var prevStart =$("#write").val.length ;
		var prevEnd =$("#write").val.length ;
		//var startPosition = prevStart;
		//var endPosition = prevEnd;
		var xTriggered =0;
		var countA=0,countE=0,countI=0,countO=0,countU=0;
		
		let showSuggestions = function(item,index){
	
	sArray +='<button type="button" class="suggestBtn letter btn btn-outline-secondary">'+item+'</button>';
	
		}
		let compare = function(word,dict){
	var occurences = dict.filter(x => x.startsWith(word)) ;
	//alert(sArray);
	//alert(occurences);
	if(occurences.length!=0){
		var newOccurence=[];
		for(var i=0;i<8;i++){
			var rand = occurences[Math.floor(Math.random() * occurences.length)]
				newOccurence.push(rand);
		}
		
		newOccurence.forEach(showSuggestions);
		//alert(sArray);	
		//$("#suggestions").val("");
		//$("#suggestions").html("");
		//$("#suggestions").val(sArray);
		//$("#suggestions").html(sArray);
	
		$("#suggestions").replaceWith(sArray+'</div>');
		
		sArray='<div id="suggestions">';
		
		
	}
	
	
}
		let updateContent = function(new_content, is_clear=false,val=1) {
			if (is_clear) {
		$("#write").val("");
		$("#write").html("");
		$("#write").val(new_content);
		$("#write").html(new_content);
			
			}
		else{
		//	$("#write").val($("#write").val() + new_content);
		//$("#write").html($("#write").html() + new_content);
		$("#write").val(new_content);
		$("#write").html(new_content);
		prevStart=prevStart + val;
		prevEnd=prevEnd + val;
		}
		}
		let decodeEntity = function(encodedId,caps=false) {
		  var diac = document.getElementById(encodedId);
		  //textArea.innerHTML = encodedString;
		  var diacVal = (caps==true)? diac.innerHTML.toUpperCase(): diac.innerHTML;
		  return diacVal; 
		}
		
		document.getElementById("write").addEventListener("click",function(){
		//console.log("A CLICK HAS BEEN MADE");
		var textArea = document.getElementById("write");
		//startPosition = textArea.selectionStart;
		//endPosition = textArea.selectionEnd;
		//alert("A CLICK HAS BEEN MADE");
		prevStart = textArea.selectionStart;
		prevEnd = textArea.selectionEnd;
		//prevStart = startPosition;
		//prevEnd = endPosition;
		strCompare='';
		
		
		
		},false);
		
	$( "#write" ).keyup(function(event){
		if (event.which==20){
			keyCapsLock = (keyCapsLock==false)? true: false;
			
		}
		
		
	});	
	$( "#write" ).keydown(function(e){
		strCompare='';
		toCheck=true;
		//Get area selection
		var KtextArea = document.getElementById("write");
		
		//KstartPosition = KtextArea.selectionStart;
		KstartPosition=prevStart;
		KendPosition=prevEnd;
		//KendPosition = KtextArea.selectionEnd;
		//console.log("start is "+KstartPosition);
		//console.log("end is "+KendPosition);
		let Kcontent = $("#write").val();
		
	if (KstartPosition==KendPosition){
		
		var KfirstContent = Kcontent.substr(0,KstartPosition);
		var KsecondContent = Kcontent.substr(KstartPosition,Kcontent.length);
	}
	else{
		var KfirstContent = Kcontent.substr(0,KstartPosition);
		var KsecondContent = Kcontent.substr(KendPosition,Kcontent.length);	
		
	}
	let KCharacter = '';
	//if (e.which=73){e.preventDefault();}
  if ( e.shiftKey ) {
	  if (toCheck){
			//UPDATE PREV_START AND PREV_END
	var textArea = document.getElementById("write");
		//startPosition = textArea.selectionStart;
		//endPosition = textArea.selectionEnd;
		//alert("A CLICK HAS BEEN MADE");
		prevStart = textArea.selectionStart;
		prevEnd = textArea.selectionEnd;
		//prevStart = startPosition;
		//prevEnd = endPosition;
	console.log(prevStart);
	console.log(prevEnd);
		
			toCheck=false;
		}
	 // console.log("prev start after shift: "+prevStart);
	  //console.log("prev end after shift: "+prevEnd);
	  //countA=0;
   // console.log('Shift key has been pressed');
	 //FOR A
	 if (e.which==65){
		 
		 
		 countA++;
		 console.log(countA);
		 if (countA==1){
			  //KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-dot',keyCapsLock);}
		 else if (countA%3==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-acute',keyCapsLock);
			 }
		 else if (countA%3==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-grave',keyCapsLock);
			 }
		else if (countA>3 & countA%3==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-dot',keyCapsLock);}
		 
	 }
	 else{countA=0;}
	 
	 //FOR E
	if (e.which==69){
		countE++;
		 //console.log(countA);
		 if (countE==1){
			  //KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-dot',keyCapsLock);}
		 else if (countE%3==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-acute',keyCapsLock);
			 }
		 else if (countE%3==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-grave',keyCapsLock);
			 }
		else if (countE>3 & countE%3==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-dot',keyCapsLock);}
		
	}
	else{countE=0;}
		
	 //FOR I
	 if (e.which==73){
		 countI++;
		 //console.log(countA);
		 if (countI==1){
			  //KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('i-dot',keyCapsLock);}
		 else if (countI%3==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('i-acute',keyCapsLock);
			 }
		 else if (countI%3==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('i-grave',keyCapsLock);
			 }
		else if (countI>3 & countI%3==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('i-dot',keyCapsLock);}
		 
	 }
	 else{countI=0;}
	  
	 //FOR O
	 if (e.which==79){
		  countO++;
		 //console.log(countA);
		 if (countO==1){
			  //KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-dot',keyCapsLock);}
		 else if (countO%3==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-acute',keyCapsLock);
			 }
		 else if (countO%3==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-grave',keyCapsLock);
			 }
		else if (countO>3 & countO%3==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-dot',keyCapsLock);}
	 }
	 else{countO=0;}
	 
	 //FOR U
	 if (e.which==85){
		  countU++;
		 //console.log(countA);
		 if (countU==1){
			  //KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-dot',keyCapsLock);}
		 else if (countU%3==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-acute',keyCapsLock);
			 }
		 else if (countU%3==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-grave',keyCapsLock);
			 }
		else if (countU>3 & countU%3==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-dot',keyCapsLock);}
	 }
	 else{countU=0;}
		 
	//console.log("writing character");
	
  }
  //countA=0;
  //if KCharacter is not empty, updateContent, else do nothing
  if (KCharacter!=''){
  updateContent(KfirstContent+KCharacter+KsecondContent);
  }
	//console.log("first content: "+KfirstContent);
	//console.log("char: "+KCharacter);
	//console.log("2nd char: "+KsecondContent);
  //xTriggered++;
  //console.log("Handler for .keypress() called " + xTriggered + " time(s).");
  //console.log(e.which);

});
	$('#keyboard button').click(function(){
		//alert("Button clicked");
		if (toCheck){
			//UPDATE PREV_START AND PREV_END
	var textArea = document.getElementById("write");
		//startPosition = textArea.selectionStart;
		//endPosition = textArea.selectionEnd;
		//alert("A CLICK HAS BEEN MADE");
		prevStart = textArea.selectionStart;
		prevEnd = textArea.selectionEnd;
		//prevStart = startPosition;
		//prevEnd = endPosition;
	console.log(prevStart);
	console.log(prevEnd);
		
			toCheck=false;
		}
		//var textArea = document.getElementById("write")
		startPosition = prevStart;
		endPosition = prevEnd;
		
		
		//inittiate previous end and startPosition
		//when a new end and start position are taken, save them 
		//use them until there is another click event
		
		//console.log("button clicked");
		//console.log(startPosition);
		//console.log(endPosition);
		let content = $("#write").val();
	if (startPosition==endPosition){
		var firstContent = content.substr(0,startPosition);
		var secondContent = content.substr(startPosition,content.length);
	}
	else{
		var firstContent = content.substr(0,startPosition);
		var secondContent = content.substr(endPosition,content.length);	
		prevEnd=prevStart;
	}
	
		//document.getElementById("write").innerHTML = document.getElementById("write").value;
		//var $write = document.getElementById("write")
		//alert($write.value);
		var $this = $(this),
			character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
			//console.log(character);
		// Shift keys
		if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
			$('.letter').toggleClass('uppercase');
			$('.igletter').toggleClass('uppercase');
			$('.symbol span').toggle();
			
			shift = (shift === true) ? false : true;
			capslock = false;
			//console.log("shift");
			return;
		}
		
		// Caps lock
		if ($this.hasClass('capslock')) {
			$('.letter').toggleClass('uppercase');
			$('.igletter').toggleClass('uppercase');
			capslock = true;
			//console.log("caps");
			return;
		}
		
		// Delete
		if ($this.hasClass('delete')) {
			//var html = document.getElementById("write").value;
			//var html = $write.value;
			///console.log(html);
			//alert(html.substr(0, html.length - 1));
			
			//$write.html(html.substr(0, html.length - 1));
			
			let content_after_deleting = '';
			// get the whole string - it is content variable already
			//get curson position in the string - position 6 or 4 or 9
			// divide the string into two parts from that cursor position
			//store the two seperated strings into two variables
			//for the fist variable, use substring function to remove the last string
			//then join the two strings back together and save into content_after_deleting
			if (startPosition==endPosition){
			content_after_deleting = firstContent.substr(0,firstContent.length-1) + secondContent;
			prevStart=prevStart-1;
			prevEnd=prevEnd - 1;
			}
			else{
				content_after_deleting = firstContent.substr(0,firstContent.length) + secondContent;
				//prevStart = prevStart - (endPosition-startPosition);
				prevStart = startPosition;
				prevEnd = prevStart;
			}
			updateContent(content_after_deleting, true);
			//$write.innerHTML = html.substr(0, html.length - 1);
			//console.log("delete");
			return;
		}
		
		// Special characters
		if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
		if ($this.hasClass('space')) character = ' ';
		if ($this.hasClass('tab')) character = "\t";
		if ($this.hasClass('return')) character = "\n";
		
		// Uppercase letter
		if ($this.hasClass('uppercase')) character = character.toUpperCase();
		
		// Remove shift once a key is clicked.
		if (shift === true) {
			$('.symbol span').toggle();
			if (capslock === false){ 
			$('.letter').toggleClass('uppercase');
			$('.igletter').toggleClass('uppercase');
			}
			shift = false;
		}

		
		//CODE FOR SUGGESTION BOX
		toEnd=false;
	if ($this.hasClass('delete') || $this.hasClass('space') ||$this.hasClass('tab')|| $this.hasClass('return')|| $this.hasClass('left-shift')|| $this.hasClass('right-shift') )
	{
		if ($this.hasClass('delete') ){
		strCompare = strCompare.substr(0,strCompare.length -1)
		console.log("after deletion: "+strCompare);
	}
	else{
		//console.log("Has class");
		toEnd=true;
		strCompare='';
	}
	}
	
	else{
		strCompare+=character;
		
	}
	if (!toEnd){
		
		compare(strCompare,lines);
		
	}
$(".suggestBtn").click(function(){
	//alert("Suggestion clicked");
	
	//get val of button
	 //var btnChar = decodeEntity('suggestBtn');
	 var btnChar = $(this).html();
	 console.log(btnChar);
	 console.log(strCompare.length);
	 console.log(prevStart);
	 console.log(firstContent);
	 console.log("Second content: "+secondContent);
	 
	 //remove from 1st content with strcomapre length -1 
	firstContent=firstContent.substr(0,firstContent.length-(strCompare.length-1));
	updateContent(firstContent+btnChar+' '+secondContent,false,btnChar.length+1);
	strCompare='';
	//Add at correct place, remove th previous words from First content
	
	//update
	
});

		
		
		//console.log("writing character");
		// Add the character
		//alert($write.value + character);
		
		//$write.html(document.getElementById("write").value + character);
		console.log("New fcon:" + firstContent);
		updateContent(firstContent+character+secondContent);
		//$write.innerHTML = $write.value + character;
		//console.log(character);
		//alert($write.innerHTML);
		// console.log("prev start after ok: "+prevStart);
	  //console.log("prev end after ok: "+prevEnd);
		
	});
});
});