(function(){
    'use strict';
    var clusterSelector = [
        '.ads',
        '[id*="banner"]',
        'aside',
        '.sidebar',
        '[class*="promo"]'
    ];

    var clutterClass = 'ss-focus-clutter';
    var frozenClass = 'ss-focus-frozen';
    var gifFrozenClass = 'ss-focus-gif-frozen';
    var gifSnapshotClass = 'ss-focus-gif-snapshot';
    var globalFilterClass = 'ss-focus-global-filter';

    var focusModeIsOn = false;
    var pageWatcher = null;

    function blurClutter() {
    var selectorString = clutterSelectors.join(',');
    var clutterElements = document.querySelectorAll(selectorString);
 
    for (var i = 0; i < clutterElements.length; i++) {
      clutterElements[i].classList.add(clutterClass);
        }
    }

    function unblurClutter() {
    var blurredElements = document.querySelectorAll('.' + clutterClass);
 
    for (var i = 0; i < blurredElements.length; i++) {
      blurredElements[i].classList.remove(clutterClass);
        }
  }

})