const express = require('express');
const bodyParser = require('body-parser');

const app = express();



app.use(bodyParser.json());


function findFirstUniqueChar(str) {
    const charCount = {};



    for (let char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }


    for (let i = 0; i < str.length; i++) {
        if (charCount[str[i]] === 1) {
            return { char: str[i], index: i };
        }
    }


    return null;
}


app.post('/first-unique-character', (req, res) => {
    const timestamp = new Date().toISOString();
    const inputText = req.body.text_to_process;


    console.log(`[${timestamp}] Endpoint /first-unique-character called with input: ${inputText}`);


    if (!inputText || typeof inputText !== 'string') {
        return res.status(400).json({
            error: 'Invalid input: "text_to_process" must be a non-empty string.'
        });
    }


    const result = findFirstUniqueChar(inputText);

    if (result) {

        return res.json({
            first_unique_char: result.char,
            first_unique_char_index: result.index,
            timestamp: timestamp
        });
    } else {

        return res.json({
            first_unique_char: null,
            first_unique_char_index: -1,
            timestamp: timestamp
        });
    }
});


app.listen(3000, () => {

});
