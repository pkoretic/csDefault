(function(a){var j={preloadImg:!0},h=function(b){var c=a(b.get(0).form),d=b.next();d.is("label")||(d=b.prev(),d.is("label")&&(b=b.attr("id"))&&(d=c.find('label[for="'+b+'"]')));return d.attr("for")?d.css("cursor","pointer"):!1},i=function(b){a(".cTPSelectWrapper ul:visible").each(function(){var c=a(this).parents(".cTPSelectWrapper:first").find("select").get(0);(!b||!(c.oLabel&&c.oLabel.get(0)==b.get(0)))&&a(this).hide()})},k=function(b){0===a(b.target).parents(".cTPSelectWrapper").length&&i(a(b.target))},
l=function(b){var c;a(".cTPSelectWrapper select",b).each(function(){c=0>this.selectedIndex?0:this.selectedIndex;a("ul",a(this).parent()).each(function(){a("a:eq("+c+")",this).click()})});a("a.cTPCheckbox, a.cTPRadio",b).removeClass("cTPChecked");a("input:checkbox",b).each(function(){this.checked&&a("a",a(this).parent()).addClass("cTPChecked")});a("input:radio",b).each(function(){this.checked&&a("a",a(this).parent()).addClass("cTPCheckedR")})};a.fn.jqTransCheckBox=function(){return this.each(function(){if(!a(this).hasClass("cTPHidden")){var b=
a(this),c=this;oLabel=h(b);var d=a('<a href="#" class="cTPCheckbox"></a>');b.addClass("cTPHidden").wrap('<span class="cTPCheckboxWrapper"></span>').parent().prepend(d);b.change(function(){c.checked&&d.addClass("cTPChecked")||d.removeClass("cTPChecked");return!0});d.click(function(){if(b.attr("disabled"))return!1;b.trigger("click").trigger("change");return!1});c.checked&&d.addClass("cTPChecked")}})};a.fn.jqTransRadio=function(){return this.each(function(){if(!a(this).hasClass("cTPHidden")){var b=a(this),
c=this;(oLabel=h(b))&&oLabel.click(function(){d.trigger("click")});var d=a('<a href="#" class="cTPRadio" rel="'+this.name+'"></a>');b.addClass("cTPHidden").wrap('<span class="cTPRadioWrapper"></span>').parent().prepend(d);b.change(function(){c.checked&&d.addClass("cTPCheckedR")||d.removeClass("cTPCheckedR");return!0});d.click(function(){if(b.attr("disabled"))return!1;b.trigger("click").trigger("change");a('input[name="'+b.attr("name")+'"]',c.form).not(b).each(function(){"radio"==a(this).attr("type")&&
a(this).trigger("change")});return!1});c.checked&&d.addClass("cTPCheckedR")}})};a.fn.jqTransSelect=function(){return this.each(function(b){var c=a(this);if(!c.hasClass("cTPHidden")&&!c.attr("multiple")){var d=h(c),f=c.addClass("cTPHidden").wrap('<div class="cTPSelectWrapper"></div>').parent().css({zIndex:100-b});f.prepend('<div><span></span><a href="#" class="cTPSelectOpen">&#9660;</a></div><ul></ul>');var e=a("ul",f).css("width",c.width()).hide();a("option",this).each(function(b){b=a('<li><a href="#" index="'+
b+'">'+a(this).html()+"</a></li>");e.append(b)});e.find("a").click(function(){a("a.selected",f).removeClass("selected");a(this).addClass("selected");c[0].selectedIndex!=a(this).attr("index")&&(c[0].selectedIndex=a(this).attr("index"),a(c[0]).trigger("change"));c[0].selectedIndex=a(this).attr("index");a("span:eq(0)",f).html(a(this).html());e.hide();return!1});a("a:eq("+this.selectedIndex+")",e).click();a("span:first",f).click(function(){a("a.cTPSelectOpen",f).trigger("click")});d&&d.click(function(){a("a.cTPSelectOpen",
f).trigger("click")});this.oLabel=d;var g=a("a.cTPSelectOpen",f).click(function(){"none"==e.css("display")&&i();if(c.attr("disabled"))return!1;e.slideToggle("fast",function(){var b=a("a.selected",e).offset().top-e.offset().top;e.animate({scrollTop:b})});return!1}),b=c.outerWidth()+20,d=a("span:first",f),g=b>d.innerWidth()?b+g.outerWidth():f.width();f.css("width",g);e.css("width",g-2);d.css({width:b});e.css({display:"block",visibility:"hidden"});b=a("li",e).length*a("li:first",e).height();b<e.height()&&
e.css({height:b,overflow:"hidden"});e.css({display:"none",visibility:"visible"})}})};a.fn.cTP=function(b){a.extend({},j,b);return this.each(function(){a("input:checkbox",this).jqTransCheckBox();a("input:radio",this).jqTransRadio();0<a("select",this).jqTransSelect().length&&a(document).mousedown(k);a(this).bind("reset",function(){window.setTimeout(function(){l(this)},10)})})}})(jQuery);$(function(){$(".transpie").cTP()});