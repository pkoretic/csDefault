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
	
/**============================================================================================================================================
															RESET FORM FUNCTION
==============================================================================================================================================*/			
	/* Reset each element on previous state - it obviously has a point only if there is a form */
	var cTPReset = function(f){
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
			$(this).data('val') && $('a', $(this).parent()).addClass('cTPChecked') || $('a', $(this).parent()).removeClass('cTPChecked');
			
		});//	$('input:checkbox', f).each(function()
		
		//set radio to original value we saved
		$(':radio', f).each(function()
		{
			//if it was checked set class of checked, else, set it unchecked
			$(this).data('val') && $('a', $(this).parent()).addClass('cTPCheckedR') || $('a', $(this).parent()).removeClass('cTPCheckedR');
		});//$('input:radio', f).each(function()
		
		$(':file', f).each(function()
		{
			//for security reasons we can't set value for input file in many browsers so we do this...
			$(this).val("");//if browser can set value (older browsers) set it to none
			$(".cTPFileInput",$(this).parent()).html("&nbsp;"); //set our element to space
		});//$('input:radio', f).each(function()
		
	}; //var cTPReset = function(f){

/*=============================================================================================================================================
																		CHECKBOX 
==============================================================================================================================================*/
	 
	$.fn.cTPCheckBox = function(){
		return this.each(function(){
			var checkbox = $(this); //jquery object of original element
			if(checkbox.data("val")!=null) return; //check if there is already something which means we processed it
			checkbox.data('val', this.checked); //save original value
			aElem = $('<span class="cTPCheckboxElem"></span>'); //create our new element
			
			//hide original element and create our new element
			checkbox.wrap('<span class="cTPCheckbox"></span>').parent().prepend(aElem); 
			
			// set the default state - if checked, set checked class or leave it
			this.checked && aElem.addClass('cTPChecked');
	
			
			//if original checkbox clicked change the class of our element, browser will change the state of real element
			checkbox.on("change",function()
			{
				//if checkbox isn't checked, add checked class, else remove checked class
				this.checked && aElem.addClass('cTPChecked') || aElem.removeClass('cTPChecked');
			});
	
		});
	};
	
/*=============================================================================================================================================
																		RADIO 
==============================================================================================================================================*/
	 
	$.fn.cTPRadio = function(){
	
		return this.each(function(){

			var radio = $(this); //jquery object of original element
			if(radio.data("val")!=null) return; //check if there is already something which means we processed it
			radio.data('val', this.checked); //save original value
			
			var aElem = $('<span class="cTPRadioElem"></span>'); //create our new element

			radio.wrap('<span class="cTPRadio"></span>').parent().prepend(aElem); //hide original element and create our new element over it
			
			// set class 'checked' if input set as checked - <input type="radio" checked="checked" />
			this.checked && aElem.addClass('cTPCheckedR');

			//if we click on radio button set class as clicked! (browser will actually click it and 'unclick' others!)
			
			radio.on("change",function()
			{
				aElem.addClass('cTPCheckedR'); //no need to set class on every click
				// remove checked class from all others of the same name (browser won't remove OUR class obviously)
				$('input[name="'+radio.attr('name')+'"]',this.form).not(radio).each(function()
					{
						$(this).attr('type')=='radio' && $(this).prev().removeClass('cTPCheckedR'); //our elements is always before original element
					});
			});
			
		});
	};
	
/*=============================================================================================================================================
																		FILE 
==============================================================================================================================================*/
$.fn.cTPFile = function(){
		return this.each(function(index){
		
		var file=$(this);
		
		if(file.hasClass('cTPHiddenFile')) return; //if it's already processed return
		
		var title="";
		if(file.attr("title")) 
		{
			title='title="'+file.attr("title")+'"';
			file.removeAttr("title");
		}
		buttonText="Browse"; //default input file button value
		if(file.data('button'))buttonText=file.data('button'); //if there is text for our button set, use that instead
		file.addClass('cTPHiddenFile').wrap('<span '+title+' class="cTPFile"></span>').parent().prepend('<input readonly="readonly" type="text" class="cTPFileInput" /></span><input type="button" value="'+buttonText+'" />'); //hide original element and create our new element
		
		if(file.attr('disabled')) file.parent().find("input").addClass("cTPDisabled");
		
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
			$(".cTPFileInput",$(this).parent()).val($(this).val().split('\\').pop());
		});

		
	});//function each
};	//file function
/*=============================================================================================================================================
																		SELECT 
==============================================================================================================================================*/	
	 
	$.fn.cTPSelect = function(){
		//do this for every select
		return this.each(function(){
			var select = $(this);
			if(select.data('styled')||select.attr('multiple')) return; //if it's hidden or if it's a type of multiple select
			
			
			select.css("width",select.outerWidth()+30+"px"); // add width of our dropdown button
			
			select.wrap('<span class="cTPSelect"></span>').parent().prepend('<span class="cTPSelectBar">'+$("option:selected",select).text()+'</span><span class="cTPSelectOpen">&#9660;</span>');
			
			if(select.attr('disabled')) $wrapper.addClass("cTPDisabled");

			select.on("change",function()
			{
				//update text
				$(".cTPSelectBar",$(this).parent()).text($("option:selected",$(this).parent()).text());
			});
			select.data("styled","1");
		}); //each
	};

/*=============================================================================================================================================
																		TITLE 
==============================================================================================================================================*/
	
	$.fn.cTPTitle = function(){
	
		return this.each(function(){
			var title=$(this);
			
			 //since the title is removed it wont be selected if cTP is run once more of few times more
			
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
					
			   	var html=$("<div class='cTPTitle'>"+titleText+"</div>");
			   	
			   	//we add i to middle of the element on the bottom
			   	$("body").append(html).find(".cTPTitle").css({left:(w/2)+pos.left-(html.width()/2), top:(h+pos.top+5)});
				}, 
				function () 
				{        
               $(".cTPTitle").remove();
				}
			);
		})//each
	}//function
/*=============================================================================================================================================
																		LABELS 
==============================================================================================================================================*/

	$.fn.cTPLabel = function(){
		return this.each(function(){
			label=$(this);
			if(label.data("styled")) return; //if we already processed this label return
			//if element corresponding to this label is disabled..."disable" this label (browser will disabled it, we add class)
			if($("#"+label.attr("for")).attr("disabled")=="disabled") 
			{
				label.addClass("cTPDisabled");
			}
			label.data("styled","1");//finished
		})
}		
/*=============================================================================================================================================
																MAIN FUNCTION 
==============================================================================================================================================*/
	$.fn.cTP = function()
	{
		$(this).each(function()
       {
			
			$(':checkbox',this).cTPCheckBox();
			$(':radio',this).cTPRadio();
			$(':file',this).cTPFile();
			$('select',this).cTPSelect();			
			$("label[for]",this).cTPLabel(); //process only labels bound to element
	
			$('form',this).on('reset',function(){ cTPReset(elem)}); //catch reset in a form (if there is one in our element) - we have to reset our elements manually				
			$('[title]',this).cTPTitle(); //has to be last since we are adapting titles in elements before
				
		});	
			
	};/* End the Plugin */

})(jQuery);

//call the main function
$(function() 
{
	$("body").cTP();
});
