// The MIT License (MIT)

// Copyright (c) 2015 Tanveer Karim
// http://www.tkarimdesign.com/

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Contsruct yapp
var yapp = (function() {
    'use strict';

    var instance = {};

    // Default settings
    instance.opts = {
    	// Parallax modifiers
    	'scrollMod': 200,
    	'mobileBreakpoint': 1024,
        // Yapp container
        'contW': 100,
        'contH': (100 / 3),
        'contOverflow': 'visible',
        // Yapp image
        'imgW': 100,
        'imgH': 100,
        'imgPosTop': -50 + 'vh',
        'imgPosBottom': '',
        'bgSize': 'cover',
        // Styles
        'posAbs': 'absolute',
        'posRel': 'relative'
    };

    // Retrieve all yapp elements
    instance.yappContainerBlocks = document.querySelectorAll('[data-yapp-img]');

    // RAF
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    instance.ticking = false;

    // Retrieve custom data-yapp settings
    instance.userOptions = function(el){
        var dataOpts = {};

        // Custom height
        dataOpts.contH = el.getAttribute('data-yapp-height') ? el.getAttribute('data-yapp-height') : null;
        
        return dataOpts;
    };

    // Setup yapp elements
    instance.setupContainer = function() {

        // Setup up styles for each yapp elements
        for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
            var el = instance.yappContainerBlocks[i],
                imgSrc = el.getAttribute('data-yapp-img');

            // Get data-yapp options
            instance.yappContainerBlocks[i].usrOpts = instance.userOptions(el);

            // Setup yapp element container
            instance.setupContainerStyle(el, instance.yappContainerBlocks[i].usrOpts);

            // Setup yapp element background image
            instance.setupImg(imgSrc, el, i);

        }
        return this;
    };

    // Add container styles
    instance.setupContainerStyle = function(el, usrOpts) {

        el.style.width = instance.opts.contW + 'vw';

        el.style.height = usrOpts.contH ? usrOpts.contH : instance.opts.contH + 'vh';
       

        el.style.overflow = instance.opts.contOverflow;
        el.style.position = instance.opts.posRel;

        return this;
    };

    // Create and add image elements to container
    instance.setupImg = function(imgSrc, el, i) {

        var imgBlock = document.createElement('div');

        instance.setupImgStyle(imgBlock, imgSrc);

        el.appendChild(imgBlock);

        // Add yapp image element as a property of yapp container element
        instance.yappContainerBlocks[i].yappImgBlock = imgBlock ;

        return this;
    };

    // Add image element styles
    instance.setupImgStyle = function(el, img) {

        el.style.background = 'url(' + img + ') center center no-repeat';
        el.style.width = instance.opts.imgW + 'vw';
        el.style.height = instance.opts.imgH + 'vh';
        el.style.backgroundSize = instance.opts.bgSize;
        el.style.position = instance.opts.posAbs;
        el.style.top = instance.opts.imgPosTop;
        el.style.bottom = instance.opts.imgPosBottom;

        return this;
    };

    // Scroll image
    instance.yappScroll = function() {

    	for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
            var el = instance.yappContainerBlocks[i];

            var containterBottom = el.getBoundingClientRect().bottom,
                containerTop = el.getBoundingClientRect().top,
                imagePosition = instance.caclImgPos(containterBottom, containerTop);

            // Get current yapp image element
            var elImg = instance.yappContainerBlocks[i].yappImgBlock;

            // Set some boundaries
			if (containerTop <= window.outerHeight && containterBottom >= 0 && imagePosition < instance.opts.scrollMod && window.matchMedia('(min-width: ' + instance.opts.mobileBreakpoint + 'px)').matches){
				// Check for vendor prefix
				if ('transform' in elImg.style) {
				    elImg.style.transform = 'translate3d(0px,' + imagePosition + 'px, 0px)';
				} else if ('mozTransform' in elImg.style) {
				    elImg.style.mozTransform = 'translate3d(0px,' + imagePosition + 'px, 0px)';
				} else if ('msTransform' in elImg.style) {
				    elImg.style.msTransform = 'translate3d(0px,' + imagePosition + 'px, 0px)';
				} else if ('oTransform' in elImg.style) {
				    elImg.style.oTransform = 'translate3d(0px,' + imagePosition + 'px, 0px)';
				} else if ('webkitTransform' in elImg.style) {
				    elImg.style.webkitTransform = 'translate3d(0px,' + imagePosition + 'px, 0px)';
				}
			}
            
        }

        instance.ticking = false;
        return this;
    };

    // Calculate image position
    instance.caclImgPos = function(cB, cT) {
        var pos;

        pos = -((cB - window.outerHeight) / window.outerHeight) * instance.opts.scrollMod;

        return pos;
    };

    // Run scroll transform
    instance.requestTick = function() {
    	
        if (!instance.ticking) {
       		// Update animation
            requestAnimationFrame(instance.yappScroll.bind(instance));
            instance.ticking = true;
        }
        return this;
    };

    // Initiate yapp
    instance.init = function() {
        instance.setupContainer();
        instance.yappScroll();
        window.addEventListener('scroll', instance.requestTick, false);

        return this;
    };

    instance.init();
    return instance;
})();


window.addEventListener('click', console.log(yapp), false);