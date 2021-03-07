const https = require("https");

const httpRequest = function (options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = [];
      res
        .on("data", (d) => {
          body.push(d);
        })
        .on("end", () => {
          try {
            body = Buffer.concat(body).toString();
          } catch (e) {
            reject(e);
          }

          resolve(JSON.parse(body));
        });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};

module.exports = { httpRequest };