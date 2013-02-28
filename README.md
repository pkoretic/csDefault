<h1>
      csDefault
</h1>

 
 
[Official site and demo: http://www.pkoretic.net/csDefault](http://www.pkoretic.net/csDefault)  
30.01.2012 - started  
05.08.2012 - renamed to csDefault (since CSS3PIE is not used anymore no point to have it called csTransPie - and it's shorter!)


**Development**  
It is and it will always be under active development.   
New page and domain are **still** in progress.  
Library is considered **stable**.   

It's designed as a **very lightweight** cross-browser CSS(3) library which would give all elements styling they need  
It's less than **14kb minified - 3kb gzipped** 

(note: jquery 1.7+ is needed - http://api.jquery.com/on/)

All elelemts are regular html elements with style applied - **no html breaking!**  
elements are only styled and 'fixed' to be cross browser compatible 

All elements are created with CSS(3) without images (still, I like radio and checkboxes more with background images so they are using it - 673 bytes in size)

<h1>
      Cross-browser
</h1>
**try it in IE**! Notice how everything looks the same as in other browsers - using CSS!  
(Note that css3PIE is not used anymore, see the CSS file for details)  
Tested in Chrome, Firefox 5+, Opera, IE 7+, Android 2.3, Opera Mobile, Firefox Mobile, Safari 5 - **please test** more and **report back**!  

All suggestions are welcome.  

Download and usage
=======================   
Download it here from git (https://github.com/pkoretic/csDefault/archive/master.zip) and add  

      <link rel="stylesheet" type="text/css" href="csDefault-min.css" />  
      <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>  
      <script type="text/javascript" src="csDefault-min.js"></script>  

And that's it! All element's will  get styled as soon as the DOM is ready  
  

**csDefault** has all the comments for easier development  
**csDefault-min** is obviously minified version  



**Dynamic elements**  
If you have elements created dynamically call csUpdate function on (parent) element which was created dynamically

recommended way
      
      $("body").append('<input type="checkbox"/>').csUpdate();

or

      $("body").append('<div id="dynamic"><input type="checkbox"/></div>');  
      $("#dynamic").csUpdate();
            
Note: Calling .csUpdate function on any sort of text fields or buttons is not needed for the sake of element styling but there are titles and labels for that element that won't get styled unless you do call it.

TODO
========================
New page and demos  



LICENCING
==================================================================================
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
