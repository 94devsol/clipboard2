const nodeAbi = require('node-abi')
 
console.log(" NODE :"+ nodeAbi.getAbi('9.11.2', 'node'));
// '51'
console.log(" ELECTRON " + nodeAbi.getAbi('5.0.6', 'electron'));