const { Types } = require('mongoose');

const arr = [Types.ObjectId('61438e93ba63985988832708')];
console.log(arr.some((value) => Types.ObjectId('61438e93ba63985988832708').toString() === value.toString()))