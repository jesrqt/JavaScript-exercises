// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// validateCred is to return true when a card is valid, and return false when invalid
const validateCred = arr => {
  const luhnAlgorithmArray = [];
  for (let i = arr.length - 1; i >=0; i-=2) {
    luhnAlgorithmArray.push(arr[i])
  };
  for (let i = arr.length - 2; i>=0; i-=2) {
    if (arr[i]*2 >= 9) {
      luhnAlgorithmArray.push(arr[i]*2 - 9)
    } else {
      luhnAlgorithmArray.push(arr[i]*2)
    }
  };
  let sumOfLuhnAlgorithmArray = luhnAlgorithmArray.reduce((accum, curValue) => accum + curValue);
  if(sumOfLuhnAlgorithmArray % 10 === 0) {
    return true;
  } else {
    return false;
  }
}
// Test functions:
console.log(validateCred(valid1));//Should print true
console.log(validateCred(invalid1));//Should print false

// findInvalidCards is to take a nested array of credit card numbers and to return another nested array of invalid cards. 
const findInvalidCards = arr2 => {
  const invalidCredCards = [];
  for (let i = 0; i < arr2.length; i++) {
  if(validateCred(arr2[i]) === false){
    invalidCredCards.push(arr2[i]);
  }
  }
  return invalidCredCards;
}

// Test functions
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5])); // Shouldn't print anything
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5]));// Should print everything


// idInvalidCardCompanies is to list out in an array companies that issued invalid cards. Dupes are omitted from the list.
const idInvalidCardCompanies = arr3 => {
  const offenders = [];
  for (let i = 0; i < arr3.length; i++) {
    switch (arr3[i][0]) {
      case 3:
        if(offenders.indexOf('Amex') === -1) {
          offenders.push('Amex');
        }
        break
      case 4:
        if(offenders.indexOf('Visa') === -1) {
          offenders.push('Visa');
        }
        break
      case 5:
        if(offenders.indexOf('Mastercard') === -1) {
          offenders.push('Mastercard');
        }
        break
      case 6:
        if(offenders.indexOf('Discover') === -1) {
          offenders.push('Discover');
        }
        break
      default:
          console.log('Company not found');
  }
  }
  return offenders;
}
// Test functions
 console.log(idInvalidCardCompanies([invalid1, invalid2, invalid3, invalid4, invalid5]));// Should print ['Visa', 'Mastercard', 'Amex', 'Discover']
 console.log(idInvalidCardCompanies(batch))// Should print ['Visa', 'Mastercard', 'Amex', 'Discover']
console.log(idInvalidCardCompanies(valid1));//Should print 'Company not found'