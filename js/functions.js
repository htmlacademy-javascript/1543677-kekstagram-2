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
