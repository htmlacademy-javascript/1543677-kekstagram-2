function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

function checingLengthOfString(str, num) {
  if (!isString(str) && !isNumber(num)) {
    return false;
  }
  return str.length <= num;
}

function isPalindrom(str) {
  if (!isString(str)) {
    return false;
  }
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === ' ') {
      continue;
    }
    newStr += str[i];
  }
  return str.replaceAll(' ', '').toLowerCase() === newStr.toLowerCase();
}

function convStrTimeToMinute(str) {
  const arr = str.split(':');
  if (arr.length !== 2) {
    return NaN;
  }

  return (+arr[0] - 0) * 60 + +arr[1];
}

function checkMeetingTime(...args) {
  const newArgs = args.map((x) => {
    if (isString(x)) {
      return convStrTimeToMinute(x);
    }
    return x;
  });

  const checkNumber = newArgs[1] - newArgs[2];

  if (newArgs[0] < newArgs[1] && newArgs[0] <= newArgs[2] && checkNumber >= newArgs[3]) {
    return true;
  }
  return false;
}

checkMeetingTime('08:00', '17:30', '14:00', 90);

