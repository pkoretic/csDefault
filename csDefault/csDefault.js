/*=====================================================================================================================
 * 
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 2 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    See <http://www.gnu.org/licenses/> for a licence copy or more info.
 * 
 *======================================================================================================================
 *
 *    csDefault
 *    library to make elements looks the same in all browsers
 *   
 *    Copyright (C) 2013 Petar Koretic <mail@pkoretic.net>
 *
 =======================================================================================================================*/

(function($){

  /*=============================================================================================================================================
    JQUERY outerHTML implementation - my post on http://stackoverflow.com/a/11708139/1176448
    ==============================================================================================================================================*/
  $.fn.outerHTML = function() 
  {
    $t = $(this);
    if( "outerHTML" in $t[0] ) return $t[0].outerHTML;
    else return $t.clone().wrap('<p>').parent().html();
  }

/*=============================================================================================================================================
  SIMPLE NOTIFICATIONS | multiple notifications support
  .csInfo("class",2500);
  .csInfo("class");
  .csInfo(2500);
  ==============================================================================================================================================*/
var csInfoID=0;
$.fn.csInfo = function(arg1,arg2) 
{
  ++csInfoID;
  //background class and time after which notification will hide
  var bkgclass="cs-gradient-blue";
  var duration=2500;

  if(arg1&&arg2) (bkgclass=arg1) && (duration=arg2);
  else arg1 && (isNaN(arg1) && (bkgclass=arg1) || (duration=arg1));

  // get our message with all html it has
  var msg = $(this).outerHTML();

  //create our simple notification holder
  var html = $('<div id="csInfoDiv'+csInfoID+'"><div id="csInfoInner" class="'+bkgclass+'">'+msg+'</div></div>');

  //append message to body, add class, show it with animation, wait, hide it, remove it after hide animation finishes
  $div=$("body").append(html).find('div[id^="csInfoDiv"]');
  $div.addClass("csInfoDiv");
  $div.slideDown("fast").delay(duration).slideUp("fast",function(){$(this).remove()});
  $div.hover(function() { $(this).css("opacity","0.5");},
             function() { $(this).css("opacity","1");  });

}
/*=============================================================================================================================================
  DIALOG
  ==============================================================================================================================================*/
$.fn.csDialog = function(bkgclass) 
{
  // default background class | we allow user to provide their class
  bkgclass||(bkgclass="cs-gradient-grey");

  //get our data with all html it has
  var msg = $(this).outerHTML();

  // remove current dialog if there is one
  $("#csDialogDiv").length && $("#csDialogDiv").remove();

  // create our simple dialog holder and run cs library on it
  var html = $('<div id="csDialogDiv"><div id="csDialogDivInner" class="'+bkgclass+'">'+msg+'<hr/><a href="#" id="csDialogDivClose">x</a></div></div>');

  // append dialog to body, show it (no animation - arent consistent nor fast across browsers)
  $("body").append(html).find("#csDialogDiv").show();

  // when x clicked, remove dialog
  $("#csDialogDiv").on("click","#csDialogDivClose",function()
      {
        $("#csDialogDiv").remove();
        return false;
      });

  // close also on escape
  $(document).keyup(function(e) 
      {
          (e.keyCode == 27) && $("#csDialogDivClose").click();
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
var csReset = function(f)
{
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

}; //var csReset = function(f)

/*=============================================================================================================================================
  CHECKBOX
  ==============================================================================================================================================*/

$.fn.csCheckBox = function()
{
  return this.each(function()
  {
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
         //if checkbox isn't checked, add checked class, else remove checked class (from created element)
         this.checked && $(this).prev().addClass('csChecked') || $(this).prev().removeClass('csChecked');
     });

  });
};

/*=============================================================================================================================================
  RADIO
  ==============================================================================================================================================*/

$.fn.csRadio = function()
{
  return this.each(function()
  {
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
          $(this).prev().addClass('csCheckedR');
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
$.fn.csFile = function()
{
  return this.each(function(index)
  {
      var file=$(this);

      if(file.hasClass('csHiddenFile')) return; //if it's already processed return

      var title="";
      file.attr("title") && (title='title="'+file.attr("title")+'"') && file.removeAttr("title");

      buttonText="Browse"; //default input file button value
      if(file.data('button'))buttonText=file.data('button'); //if there is text for our button set, use that instead
      file.addClass('csHiddenFile').wrap('<span '+title+' class="csFile"></span>').parent().prepend('<input readonly="readonly" type="text" class="csFileInput" /></span><input type="button" value="'+buttonText+'" />'); //hide original element and create our new element

      file.attr('disabled') && file.parent().find("input").addClass("csDisabled");

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
};//file function

/*=============================================================================================================================================
  TITLE
  ==============================================================================================================================================*/

$.fn.csTitle = function()
{
  return this.each(function()
      {
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
        (function()
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
$.fn.csPlaceholder = function()
{
  return this.each(function()
      {
        var element=$(this);

        var placeholderText = element.attr('data-placeholder');
        var placeholderClass = element.attr('data-placeholder-theme');
        placeholderClass||(placeholderClass="cs-gradient-white");

        // if elements is one of our modified elements - we wrapped them with parent tag so we must add placeholder outside that parent tag
        if(element.is("[type=radio]")||element.is("[type=checkbox]")||element.is("[type=file]")) element=element.parent();

        element.wrap("<span class='csPlaceholder'></span>").parent().prepend("<span class='csPlaceholderInner "+placeholderClass+"'>"+placeholderText+"</span><br/>");

      });// each

}// function
/*=============================================================================================================================================
  LABELS
  ==============================================================================================================================================*/

$.fn.csLabel = function()
{
  return this.each(function()
  {
    label=$(this);
    if(label.data("styled")) return; //if we already processed this label return
    //if element corresponding to this label is disabled..."disable" this label (browser will disable it, we add class)
    if($("#"+label.attr("for")).attr("disabled")=="disabled") label.addClass("csDisabled");
    
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
        $("label[for]",this).csLabel(); //process only labels bound to element

        $('form',this).on('reset',function(){ csReset(elem)}); //catch reset in a form (if there is one in our element) - we have to reset our elements manually
        $('[data-placeholder]',this).csPlaceholder(); // placeholder is also html5 specific so we make our own
        $('[title]',this).csTitle(); //has to be last since we are adapting titles in elements before
      });

};/* End the Plugin */

})(jQuery);

//call the main function | remove this if you don't want styles to be added automatically for  elements above
$(function()  { $("body").csUpdate(); });
