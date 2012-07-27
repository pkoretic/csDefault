(function($) {
	
  $.fn.csInfo = function() {
  
  	//get our message with all html it has
   var msg = $(this).clone().wrap('<div>').parent().html();
     
   //remove current notification if there is one 
   if($("#csInfoDiv").length) $("#csInfoDiv").remove();
     
   //create our simple notification holder 
	var html = $('<div id="csInfoDiv"><div id="csInfoDivInner" class="cs-gradient-blue">'+msg+'</div></div>');
						  
	//append message to body, show it with animation, wait, hide it, remove it after hide animation finishes	     
   $("body").append(html).find("#csInfoDiv").slideDown("fast").delay(2500).slideUp("fast",function(){$(this).remove()});

	//allow click through
   $('#csInfoDiv').on("click",function(e)
   {    
    	//"remove" our message holder
    	$('#csInfoDiv').css({display:'none'})

    	// get element at point of click
    	elementClicked = document.elementFromPoint(e.clientX, e.clientY)

    	//show our message
    	$('#csInfoDiv').css({display:'block'})

    	// send click to element we want to click
   	 $(elementClicked).click();
	})

}

$.fn.csDialog = function() {
  
  	//get our data with all html it has
   var msg = $(this).clone().wrap('<div>').parent().html();
     
   // remove current notification if there is one 
   if($("#csDialogDiv").length) $("#csDialogDiv").remove();
     
   // create our simple dialog holder 
	var html = $('<div id="csDialogDiv"><div id="csDialogDivInner" class="cs-gradient-grey">'+msg+'<hr/><a href="#" id="csDialogDivClose">×</a></div></div>');
						  
	// append dialog to body, show it with animation   
   $("body").append(html).find("#csDialogDiv").slideDown("fast");
   
   // when x clicked, hide it with animation and remove it after that
   $("#csDialogDiv").on("click","#csDialogDivClose",function()
   {
   	html.slideUp("fast",function(){$(this).remove()});
   	return false;
   });
   
   // close also on escape
   $(document).keyup(function(e) {		
	  if (e.keyCode == 27) $("#csDialogDivClose").click();
	});
   
   //allow click through
   $('#csDialogDiv').on("click",function(e)
   {    
    	//"remove" our message holder
    	$('#csDialogDiv').css({display:'none'})

    	// get element at point of click
    	elementClicked = document.elementFromPoint(e.clientX, e.clientY)

    	//show our message
    	$('#csDialogDiv').css({display:'block'})

    	// send click to element we want to click
    	$(elementClicked).click();
	})
   
	
   
}


})(jQuery);