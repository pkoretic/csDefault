/*
   based on csTransform http://www.dfc-e.com/metiers/multimedia/opensource/csTransform/
   
 * 30.01.2012 Petar Koretiæ
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
	var defaultOptions = {preloadImg:true};
	var cTPImgPreloaded = false;

	var cTPPreloadHoverFocusImg = function(strImgUrl) {
		//guillemets to remove for ie
		strImgUrl = strImgUrl.replace(/^url\((.*)\)/,'$1').replace(/^\"(.*)\"$/,'$1');
		var imgHover = new Image();
		imgHover.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-hover.$1');
		var imgFocus = new Image();
		imgFocus.src = strImgUrl.replace(/\.([a-zA-Z]*)$/,'-focus.$1');				
	};

	
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
		if(oLabel.attr('for')){return oLabel.css('cursor','pointer');} //only if it's label with id we make a pointer
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
	$.fn.jqTransCheckBox = function(){
		return this.each(function(){
			if($(this).hasClass('cTPHidden')) {return;}

			var $input = $(this);
			var inputSelf = this;

			//set the click on the label
			oLabel=cTPGetLabel($input);
			//oLabel && oLabel.click(function(){aLink.trigger('click');}); label with for="id" fires by browser
			
			var aLink = $('<a href="#" class="cTPCheckbox"></a>');
			
			$input.addClass('cTPHidden').wrap('<span class="cTPCheckboxWrapper"></span>').parent().prepend(aLink); //wrap and add the link
			//on change, change the class of the link
			$input.change(function(){
				inputSelf.checked && aLink.addClass('cTPChecked') || aLink.removeClass('cTPChecked');
				return true;
			});
			// Click Handler, trigger the click and change event on the input
			aLink.click(function(){
				
				//do nothing if the original input is disabled
				if($input.attr('disabled')){return false;}
				//trigger the envents on the input object
				$input.trigger('click').trigger('change');
				
				return false;
				
			});

			// set the default state
			inputSelf.checked && aLink.addClass('cTPChecked');		
		});
	};
	/***************************
	  Radio Buttons 
	 ***************************/	
	$.fn.jqTransRadio = function(){
		return this.each(function(){
			if($(this).hasClass('cTPHidden')) {return;}

			var $input = $(this);
			var inputSelf = this;
			
				
			oLabel = cTPGetLabel($input);
			oLabel && oLabel.click(function(){aLink.trigger('click');});
	
			var aLink = $('<a href="#" class="cTPRadio" rel="'+ this.name +'"></a>');
			
			$input.addClass('cTPHidden').wrap('<span class="cTPRadioWrapper"></span>').parent().prepend(aLink);
			
			$input.change(function(){
				inputSelf.checked && aLink.addClass('cTPCheckedR') || aLink.removeClass('cTPCheckedR');
				return true;
			});
			// Click Handler
			aLink.click(function(){
				if($input.attr('disabled')){return false;}
				$input.trigger('click').trigger('change');
	
				// uncheck all others of same name input radio elements
				$('input[name="'+$input.attr('name')+'"]',inputSelf.form).not($input).each(function(){
					$(this).attr('type')=='radio' && $(this).trigger('change');
				});
	
				return false;					
			});
			// set the default state
			inputSelf.checked && aLink.addClass('cTPCheckedR');
		});
	};
	

	
	/***************************
	  Select 
	 ***************************/	
	$.fn.jqTransSelect = function(){
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
			$wrapper.prepend('<div><span></span><a href="#" class="cTPSelectOpen"></a></div><ul></ul>');
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
	$.fn.cTP = function(options){
		var opt = $.extend({},defaultOptions,options);
		
		/* each group of element */
		 return this.each(function(){
		
			$('input:checkbox', this).jqTransCheckBox();
			$('input:radio', this).jqTransRadio();
			
			if( $('select', this).jqTransSelect().length > 0 ){cTPAddDocumentListener();}
			$(this).bind('reset',function(){var action = function(){cTPReset(this);}; window.setTimeout(action, 10);});

		}); /* End  each */
				
	};/* End the Plugin */

})(jQuery);

//call the main function
$(function() {$(".transpie").cTP();});				   