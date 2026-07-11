(function () {
  'use strict';

  
  var clutterSelectors = [
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

  function unfreezeGifs() {
    var snapshots = document.querySelectorAll('.' + gifSnapshotClass);
    for (var i = 0; i < snapshots.length; i++) {
      snapshots[i].remove();
    }

    var frozenImages = document.querySelectorAll('.' + gifFrozenClass);
    for (var i = 0; i < frozenImages.length; i++) {
      frozenImages[i].classList.remove(gifFrozenClass);
    }
  }

  function startMotionFreeze() {
    pauseVideosAndAudio();
    document.documentElement.classList.add(frozenClass);
    freezeGifs();

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

  
  function turnOnGlobalFilter() {
    document.documentElement.classList.add(globalFilterClass);
  }

  function turnOffGlobalFilter() {
    document.documentElement.classList.remove(globalFilterClass);
  }

  
  function turnOnFocusMode() {
    if (focusModeIsOn) return;
    focusModeIsOn = true;

    blurClutter();
    startMotionFreeze();
    turnOnGlobalFilter();
  }

  function turnOffFocusMode() {
    if (!focusModeIsOn) return;
    focusModeIsOn = false;

    unblurClutter();
    stopMotionFreeze();
    turnOffGlobalFilter();
  }

  
  function checkStoredSetting() {
    chrome.storage.local.get(['focusMode'], function (result) {
      if (result && result.focusMode) {
        turnOnFocusMode();
      }
    });
  }

  
  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName !== 'local') return;
    if (!changes.focusMode) return;

    if (changes.focusMode.newValue) {
      turnOnFocusMode();
    } else {
      turnOffFocusMode();
    }
  });

  checkStoredSetting();
})();