<h1>
      csTransPie
</h1>
inspired and based on jqtransform http://www.dfc-e.com/metiers/multimedia/opensource/jqtransform/   

[Official site and demo: http://www.pkoretic.co.cc/csTransPie/demo.html](http://www.pkoretic.co.cc/csTransPie/demo.html)



It's designed as a crossbrowser CSS3 library for styling - one .js/.css file which would give all elements styling they need
(a great library css3Pie is used for IE)  

All elelemts are made like they should have been made - regular html elements but nicer - **no style breaking!**  

It started in 30.01.2012 and it's considered **stable**! Still, it's under development regularly!  

All elements are now created with CSS(3) (still, I like radio and checkboxes more with background images so they are using it - optional css is inclued in csTransPie.css)

<h1>
      Cross-browser
</h1>
**try it in IE**! Notice how everything looks the same as in other browsers - using CSS3!  
(Note that PIE.htc is used only by IE browsers, others ignore it)

Plan is to rewrite jqtransform parts to simpler CSS(3) and javascript counterpars (without images and as little javascript as posible), more than half of it was done already
All jqtransform elements are changed and behave like a normal html elements, no need anymore for special css or html hacks!  

<em>
      for now, select, input[type=checkbox], input[type=radio] all go through jqtransform, and they have been fixed so that all elements work as they were native
</em>  

All suggestions are welcome.  

Download
=======================
If you want to use it download it here from git and add  

      <link rel="stylesheet" type="text/css" href="csTransPie/csTransPie.css" />  
      <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>  
      <script type="text/javascript" src="csTransPie/csTransPie.js"></script>  
      
**csTranspie-min** is obviously minified version, also it doesn't contain css-only code for radios and checkboxes. For that reffer to **csTranspie**