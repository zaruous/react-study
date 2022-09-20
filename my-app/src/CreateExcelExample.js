// Language: javascript
// Path: app.js

var xlsx = require('node-xlsx');
var fs = require('fs');

// Or var xlsx = require('node-xlsx').default;

const data = [
  [1, 2, 3],
  [true, false, null, 'sheetjs'],
  ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
  ['baz', null, 'qux'],
];
const sheetOptions = {'!cols': [{wch: 6}, {wch: 7}, {wch: 10}, {wch: 20}]};

var buffer = xlsx.build([{name: 'mySheetName', data: data}], {sheetOptions}); // Returns a buffer

/* write buffer to file */
fs.writeFile('test.xlsx', buffer, function(err) {
  if (err) throw err;
  console.log('file saved');
});
