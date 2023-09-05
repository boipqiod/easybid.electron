const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const https = require('https');

const YOUR_FILE_PATH = '../app/EasyBid-1.0.0-arm64-mac.zip';  //  POPULATE THIS

function hashFile(file, algorithm = 'sha512', encoding = 'base64', options) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        hash.on('error', reject).setEncoding(encoding);
        fs.createReadStream(
            file,
            Object.assign({}, options, {
                highWaterMark: 1024 * 1024,
                /* better to use more memory but hash faster */
            })
        )
            .on('error', reject)
            .on('end', () => {
                hash.end();
                console.log('hash done');
                console.log(hash.read());
                resolve(hash.read());
            })
            .pipe(
                hash,
                {
                    end: false,
                }
            );
    });
}

const installerPath = path.resolve(
    __dirname,
    YOUR_FILE_PATH
);

hashFile(installerPath);


const installerURL = "https://s3.ap-northeast-2.amazonaws.com/easybid.update/EasyBid-1.0.0-arm64-mac.zip";

async function hashFileFromURL(url, algorithm = 'sha512', encoding = 'base64') {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);

        https.get(url, response => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP Error: ${response.statusCode}`));
                return;
            }

            response
                .on('data', data => hash.update(data))
                .on('end', () => {
                    resolve(hash.digest(encoding));
                })
                .on('error', reject);
        });
    });
}


hashFileFromURL(installerURL)
    .then(hash => {
        console.log('Hash done:', hash);
    })
    .catch(error => {
        console.error('Error:', error);
    });
