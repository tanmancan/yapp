

var yapp = new function(){

	// Default settings
	this.opts = {
		'contW': 			'100vw',
		'contH': 			(100/3) + 'vh',
		'contOverflow': 	'hidden',
		'imgW' : 			'100vw',
		'imgH' : 			'100vh',
		'imgPosTop' : 		'0',
		'imgPosBottom' : 	'',
		'bgSize' : 			'cover'
	};

	// Retrieve all yapp elements
	this.yappContainerBlocks = document.querySelectorAll('[data-yapp-img]');

	// Image elements
	this.yappImgBlock = [];
	this.yappImgBottom = '';
	this.yappImgTop = '';
	this.yappImgPos = '';

	// RAF
	this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	this.ticking = false;

	// Setup yapp elements
	this.setupContainer = function() {

		// Setup up styles for each yapp elements
		for(var i = 0; i < this.yappContainerBlocks.length; i++){
			var el = this.yappContainerBlocks[i],
				imgSrc = el.getAttribute('data-yapp-img'),
				imgBlock = document.createElement('div');

				// Setup yapp element container
				this.setupContainerStyle(el);
				// Setup yapp element background image
				this.setupImg(imgBlock, imgSrc, el);

		}	
	};

	// Add container styles
	this.setupContainerStyle = function(el) {

	    el.style.width = this.opts.contW;
	    el.style.height = this.opts.contH;
	    el.style.overflow = this.opts.contOverflow;

	};

	// Create and add image elements to container
	this.setupImg = function(imgBlock, imgSrc, el) {
		
		this.setupImgStyle(imgBlock, imgSrc);
		
		this.yappImgBlock.push(imgBlock);
		this.yappImgBottom =  el.getBoundingClientRect().bottom;
	    this.yappImgTop =  el.getBoundingClientRect().top;
	    this.yappImgPos = -((this.yappImgBottom - window.outerHeight) / window.outerHeight) * 300;
		el.appendChild(imgBlock);
	};

	// Add image element styles
	this.setupImgStyle = function(el, img) {
		
		el.style.background = 'url(' + img + ') center center no-repeat';
	    el.style.width = this.opts.imgW;
	    el.style.height = this.opts.imgH;
	    el.style.backgroundSize = this.opts.bgSize;
	    el.style.top = this.opts.imgPosTop;
	    el.style.top = this.opts.imgPosBottom;

	    return this;
	};

	this.onScroll = function() {
		for(var i = 0; i < this.yappImgBlock.length; i++){
			var el = this.yappImgBlock[i];

			this.yappImgBottom =  el.getBoundingClientRect().bottom;
		    this.yappImgTop =  el.getBoundingClientRect().top;
		    this.yappImgPos = -((this.yappImgBottom - window.outerHeight) / window.outerHeight) * 300;
		    
		}
		return this;
	};

	this.yappScroll = function() {

	};

	this.requestTick = function() {
		if(!ticking) {
	        this.requestAnimationFrame(this.yappScroll());
	        ticking = true;
	    }
	};

	// Initiate yapp
	this.init = function() {
		this.setupContainer();

		console.log(this.yappContainerBlocks);
	};

	this.init();

}();

window.addEventListener('scroll', yapp.onScroll(), false);
