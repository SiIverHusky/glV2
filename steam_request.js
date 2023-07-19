const http = require('http');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', 'public', 'html', 'home.html');
const html = fs.readFileSync(htmlPath);
const $ = cheerio.load(html);

const gameId = $('#gameIdInput').val();
console.log(gameId);

const steam_URL = "https://store.steampowered.com/api/appdetails?appids=";
const url = steam_URL + gameID;

http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var steamData = JSON.parse(body);
        console.log("Got response: ", steamData);

        const fileName = `game_${gameID}.json`;
        const dirPath = path.join(__dirname, '..', 'game_json');
        const filePath = path.join(dirPath, fileName);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        fs.writeFile(filePath, JSON.stringify(steamData), function(err) {
            if (err) {
                console.log("Error writing file: ", err);
            } else {
                console.log(`File saved to ${filePath}`);
            }
        });
    });

}).on('error', function(e) {
    console.log("Got error: ", e);
});