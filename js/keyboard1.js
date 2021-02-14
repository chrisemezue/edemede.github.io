$(document).ready(function(){
    var settingsMsg = document.getElementById("infoMsg");
    //alert(x.css('display'));
  settingsMsg.style.display ="none";
     $("#settings").click(function(){
         //$("#infoMsg").replaceWith('')
         settingsMsg.style.display ="inherit";
    $('.toast').toast('show');
  });
  $('.closeBtn').click(function(){
      settingsMsg.style.display ="none";
      
  });
	
	if($(window).width() < 600){
		$('#write').prop('readonly', true);
		//console.log("Less than 360");
		$("#tab-btn").replaceWith('<button type="button" class="tab btn btn-outline-secondary" id="tab-btn"><img src="images/tab.png"></button>');
		$("#del-btn").replaceWith('<button type="button" class="delete lastitem btn btn-outline-secondary" id="del-btn"><img src="images/del.png"></button>');
		$("#caps-btn").replaceWith('<button type="button" class="capslock btn btn-outline-secondary" id="caps-btn"><img src="images/caps.png"></button>');
		$("#return-btn").replaceWith('<button type="button" class="return lastitem btn btn-outline-secondary" id="return-btn"><img src="images/return.png"></button>');
		$("#shift-btn").replaceWith('<button type="button" class="left-shift btn btn-outline-secondary" id="shift-btn"><img src="images/shift.png"></button>');
		$("#rshift-btn").replaceWith('<button type="button" class="right-shift lastitem btn btn-outline-secondary" id="rshift-btn"><img src="images/rshift.png"></button>');
		//$("#o-grave").replaceWith('<button type="button" class="igletter igdb btn btn-outline-secondary" id="o-grave-dot2">&#7885;&#769;</button>');
        $("#o-grave").replaceWith('<span id="add-o1"></span>');
        $("#add-o").replaceWith('<button type="button" class="igletter btn btn-outline-secondary" id="o-grave">&#243</button>');
        
        collapseBtn = document.getElementById("collapse")
        collapseBtn.style.display = 'none';
        
        
    
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
		var suggestionsToShow=8;
		
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
		if(occurences.length>suggestionsToShow){
		var newOccurence=[];
		var oldIndex=[];
		var rand;
		for(var i=0;i<suggestionsToShow;i++){
			rand = occurences[Math.floor(Math.random() * occurences.length)]
			//console.log(oldIndex.includes(rand));
			while (oldIndex.includes(rand)){
			//console.log("Started while loop");
			rand = occurences[Math.floor(Math.random() * occurences.length)]
			//console.log("random is "+rand);
			}
			oldIndex.push(rand);
			newOccurence.push(rand);
			rand= occurences.length+1;
		}
		
		newOccurence.forEach(showSuggestions);
		}
		else{
				occurences.forEach(showSuggestions);
		}
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
        let countArea = function(){
            var resultArray = [];
            var strA= document.getElementById("write");
            //$("#write").html("");
            //alert(strA.value);
              var str = strA.value.replace(/[\t\n\r\.\?\!]/gm,' ');
              var wordArray = str.split(" ");
              for (var i = 0; i < wordArray.length; i++) {
                var item = wordArray[i].trim();
                if(item.length > 0){
                  resultArray.push(item);
                }
          }
          document.getElementById("current").innerText = resultArray.length;
		
            
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
        countArea();
		
		
	});	
    
 	
    
	$( "#write" ).keydown(function(e){
       
		//console.log("Key pressed");
		strCompare='';
		toCheck=true;
		//Get area selection
		var KtextArea = document.getElementById("write");
		var val=1;
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
      //console.log(e.which);
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
	//console.log(prevStart);
	//console.log(prevEnd);
		
			toCheck=false;
		}
	 // console.log("prev start after shift: "+prevStart);
	  //console.log("prev end after shift: "+prevEnd);
	  //countA=0;
   // console.log('Shift key has been pressed');
	 //FOR A
	 if (e.which==65){
		 
		 
		 countA++;
		// console.log(countA);
		 if (countA==1){
			  //KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-dot',keyCapsLock);}
		 else if (countA%6==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-acute',keyCapsLock);
			 }
		 else if (countA%6==3){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-grave',keyCapsLock);
			 }
         //Add 4,5, and 6 for a dot below with acute, grave accents and macron
         else if (countA%6==4){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-macron',keyCapsLock);
			 }
          else if (countA%6==5){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-acute-dot',keyCapsLock);
             val=2;
			 }
           else if (countA%6==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-grave-dot',keyCapsLock);
             val=2;
           
			 }
		else if (countA>6 & countA%6==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('a-dot',keyCapsLock);
             //console.log("We came here!");
             //console.log(countA);
             }
             
		 
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
		 else if (countE%6==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-acute',keyCapsLock);
			 }
		 else if (countE%6==3){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-grave',keyCapsLock);
			 }
             
          else if (countE%6==4){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-macron',keyCapsLock);
			 }
             else if (countE%6==5){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-acute-dot',keyCapsLock);
             val=2;
			 }
             else if (countE%6==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('e-grave-dot',keyCapsLock);
             val=2;
			 }
		else if (countE>6 & countE%6==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
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
		 else if (countO%6==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-acute',keyCapsLock);
			 }
		 else if (countO%6==3){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-grave',keyCapsLock);
			 }
          else if (countO%6==4){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-macron',keyCapsLock);
			 }
           else if (countO%6==5){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-acute-dot',keyCapsLock);
			 }
             
             else if (countO%6==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('o-grave-dot',keyCapsLock);
			 }
		else if (countO>6 & countO%6==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
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
		 else if (countU%6==2){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-acute',keyCapsLock);
			 }
		 else if (countU%6==3){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-grave',keyCapsLock);
			 }
             else if (countU%6==4){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-macron',keyCapsLock);
			 }
             else if (countU%6==5){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-acute-dot',keyCapsLock);
			 }
             else if (countU%6==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
			 //console.log("third: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-grave-dot',keyCapsLock);
			 }
		else if (countU>6 & countU%6==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('u-dot',keyCapsLock);}
	 }
	 else{countU=0;}
     
     //FOR N and N macron
     
	 if (e.which==78){
		  countN++;
		 //console.log(countA);
		 if (countN==1){
			  //KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('normalN',keyCapsLock);}
		 else if (countN%2==0){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-1);
			 //console.log("second: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('n-macron',keyCapsLock);
			 }
		
		else if (countN>2 & countN%2==1){
			 KfirstContent = KfirstContent.substr(0,KfirstContent.length-2);
			 //console.log("first: "+KfirstContent);
			 e.preventDefault();
			 KCharacter = decodeEntity('normalN',keyCapsLock);}
	 }
	 else{countN=0;}
     
		 
	//console.log("writing character");
	
  }
  //countA=0;
  //if KCharacter is not empty, updateContent, else do nothing
  if (KCharacter!=''){
      
  updateContent(KfirstContent+KCharacter+KsecondContent,false,val);
  }
	//console.log("first content: "+KfirstContent);
	//console.log("char: "+KCharacter);
	//console.log("2nd char: "+KsecondContent);
  //xTriggered++;
  //console.log("Handler for .keypress() called " + xTriggered + " time(s).");
  //console.log(e.which);
 countArea();
});
	$('#keyboard button').click(function(){
     
		//console.log("Button clicked");
		toEnd=false;
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
	//console.log(prevStart);
	//console.log(prevEnd);
		
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
        var val;
		var $this = $(this),
			character = $this.html(); // If it's a lowercase letter, nothing happens to this variable
			//console.log(character);
            
        //Increase by 2 if composed of double encodings
        if ($this.hasClass('igdb')){
            val=2;
            //console.log("We have val=2");
            
        }
        else{
            val = 1;
            //console.log("We have val=1");
        }
        
        
		// Shift keys
		if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
			toEnd=true;
		strCompare='';
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
			strCompare = strCompare.substr(0,strCompare.length -1)
			//console.log("after deletion: "+strCompare);
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
			updateContent(content_after_deleting, true,val);
			//$write.innerHTML = html.substr(0, html.length - 1);
			//console.log("delete");
            countArea();
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
		
	if ($this.hasClass('space') ||$this.hasClass('tab')|| $this.hasClass('return')|| $this.hasClass('left-shift')|| $this.hasClass('right-shift') )
	{
		//console.log("Found a class");
		
		//console.log("Has class");
		toEnd=true;
		strCompare='';
	
	}
	
	if (!toEnd){
		//console.log("No class, adding string");
		strCompare+=character;
		//console.log(strCompare);
		
		compare(strCompare,lines);
		
	}
$(".suggestBtn").click(function(){
	//alert("Suggestion clicked");
	
	//get val of button
	 //var btnChar = decodeEntity('suggestBtn');
	 var btnChar = $(this).html();
	 //console.log(btnChar);
	// console.log(strCompare.length);
	 //console.log(prevStart);
	// console.log(firstContent);
	// console.log("Second content: "+secondContent);
	 
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
		//console.log("New fcon:" + firstContent);
		updateContent(firstContent+character+secondContent,false,val);
		//$write.innerHTML = $write.value + character;
		//console.log(character);
		//alert($write.innerHTML);
		// console.log("prev start after ok: "+prevStart);
	  //console.log("prev end after ok: "+prevEnd);
		countArea();
	});
});
$(".copyText").click(function(){
    
    var copyText = document.getElementById("write");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  
  //var tooltip = document.getElementById("myTooltip");
  //tooltip.innerHTML = "Copied: " + copyText.value;
 
 //Some notification
 //var tooltip = document.getElementById("myTooltip");
  //tooltip.innerHTML = "Copy to clipboard";
    
    
    
});
//COLLAPSE KEYBOARD IF USING PC KEYBOARD
$("#collapse").click(function(){
    //console.log("clicked!");
    
    var kboard = document.getElementById("keyboardWrapper");
    var btn_info = document.getElementById("collapse");
    var writeArea = document.getElementById("write");
   
   if (kboard.style.display =="none"){
   kboard.style.display="inherit";
   btn_info.innerHTML ="Collapse Keyboard";
   writeArea.style['min-height']= '250px';
   //console.log("To show");
   }
   else{
       
       kboard.style.display ="none";
        btn_info.innerHTML = "Show Keyboard";
        writeArea.style['min-height']= '100%';
   }
    
    
    
});

//TO SAVE File
(function() {
    /*! https://github.com/koffsyrup/FileSaver.js */
    var saveAs=saveAs ||(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator))||(function(view){"use strict";if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var doc=view.document,get_URL=function(){return view.URL||view.webkitURL||view},save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a"),can_use_save_link=!view.externalHost&&"download"in save_link,click=function(node){var event=doc.createEvent("MouseEvents");event.initMouseEvent("click",true,false,view,0,0,0,0,0,false,false,false,false,0,null);node.dispatchEvent(event)},webkit_req_fs=view.webkitRequestFileSystem,req_fs=view.requestFileSystem||webkit_req_fs||view.mozRequestFileSystem,throw_outside=function(ex){(view.setImmediate||view.setTimeout)(function(){throw ex},0)},force_saveable_type="application/octet-stream",fs_min_size=0,deletion_queue=[],process_deletion_queue=function(){var i=deletion_queue.length;while(i--){var file=deletion_queue[i];if(typeof file==="string"){get_URL().revokeObjectURL(file)}else{file.remove()}}deletion_queue.length=0;},dispatch=function(filesaver,event_types,event){event_types=[].concat(event_types);var i=event_types.length;while(i--){var listener=filesaver["on"+event_types[i]];if(typeof listener==="function"){try{listener.call(filesaver,event||filesaver)}catch(ex){throw_outside(ex)}}}},FileSaver=function(blob,name){var filesaver=this,type=blob.type,blob_changed=false,object_url,target_view,get_object_url=function(){var object_url=get_URL().createObjectURL(blob);deletion_queue.push(object_url);return object_url},dispatch_all=function(){dispatch(filesaver,"writestart progress write writeend".split(" "))},fs_error=function(){if(blob_changed||!object_url){object_url=get_object_url(blob)}if(target_view){target_view.location.href=object_url}else{window.open(object_url,"_blank")}filesaver.readyState=filesaver.DONE;dispatch_all()},abortable=function(func){return function(){if(filesaver.readyState!==filesaver.DONE){return func.apply(this,arguments)}}},create_if_not_found={create:true,exclusive:false},slice;filesaver.readyState=filesaver.INIT;if(!name){name="download"}if(can_use_save_link){object_url=get_object_url(blob);save_link.href=object_url;save_link.download=name;click(save_link);filesaver.readyState=filesaver.DONE;dispatch_all();return}if(view.chrome&&type&&type!==force_saveable_type){slice=blob.slice||blob.webkitSlice;blob=slice.call(blob,0,blob.size,force_saveable_type);blob_changed=true}if(webkit_req_fs&&name!=="download"){name+=".download"}if(type===force_saveable_type||webkit_req_fs){target_view=view}if(!req_fs){fs_error();return}fs_min_size+=blob.size;req_fs(view.TEMPORARY,fs_min_size,abortable(function(fs){fs.root.getDirectory("saved",create_if_not_found,abortable(function(dir){var save=function(){dir.getFile(name,create_if_not_found,abortable(function(file){file.createWriter(abortable(function(writer){writer.onwriteend=function(event){target_view.location.href=file.toURL();deletion_queue.push(file);filesaver.readyState=filesaver.DONE;dispatch(filesaver,"writeend",event)};writer.onerror=function(){var error=writer.error;if(error.code!==error.ABORT_ERR){fs_error()}};"writestart progress write abort".split(" ").forEach(function(event){writer["on"+event]=filesaver["on"+event]});writer.write(blob);filesaver.abort=function(){writer.abort();filesaver.readyState=filesaver.DONE};filesaver.readyState=filesaver.WRITING}),fs_error)}),fs_error)};dir.getFile(name,{create:false},abortable(function(file){file.remove();save()}),abortable(function(ex){if(ex.code===ex.NOT_FOUND_ERR){save()}else{fs_error()}}))}),fs_error)}),fs_error)},FS_proto=FileSaver.prototype,saveAs=function(blob,name){return new FileSaver(blob,name)};FS_proto.abort=function(){var filesaver=this;filesaver.readyState=filesaver.DONE;dispatch(filesaver,"abort")};FS_proto.readyState=FS_proto.INIT=0;FS_proto.WRITING=1;FS_proto.DONE=2;FS_proto.error=FS_proto.onwritestart=FS_proto.onprogress=FS_proto.onwrite=FS_proto.onabort=FS_proto.onerror=FS_proto.onwriteend=null;view.addEventListener("unload",process_deletion_queue,false);saveAs.unload=function(){process_deletion_queue();view.removeEventListener("unload",process_deletion_queue,false)};return saveAs}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));if(typeof module!=="undefined"&&module!==null){module.exports=saveAs}else if((typeof define!=="undefined"&&define!==null)&&(define.amd!=null)){define([],function(){return saveAs})}String.prototype.endsWithAny=function(){var strArray=Array.prototype.slice.call(arguments),$this=this.toLowerCase().toString();for(var i=0;i<strArray.length;i+=1){if($this.indexOf(strArray[i],$this.length-strArray[i].length)!==-1){return true}}return false};var saveTextAs=saveTextAs||(function(textContent,fileName,charset){fileName=fileName||'download.txt';charset=charset||'utf-8';textContent=(textContent||'').replace(/\r?\n/g,"\r\n");if(saveAs&&Blob){var blob=new Blob([textContent],{type:"text/plain;charset="+charset});saveAs(blob,fileName);return true}else{var saveTxtWindow=window.frames.saveTxtWindow;if(!saveTxtWindow){saveTxtWindow=document.createElement('iframe');saveTxtWindow.id='saveTxtWindow';saveTxtWindow.style.display='none';document.body.insertBefore(saveTxtWindow,null);saveTxtWindow=window.frames.saveTxtWindow;if(!saveTxtWindow){saveTxtWindow=window.open('','_temp','width=100,height=100');if(!saveTxtWindow){window.alert('Sorry, download file could not be created.');return false}}}var doc=saveTxtWindow.document;doc.open('text/html','replace');doc.charset=charset;if(fileName.endsWithAny('.htm','.html')){doc.close();doc.body.innerHTML='\r\n'+textContent+'\r\n'}else{if(!fileName.endsWithAny('.txt')){fileName+='.txt'}doc.write(textContent);doc.close()}var retValue=doc.execCommand('SaveAs',null,fileName);saveTxtWindow.close();return retValue}});

    /*----*/

    var area = document.getElementById('write');
    var link = document.getElementById('saveFile');

    link.addEventListener('click', function(e) {
        e.preventDefault();
        saveTextAs(area.value, 'edemede.txt');
    }, false);
})();


});