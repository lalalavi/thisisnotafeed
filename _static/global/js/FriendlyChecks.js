var iFullscreenChange, GameBody, dDefaultPixel, iFocusLost, dFocusLostT;
var bCalibrated = false;
// ----------------------------------------------------- //
//  Function:       1. Initializes Fullscreen and Focus checks
//
//  Input:          GameBody: (html object) container of the game
//                  bRequireFS: (boolean) true if require Fullscreen Check
//                  bCheckFocus: (boolean) true if require Focus Check
// 
// ----------------------------------------------------- //

function InitializeFriendlyChecks(GameBody,bRequireFS=true, bCheckFocus=true) {
  if (typeof GameBody==='undefined') {
    GameBody= document.getElementsByTagName('body')[0];
  }
  
  // If Fullscreen is required
  if (bRequireFS) {
    console.log('Checking for Fullscreen')
    iFullscreenChange       = document.createElement("input");
    iFullscreenChange.type      = 'hidden';
    iFullscreenChange.name      = 'iFullscreenChange';
    iFullscreenChange.id        = 'iFullscreenChange';
    iFullscreenChange.value     = 0;
    GameBody.appendChild(iFullscreenChange);
    CreateFullScreenPopUp();
    CheckFS();
    // Event Listener for changing screen size
    window.addEventListener('resize',  CheckFS);
  }
  // If CheckFocus is required
  if (bCheckFocus) {
    // Create input iFocusLost
    iFocusLost        = document.createElement("input");
    iFocusLost.type       = 'hidden';
    iFocusLost.name       = 'iFocusLost';
    iFocusLost.id         = 'iFocusLost';
    iFocusLost.value      = 0;
    // Create input dFocusLostT
    dFocusLostT        = document.createElement("input");
    dFocusLostT.type       = 'hidden';
    dFocusLostT.name       = 'dFocusLostT';
    dFocusLostT.id         = 'dFocusLostT';
    dFocusLostT.value      = 0;
    // Create input Create Timer variables
    GameBody.appendChild(iFocusLost);
    GameBody.appendChild(dFocusLostT);
    // Event Listener for gaining and losing focus on the page
    window.addEventListener('blur', pause);
    window.addEventListener('focus', play);
  }
}

// ----------------------------------------------------- //
//  Function:       1. Initializes Calibration Page
//
//  Input:          GameBody: (html object) container of the game
//                  
// 
// ----------------------------------------------------- //

function InitializeCalibration(GameBody) {
  if (typeof GameBody==='undefined') {
    GameBody= document.getElementsByTagName('body')[0];
  }
  iFullscreenChange       = document.createElement("input");
  iFullscreenChange.type      = 'hidden';
  iFullscreenChange.name      = 'iFullscreenChange';
  iFullscreenChange.id        = 'iFullscreenChange';
  iFullscreenChange.value     = 0;
  GameBody.appendChild(iFullscreenChange);
  dDefaultPixel       = document.createElement("input");
  dDefaultPixel.type      = 'hidden';
  dDefaultPixel.name      = 'dPixelRatio';
  dDefaultPixel.id        = 'dPixelRatio';
  dDefaultPixel.value     = 1;
  GameBody.appendChild(dDefaultPixel);
  CreateFullScreenPopUp(true);
  CalibrateCheck();
  // Event Listener for changing screen size
  window.addEventListener('resize',  () => {
    if (bCalibrated) {
      CheckFS();
    } else {
      CalibrateCheck();
    }
  });
}


// ----------------------------------------------------- //
//  Function:       1. Starts recording a pausing timer
//                  2. Adds 1 to the LossFocusCounter
// ----------------------------------------------------- //
function pause() {
  console.log('FOCUS LOST!');
  iFocusLost.value  = +iFocusLost.value+1;
  TBlur             = new Date().getTime();
}
// ----------------------------------------------------- //
//  Function:       1. Stops recording a pausing timer
//                  2. 
// ----------------------------------------------------- //
function play() {
  TFocus            = new Date().getTime();
  console.log('Focus back');
  let dt            = TFocus-TBlur;
  dFocusLostT.value = +dFocusLostT.value+dt;
}
// ----------------------------------------------------- //
//  Function:       1. Check if Fullscreen
//                  2. Display Fullscreen Pop-up Warning
// ----------------------------------------------------- //

function CalibrateCheck() {
  console.log("Checking fullscreen");
  let PopUp = document.getElementById('cal-popup');
  if ( window.fullScreen || window.innerHeight==screen.height ) {
    // Dissappear Screen and Text
    console.log('FullScreen');
    PopUp.style.visibility          = 'hidden';
    PopUp.style.zIndex              = -1;
    if (!bCalibrated) {
      dDefaultPixel.value              = window.devicePixelRatio;
    }
    bCalibrated = true;
  } else {
    // Make cover and text visible
    console.log('Not FullScreen');
    iFullscreenChange.value         = +iFullscreenChange.value+1; 
    PopUp.style.visibility          = 'visible';
    PopUp.style.zIndex              = 100;
  }
};

// ----------------------------------------------------- //
//  Function:       1. Check if Fullscreen
//                  2. Display Fullscreen Pop-up Warning
// ----------------------------------------------------- //

function CheckFS() {
  console.log("Checking fullscreen");
  let PopUp = document.getElementById('fs-popup');
  let adj;
  if (typeof defaultPixel!=='undefined') {
    adj = defaultPixel;
  } else {
    adj = dDefaultPixel.value;
  }
  if ( window.fullScreen || Math.abs(window.innerHeight*window.devicePixelRatio/adj-screen.height)<=10 ) {
    // Dissappear Screen and Text
    console.log('FullScreen');
    PopUp.style.visibility          = 'hidden';
    PopUp.style.zIndex              = -1;

  } else {
    // Make cover and text visible
    console.log('Not FullScreen');
    iFullscreenChange.value         = +iFullscreenChange.value+1; 
    PopUp.style.visibility          = 'visible';
    PopUp.style.zIndex              = 100;
  }
};
// ----------------------------------------------------- //
//  Function:       1. Create FullScreen Pop-Up Warning
//                      with id='fs-popup'
// ----------------------------------------------------- //
function CreateFullScreenPopUp(bReqCalibrate=false) {
  let isSafari                    = (
    /constructor/i.test(window.HTMLElement) || 
    (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] ||
    (typeof safari !== 'undefined' && window['safari'].pushNotification)));
  let os = getOS();
  if (isSafari) {os = 'Safari'   }

  // Create Div fullscreen and Button 
  let PopUp                         = document.createElement('div');
  let PopUpText1                    = document.createElement('p');
  let PopUpText2                    = document.createElement('p');
  let PopUpText3                    = document.createElement('p');
  let PopUpText4                    = document.createElement('p');

  // Div Properties
  if (bReqCalibrate) {
    PopUp.id                        = 'cal-popup';
  } else {
    PopUp.id                        = 'fs-popup';
  }
  // Text Properties
  PopUpText1.className              = 'fs-popup-text';
  PopUpText2.className              = 'fs-popup-text';
  PopUpText3.className              = 'fs-popup-text';
  PopUpText4.className              = 'fs-popup-text';
  
  // Text content
  PopUpText1.innerHTML              = 'Please set display to Full Screen.';
  PopUpText3.innerHTML              = 'Please adjust the zoom of the screen to 100%.';

  switch (os) {
    case 'Mac OS' : 
      PopUpText2.innerHTML          = 'In the menu above go to View > Enter Full Screen. <br> Also in View > Unclick "Always show toolbar in Fullscreen".'; 
      PopUpText4.innerHTML          = 'Press ⌥,⌘,= (option, command, equal to zoom-in) <br> ⌥,⌘,- ( option, command, minus to zoom-out) ';
      break;
    case 'Safari':
      PopUpText2.innerHTML          = 'In the menu above go to View > Enter Full Screen. <br> Also in View > Unclick "Always show toolbar in Fullscreen".'; 
      PopUpText4.innerHTML          = 'Press ⌘,+ (command, plus to zoom-in) <br> ⌘,- ( command, minus to zoom-out) ';
      break;  
    case 'Windows' :
      PopUpText2.innerHTML          = 'Press F11, or go to settings and press on fullscreen icon';
      // add this somehow: <i class="material-icons">&#xe5d0;</i> 
      //  + <i class="material-icons">&#xe5d0;</i> 
      // https://www.w3schools.com/icons/tryit.asp?filename=tryicons_google-fullscreen
      PopUpText4.innerHTML          = 'Press Ctrl,= (Control, equal to zoom-in) <br> Ctrl,-( Control, minus to zoom-out) '

      break;
    case 'Linux' :
        PopUpText2.innerHTML             = 'Press F11'; 
        PopUpText4.innerHTML             = 'Press Ctrl,= (Control, equal to zoom-in) <br> Ctrl,-( Control, minus to zoom-out) '
        break;
  };

  PopUp.appendChild(PopUpText1);
  PopUp.appendChild(PopUpText2);
  if (bReqCalibrate) {
    PopUp.appendChild(PopUpText3);
    PopUp.appendChild(PopUpText4);
  }

  document.body.appendChild(PopUp);
}

// ----------------------------------------------------- //
//  Function:       Determines Operative System:
//                  Mac OS
//                  iOS
//                  Windows
//                  Android
//                  Linux
// ----------------------------------------------------- //
function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

