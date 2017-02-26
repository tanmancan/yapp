// The MIT License (MIT)

// Copyright (c) 2015 Tanveer Karim
// http://www.tkarimdesign.com/
// https://github.com/tanmancan/yapp

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
    // Parallax modifiers, sets image scale and perceived scroll amount
    scrollModifier: 2,
    // Minimum window width to apply parallax
    mobileBreakpoint: 1024,
    // Yapp container
    container: {
      width: 100,
      height: (100 / 3),
      overflow: 'hidden',
    },
    // Yapp image
    image: {
      static: false,
      width: 100,
      positionBottom: 0,
      backgroundSize: 'cover',
    },
    // Base Styles
    style: {
      marginAuto: '0 auto',
      cssWidthUnit: '%',
      cssHeightUnit: 'vh',
      posAbs: 'absolute',
      posRel: 'relative'
    }
  };

  // Retrieve all yapp elements
  instance.yappContainerBlocks = document.querySelectorAll('[data-yapp-img]');

  // RAF
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  instance.ticking = false;

  // Retrieve custom data-yapp settings
  instance.userOptions = function(el) {
    var dataOpts = {},
        heightVal = instance.opts.container.height,
        heightUnit = instance.opts.style.cssHeightUnit,
        widthVal = instance.opts.container.width,
        widthUnit = instance.opts.style.cssWidthUnit;

    // Replicate structure of default options
    dataOpts.style = {};
    dataOpts.container = {};
    dataOpts.image = {};

    // Custom height - data-yapp-height
    // Get the value and unit for custom height property  - data-yapp-height
    if (el.getAttribute('data-yapp-height')) {
      var height = el.getAttribute('data-yapp-height'),
          regexH = /([A-Za-z]+\w)/,
          heightArr = height.split(regexH, 2);

      heightVal = heightArr[0];
      heightUnit = heightArr[1];
    }

    // Custom height value
    dataOpts.containerHeight = heightVal || null;
    // Custom height Unit
    dataOpts.style.cssHeightUnit = heightUnit || null;

    // Custom width - data-yapp-width
    // Get the value and unit for custom width property  - data-yapp-width
    if (el.getAttribute('data-yapp-width')) {
      var width = el.getAttribute('data-yapp-width'),
        regexW = /([A-Za-z%]+)/,
        widthArr = width.split(regexW, 2);

      widthVal = widthArr[0];
      widthUnit = widthArr[1];
    }
    // Custom width value
    dataOpts.containerWidth = widthVal ? widthVal : null;
    // Custom width Unit
    dataOpts.style.cssWidthUnit = widthUnit ? widthUnit : null;

    // Scroll modifier - data-yapp-modifier
    dataOpts.scrollModifier = el.getAttribute('data-yapp-modifier') ? instance.opts.scrollModifier + (el.getAttribute('data-yapp-modifier') / 100) : null;

    // Non scrolling image - data-yapp-static
    dataOpts.image.static = el.hasAttribute('data-yapp-static') ? true : false;

    return dataOpts;
  };

  // Setup yapp elements
  instance.setupContainer = function() {
    var el = null,
        imgSrc = null;

    // Setup up styles for each yapp elements
    for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
      el = instance.yappContainerBlocks[i];
      imgSrc = el.getAttribute('data-yapp-img');

      // Get data-yapp options
      el.usrOpts = instance.userOptions(el);

      // Setup yapp element container styles
      instance.setupContainerStyle(el, el.usrOpts);

      // Setup yapp element background image
      instance.setupImg(imgSrc, el, el.usrOpts);

    }
    return this;
  };

  // Add container styles
  instance.setupContainerStyle = function(el, usrOpts) {

    // Set container width
    el.style.width = usrOpts.containerWidth ? usrOpts.containerWidth + usrOpts.style.cssWidthUnit : instance.opts.container.width + instance.opts.style.cssWidthUnit;

    // Set max width of 100% to prevent horizontal scroll
    el.style.maxWidth = "100%";

    // Set margin auto
    el.style.margin = instance.opts.style.marginAuto;

    // Set container height
    el.style.height = usrOpts.containerHeight ? usrOpts.containerHeight + usrOpts.style.cssHeightUnit : instance.opts.container.height + instance.opts.style.cssHeightUnit;

    // Set relative position and overflow hidden
    el.style.overflow = instance.opts.container.overflow;
    el.style.position = instance.opts.style.posRel;

    return this;
  };

  // Create and add image elements to container
  instance.setupImg = function(imgSrc, el, usrOpts) {

    // Create element for background image
    var imgBlock = document.createElement('div');

    // Apply style to imaeg element
    instance.setupImgStyle(imgBlock, imgSrc, usrOpts);

    // Insert image element into container element
    el.appendChild(imgBlock);

    // Add yapp image element as a property of yapp container element
    el.yappImgBlock = imgBlock;

    return this;
  };

  // Add image element styles
  instance.setupImgStyle = function(imgBlock, imgSrc, usrOpts) {
    // Use custom value if it iexists
    var scrollModifier = usrOpts.scrollModifier ? usrOpts.scrollModifier : instance.opts.scrollModifier,
        containerHeight = usrOpts.containerHeight ? usrOpts.containerHeight : instance.opts.container.height,
        cssHeightUnit = usrOpts.style.cssHeightUnit ? usrOpts.style.cssHeightUnit : instance.opts.style.cssHeightUnit;

    imgBlock.style.background = 'url(' + imgSrc + ') center center no-repeat';
    imgBlock.style.width = instance.opts.image.width + instance.opts.style.cssWidthUnit;
    imgBlock.style.height = (containerHeight * scrollModifier) + cssHeightUnit;
    imgBlock.style.backgroundSize = instance.opts.image.backgroundSize;
    imgBlock.style.position = instance.opts.style.posAbs;
    imgBlock.style.bottom = instance.opts.image.positionBottom;

    return this;
  };

  // Scroll image
  instance.yappScroll = function() {

    var imagePosition,
      elImg;

    for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
      elImg = instance.yappContainerBlocks[i].yappImgBlock;
      imagePosition = elImg.imagePosition;

      if (elImg.boundariesTest) {
        // Check for vendor prefix
        if ('transform' in elImg.style) {
          elImg.style.transform = 'translate3d(0,' + imagePosition + 'px, 0)';
        } else if ('mozTransform' in elImg.style) {
          elImg.style.mozTransform = 'translate3d(0,' + imagePosition + 'px, 0)';
        } else if ('msTransform' in elImg.style) {
          elImg.style.msTransform = 'translate3d(0,' + imagePosition + 'px, 0)';
        } else if ('oTransform' in elImg.style) {
          elImg.style.oTransform = 'translate3d(0,' + imagePosition + 'px, 0)';
        } else if ('webkitTransform' in elImg.style) {
          elImg.style.webkitTransform = 'translate3d(0,' + imagePosition + 'px, 0)';
        }
      }
    }

    instance.ticking = false;
    return this;
  };

  // Run scroll transform
  instance.calcScroll = function() {
    var el = null,
        elImg = null;

    for (var i = 0; i < instance.yappContainerBlocks.length; i++) {
      // Current container element
      el = instance.yappContainerBlocks[i];

      // Current image element
      elImg = el.yappImgBlock;

      // Calculate image position
      instance.caclImgPos(el, elImg);
    }

    if (!instance.ticking) {
      // Update animation
      var bindedYappScroll = instance.yappScroll.bind(instance);
      requestAnimationFrame(bindedYappScroll);
      instance.ticking = true;
    }

    return this;
  };

  // Calculate image position
  instance.caclImgPos = function(el, elImg) {
    var containerOffsetPercent = 0,
        imgOffsetAmmount = 0,
        containerHeight = 0,
        containterBottom = 0,
        containerTop = 0,
        imageHeight = 0,
        boundariesTest = false;

    // Get container diementions
    containerHeight = el.getBoundingClientRect().height;
    containterBottom = el.getBoundingClientRect().bottom;
    containerTop = el.getBoundingClientRect().top;

    // Get image dimentions
    imageHeight = elImg.getBoundingClientRect().height;

    // Set some boundaries
    boundariesTest =  containerTop <= window.innerHeight &&
                      containterBottom > 0 &&
                      !el.usrOpts.image.static &&
                      window.innerWidth >= instance.opts.mobileBreakpoint;

    if (boundariesTest) {
      // Calculate position
      elImg.boundariesTest = boundariesTest;

      // Calculate image element translateY based on position of container element
      containerOffsetPercent = containterBottom / window.innerHeight;
      imgOffsetAmmount = containerHeight - (containerHeight * containerOffsetPercent);
      elImg.imagePosition = (imgOffsetAmmount - ((containerHeight/imageHeight) * imgOffsetAmmount)).toFixed(2);
    }

    return this;
  };

  // Initiate yapp
  instance.init = function() {
    instance.setupContainer();
    instance.calcScroll();

    var bindedCalcScroll = instance.calcScroll.bind(instance);
    window.addEventListener('scroll', bindedCalcScroll, false);

    return this;
  };

  instance.init();
  return instance;
})();
