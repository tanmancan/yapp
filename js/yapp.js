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
    	'scrollMod': 300,
    	'mobileBreakpoint': 1024,
        // Yapp container
        'contW': '100vw',
        'contH': (100 / 3) + 'vh',
        'contOverflow': 'hidden',
        // Yapp image
        'imgW': '100vw',
        'imgH': 100 + 'vh',
        'imgPosTop': -50 + 'vh',
        'imgPosBottom': '',
        'bgSize': 'cover',
        // Styles
        'posAbs': 'absolute',
        'posRel': 'relative'
    };

    // Retrieve all yapp elements
    instance.yappContainerBlocks = document.querySelectorAll('[data-yapp-img]');

    // Image elements
    instance.yappImgBlock = [];
    instance.yappImgBottom = '';
    instance.yappImgTop = '';
    instance.yappImgPos = '';

    // RAF
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    instance.ticking = false;

    // Setup yapp elements
    instance.setupContainer = function() {

        // Setup up styles for each yapp elements
        for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
            var el = instance.yappContainerBlocks[i],
                imgSrc = el.getAttribute('data-yapp-img');

            // Setup yapp element container
            instance.setupContainerStyle(el);
            // Setup yapp element background image
            instance.setupImg(imgSrc, el);

        }
        return this;
    };

    // Add container styles
    instance.setupContainerStyle = function(el) {

        el.style.width = instance.opts.contW;
        el.style.height = instance.opts.contH;
        el.style.overflow = instance.opts.contOverflow;
        el.style.position = instance.opts.posRel;

        return this;
    };

    // Create and add image elements to container
    instance.setupImg = function(imgSrc, el) {

        var imgBlock = document.createElement('div');

        instance.setupImgStyle(imgBlock, imgSrc);

        el.appendChild(imgBlock);

        instance.yappImgBlock.push(imgBlock);

        return this;
    };

    // Add image element styles
    instance.setupImgStyle = function(el, img) {

        el.style.background = 'url(' + img + ') center center no-repeat';
        el.style.width = instance.opts.imgW;
        el.style.height = instance.opts.imgH;
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

            instance.yappImgBottom = el.getBoundingClientRect().bottom;
            instance.yappImgTop = el.getBoundingClientRect().top;
            instance.yappImgPos = -((instance.yappImgBottom - window.outerHeight) / window.outerHeight) * instance.opts.scrollMod;

            // Get current yapp image element
            var elImg = instance.yappImgBlock[i];

            // Set some boundaries
			if (instance.yappImgTop <= window.outerHeight && instance.yappImgBottom >= 0 && instance.yappImgPos < instance.opts.scrollMod && window.matchMedia('(min-width: ' + instance.opts.mobileBreakpoint + 'px)').matches){
				// Check for vendor prefix
				if ('transform' in elImg.style) {
				    elImg.style.transform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
				} else if ('mozTransform' in elImg.style) {
				    elImg.style.mozTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
				} else if ('msTransform' in elImg.style) {
				    elImg.style.msTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
				} else if ('oTransform' in elImg.style) {
				    elImg.style.oTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
				} else if ('webkitTransform' in elImg.style) {
				    elImg.style.webkitTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
				}
			}
            
        }

        instance.ticking = false;
        return this;
    };

    // Run scroll
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
