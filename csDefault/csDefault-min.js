(function(a){a.fn.outerHTML=function(){$t=a(this);return"outerHTML"in $t[0]?$t[0].outerHTML:$t.clone().wrap("<p>").parent().html()};a.fn.csInfo=function(b,c){var d="cs-gradient-blue",e=2500;b&&c?(d=b,e=c):b&&(isNaN(b)?d=b:e=b);var f=a(this).outerHTML();a("#csInfoDiv").length&&a("#csInfoDiv").remove();d=a('<div id="csInfoDiv"><div id="csInfoDivInner" class="'+d+'">'+f+"</div></div>");a("body").append(d).find("#csInfoDiv").slideDown("fast").delay(e).slideUp("fast",function(){a(this).remove()});a("#csInfoDiv").on("click",function(b){a("#csInfoDiv").css({display:"none"});elementClicked=document.elementFromPoint(b.clientX,b.clientY);a("#csInfoDiv").css({display:"block"});a(elementClicked).click()})};a.fn.csDialog=function(b){b||(b="cs-gradient-grey");b=a(this).outerHTML();a("#csDialogDiv").length&&a("#csDialogDiv").remove();var c=a('<div id="csDialogDiv"><div id="csDialogDivInner" class="cs-gradient-grey">'+b+'<hr/><a href="#" id="csDialogDivClose">\u00d7</a></div></div>');a("body").append(c).find("#csDialogDiv").show();a("#csDialogDiv").on("click","#csDialogDivClose",function(){c.remove();return!1});a(document).keyup(function(b){27==b.keyCode&&a("#csDialogDivClose").click()});a("#csDialogDiv").csUpdate();return c};a.fn.csCheckBox=function(){return this.each(function(){var b=a(this);if(null==b.data("val")){b.addClass("csOpaque");b.data("val",this.checked);var c=a('<span class="csCheckboxElem"></span>');b.wrap('<span class="csCheckbox"></span>').parent().prepend(c);this.checked&&c.addClass("csChecked");b.on("change",function(){this.checked&&c.addClass("csChecked")||c.removeClass("csChecked")})}})};a.fn.csRadio=function(){return this.each(function(){var b=a(this);if(null==b.data("val")){b.addClass("csOpaque");b.data("val",this.checked);var c=a('<span class="csRadioElem"></span>');b.wrap('<span class="csRadio"></span>').parent().prepend(c);this.checked&&c.addClass("csCheckedR");b.on("change",function(){c.addClass("csCheckedR");a('input[name="'+b.attr("name")+'"]',this.form).not(b).each(function(){"radio"==a(this).attr("type")&&a(this).prev().removeClass("csCheckedR")})})}})};a.fn.csFile=function(){return this.each(function(){var b=a(this);if(!b.hasClass("csHiddenFile")){var c="";b.attr("title")&&(c='title="'+b.attr("title")+'"',b.removeAttr("title"));var d="";b.attr("placeholder")&&(d='placeholder="'+b.attr("placeholder")+'"',b.removeAttr("placeholder"));buttonText="Browse";b.data("button")&&(buttonText=b.data("button"));b.addClass("csHiddenFile").wrap("<span "+c+" "+d+' class="csFile"></span>').parent().prepend('<input readonly="readonly" type="text" class="csFileInput" /></span><input type="button" value="'+buttonText+'" />');b.attr("disabled")&&b.parent().find("input").addClass("csDisabled");a(b.parent()).on("click","input[type=button]",function(){a("input[type=file]",a(this).parent()).click()});b.on("click",function(){if(a(this).attr("disabled"))return!1});b.on("change",function(){a(".csFileInput",a(this).parent()).val(a(this).val().split("\\").pop())})}})};a.fn.csSelect=function(){return this.each(function(){var b=a(this);if(!b.data("styled")&&(b.css("width",b.outerWidth()+30+"px"),!b.attr("multiple"))){b.addClass("csOpaque");b.wrap('<span class="csSelect"></span>').parent().prepend('<span class="csSelectBar">'+a("option:selected",b).text()+'</span><span class="csSelectOpen">&#9660;</span>');b.attr("disabled")&&$wrapper.addClass("csDisabled");var c=b[0].className;if("-1"!=c.indexOf("cs-"))for(var c=c.replace(/\s\s+/g," ").split(" "),d=0,e=c.length;d<e;d++)"-1"!=c[d].indexOf("cs-")&&(b.removeClass(c[d]),b.parent().addClass(c[d]));b.on("change",function(){a(".csSelectBar",a(this).parent()).text(a("option:selected",a(this).parent()).text())});b.data("styled","1")}})};a.fn.csTitle=function(){return this.each(function(){var b=a(this),c=b.attr("title");b.removeAttr("title");b.hover(function(){var d=b.width(),e=b.height(),f=b.offset(),g=a("<div class='csTitle'>"+c+"</div>");a("body").append(g).find(".csTitle").css({left:d/2+f.left-g.width()/2,top:e+f.top+5})},function(){a(".csTitle").remove()})})};a.fn.csPlaceholder=function(){return this.each(function(){var b=a(this),c=b.attr("placeholder");b.removeAttr("placeholder");if(b.is("select")&&!b.attr("multiple")||b.is("[type=radio]")||b.is("[type=checkbox]"))b=b.parent();b.wrap("<span class='csPlaceholder'></span>").parent().prepend("<span class='csPlaceholderInner cs-gradient-blue'>"+c+"</span><br/>")})};a.fn.csLabel=function(){return this.each(function(){label=a(this);label.data("styled")||("disabled"==a("#"+label.attr("for")).attr("disabled")&&label.addClass("csDisabled"),label.data("styled","1"))})};a.fn.csUpdate=function(){a(this).each(function(){a(":checkbox",this).csCheckBox();a(":radio",this).csRadio();a(":file",this).csFile();a("select",this).csSelect();a("label[for]",this).csLabel();a("form",this).on("reset",function(){var b=elem,c=0;a("select",b).each(function(){a("a:eq("+a(this).data("index")+")",a(".select"+c++ +" ul",b)).click()});a(":checkbox",b).each(function(){a(this).data("val")&&a("a",a(this).parent()).addClass("csChecked")||a("a",a(this).parent()).removeClass("csChecked")});a(":radio",b).each(function(){a(this).data("val")&&a("a",a(this).parent()).addClass("csCheckedR")||a("a",a(this).parent()).removeClass("csCheckedR")});a(":file",b).each(function(){a(this).val("");a(".csFileInput",a(this).parent()).html("&nbsp;")})});a("[placeholder]",this).csPlaceholder();a("[title]",this).csTitle()})}})(jQuery);$(function(){$("body").csUpdate()});