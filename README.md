<h1>
      csTransPie
</h1>

[Official site and demo: http://www.pkoretic.net/csTransPie](http://www.pkoretic.net/csTransPie)  
It started in 30.01.2012

**Development**  
It is and it will always be under active development. 
Today, whole library has been updated. It was rewritten to use less javascript and to be as simple as possible.
New page and domain are in progress.

It's designed as a cross-browser CSS(3) library for styling - one .js/.css file which would give all elements styling they need  
It's less than **14kb minified** 

(note: jquery 1.7 is needed )

All elelemts are made like they should have been made - regular html elements but nicer - **no style breaking!** elements are only styled and 'fixed' to be cross browser compatible 

All elements are created with CSS(3) without images (still, I like radio and checkboxes more with background images so they are using it - 673 bytes in size)

<h1>
      Cross-browser
</h1>
**try it in IE**! Notice how everything looks the same as in other browsers - using CSS!  
(Note that css3PIE is not used anymore, see the CSS file for details)  
Tested in Chrome, Firefox 5+, Opera, IE 7+, Android 2.3, Opera Mini 6 - **please test** more and **report back**!


All suggestions are welcome.  

Download 
=======================   
Download it here from git and add  

      <link rel="stylesheet" type="text/css" href="csTransPie/csTransPie.min.css" />  
      <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>  
      <script type="text/javascript" src="csTransPie/csTransPie-min.js"></script>  
      
**csTransPie** and  **csTransPie-min** are provided  
**csTransPie** has all the comments for easier development  
**csTransPie-min** is obviously minified version

Usage
=======================  
Just include it in your code and thats it!

**Dynamic elements**
Call jquery function on (parent) element which was created dynamically

      $('<input type="text" value="I'm dynamic" />').cTP();  
            
TODO
========================
Broad testing with dynamic elements
New page and demos
Themes - since we are using CSS themeing is quite easy (consider it as an optional file)