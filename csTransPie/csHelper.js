(function($) {
  $.fn.csInfo = function() {
  
  	//get our message with all html it has
   var msg = $(this).clone().wrap('<p>').parent().html();
     
   //remove current notification if there is one 
   if($("#csInfoDiv").length) $("#csInfoDiv").remove();
     
   //create our simple notification holder 
	var html = $('<div id="csInfoDiv" style="display:none;z-index:9999; position:fixed; top:0; width:100%; left:0; text-align:center;padding:0; margin:0">\
					  <span class="cs-gradient-blue" style="display:inline-block;font-weight:bold; border-radius:0 0 3px 3px;padding:5px 15px;">\
					  '+msg+'</span></div>');
						  
	//append message to body, show it with animation, wait, hide it, remove it after hide animation finishes	     
   $("body").append(html).find("#csInfoDiv").slideDown("fast").delay(2500).slideUp("fast",function(){$(this).remove()});

	//allow click through
   $('#csInfoDiv').on("click",function(e){
    
    //"remove" our message holder
    $('#csInfoDiv').css({display:'none'})

    // get element at point of click
    elementClicked = document.elementFromPoint(e.clientX, e.clientY)

    //show our message
    $('#csInfoDiv').css({display:''})

    // send click to element at finger point
    $(elementClicked).trigger("click");
})

  }
})(jQuery);