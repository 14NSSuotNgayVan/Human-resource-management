import moment from "moment";

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}
export function getNumberOfLines(inputString) {
  // Sử dụng split để tách chuỗi thành mảng các dòng
  if (inputString) {
    const lines = inputString.split(/\r?\n/);
    return Math.min(lines.length, 4);
    // Trả về số dòng, nhưng không vượt quá 4
  } else return 1;
}
export function removeEmptyLines(inputString) {
  // Sử dụng regex để thay thế các dòng trống bằng chuỗi rỗng
  const resultString = inputString.replace(/^\s*[\r\n]/gm, '');

  return resultString;
}
export function splitStringByNewLine(inputString) {
  if (inputString !== null) {

    const resultArray = inputString.split("\n");
    const filteredArray = resultArray
      .map((item) => item.trim())
      .filter(Boolean);
    return filteredArray;
  } return null;
}
export function wrapText(inputString, lineWidth) {
  let resultString = '';
  let currentLine = '';

  for (const char of inputString) {
    if (char === ' ' && currentLine.length > lineWidth) {
      resultString += '\n'; // Chèn dấu xuống dòng nếu độ rộng đã vượt quá
      currentLine = '';
    } else {
      currentLine += char;
      resultString += char;
    }
  }
  return resultString;
}
export function wrapText4(inputString, lineWidth = 200) {
  let resultString = '';
  let currentLine = '';
  let EnterCount = 0;
  for (const char of inputString) {
      if (char === ' ' && currentLine.length > lineWidth && EnterCount <3) {
        resultString += '\n'; // Chèn dấu xuống dòng nếu độ rộng đã vượt quá
        currentLine = '';
        EnterCount++;
      } else {
        currentLine += char;
        resultString += char;
      }
    }
  return resultString;
}
export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 768px)`).matches;
  }
  return false;
}
export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 991px)`).matches;
  }
  return false;
}
export function isLgScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference =
    moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(
      moment(date, "DD/MM/YYYY HH:mm:ss")
    ) / 1000;

  if (difference < 60) return `${Math.floor(difference)} seconds`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
  else if (difference < 86400 * 30)
    return `${Math.floor(difference / 86400)} days`;
  else if (difference < 86400 * 30 * 12)
    return `${Math.floor(difference / 86400 / 30)} months`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function (val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(" ");
}
