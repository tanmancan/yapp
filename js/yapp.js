// Contsruct yapp
var yapp = (function() {
    'use strict';

    var instance = {};

    // Default settings
    instance.opts = {
    	// Parallax modifiers
    	'scrollMod': 300,
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

            // Get position for yapp elements
            instance.yappImgBottom = el.getBoundingClientRect().bottom;
            instance.yappImgTop = el.getBoundingClientRect().top;
            instance.yappImgPos = -((instance.yappImgBottom - window.outerHeight) / window.outerHeight) * instance.opts.scrollMod;

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

    instance.onScroll = function() {

        for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
            var el = instance.yappContainerBlocks[i];

            instance.yappImgBottom = el.getBoundingClientRect().bottom;
            instance.yappImgTop = el.getBoundingClientRect().top;
            instance.yappImgPos = -((instance.yappImgBottom - window.outerHeight) / window.outerHeight) * instance.opts.scrollMod;

            instance.requestTick(i);
            

            // elImg.style.transform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';


            // if (elImg.hasOwnProperty('webkitTransform')) {
            //     elImg.style.webkitTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            // } else if (elImg.hasOwnProperty('mozTransform')) {
            //     elImg.style.mozTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            // } else if (elImg.hasOwnProperty('msTransform')) {
            //     elImg.style.msTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            // } else if (elImg.hasOwnProperty('oTransform')) {
            //     elImg.style.oTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            // } else if (elImg.hasOwnProperty('transform')) {
            //     elImg.style.transform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            // }


        }
        return this;
    };

    instance.yappScroll = function(i) {

        var el = instance.yappImgBlock[i];
        
        // Set some boundaries
       // if (instance.yappImgTop <= window.outerHeight && instance.yappImgBottom >= 0 && instance.yappImgPos < instance.opts.scrollMod) {
			if (el.hasOwnProperty('webkitTransform')) {
                el.style.webkitTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            } else if (el.hasOwnProperty('mozTransform')) {
                el.style.mozTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            } else if (el.hasOwnProperty('msTransform')) {
                el.style.msTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            } else if (el.hasOwnProperty('oTransform')) {
                el.style.oTransform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            } else if (el.hasOwnProperty('transform')) {
                el.style.transform = 'translate3d(0px,' + instance.yappImgPos + 'px, 0px)';
            }
       // }

        instance.ticking = false;
        return this;
    };

    instance.requestTick = function(i) {
        // instance.yappScroll(i);
        if (!instance.ticking) {
            requestAnimationFrame(instance.yappScroll(i));
            instance.ticking = true;
        }
        return this;
    };

    // Initiate yapp
    instance.init = function() {
        instance.setupContainer();

        window.addEventListener('scroll', instance.onScroll, false);

        return this;
    };

    instance.init();
    return this;
})();
