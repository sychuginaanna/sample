let assert = require('assert');
let hello = require('./public/main').hello;
//let plural = require('./public/main').plural;
let filter = require('./public/main').filter;



assert.equal(hello('Test'), 'Привет, Test');
//TODO: Кейсы для функции filter
// assert.equal(filter('КЕК'), '***');

assert.equal(filter('MATH yahoo'), '**** *****');
assert.equal(filter('MATH '), '**** ');
assert.equal(filter('MATH'), '****');
assert.equal(filter(' MATH'), ' ****');
assert.equal(filter(' MATH '), ' **** ');
assert.equal(filter('many yahoo MATH'), 'many ***** ****');
assert.equal(filter('manyMATHmany'), 'manyMATHmany');
assert.equal(filter('MATHany '), 'MATHany ');
assert.equal(filter('MATH yahoo and many'), '**** ***** and many');

console.log('Everything is complete!');


