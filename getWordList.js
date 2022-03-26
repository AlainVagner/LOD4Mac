const axios = require('axios').default
const fs = require('fs')
const url = 'https://data.public.lu/api/1/datasets/letzebuerger-online-dictionnaire-komplett-wuertlescht-complete-wordlist/'

// from https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile
async function downloadFile(fileUrl, outputLocationPath) {
    const writer = fs.createWriteStream(outputLocationPath);
  
    return axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    }).then(response => {
  
      //ensure that the user can call `then()` only when the file has
      //been downloaded entirely.
  
      return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(true);
          }
          //no need to call the reject here, as it will have been called in the
          //'error' stream;
        });
      });
    });
  }

axios.get(url)
  .then(function (response) {
    downloadFile(response['data']['resources'][0]['url'], './data/'+response['data']['resources'][0]['title'])
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });