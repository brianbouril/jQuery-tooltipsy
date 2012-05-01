Tooltipsy is a Tooltip UI widget for jQuery
=================================================

Assign the desired tooltip text under the "alt" attribute of your HTML element and call Tooltipsy on that element, that's it!. To use a custom attribute for Tooltipsy just specify the attribute to use under the "attribute" option under the Tooltipsy settings. If you'd like to further customize Tooltipsy there are multiple other options available, just keep reading.

--------------------------------------------------------------------------------------

All available options with default settings and callbacks:

	$(selector).tooltip({
		container : 'tooltip', //define the id you'd like for the tooltip container
		attribute : 'alt', //define the attribute to grab the tooltip text from
		actionIn : 'mouseover', //define the action that will trigger the container create
		actionOut : 'mouseout', //define the action that will trigger the container destroy (will close no matter what on click of 'body')
		delay : 500, //delay between the tooltip triggering and it showing
		beforeLoad: function(){
			//callback before tooltip is loaded
		},
		afterLoad: function(){
			//callback after tooltip is loaded
		}
	});

--------------------------------------------------------------------------------------

Basic setup for Tooltipsy:
	
	<a href="#" alt="My tooltip text">element</a>

	<script type="text/javascript">

		$('a').tooltip();

	</script>

--------------------------------------------------------------------------------------

More customized setup for Tooltipsy resulting in the tooltips being confined to the boundry container:
	
	<div id="boundry-box">
		<div class="box1" data="box 1"></div>
		<div class="box2" data="box 2"></div>
		<div class="box3" data="box 3"></div>
		<div class="box4" data="box 4"></div>
	</div>

	<script type="text/javascript">

		$('#boundry-box div').tooltip({
 			boundry: '#boundry-box',
 			container: 'tooltip',
 			attribute: 'data'
 		});

	</script>

--------------------------------------------------------------------------------------

If you see any ways to make Tooltipsy better, or can think of options that would be handy just let me know.