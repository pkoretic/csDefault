/*
  
 * Petar Koretić
 ******************************************** */
 
 //Load css dynamically - depends on folder name - csTransPie by default
/*
//<![CDATA[
if(document.createStyleSheet) { document.createStyleSheet('csTransPie/csTransPie.css'); }
else {
  var newSS=document.createElement('link');
  newSS.rel='stylesheet';
  newSS.href='csTransPie/csTransPie.css';
  document.getElementsByTagName("head")[0].appendChild(newSS);
}
//]]>
 */

(function($){

/*=============================================================================================================================================
	JQUERY outerHTML implementation - my post on http://stackoverflow.com/a/11708139/1176448
==============================================================================================================================================*/
$.fn.outerHTML = function() {
  $t = $(this);
  if( "outerHTML" in $t[0] ) return $t[0].outerHTML; 
  else return $t.clone().wrap('<p>').parent().html();
}

/*=============================================================================================================================================
																		SIMPLE NOTIFICATIONS 
==============================================================================================================================================*/
  $.fn.csInfo = function(bkgclass) {
    
	// default background class | we allow user to provide their class
	if(!bkgclass) bkgclass="cs-gradient-blue";
	
    // get our message with all html it has
   var msg = $(this).outerHTML();
     
   //remove current notification if there is one 
   if($("#csInfoDiv").length) $("#csInfoDiv").remove();
     
   //create our simple notification holder 
	var html = $('<div id="csInfoDiv"><div id="csInfoDivInner" class="'+bkgclass+'">'+msg+'</div></div>');
						  
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
/*=============================================================================================================================================
																		DIALOG 
==============================================================================================================================================*/
$.fn.csDialog = function(bkgclass) {
   // default background class | we allow user to provide their class
	if(!bkgclass) bkgclass="cs-gradient-grey";
   
  	//get our data with all html it has
   var msg = $(this).outerHTML();
     
   // remove current dialog if there is one 
   if($("#csDialogDiv").length) $("#csDialogDiv").remove();
     
   // create our simple dialog holder and run cs library on it
	var html = $('<div id="csDialogDiv"><div id="csDialogDivInner" class="cs-gradient-grey">'+msg+'<hr/><a href="#" id="csDialogDivClose">×</a></div></div>');
						  
	// append dialog to body, show it (no animation - arent consistent nor fast across browsers)
   $("body").append(html).find("#csDialogDiv").show();
   
   // when x clicked, remove dialog
   $("#csDialogDiv").on("click","#csDialogDivClose",function()
   {
		html.remove();
		return false;
   });
   
   // close also on escape
   $(document).keyup(function(e) {		
	  if (e.keyCode == 27) $("#csDialogDivClose").click();
	});
   
  // style all elements it has
  $("#csDialogDiv").csUpdate();
  
  // return our element to allow chaining
  return html;
}

	
/**============================================================================================================================================
															RESET FORM FUNCTION
==============================================================================================================================================*/			
	/* Reset each element on previous state - it obviously has a point only if there is a form */
	var csReset = function(f){
		var sel=0; //which select in a form if there are more
		//set select to original value we saved
		$('select', f).each(function()
		{
			$('a:eq('+ $(this).data("index") +')',$(".select"+ sel++ +" ul",f)).click();
		});
		
		//set checkbox to original value we saved
		$(':checkbox', f).each(function()
		{	
			//if it was checked set class of checked, else, set it unchecked
			$(this).data('val') && $('a', $(this).parent()).addClass('csChecked') || $('a', $(this).parent()).removeClass('csChecked');
			
		});//	$('input:checkbox', f).each(function()
		
		//set radio to original value we saved
		$(':radio', f).each(function()
		{
			//if it was checked set class of checked, else, set it unchecked
			$(this).data('val') && $('a', $(this).parent()).addClass('csCheckedR') || $('a', $(this).parent()).removeClass('csCheckedR');
		});//$('input:radio', f).each(function()
		
		$(':file', f).each(function()
		{
			//for security reasons we can't set value for input file in many browsers so we do this...
			$(this).val("");//if browser can set value (older browsers) set it to none
			$(".csFileInput",$(this).parent()).html("&nbsp;"); //set our element to space
		});//$('input:radio', f).each(function()
		
	}; //var csReset = function(f){

/*=============================================================================================================================================
																		CHECKBOX 
==============================================================================================================================================*/
	 
	$.fn.csCheckBox = function(){
		return this.each(function(){
			var checkbox = $(this); //jquery object of original element
			
			if(checkbox.data("val")!=null) return; //check if there is already something which means we processed it
			checkbox.addClass("csOpaque"); // make original element transparent
			checkbox.data('val', this.checked); //save original value
			var aElem = $('<span class="csCheckboxElem"></span>'); //create our new element
			
			//hide original element and create our new element
			checkbox.wrap('<span class="csCheckbox"></span>').parent().prepend(aElem); 
			
			// set the default state - if checked, set checked class or leave it
			this.checked && aElem.addClass('csChecked');

			//if original checkbox clicked change the class of our element, browser will change the state of real element
			checkbox.on("change",function()
			{
				//if checkbox isn't checked, add checked class, else remove checked class
				this.checked && aElem.addClass('csChecked') || aElem.removeClass('csChecked');
			});
	
		});
	};
	
/*=============================================================================================================================================
																		RADIO 
==============================================================================================================================================*/
	 
	$.fn.csRadio = function(){
	
		return this.each(function(){
			var radio = $(this); //jquery object of original element
			
			if(radio.data("val")!=null) return; //check if there is already something which means we processed it
			radio.addClass("csOpaque"); // make original element transparent
			radio.data('val', this.checked); //save original value
			
			var aElem = $('<span class="csRadioElem"></span>'); //create our new element

			radio.wrap('<span class="csRadio"></span>').parent().prepend(aElem); //hide original element and create our new element over it
			
			// set class 'checked' if input set as checked - <input type="radio" checked="checked" />
			this.checked && aElem.addClass('csCheckedR');

			//if we click on radio button set class as clicked! (browser will actually click it and 'unclick' others!)
			
			radio.on("change",function()
			{
				aElem.addClass('csCheckedR'); //no need to set class on every click
				// remove checked class from all others of the same name (browser won't remove OUR class obviously)
				$('input[name="'+radio.attr('name')+'"]',this.form).not(radio).each(function()
					{
						$(this).attr('type')=='radio' && $(this).prev().removeClass('csCheckedR'); //our elements is always before original element
					});
			});
			
		});
	};
	
/*=============================================================================================================================================
																		FILE 
==============================================================================================================================================*/
$.fn.csFile = function(){
		return this.each(function(index){
		
		var file=$(this);
		
		if(file.hasClass('csHiddenFile')) return; //if it's already processed return
		
		var title="";
		if(file.attr("title")) 
		{
			title='title="'+file.attr("title")+'"';
			file.removeAttr("title");
		}
		var placeholder="";
		if(file.attr("placeholder")) 
		{
			placeholder='placeholder="'+file.attr("placeholder")+'"';
			file.removeAttr("placeholder");
		}
		
		buttonText="Browse"; //default input file button value
		if(file.data('button'))buttonText=file.data('button'); //if there is text for our button set, use that instead
		file.addClass('csHiddenFile').wrap('<span '+title+' '+placeholder+' class="csFile"></span>').parent().prepend('<input readonly="readonly" type="text" class="csFileInput" /></span><input type="button" value="'+buttonText+'" />'); //hide original element and create our new element
		
		if(file.attr('disabled')) file.parent().find("input").addClass("csDisabled");
		
		// only click on our new button triggers click on original element - "input" field can be used for copying text from it
		$(file.parent()).on("click","input[type=button]",function()
		{
			$("input[type=file]",$(this).parent()).click();
		});
		
		//only prevent click if the original input is disabled
		file.on("click",function()
		{
			if($(this).attr('disabled')) return false; 
		});
		
		//on change set filename to original element filename
		file.on("change",function()
		{
			$(".csFileInput",$(this).parent()).val($(this).val().split('\\').pop());
		});

		
	});//function each
};	//file function
/*=============================================================================================================================================
																		SELECT 
==============================================================================================================================================*/	
	 
	$.fn.csSelect = function(){
	
		//do this for every select
		return this.each(function(){
			var select = $(this);
			
			if(select.data('styled')) return; //if it's hidden or if it's a type of multiple select

			select.css("width",select.outerWidth()+30+"px"); // add width of our dropdown button |multiple select needs in IE likes it also
			
			if(select.attr('multiple')) return; // if it's type of multiple select - all is done through css
			
			select.addClass("csOpaque"); // make original element transparent
			
			select.wrap('<span class="csSelect"></span>').parent().prepend('<span class="csSelectBar">'+$("option:selected",select).text()+'</span><span class="csSelectOpen">&#9660;</span>');
			
			if(select.attr('disabled')) $wrapper.addClass("csDisabled");
			
			// Themeing support: we have to add our classes from select to parent since we wrapped it so (running time - <1ms for 50+ classess)
			var classes=select[0].className;
			if(classes.indexOf("cs-")!="-1")
			{
				//remove all multiple whitespace and split to list
				var classList=classes.replace( /\s\s+/g, ' ' ).split(' ');
				
				// move all classes prefixed with 'cs-' to parent / maybe we should move all classes (note:users can add many classes which should not be moved)
			   for(var i=0, len=classList.length;i<len;i++)
			    if(classList[i].indexOf("cs-")!="-1") 
				{
					select.removeClass(classList[i]);
					select.parent().addClass(classList[i]);
				}
			}
			
			//update text on select change
			select.on("change",function()
			{
				$(".csSelectBar",$(this).parent()).text($("option:selected",$(this).parent()).text());
			});
			
			// mark as processed
			select.data("styled","1");
		}); //each
	};

/*=============================================================================================================================================
																		TITLE 
==============================================================================================================================================*/
	
	$.fn.csTitle = function(){
	
		return this.each(function(){
			var title=$(this);
			
			 //since the title is removed it wont be selected if cs is run once more of few times more
			
			//one day when we won't have to support IE<=7
			//title.attr("data-title",title.attr("title"));
			//title.attr("title","");

			//remove original title (so that the browser doesn't show it)
			var titleText = title.attr('title');
			title.removeAttr("title");

			//hover over element, I like it to be instant!
			title.hover
			(
				function () 
				{
					var w = title.width();
					var h = title.height();
					
					var pos = title.offset();
					
			   	var html=$("<div class='csTitle'>"+titleText+"</div>");
			   	
			   	//we add i to middle of the element on the bottom
			   	$("body").append(html).find(".csTitle").css({left:(w/2)+pos.left-(html.width()/2), top:(h+pos.top+5)});
				}, 
				function () {  $(".csTitle").remove(); }
			);
		})//each
	}//function
/*=============================================================================================================================================
																		PLACEHOLDER 
==============================================================================================================================================*/
$.fn.csPlaceholder = function(){
	
		return this.each(function(){
			var element=$(this);
			
			var placeholderText = element.attr('placeholder');
			element.removeAttr("placeholder");
			
			// if elements is one of our modified elements - we wrapped them with parent tag so we must add placeholder outside that parent tag
			if((element.is("select")&&!element.attr("multiple"))||element.is("[type=radio]")||element.is("[type=checkbox]")) element=element.parent();
			
			element.wrap("<span class='csPlaceholder'></span>").parent().prepend("<span class='csPlaceholderInner cs-gradient-blue'>"+placeholderText+"</span><br/>");
			   	
		});// each
		
}// function
/*=============================================================================================================================================
																		LABELS 
==============================================================================================================================================*/

	$.fn.csLabel = function(){
		return this.each(function(){
			label=$(this);
			if(label.data("styled")) return; //if we already processed this label return
			//if element corresponding to this label is disabled..."disable" this label (browser will disable it, we add class)
			if($("#"+label.attr("for")).attr("disabled")=="disabled") 
			{
				label.addClass("csDisabled");
			}
			label.data("styled","1");//finished
		})
}		
/*=============================================================================================================================================
																MAIN FUNCTION 
==============================================================================================================================================*/
	$.fn.csUpdate = function()
	{
		$(this).each(function()
       {
			$(':checkbox',this).csCheckBox();
			$(':radio',this).csRadio();
			$(':file',this).csFile();
			$('select',this).csSelect();			
			$("label[for]",this).csLabel(); //process only labels bound to element
	
			$('form',this).on('reset',function(){ csReset(elem)}); //catch reset in a form (if there is one in our element) - we have to reset our elements manually				
			$('[placeholder]',this).csPlaceholder(); // placeholder is also html5 specific so we make our own
			$('[title]',this).csTitle(); //has to be last since we are adapting titles in elements before
		});	
			
	};/* End the Plugin */

})(jQuery);

//call the main function | remove this if you don't want styles to be added automatically for  elements above
$(function()  { $("body").csUpdate(); });
