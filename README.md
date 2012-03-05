<h1>
      csTransPie
</h1>

[Official site and demo: http://www.pkoretic.net/csTransPie](http://www.pkoretic.net/csTransPie)  
30.01.2012 - started  
02.03.2012 - whole library rewritten

**Development**  
It is and it will always be under active development. 
New page and domain are in progress.

It's designed as a **very lightweight** cross-browser CSS(3) library which would give all elements styling they need  
It's less than **14kb minified - 3kb gzipped** 

(note: jquery 1.7 is needed )

All elelemts are regular html elements with style applied - **no html breaking!**  
elements are only styled and 'fixed' to be cross browser compatible 

All elements are created with CSS(3) without images (still, I like radio and checkboxes more with background images so they are using it - 673 bytes in size)

<h1>
      Cross-browser
</h1>
**try it in IE**! Notice how everything looks the same as in other browsers - using CSS!  
(Note that css3PIE is not used anymore, see the CSS file for details)  
Tested in Chrome, Firefox 5+, Opera, IE 7+, Android 2.3, Opera Mobile, Firefox Mobile, Safari 5 - **please test** more and **report back**!  
Note: Opera mini has opacity problems which makes 'select element' having two text options (I've opted to using less javascript which makes library faster and cleaner so this is the side effect of CSS solution)


All suggestions are welcome.  

Download 
=======================   
Download it here from git and add  

      <link rel="stylesheet" type="text/css" href="csTransPie/csTransPie.min.css" />  
      <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>  
      <script type="text/javascript" src="csTransPie/csTransPie-min.js"></script>  

And that's it!  
  

**csTransPie** has all the comments for easier development  
**csTransPie-min** is obviously minified version
**csHelper** is just a collection of classess for gradients and round borders for easier development and it's completely optional  


Usage
=======================  
Just include it in your code and that's it!

**Dynamic elements**  
If you have elements created dynamically call jquery function on parent element which was created dynamically

      $("body").append('<div id="dynamic"><input type="checkbox"/></div>');  
      $("#dynamic").cTP();
            
Note: Calling .cTP function on any sort of text fields or buttons is not needed for the sake of element styling but there are titles and labels for that element that won't get styled unless you do call it.

TODO
========================
Broad testing with dynamic elements  
New page and demos  
Themes - since we are using CSS themeing is quite easy (consider it as an optional file)  