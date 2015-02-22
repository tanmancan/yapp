

var yapp = new function(){

	// Default settings
	this.opts = {
		'contW': 			'100vw',
		'contH': 			(100/3) + 'vh',
		'contOverflow': 	'hidden',
		'imgW' : 			'100vw',
		'imgH' : 			100 + 'vh',
		'imgPosTop' : 		-50 + 'vh',
		'imgPosBottom' : 	'',
		'bgSize' : 			'cover',
		'posAbs' : 			'absolute',
		'posRel' : 			'relative'
	};

	// Retrieve all yapp elements
	this.yappContainerBlocks = document.querySelectorAll('[data-yapp-img]');

	// Image elements
	this.yappImgBlock = [];
	this.yappImgBottom = '';
    this.yappImgTop =  '';
    this.yappImgPos = '';

	// RAF
	this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	this.ticking = false;

	// Setup yapp elements
	this.setupContainer = function() {

		// Setup up styles for each yapp elements
		for(var i = 0; i < this.yappContainerBlocks.length; i++){
			var el = this.yappContainerBlocks[i],
				imgSrc = el.getAttribute('data-yapp-img');


				// Setup yapp element container
				this.setupContainerStyle(el);
				// Setup yapp element background image
				this.setupImg(imgSrc, el);

				this.yappImgBottom =  el.getBoundingClientRect().bottom;
			    this.yappImgTop =  el.getBoundingClientRect().top;
			    this.yappImgPos = -((this.yappImgBottom - window.outerHeight) / window.outerHeight) * 300;

		}	
		return this;
	};

	// Add container styles
	this.setupContainerStyle = function(el) {

	    el.style.width = this.opts.contW;
	    el.style.height = this.opts.contH;
	    el.style.overflow = this.opts.contOverflow;
	    el.style.position = this.opts.posRel;

		return this;
	};

	// Create and add image elements to container
	this.setupImg = function(imgSrc, el) {
		
		var imgBlock = document.createElement('div');

		this.setupImgStyle(imgBlock, imgSrc);
		
		el.appendChild(imgBlock);
		
		this.yappImgBlock.push(imgBlock);

		return this;
	};

	// Add image element styles
	this.setupImgStyle = function(el, img) {

		el.style.background = 'url(' + img + ') center center no-repeat';
	    el.style.width = this.opts.imgW;
	    el.style.height = this.opts.imgH;
	    el.style.backgroundSize = this.opts.bgSize;
	    el.style.position = this.opts.posAbs;
	    el.style.top = this.opts.imgPosTop;
	    el.style.bottom = this.opts.imgPosBottom;

	    return this;
	};

	this.onScroll = function() {

		for(var i = 0; i < yapp.yappContainerBlocks.length; i++){
			var el = yapp.yappContainerBlocks[i];

			this.yappImgBottom =  el.getBoundingClientRect().bottom;
		    this.yappImgTop =  el.getBoundingClientRect().top;
		    this.yappImgPos = -((this.yappImgBottom - window.outerHeight) / window.outerHeight) * 300;

		    var elImg = yapp.yappImgBlock[i];
				
			    elImg.style.transform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)';


			    if(elImg.hasOwnProperty('webkitTransform')){
			    	elImg.style.webkitTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
			    }else if(elImg.hasOwnProperty('mozTransform')){
			    	elImg.style.mozTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
			    }
	            else if(elImg.hasOwnProperty('msTransform')){
	            	elImg.style.msTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
	            }
	            else if(elImg.hasOwnProperty('oTransform')){
	            	elImg.style.oTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
	            }
	            else if(elImg.hasOwnProperty('transform')){
	            	elImg.style.transform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
	            }

		    
		}
		return this;
	};

	this.yappScroll = function() {

		for(var i = 0; i < yapp.yappImgBlock.length; i++){
				var el = yapp.yappImgBlock[i];

			    if(el.hasOwnProperty('webkitTransform')){
			    	el.style.webkitTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
			    }else if(el.hasOwnProperty('mozTransform')){
			    	el.style.mozTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
			    }
	            else if(el.hasOwnProperty('msTransform')){
	            	el.style.msTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
	            }
	            else if(el.hasOwnProperty('oTransform')){
	            	el.style.oTransform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
	            }
	            else if(el.hasOwnProperty('transform')){
	            	el.style.transform = 'translate3d(0px,' + this.yappImgPos + 'px, 0px)'
	            }
			}


		if(yapp.yappImgTop <= window.outerHeight && yapp.yappImgBottom >= 0 && yapp.yappImgPos < 300 ){

			

	    }
	    this.ticking = false;
		return this;
	};

	this.requestTick = function() {
		// yapp.yappScroll();
		if(!this.ticking) {
	        yapp.requestAnimationFrame(yapp.yappScroll());
	        this.ticking = true;
	    }
		return this;
	};

	// Initiate yapp
	this.init = function() {
		this.setupContainer();

		return this;
	};

	this.init();
	return this;
}();

window.addEventListener('scroll', yapp.onScroll, false);
