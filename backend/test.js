var labour_data = require('../aurin/labour_market/output.json');

const labour_out = Object.keys(labour_data).map(key => [key, labour_data[key]]);

let labour_sort = labour_out.sort(function (a, b) {
  return a[1].summary.employ_rate > b[1].summary.employ_rate;
})

console.log(labour_out[0][1].summary.employ_rate);

console.log("labour_out: ", labour_sort);