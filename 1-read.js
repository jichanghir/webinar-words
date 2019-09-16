const fs = require('fs');

fs
    .createReadStream('./text.html')
    .setEncoding('utf-8')
    .on('end', () => {
        console.log('end');
    })
    .on('error', (err) => {
        console.error("err", err);
    })
    .on('close', () => {
        console.log('close');
    })
    .on('data', (chunk) => {
        console.log('chunk', chunk);
    })
    .on('readable', function() {
        console.log('readable', this.read());
    })


