(function(a){a.fn.csInfo=function(){var b=a(this).clone().wrap("<p>").parent().html();a("#csInfoDiv").length&&a("#csInfoDiv").remove();b=a('<div id="csInfoDiv"><div id="csInfoDivInner" class="cs-gradient-blue">'+b+"</div></div>");a("body").append(b).find("#csInfoDiv").slideDown("fast").delay(2500).slideUp("fast",function(){a(this).remove()});a("#csInfoDiv").on("click",function(b){a("#csInfoDiv").css({display:"none"});elementClicked=document.elementFromPoint(b.clientX,b.clientY);a("#csInfoDiv").css({display:"block"});a(elementClicked).click()})};a.fn.csDialog=function(){var b=a(this).clone().wrap("<p>").parent().html();a("#csDialogDiv").length&&a("#csDialogDiv").remove();var c=a('<div id="csDialogDiv"><div id="csDialogDivInner" class="cs-gradient-grey">'+b+'<hr/><a href="#" id="csDialogDivClose">\u00d7</a></div></div>');a("body").append(c).find("#csDialogDiv").slideDown("fast");a("#csDialogDiv").on("click","#csDialogDivClose",function(){c.slideUp("fast",function(){a(this).remove()});return!1});a(document).keyup(function(b){27==b.keyCode&&a("#csDialogDivClose").click()});a("#csDialogDiv").on("click",function(b){a("#csDialogDiv").css({display:"none"});elementClicked=document.elementFromPoint(b.clientX,b.clientY);a("#csDialogDiv").css({display:"block"});a(elementClicked).click()})}})(jQuery);