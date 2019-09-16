const fs = require('fs');

const wstream = fs.createWriteStream('new.html');

fs
    .createReadStream('./text.html')
    .setEncoding('utf-8')
    .on('end', () => {
        console.log('end');
        wstream.end();
    })
    .on('error', (err) => {
        console.error("err", err);
    })
    .on('close', () => {
        console.log('close');
    })
    .on('data', (chunk) => {
        // console.log('chunk', chunk);
        wstream.write(chunk);
    })
    .on('readable', function() {
        console.log('readable', this.read());
    })

