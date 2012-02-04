<h1>
      csTransPie
</h1>
inspired and based on jqtransform http://www.dfc-e.com/metiers/multimedia/opensource/jqtransform/   

[Official site and demo: http://www.pkoretic.co.cc/csTransPie](http://www.pkoretic.co.cc/csTransPie)



It's designed as a crossbrowser CSS3 library for styling - one .js/.css file which would give all elements styling they need
(a great library css3Pie is used for IE)   
It's less than **10kb** in size (PIE.htc is 40kb)

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


<em>
      for now, select, input[type=checkbox], input[type=radio] all go through original jquery code, and they have been fixed so that all elements work as they were native
</em>  

All suggestions are welcome.  

Download 

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
      
or call jquery function on (parent) element created dynamically (only needed for jqTransform - select, radio, checkbox)  

      $(".transpie").cTP();  
            
TODO
========================
input[type=file] - input field for upload obviously  
cs-bar - cross browser helper for creating a nice bar  
cs-body - cross browser helper for creating a nice body  
Themes - since we are using CSS themeing is quite easy