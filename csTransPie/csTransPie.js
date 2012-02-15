/*
   inspired by jqTransform http://www.dfc-e.com/metiers/multimedia/opensource/jqTransform/
   
 * Started 30.01.2012 Petar Koretić
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
			
	/* Reset each element on previous state - it obviously has a point only if there is a form */
	var cTPReset = function(f){
		var sel=0; //which select in a form if there are more
		//set select to original value we saved
		$('select', f).each(function()
		{
			$('a:eq('+ $(this).data("index") +')',$(".select"+ sel++ +" ul",f)).click();
		});
		
		//set checkbox to original value we saved
		$('input:checkbox', f).each(function()
		{	
			//if it was checked set class of checked, else, set it unchecked
			$(this).data('val') && $('a', $(this).parent()).addClass('cTPChecked') || $('a', $(this).parent()).removeClass('cTPChecked');
			
		});//	$('input:checkbox', f).each(function()
		
		//set radio to original value we saved
		$('input:radio', f).each(function()
		{
			//if it was checked set class of checked, else, set it unchecked
			$(this).data('val') && $('a', $(this).parent()).addClass('cTPCheckedR') || $('a', $(this).parent()).removeClass('cTPCheckedR');
		});//$('input:radio', f).each(function()
		
	}; //var cTPReset = function(f){

	/***************************
	  Check Boxes 
	 ***************************/
	 
	$.fn.cTPCheckBox = function(){
		return this.each(function(){
			if($(this).hasClass('cTPHidden')) {return;} //prevent multiple styles
			var checkbox = $(this); //jquery object of original element

			checkbox.data('val', this.checked); //save original value
			
			var aLink = $('<a href="#" class="cTPCheckbox"></a>'); //create our new element
			
			checkbox.addClass('cTPHidden').wrap('<span class="cTPCheckboxWrapper"></span>').parent().prepend(aLink); //hide original element and create our new element
			
			// set the default state - if checked, set checked class or leave it
			this.checked && aLink.addClass('cTPChecked');
			
			//style label if bound to our element
			$("label[for="+checkbox.attr('id')+"]").css("cursor","pointer"); //cursor pointer for our label
			/*============================================ Events ====================================================*/
			
			//if we click on label all browsers except IE will work for hidden elements so we prevent it, and set it manually
			$("label[for="+checkbox.attr('id')+"]").on("click",function()
			{
				checkbox.click(); // 'click' by all browsers
				return false; //prevent default action which is click since we clicked manually, e.preventDefault()
			});
			
			// click on our new element just triggers click on original element - browser will do the rest
			aLink.on("click",function()
			{
				checkbox.click();	// 'click' by all browsers 	
				return false; //prevent click - which sets # in url
			});
			
			//if original checkbox clicked change the class of our element, browser will change the state of real element
			checkbox.on("click",function()
			{
				if(checkbox.attr('disabled'))return false; //do nothing if the original input is disabled
				
				//if checkbox isn't checked, add checked class, else remove checked class
				!this.checked && aLink.addClass('cTPChecked') || aLink.removeClass('cTPChecked');
			});
			/*============================================ End of Events =============================================*/
				
		});
	};
	
	/***************************
	  Title
	 ***************************/
	
	$.fn.cTPTitle = function(){
	
		return this.each(function(){
			title=$(this);
			
		    var pos = title.offset();
			var width = title.outerWidth();

			var text=title.attr("title");
			
			//remove original title (so the browser doesn't show it) and add ours - span after
			title.attr("title","").after('<span class="cTPTitle">'+text+'</span>');
			
			//hover over element, I like it to be instant!
			title.hover
			(
				function () 
				{
					title.next().css
					({
						top: pos.top + "px",
						left: (pos.left + width)  + "px",
						display:"inline"
					});
				}, 
				function () 
				{
					title.next().css("display","none");
				}
			);
			
	
			
		 
		})//each
	}//function
	/***************************
	  Radio Buttons 
	 ***************************/
	 
	$.fn.cTPRadio = function(){
	
		return this.each(function(){
			if($(this).hasClass('cTPHidden')) {return;}
		
			var radio = $(this); //jquery object of original element
			
			radio.data('val', this.checked); //save original value
			
			var aLink = $('<a href="#" class="cTPRadio" rel="'+ this.name +'"></a>'); //create our new element
		
			radio.addClass('cTPHidden').wrap('<span class="cTPRadioWrapper"></span>').parent().prepend(aLink); //hide original element and create our new element
			
			// set class 'checked' if input set as checked - <input type="radio" checked="checked" />
			this.checked && aLink.addClass('cTPCheckedR');
			
			//style label if bound
			$("label[for="+radio.attr('id')+"]").css("cursor","pointer");
			
			/*============================================ Events ====================================================*/
			
			//if we click on label all browsers except IE will work for hidden elements so we prevent it, and set it manually
			$("label[for="+radio.attr('id')+"]").on("click",function()
			{
				radio.click(); // 'click' by all browsers
				return false; //prevent default action which is click since we clicked manually, e.preventDefault()
			});
			
			// click on our new element just triggers click on original element - browser will do the rest
			aLink.on("click",function(){
				radio.click();			
				return false; //prevent click - which sets # in url
			});
			
			//if we click on radio button set class as clicked! (browser will actually click it and 'unclick' others!)
			
			radio.on("click",function()
			{
				if(radio.attr('disabled')) return false; //prevent click if disabled!
				!this.checked && aLink.addClass('cTPCheckedR'); //no need to set class on every click
				// remove checked class from all others of the same name (browser won't remove OUR class obviously)
				$('input[name="'+radio.attr('name')+'"]',this.form).not(radio).each(function()
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
			var sel=0; //if there are more selects in form we want to know which select is this in that form
		//do this for every select
		return this.each(function(index){
		
			var $select = $(this);
			if($select.hasClass('cTPHidden')) {return;} //if it's hidden
			if($select.attr('multiple')) {return;} //if it's a type of multiple select

			/* First thing we do is Wrap it */
			var $wrapper = $select.addClass('cTPHidden').wrap('<div class="cTPSelectWrapper select'+ sel++ +'"></div>').parent().css({zIndex: 100-index});
			/* Now add the html for the select */
			$wrapper.prepend('<div><span></span><a href="#" class="cTPSelectOpen">&#9660;</a></div><ul></ul>');
			var $ul = $('ul', $wrapper).css('width',$select.width()).hide();
			/* Now we add the options */
			$('option', this).each(function(i){
				var oLi = $('<li><a href="#" index="'+ i +'">'+ $(this).html() +'</a></li>');
				$ul.append(oLi);
			});
			
			/* Add click handler to the a */
			$ul.find('a').on("click",function(){
					$('a.selected', $wrapper).removeClass('selected');
					$(this).addClass('selected');	
					/* Fire the onchange event */
					if ($select[0].selectedIndex != $(this).attr('index')) 
					{
						$select[0].selectedIndex = $(this).attr('index');
						$($select[0]).trigger('change');
					}
					$select[0].selectedIndex = $(this).attr('index');
					$('span:eq(0)', $wrapper).html($(this).html());
					$ul.hide();
					return false;
			});
			/* Set the default */
			$select.data('index', this.selectedIndex); //save original value
			$('a:eq('+ this.selectedIndex +')', $ul).click();
			$('span:first', $wrapper).on("click",function(){$("a.cTPSelectOpen",$wrapper).click();});
			
			//click on label bound to select gives only focus, on regular elements, but there is no point to it here
			/*$("label[for="+$select.attr('id')+"]").on("click",function()
			{
				$("a.cTPSelectOpen",$wrapper).focus(); //click on select
				return false; //prevent default action since we did it manually
			});*/
			
			/* Apply the click handler to the Open */
			var oLinkOpen = $('a.cTPSelectOpen', $wrapper)
				.on("click",function(){
					//Check if box is already open to still allow toggle, but close all other selects
					if( $ul.css('display') == 'none' ) {cTPHideSelect();} 
					if($select.attr('disabled')){return false;}

					$ul.slideToggle('fast', function(){					
						var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
						$ul.animate({scrollTop: offSet});
					});
					return false;
				});

			// Set the new width
			var iSelectWidth = $select.outerWidth()+20;
			var oSpan = $('span:first',$wrapper);
			var newWidth = (iSelectWidth > oSpan.innerWidth())?iSelectWidth+oLinkOpen.outerWidth():$wrapper.width();
			$wrapper.css('width',newWidth);
			$ul.css('width',newWidth);
			oSpan.css({width:iSelectWidth});
		
			// Calculate the height if necessary, less elements that the default height
			// show the ul to calculate the block, if ul is not displayed li height value is 0
			$ul.css({display:'block',visibility:'hidden'});
			var iSelectHeight = ($('li',$ul).length)*($('li:first',$ul).height());//+1 else bug ff
			(iSelectHeight < $ul.height()) && $ul.css({height:iSelectHeight,'overflow':'hidden'});//hidden else bug with ff
			$ul.css({display:'none',visibility:'visible'});
			
		});
	};

	//style every element with appropriate class
	$.fn.cTP = function()
	{
			$('.transpie input:checkbox, input:checkbox.transpie',$(this).parent()).cTPCheckBox();
			$('.transpie input:radio, input:radio.transpie',$(this).parent()).cTPRadio();
			$('.transpie [title], [title].transpie',$(this).parent()).cTPTitle();
			
			if( $('.transpie select, select.transpie',$(this).parent()).cTPSelect().length > 0 ){cTPAddDocumentListener();}
			
			//catch reset in a form (if there is one in our element) - we have to reset our elements manually
			$('form',this).on('reset',function(){ cTPReset(this)});

	};/* End the Plugin */

})(jQuery);

//call the main function
$(function() 
{
	$(".transpie").cTP();
});