<h1>
      csTransPie
</h1>
inspired by jqtransform http://www.dfc-e.com/metiers/multimedia/opensource/jqtransform/   

[Official site and demo: http://www.pkoretic.net/csTransPie](http://www.pkoretic.net/csTransPie)

**Development**  
It is and it will always be under active development. Currently there are some major thing under development so be patient, see TODO list below.

It's designed as a cross-browser CSS3 library for styling - one .js/.css file which would give all elements styling they need
(a great library [css3Pie](http://css3pie.com/) is used for IE - please support it!)   
It's less than **10kb** in size (PIE.htc is 40kb)

(note: jquery 1.7 is needed and PIE.htc has to be in the same folder as the file that's executing! - index.html for example)

All elelemts are made like they should have been made - regular html elements but nicer - **no style breaking!**  

It started in 30.01.2012 and it's considered **stable**! Still, it's daily updated!  

All elements are created with CSS(3) without images (still, I like radio and checkboxes more with background images so they are using it (673 bytes in size)  
optional css is inclued in csTransPie.css if you want them to be CSS-only based)

<h1>
      Cross-browser
</h1>
**try it in IE**! Notice how everything looks the same as in other browsers - using CSS3!  
(Note that PIE.htc is used only by IE browsers, others ignore it)  
Tested in Chrome, Firefox 5+, Opera, IE 7+, Android 2.3, Opera Mini 6 - **please test** more and **report back**!


All suggestions are welcome.  

Download 
=======================   
Download it here from git and add  

      <link rel="stylesheet" type="text/css" href="csTransPie/csTransPie.css" />  
      <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>  
      <script type="text/javascript" src="csTransPie/csTransPie.js"></script>  
      
**csTransPie** and  **csTransPie-min** are provided.  
**csTransPie-min** is obviously minified version and it doesn't contain CSS-only code for radios and checkboxes. For that reffer to **csTransPie** which also contains comments for easier development.

Usage
=======================  
Just add **transpie** class to parent element  

      <div class="transpie"> <input type="text" /> <input type="button" value="nice"/> </div>  
      
or to one element  

      <input type="text" class="transpie" /> <input type="button" value="default"/>  
      
or call jquery function on (parent) element which was created dynamically - select, radio, checkbox 

      $(".transpie").cTP();  
            
TODO
========================
rewrite code for 'select' and 'label', clean .css, clean .js  
use dynamically added PIE.js or some other option - maybe rewrite PIE.js using jquery?  
input[type=file] - input field for upload obviously  
cs-bar - cross browser helper for creating a nice bar  
cs-body - cross browser helper for creating a nice body  
Themes - since we are using CSS themeing is quite easy