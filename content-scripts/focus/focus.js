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

  function pauseVideosAndAudio() {
    var mediaElements = document.querySelectorAll('video, audio');
 
    for (var i = 0; i < mediaElements.length; i++) {
      try {
        mediaElements[i].pause();
      } catch (error) {
        // Some elements can't be paused (e.g. still loading). Skip them.
      }
    }
  }

  function freezeGifs() {
    var gifImages = document.querySelectorAll(
      'img[src*=".gif"]:not(.' + gifFrozenClass + ')'
    );
 
    for (var i = 0; i < gifImages.length; i++) {
      var image = gifImages[i];
 
      try {
        var snapshotCanvas = document.createElement('canvas');
        snapshotCanvas.className = gifSnapshotClass;
        snapshotCanvas.width = image.naturalWidth || image.width;
        snapshotCanvas.height = image.naturalHeight || image.height;
        snapshotCanvas.style.width = getComputedStyle(image).width;
        snapshotCanvas.style.height = getComputedStyle(image).height;
 
        var context = snapshotCanvas.getContext('2d');
        context.drawImage(image, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
 
        image.classList.add(gifFrozenClass);
        image.parentNode.insertBefore(snapshotCanvas, image.nextSibling);
      } catch (error) {
      }
    }
  }

  function startMotionFreeze() {
    pauseVideosAndAudio();
    document.documentElement.classList.add(frozenClass);
    freezeGifs();
 
    // If the page loads more videos/gifs later (common on news sites),
    // catch those too.
    pageWatcher = new MutationObserver(function () {
      if (!focusModeIsOn) return;
      pauseVideosAndAudio();
      freezeGifs();
    });
 
    pageWatcher.observe(document.body, { childList: true, subtree: true });
  }
 
  function stopMotionFreeze() {
    document.documentElement.classList.remove(frozenClass);
    unfreezeGifs();
 
    if (pageWatcher) {
      pageWatcher.disconnect();
      pageWatcher = null;
    }
  }

})