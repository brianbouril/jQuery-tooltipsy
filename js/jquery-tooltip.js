/*
* Tooltipsy jQuery UI Widget v1.0
*
* Copyright (c) 2012 Brian Bouril
*
* Dual licensed under the MIT and GPL licenses, located in
* MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
*
* Sun April 29 2012 09:27:29 GMT-0500 (CDT)
*/

(function( $ ) {

  $.widget( "M4.tooltip", {
 
    // These options will be used as defaults
    options: { 
      container : 'tooltips', //define the main container the menu will show in
      attribute : 'alt', //define the attribute to grab the tooltip text from
      boundry : window, //define the container the tooltip will be contained in, if using window do not pass as a string
      actionIn : 'mouseover', //define the action that will trigger the container create
      actionOut : 'mouseout', //define the action that will trigger the container destroy
      //positionType : 'toElement', //what to position tooltip to. Default is 'toElement', other option is 'toCursor' (not working yet)
      delay : 500 //delay between the tooltip triggering and it showing
    },
 
    /* EVENTS  

      * beforeLoad - called before tooltip is loaded
      * afterLoad - called on complete of tooltip loading

    */

    // Set up the widget
    _create: function() {
    	var _this = this,
			el = _this.element,
			ctxc = _this.options.container,
      active = false,
      timer;

			el.bind(_this.options.actionIn, function(e){
				  if (active == false){
              active = true;
              timer = setTimeout(function(){
                _this._loadContent();
                _this._posctxc(e);
              }, _this.options.delay);
          }
          // keeping incase I add the 'toCursor' option
          //_this._posctxc(e);
				
          $('body').one('click', function(){ 
				    _this._destroy();
				  });

			}).bind(_this.options.actionOut, function(e){
          clearTimeout(timer);
          active = false;
          _this._destroy();
      });

    },
 	  
    // Use the _setOption method to respond to changes to options
    _setOption: function( key, value ) {
      // In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
      $.Widget.prototype._setOption.apply( this, arguments );
      // In jQuery UI 1.9 and above, you use the _super method instead
      this._super( "_setOption", key, value );
    },

    _posctxc: function(e){
      var _this = this,
          el = _this.element,
          $ctxc = $('#'+_this.options.container),
          $bdry = $(_this.options.boundry),
          ctxcW = $ctxc.outerWidth(),
          ctxcH = $ctxc.outerHeight(),
          elH = el.outerHeight(),
          elW = el.outerWidth(),
          elL = el.offset().left,
          elT = el.offset().top,
          cY = e.clientY,
          cX = e.clientX,
          bdryW = $bdry.width(),
          bdryH = $bdry.height();

          if (_this.options.boundry === window){
            var bdryO = {'top': $bdry.scrollTop(), 'left': $bdry.scrollLeft()};
          }else {
            var bdryO = $bdry.offset();
          }
          //console.log($(window).scrollTop());
          //if (_this.options.positionType == "toCursor"){
          //    _this._posToCursor($ctxc, cX, ctxcW, bdryW, bdryO);
          //}else if (_this.options.positionType == "toElement"){
              _this._posToElement($ctxc, ctxcW, ctxcH, elT, elL, elW, elH, bdryW, bdryO);
          //}else { console.log('positionType option inncorrectly set') }
    },

    _posToElement: function($ctxc, ctxcW, ctxcH, elT, elL, elW, elH, bdryW, bdryO){
        var _this = this;
        // remove all classes related to positioning of the tooltip and carrot
        $ctxc.removeClass('left center right up down');
        
        // set left / center / right position of tooltip
        if (elL+elW+((ctxcW - elW) / 2) > bdryW) { // right align tooltip
          $ctxc.css({'left': Math.round(elL - (ctxcW - elW) - (elW/2)) }).addClass('right');

        }else if (elL - ((ctxcW - elW) / 2) < 0) { // left align tooltip over center of element
          $ctxc.css({'left': Math.round(elL + (elW/2)) }).addClass('left');
          
        }else { // Center the tooltip
          $ctxc.css({ 'left': Math.round(elL - ((ctxcW - elW) / 2)) }).addClass('center');
        }
        
        // set top / bottom position of tooltip
        if(elT - ctxcH < bdryO.top) { // bottom align tooltip if the 'bdry' top position is greater then the element and tooltip heights combined
          $ctxc.css({ 'top': Math.round(elT + elH) }).addClass('up');
        } else { // top align tooltip
          $ctxc.css({ 'top': Math.round(elT - ctxcH) }).addClass('down');
        }
    },
    /* //Currently not functional, commenting out to be removed in minified version
    _posToCursor: function($ctxc, cX, ctxcW, bdryW){
        var _this = this;
        // IF the cursor location and ctxc width exceed the window 
        // width position the menu to the left of the cursor, ELSE
        // position the menu to the right of the cursor
        if (cX+ctxcW > bdryW) {
          $ctxc.css({'left': cX - ctxcW});
        } else {
          $ctxc.css({'left': cX});
        }

        // IF the cursor location and menu height exceed the window 
        // height, position the menu above the cursor, ELSE
        // position the menu to the bottom of the cursor
        if(cY+ctxcH > bdryH) {
          $ctxc.css({'top':cY - ctxcH});
        } else {
          $ctxc.css({'top':cY});
        }
    },
    */
    _loadContent: function(){
    	var _this = this,
          el = _this.element,
          $ctxc = $('<div>', {id:_this.options.container, class:'tooltip'}).html(el.attr(_this.options.attribute)).appendTo('body');
      
      _this._trigger('beforeLoad');

      $ctxc.fadeIn(400);

      _this._trigger('afterLoad');

    },

    // Use the destroy method to clean up any modifications your widget has made to the DOM
    destroy: function() {
      // In jQuery UI 1.8, you must invoke the destroy method from the base widget
      $.Widget.prototype.destroy.call( this );
      // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method

    },

    _destroy: function(){
    	var _this = this,
          $ctxc = $('#'+_this.options.container);
    	$ctxc.remove();
    }

  });

}( jQuery ) );

