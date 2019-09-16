const fs = require('fs');
const path = require('path');

const dictionaryPath = path.join(__dirname, 'WebstersEnglishDictionary/dictionary_compact.json');
let dictionaryString = '';

const run = () => {
    let dictionary = JSON.parse(dictionaryString);
    let usedWords = [];
    let lastWord = '';

    process.stdin
        .setEncoding('utf-8')
        .on('data', (data) => {
            let word = data.trim();

            if (word === 'close') {
                process.exit(0);
            }

            if (lastWord && word.charAt(0) !== lastWord.charAt(lastWord.length - 1)) {
                process.stdout.write('wrong word. \r\n Try again: ');
            }
            else {

                if (dictionary.hasOwnProperty(word)) {
                    if (usedWords.some((w) => w === word)) {
                        process.stdout.write('word is already used \r\n Try again: ');
                    }
                    else {
                        let lastLetter = word.charAt(word.length - 1);

                        for (w in dictionary) {
                            if (
                                w.charAt(0) === lastLetter &&
                                !usedWords.some((uw) => uw === w)
                            ) {
                                answer = w;
                                break;
                            }
                        }

                        usedWords.push(word);
                        usedWords.push(answer);
                        lastWord = answer;

                        process.stdout.write(
                            `\x1b[31m${word}:\x1b[0m ${dictionary[word]}
                            \r\n\x1b[31m${answer}:\x1b[0m ${dictionary[answer]}
                            \r\n\x1b[32mYour turn:\x1b[0m `
                        );
                    }
                }
                else {
                    process.stdout.write('wrong word. \r\n Try again: ');
                }
            }
        })
}


fs
    .createReadStream(dictionaryPath)
    .setEncoding('utf-8')
    .on('end', () => {
        // console.log('end');
    })
    .on('error', (err) => {
        console.error("err", err);
    })
    .on('close', () => {
        // console.log('close');
        process.stdout.write(`\x1b[32mType the word:\x1b[0m `);
        run();
    })
    .on('data', (chunk) => {
        // console.log('chunk', chunk);
        dictionaryString += chunk;
    })
    // .on('readable', function() {
    //     console.log('readable', this.read());
    // })
