$(function(){
	
	
	//var $write = $('#write'),
		shift = false,
		capslock = false;
		
		var prevStart =$("#write").val.length ;
		var prevEnd =$("#write").val.length ;
		//var startPosition = prevStart;
		//var endPosition = prevEnd;
		
		
				
		let updateContent = function(new_content, is_clear=false) {
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
		prevStart=prevStart + 1;
		prevEnd=prevEnd + 1;
		}
		}
	
	$('#keyboard button').click(function(){
		
		
		document.getElementById("write").addEventListener("click",function(){
		console.log("A CLICK HAS BEEN MADE");
		var textArea = document.getElementById("write")
		//startPosition = textArea.selectionStart;
		//endPosition = textArea.selectionEnd;
		//alert("A CLICK HAS BEEN MADE");
		prevStart = textArea.selectionStart;
		prevEnd = textArea.selectionEnd;
		//prevStart = startPosition;
		//prevEnd = endPosition;
		
		
		
		},false);
		
		
		//var textArea = document.getElementById("write")
		startPosition = prevStart;
		endPosition = prevEnd;
		
		//inittiate previous end and startPosition
		//when a new end and start position are taken, save them 
		//use them until there is another click event
		
		console.log("button clicked");
		console.log(startPosition);
		console.log(endPosition);
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
			//alert(character);
		// Shift keys
		if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
			$('.letter').toggleClass('uppercase');
			$('.igletter').toggleClass('uppercase');
			$('.symbol span').toggle();
			
			shift = (shift === true) ? false : true;
			capslock = false;
			console.log("shift");
			return;
		}
		
		// Caps lock
		if ($this.hasClass('capslock')) {
			$('.letter').toggleClass('uppercase');
			$('.igletter').toggleClass('uppercase');
			capslock = true;
			console.log("caps");
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
			console.log("delete");
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

		
		
		console.log("writing character");
		// Add the character
		//alert($write.value + character);
		//$write.html(document.getElementById("write").value + character);
		updateContent(firstContent+character+secondContent);
		//$write.innerHTML = $write.value + character;
		console.log(character);
		//alert($write.innerHTML);
	});
});