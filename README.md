 <!DOCTYPE html>                                                                                                                                            
    <html>         
      <head>         
        <meta  http-equiv="content-type" content="text/html; charset=utf-8">
         <title>csDefault</title>                                                                    
         <link rel="stylesheet" type="text/css" href="csDefault.css" />    
      	 <link rel="shortcut icon" href="favicon.ico" />

         <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
         <script type="text/javascript" src="csDefault.js"></script>       
                                 
         <script type="text/javascript">                                    
          $(function()
          {
			 $("#notification").click(function()
			 {
				 $("<span>You were waiting for me?<hr/></span>").csInfo();
				 // You can use provided classes - csInfo("cs-gradient-red"); or your own class - csInfo("myclass");
				 return false;
			 });
			 
			  $("#dialog").click(function()
			 {
				 var html='<div class="cs-body"><h1>Where is that small guy?</h1>\
							<p><input type="text" size="50" value="I don\'t know but the guy above might know!" title="Nope..." /></p>\
							<br/>\
							<p class="cs-bar cs-gradient-yellow">Well...you can just close me with ESC key when you are bored enough...</p>\
							</div>';
						   
				 $(html).csDialog();
				 // You can again use provided classes - csDialog("cs-gradient-red"); or your own class - csDialog("myclass");
				 
				 return false;
			 });
			  
		  });                       
         </script>      
                                 
  </head>        
  <body class="cs-gradient-grey">                                    
	<div class="cs-gradient-blue cs-body">           
		<h1 class="cs-color-white" style="font-size:2.5em">csDefault</h1>                       
		<span>making elements as they should be... since 30.01.2012 (Chrome, Firefox 5+, Opera, IE 7+, Android 2.3+, Opera Mobile/Mini, Firefox Mobile, Safari 5)</span>                                  
    </div>     
                                 
    <div id="dTopMenu" class="cs-gradient-grey cs-body">
		<a class="cs-bar" href="https://github.com/pkoretic/csDefault/zipball/master">Download</a> 
		<a href="https://github.com/pkoretic/csDefault/issues"><strong>Report a bug!</strong></a>
		<a class="cs-bar" href="view-source:http://www.pkoretic.net/csDefault/" title="I won't work in every browser...just do it yourself!">View page source!</a>
		<a class="cs-float-right" href="https://github.com/pkoretic/csDefault">Follow project on Github!</a>
    </div>                                                    
    
	<div id="dMainContent" class="cs-gradient-white">        
      
      <div class="cs-gradient-blue cs-bar cs-shadow-bottom cs-corner-bottom "><p class="cs-color-white">Regular elements (plain CSS)</p></div>
      <br/>
	  <p class="cs-bar cs-gradient-yellow cs-shadow-bottom cs-corner-all">With those elements you can do what you want since they are regular elements, just styled!</p>
      <div class="cs-body">
        <input type="button" value="Button" /> 
        <input type="button" class="cs-gradient-grey" title='class="cs-gradient-grey"' value="Button" />
        <input type="button" class="cs-gradient-grey cs-corner-all" title='class="cs-gradient-grey cs-corner-all"' value="Button" />
        <input type="button" class="cs-gradient-black cs-corner-all"  title='class="cs-gradient-black cs-corner-all"'  value="Button" />
        <input type="button" class="cs-gradient-red cs-corner-left"  title='class="cs-gradient-red cs-corner-left"'  value="Button" />
        <input type="button" class="cs-gradient-blue cs-corner-right"  title='class="cs-gradient-blue cs-corner-right"' value="Button" />
        <input type="button" class="cs-gradient-yellow cs-corner-top"  title='class="cs-gradient-yellow cs-corner-top"'  value="Button" />
        <input type="button" class="cs-gradient-white cs-corner-bottom"  title='class="cs-gradient-white cs-corner-bottom"'  value="Button" />
        <input type="button" class="cs-gradient-white cs-corner-all cs-shadow-bottom"  title='class="cs-gradient-white cs-corner-all cs-shadow-bottom"'  value="Button" />
		<input type="button" class="cs-gradient-black cs-corner-all cs-shadow-bottom"  title='class="cs-gradient-black cs-corner-all cs-shadow-bottom"'  value="Button" />
		<input type="button" class="cs-gradient-blue cs-corner-all cs-shadow-bottom"   title='class="cs-gradient-black cs-corner-all cs-shadow-bottom"'  value="Button" />
		<hr/>
		<input type="reset" value="Reset form button" />
		<hr/>
        <input type="text" value="Text field" />
        <input type="text" value="Text field with a title!" title="I have a fancy title" />
        <input type="text" value="Text field with a round borders" class="cs-corner-all" title='class="cs-corner-all"' />
        <input type="text" value="Text field" class="cs-corner-bottom" title='class="cs-corner-bottom"' />
        <input type="text" value="Text field" class="cs-corner-top" title='Well you know it by now...' />
        
        <hr/>
        <input type="text" value="Crossbrowser!" placeholder='placeholder="placeholder"'  title='placeholder="I am placeholder!"'/>
		<input type="text" value="Text field" disabled='disabled' placeholder='disabled="disabled"' />
        <input type="button" value="Normal button!" placeholder="On a button"/>
		
        <hr/>
        
        <textarea>Just a textarea</textarea>
        <textarea placeholder="I can have one too!">Just a textarea</textarea>
        <textarea title="Yes!">Even a title!</textarea>
		
		<hr/>
		
	<select placeholder="Just CSS!" multiple="multiple" >
		<option value="volvo">Volvo</option>
		<option value="saab">Saabsad </option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
	</select>
	<select placeholder="Multiple select" multiple="multiple" class="cs-gradient-blue">
		<option value="volvo">Volvo</option>
		<option value="saab">Saabsad </option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
	</select>
	<select placeholder="Multiple select" multiple="multiple" class="cs-gradient-grey">
		<option value="volvo">Volvo</option>
		<option value="saab">Saabsad </option>
		<option value="opel">Opel</option>
		
		<option value="opel">Opel</option>
	</select>
	<select placeholder="Multiple select" multiple="multiple" class="cs-gradient-red">
		<option value="volvo">Volvo</option>
		<option value="volvo">Volvo</option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
	</select><select placeholder="Multiple select" multiple="multiple" class="cs-gradient-white">
		<option value="volvo">Volvo</option>
		<option value="saab">Saabsad </option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
	</select><select placeholder="Multiple select" multiple="multiple" class="cs-gradient-yellow">
		<option value="volvo">Volvo</option>
		<option value="saab">Saabsad </option>
		<option value="opel">Opel</option>
		
		<option value="opel">Opel</option>
	</select>
	 <select placeholder="Multiple select" multiple="multiple" class="cs-gradient-black">
		<option value="volvo">Volvo</option>
		<option value="saab">Saabsad </option>
		<option value="opel">Opel and a long one</option>
		<option value="opel">Opel</option>
		<option value="opel">Opel</option>
	</select>
	<hr/>
	<table placeholder="Simple table styling">
		<tr><th>Heading 1</th><th>Heading 2</th></tr>
		<tr><td>Element</td><td>Element 2</td></tr>
		<tr><td>Element</td><td>Element 2</td></tr>
		<tr><td>Element</td><td>Element 2</td></tr>
		<tr><td>Element</td><td>Element 2</td></tr>
	</table>
      </div>
      
      <div class="cs-gradient-blue cs-bar cs-shadow-bottom cs-corner-bottom "><p class="cs-color-white">Upgraded elements - very light and fast (javascript and CSS)</p></div>
		<div class="cs-body">
      
        <select><option>I'm select...or just an option!</option><option>You found another one!</option><option>Try me on your smartphone!</option></select>
		<select class="cs-gradient-blue" ><option>cs-gradient-blue</option></select>
		<select class="cs-corner-all cs-gradient-black cs-shadow-bottom" ><option>cs-corner-all</option><option>cs-gradient-black</option><option>cs-shadow-bottom</option></select>
		<select placeholder="Choose your option"><option>option 1</option><option>You found another one!</option></select>
		<select disabled="disabled"><option>Disabled select</option></select>
		<br/>
        <hr/>
        <input type="checkbox"  id="check" /><label for="check" >Label - click me and I will check that box!</label><br/><br/>
		<input type="checkbox" placeholder="Click as you haven't before"  />
		<input type="checkbox" id="check2" placeholder='<label for="check2" >Placeholder - click me and I will check that box!</label>'  />
		
        <hr/>
        <form>
			<input type="radio"  name="radio" id="radio"  /> <label for="radio">I'm a radio</label>
			<input type="radio" name="radio" id="radio2" /> <label for="radio2">No you are not!</label>
			
		</form>
        <hr/>
		<input type="file" placeholder="File upload" />
		<input type="file" data-button="My text for file upload" />
		<input type="file" disabled="disabled" data-button="Disabled upload" />
		<hr/>
		<p class="cs-bar cs-gradient-yellow cs-shadow-bottom cs-corner-all">Placeholder is regular HTML tag! Normally it should be used only on text elements! <br/>
		However if you do use it as shown above it can contain anything that is a valid HTML and it is actually removed from original element so in reality it is valid HTML!</p>
        </div>
        
        <div class="cs-gradient-blue cs-bar cs-shadow-bottom cs-corner-bottom "><p class="cs-color-white">Simple addon elements - still very light and fast (javascript and CSS)</p></div>
		<div class="cs-body">
		<p>Notifications</p>
			<a href="#" id="notification">Click me and I'll show you something!</a>
			<hr/>
			<p>Dialogs</p>
			<a href="#" id="dialog">Click me and I'll beat that notification!</a>	
			<hr/>
			<p class="cs-bar cs-gradient-yellow cs-shadow-bottom cs-corner-all">You can see options in the page source or code source!<br/>
			Simply put, you can provide your own classes that you want as a background for those elements and you can provide duration:</p>
			<pre>.csInfo("cs-gradient-red cs-shadow-bottom cs-corner-all myclass yourclass");</pre>
			<pre>.csInfo("cs-gradient-black");</pre>
			<pre>.csInfo(5000);</pre>
			<pre>.csInfo("cs-gradient-black",5000);</pre>
						
		</div>
		
		<div class="cs-gradient-blue cs-bar cs-shadow-bottom cs-corner-bottom "><p class="cs-color-white">Crossbrowser gradients</p></div>
        <div class="cs-body">
			<div class="cs-gradient-grey cs-bar">I'm grey</div>
			<div class="cs-gradient-blue cs-bar">I'm blue</div>
			<div class="cs-gradient-black cs-bar">I'm black</div>
			<div class="cs-gradient-white cs-bar">I'm white mostly</div>
			<div class="cs-gradient-yellow cs-bar">I'm yellow</div>
			<div class="cs-gradient-red cs-bar">I'm red</div>
			<br/>
			<input type="button" class="cs-gradient-blue" value="I'm button with new gradient!" />
			<input type="button" class="cs-gradient-grey cs-corner-all" value="I'm button with new gradient and round corners!" />
        </div>
        

      <div class="cs-gradient-blue cs-bar cs-shadow-bottom cs-corner-bottom "><p class="cs-color-white">Helper classes</p></div>
      <div class="cs-body cs-gradient-grey">
		  <div class="cs-gradient-yellow cs-bar cs-corner-top">I'm yellow with round borders, some padding and I'll inform you that documentation is coming!</div>
		  <div class="cs-gradient-red cs-bar cs-shadow-bottom cs-corner-all">I'm red with round borders, some padding, bottom shadow and I'm telling you that documentation is coming!</div>
		  <div class="cs-body"><p>Very simple classes to make your life easier</p>
		  <hr/>
			<p>.cs-gradient-[black,blue,grey,white,yellow,red]</p>
			<p>.cs-shadow-[top,right,bottom,left]</p>
			<p>.cs.corner-[all,top,right,bottom,left]</p>
			<p>.cs-font-size-[default,small,medium,big]</p>
			<p>.cs-display-[none,block,inline,inline-block]</p>
			<p>.cs-position-[fixed,top,right,bottom,left]</p>
			<p>.cs-color-[black,white]</p>
			<p>.cs-float-[left,right]</p>
			<br/>
			<p>.cs-clear {clear: both}</p>
			<p>.cs-hidden{visibility:hidden}</p>
			<p>.cs-bar {padding: 5px 15px}</p>
			<p>.cs-body {padding: 15px 15px}</p>
			<p>.cs-width-max {width: 100%}</p>
			<p>.cs-width-half {width: 50%}</p>
			<p>.cs-center {text-align: center}</p>
			
			
		  </div>
	  </div>

	  
	    <div class="cs-gradient-blue cs-bar cs-shadow-bottom cs-corner-bottom "><p class="cs-color-white">FAQ</p></div>
		<div class="cs-body">
			<p><strong>What about documentation and examples?</strong></p>
			<p>Old page had more examples on how to use it. This page is new, written completely in <strong>csDefault</strong> to show how it can be used.<br/>
			Please look at the source if you have trouble or <a href="mailto:petar.koretic@gmail.com">send me an email!</a></p>
			<hr/>
			<p><strong>How can I exclude element from styling?</strong></p>
			<p>Since having separate class for every element adds bloat, csDefault library styles elements directly (jquery mobile does this partly for example).<br/>
			 Since not all elements can be styled directly (or are not because that doesn't provide enough style) you can exclude some elements from styling:<br/>
			 select, input[type=file], input[type=checkbox], input[type=radio]<br/>
			 To exclude them, in csDefault.js remove lines that are under "MAIN FUNCTION" comment (unminified version)
			 </p>
			 <hr/>
			 <p><strong>How can I prevent library from automatically loading when included?</strong></p>
			 <p>
			  Library is designed to be used that way. But if you don't want styles to be applied upon load, in csDefault.js remove:
			  <pre>$(function()  { $("body").csUpdate(); });</pre>
			  Note that this will only prevent extra styling on elements that are not 'Regular elements' as described above.
			 </p>
			 <hr/>
			 <p><strong>I have added content dynamically but not all my elements are styled?</strong></p>
			 <p>
			 This is normal behaviour since it would be too expensive to watch the DOM for changes.<br/>
			 Simply call .csUpdate() on newly generated content and you are good to go.
				<pre>$("body").append("&lt;select&gt;&lt;option&gt;Styled&lt;/option&gt;&lt;/select&gt;").csUpdate();</pre>
			 </p>
			 <hr/>
			 <p><strong>How about new cool features I've seen in other libraries?</strong></p>
			 <p>
			 Well...first, I want this library to be fast! To be fast as those elements were made by your browser!<br/>
			 But that can't be...so I made it fast! Very fast and light! With time features were added but the point was to always stay fast and light!<br/>
			 I have no problem with adding more features, and I want this library to be as complete as possible, but without bloat, unneeded styles, unneeded features <br/>
			 and in a year or two, I hope, (almost) all will be made with CSS3 only. (When IE8 retires for start)<br/><br/>
			 If there is a feature that you would like just <a href="mailto:petar.koretic@gmail.com">send me an email!</a>. I'll see what can I do about that!<br/>
			 Sometimes priorities change so I forget to include something that should have been there from the begining!<br/>
			 For others there are many cool (jquery) libraries around...
			 
			 </p>
			 
		</div>
	  
	  
	  
     </div><!-- dMainContent -->    
      



	  
  </body>        
</html>
