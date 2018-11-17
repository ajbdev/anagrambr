const fs = require('fs');

class Dictionary {
    constructor(wordFile = 'words.txt') {
        this.words = '';
        fs.readFile(wordFile, (_, words) => {
            this.words = words.toString().split(/\r?\n/);
        });
    }

    isWord(str) {
        return this.words.indexOf(str.toLocaleUpperCase()) > -1;
    }

    contains(str1, str2) {
        let s1 = str1.toLocaleUpperCase().split('');

        for (var i=0;i<str2.length;i++) {
            if (s1.indexOf(str2.charAt(i)) > -1) {
                s1.splice(s1.indexOf(str2.charAt(i)), 1)
            }
        }

        return s1.length === 0;
    }
}

module.exports = Dictionary;