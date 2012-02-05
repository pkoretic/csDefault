/*
   based on jqTransform http://www.dfc-e.com/metiers/multimedia/opensource/jqTransform/
   
 * 30.01.2012 Petar Koretić
 * Fixed few bugs, removed input, buttons and textarea functions
 * no more form dependant - can be used on only one element, specified only on one div etc..
 * much smaller - 4.4kb minified*
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

	/***************************
	  Labels
	***************************/
	var cTPGetLabel = function(objfield){
		var selfForm = $(objfield.get(0).form);
		var oLabel = objfield.next();
		if(!oLabel.is('label')) {
			oLabel = objfield.prev();
			if(oLabel.is('label')){
				var inputname = objfield.attr('id');
				if(inputname){
					oLabel = selfForm.find('label[for="'+inputname+'"]');
				} 
			}
		}
		return false;
	};
	
	/* Hide all open selects */
	var cTPHideSelect = function(oTarget){
		var ulVisible = $('.cTPSelectWrapper ul:visible');
		ulVisible.each(function(){
			var oSelect = $(this).parents(".cTPSelectWrapper:first").find("select").get(0);
			//do not hide if click on the label object associated to the select
			if( !(oTarget && oSelect.oLabel && oSelect.oLabel.get(0) == oTarget.get(0)) ){$(this).hide();}
		});
	};
	/* Check for an external click */
	var cTPCheckExternalClick = function(event) {
		if ($(event.target).parents('.cTPSelectWrapper').length === 0) { cTPHideSelect($(event.target)); }
	};

	/* Apply document listener */
	var cTPAddDocumentListener = function (){
		$(document).mousedown(cTPCheckExternalClick);
	};	
			
	/* Add a new handler for the reset action */
	var cTPReset = function(f){
		var sel;
		$('.cTPSelectWrapper select', f).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
		$('a.cTPCheckbox, a.cTPRadio', f).removeClass('cTPChecked');
		$('input:checkbox', f).each(function(){if(this.checked){$('a', $(this).parent()).addClass('cTPChecked');}});
		$('input:radio', f).each(function(){if(this.checked){$('a', $(this).parent()).addClass('cTPCheckedR');}});
		
	};

	/***************************
	  Check Boxes 
	 ***************************/	
	$.fn.cTPCheckBox = function(){
		return this.each(function(){
			if($(this).hasClass('cTPHidden')) {return;}

			var $input = $(this); //jquery object of original element
			var checkbox = this; //javascript reference to original element

			var aLink = $('<a href="#" class="cTPCheckbox"></a>'); //create our new element
			
			$input.addClass('cTPHidden').wrap('<span class="cTPCheckboxWrapper"></span>').parent().prepend(aLink); //hide original element and create our new element
			
			// set the default state - if checked, set checked class or leave it
			checkbox.checked && aLink.addClass('cTPChecked');
			/*============================================ Events ====================================================*/
			var oLabel  =  cTPGetLabel($input); //Get label
			$("label[for="+$input.attr('id')+"]").css("cursor","pointer"); //cursor pointer for our label
			
			//if we click on label all browsers except IE will work for hidden elements so we prevent it, and set it manually
			$("label[for="+$input.attr('id')+"]").on("click",function()
			{
				$input.click(); // 'click' by all browsers
				return false; //prevent default action which is click since we clicked manually, e.preventDefault()
			});
			
			// click on our new element just triggers click on original element - browser will do the rest
			aLink.click(function()
			{
				$input.click();	// 'click' by all browsers 	
				return false; //prevent click - which sets # in url
			});
			
			//if original checkbox clicked change the class of our element, browser will change the state of real element
			$input.click(function()
			{
				if($input.attr('disabled'))return false; //do nothing if the original input is disabled
				
				//if checkbox isn't checked, add checked class, else remove checked class
				!checkbox.checked && aLink.addClass('cTPChecked') || aLink.removeClass('cTPChecked');
			});
			/*============================================ End of Events =============================================*/
				
		});
	};
	/***************************
	  Radio Buttons 
	 ***************************/	
	$.fn.cTPRadio = function(){
		return this.each(function(){
			if($(this).hasClass('cTPHidden')) {return;}

			var $input = $(this); //jquery object of original element
			var radio = this; //javascript reference to original element
			
			var aLink = $('<a href="#" class="cTPRadio" rel="'+ this.name +'"></a>'); //create our new element
			
			$input.addClass('cTPHidden').wrap('<span class="cTPRadioWrapper"></span>').parent().prepend(aLink); //hide original element and create our new element
			
			// set class 'checked' if input set as checked - <input type="radio" checked="checked" />
			radio.checked && aLink.addClass('cTPCheckedR');
			
			/*============================================ Events ====================================================*/
			var oLabel  =  cTPGetLabel($input); //Get label connected to our input
			$("label[for="+$input.attr('id')+"]").css("cursor","pointer");
			
			//if we click on label all browsers except IE will work for hidden elements so we prevent it, and set it manually
			$("label[for="+$input.attr('id')+"]").on("click",function()
			{
				$input.click(); // 'click' by all browsers
				return false; //prevent default action which is click since we clicked manually, e.preventDefault()
			});
			
			// click on our new element just triggers click on original element - browser will do the rest
			aLink.click(function(){
				$input.click();			
				return false; //prevent click - which sets # in url
			});
			
			//if we click on radio button set class as clicked! (browser will actually click it and 'unclick' others!)
			$input.click(function()
			{
				if($input.attr('disabled')) return false; //prevent click if disabled!
				!radio.checked && aLink.addClass('cTPCheckedR'); //no need to set class on every click
				// remove checked class from all others of the same name (browser won't remove OUR class obviously)
				$('input[name="'+$input.attr('name')+'"]',radio.form).not($input).each(function()
					{
						$(this).attr('type')=='radio' && $(this).prev().removeClass('cTPCheckedR'); //our elements is always before original element
					});
			});
			/*============================================ End of Events =============================================*/
		});
	};
	

	
	/***************************
	  Select 
	 ***************************/	
	$.fn.cTPSelect = function(){
		
		return this.each(function(index){
			var $select = $(this);
			
			if($select.hasClass('cTPHidden')) {return;}
			if($select.attr('multiple')) {return;}

			var oLabel  =  cTPGetLabel($select);
			/* First thing we do is Wrap it */
			var $wrapper = $select
				.addClass('cTPHidden')
				.wrap('<div class="cTPSelectWrapper"></div>')
				.parent()
				.css({zIndex: 100-index})
			;
			
			/* Now add the html for the select */
			$wrapper.prepend('<div><span></span><a href="#" class="cTPSelectOpen">&#9660;</a></div><ul></ul>');
			var $ul = $('ul', $wrapper).css('width',$select.width()).hide();
			/* Now we add the options */
			$('option', this).each(function(i){
				var oLi = $('<li><a href="#" index="'+ i +'">'+ $(this).html() +'</a></li>');
				$ul.append(oLi);
			});
			
			/* Add click handler to the a */
			$ul.find('a').click(function(){
					$('a.selected', $wrapper).removeClass('selected');
					$(this).addClass('selected');	
					/* Fire the onchange event */
					if ($select[0].selectedIndex != $(this).attr('index')) {
     $select[0].selectedIndex = $(this).attr('index');
     $($select[0]).trigger('change');
}
					$select[0].selectedIndex = $(this).attr('index');
					$('span:eq(0)', $wrapper).html($(this).html());
					$ul.hide();
					return false;
			});
			/* Set the default */
			$('a:eq('+ this.selectedIndex +')', $ul).click();
			$('span:first', $wrapper).click(function(){$("a.cTPSelectOpen",$wrapper).trigger('click');});
			oLabel && oLabel.click(function(){$("a.cTPSelectOpen",$wrapper).trigger('click');});
			this.oLabel = oLabel;
			
			/* Apply the click handler to the Open */
			var oLinkOpen = $('a.cTPSelectOpen', $wrapper)
				.click(function(){
					//Check if box is already open to still allow toggle, but close all other selects
					if( $ul.css('display') == 'none' ) {cTPHideSelect();} 
					if($select.attr('disabled')){return false;}

					$ul.slideToggle('fast', function(){					
						var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
						$ul.animate({scrollTop: offSet});
					});
					return false;
				})
			;

			// Set the new width
			var iSelectWidth = $select.outerWidth()+20;
			var oSpan = $('span:first',$wrapper);
			var newWidth = (iSelectWidth > oSpan.innerWidth())?iSelectWidth+oLinkOpen.outerWidth():$wrapper.width();
			$wrapper.css('width',newWidth);
			$ul.css('width',newWidth-2);
			oSpan.css({width:iSelectWidth});
		
			// Calculate the height if necessary, less elements that the default height
			//show the ul to calculate the block, if ul is not displayed li height value is 0
			$ul.css({display:'block',visibility:'hidden'});
			var iSelectHeight = ($('li',$ul).length)*($('li:first',$ul).height());//+1 else bug ff
			(iSelectHeight < $ul.height()) && $ul.css({height:iSelectHeight,'overflow':'hidden'});//hidden else bug with ff
			$ul.css({display:'none',visibility:'visible'});
			
		});
	};
	$.fn.cTP = function(){
		/* each group of element */
		 return this.parent().each(function()
		 {
			$('input:checkbox', this).cTPCheckBox();
			$('input:radio', this).cTPRadio();
			
			if( $('select', this).cTPSelect().length > 0 ){cTPAddDocumentListener();}
			$(this).bind('reset',function(){var action = function(){cTPReset(this);}; window.setTimeout(action, 10);});
			
		}); /* End  each */
				
	};/* End the Plugin */

})(jQuery);

//call the main function
$(function() {
$(".transpie").cTP();

//var ie = (function(){var undef,v = 3,div = document.createElement('div'),all = div.getElementsByTagName('i');while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]);return v > 4 ? v : undef;}());

});