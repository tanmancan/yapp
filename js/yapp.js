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
    	'scrollModifier': 2,
    	'mobileBreakpoint': 1024,
        // Yapp container
        'containerWidth': 100,
        'containerHeight': (100 / 3),
        'containerOverflow': 'hidden',
        // Yapp image
        'imageWidth': 100,
        'imageHeight': (100 / 3) * 2,
        'imagePositionTop': '',
        'imagePositionBottom': 0,
        'backgroundSize': 'cover',
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

        // Custom height - data-yapp-height
        dataOpts.containerHeight = el.getAttribute('data-yapp-height') ? el.getAttribute('data-yapp-height') : null;
        // Scroll modifier - data-yapp-modifier
        dataOpts.scrollModifier = el.getAttribute('data-yapp-modifier') ? el.getAttribute('data-yapp-modifier') : null;
        
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

        el.style.width = instance.opts.containerWidth + 'vw';

        el.style.height = usrOpts.containerHeight ? usrOpts.containerHeight : instance.opts.containerHeight + 'vh';
       

        el.style.overflow = instance.opts.containerOverflow;
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
        el.style.width = instance.opts.imageWidth + 'vw';
        el.style.height = instance.opts.imageHeight + 'vh';
        el.style.backgroundSize = instance.opts.backgroundSize;
        el.style.position = instance.opts.posAbs;
        el.style.top = instance.opts.imagePositionTop;
        el.style.bottom = instance.opts.imagePositionBottom;

        return this;
    };

    // Scroll image
    instance.yappScroll = function() {

    	for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
            var el = instance.yappContainerBlocks[i];

            var containerHeight = el.getBoundingClientRect().height,
                containterBottom = el.getBoundingClientRect().bottom,
                containerTop = el.getBoundingClientRect().top,
                imagePosition = instance.caclImgPos(containterBottom, containerTop, containerHeight);

            // Get current yapp image element
            var elImg = instance.yappContainerBlocks[i].yappImgBlock;

            // Set some boundaries
			if (containerTop <= window.outerHeight &&  window.matchMedia('(min-width: ' + instance.opts.mobileBreakpoint + 'px)').matches){
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
    instance.caclImgPos = function(cB, cT, cH) {

        // Make sure image does not have any gap between it and the container
        var containerOffsetPercent = cB/window.outerHeight,
            imgOffsetAmmount = cH - (cH * containerOffsetPercent);

        console.log(imgOffsetAmmount);
        //pos = -((cB - window.outerHeight) / window.outerHeight) * instance.opts.scrollMod;

        return imgOffsetAmmount;
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