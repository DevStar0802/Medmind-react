const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const mysql = require("mysql2");
admin.initializeApp();
const storage = admin.storage();
const csv = require("csv-parser");
const fs = require("fs");
const { Readable } = require("stream");

const getAuth = () => {
  axios
    .post(
      "https://partners.honeybeehealth.com/oauth/token",
      "grant_type=client_credentials&client_id=_9zPdh0UntynX0sWJUlvzdQBGCZZfZBqxORdWyH-lNI&client_secret=svMyMhIzNhfZekpcd38APiR3eLzg70t8YuifESj_awo"
    )
    .then((res) => {
      setToken(res.access_token);
    });
};
exports.getProducts = functions.https.onRequest(async (req, res) => {
  try {
    const ndc = req.query.ndc;

    const tokenResponse = await axios.post(
      "https://partners.honeybeehealth.com/oauth/token",
      "grant_type=client_credentials&client_id=_9zPdh0UntynX0sWJUlvzdQBGCZZfZBqxORdWyH-lNI&client_secret=svMyMhIzNhfZekpcd38APiR3eLzg70t8YuifESj_awo"
    );
    const token = tokenResponse.data.access_token;
    console.log("token", token);
    console.log("ndc", ndc);

    if (token == null || token === undefined) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (ndc == null || ndc === undefined) {
      return res.status(400).json({ message: "NDC is required" });
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    const url = `https://partners.honeybeehealth.com/v1/products?ndc[]=${ndc}`;

    const response = await axios.get(url, config);
    cors(req, res, () => {
      return res.status(200).json({ data: response.data, success: true });
    });

    return res.status(200).json({ data: response.data, success: true });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err });
  }
});

exports.testingDB = functions.https.onRequest((req, res) => {
  console.log("Start of the function");
  const connection = mysql.createConnection({
    host: "server.geekybugs.com",
    port: "3306",
    user: "geekybugs",
    password: "Server@GB12",
    database: "medMind",
  });

  const matchedNDC = [];
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the MySQL database:", err.message);
      return;
    }
    console.log("===========| Connected to the MySQL database");
    connection.query("SELECT ndc FROM drugs ", (err, res) => {
      if (err) {
        console.error("Error executing the query:", err);
        return;
      }
      const dataNDC = res;
      console.log("NDCs Length: ", dataNDC.length);
      const promises = dataNDC.map((item) => {
        return getProductsss(item.ndc)
          .then((response) => {
            const successResponse = response;
            if (successResponse && successResponse.length > 0) {
              matchedNDC.push(item.ndc);
            }
            console.log("HoneyBee Response:", successResponse);
          })
          .catch((error) => {
            console.error("Error calling API:", error);
          });
      });
      Promise.all(promises)
        .then(() => {
          console.log("Matched NDC:", matchedNDC);
          try {
            const bucket = storage.bucket("medmind-6f2a3.appspot.com");
            const filename = "mydata.csv";
            const file = bucket.file(filename);
            const fileStream = file.createWriteStream({
              metadata: {
                contentType: "text/csv",
              },
            });
            fileStream.on("error", (err) => {
              console.log("Error writing to file:", err);
            });
            fileStream.on("finish", () => {
              console.log("File uploaded successfully");
            });
            const readable = Readable.from(matchedNDC);
            readable.pipe(fileStream);
          } catch (err) {
            console.log("Error in creating file: ", err);
          }
          // writeNDCtoCSV(matchedNDC);

          // write to csv file and store in firebase storage
          // https://console.firebase.google.com/project/medmind-6f2a3/storage/medmind-6f2a3.appspot.com/files
          // const results = [];
          // fs.createReadStream("ndc.csv")
          //   .pipe(csv())
          //   .on("data", (data) => results.push(data))
          //   .on("end", () => {
          //     console.log(results);
          //     const bucket = storage.bucket("medmind-6f2a3.appspot.com");
          //     const file = bucket.file("ndc.csv");
          //     const fileStream = file.createWriteStream({
          //       metadata: {
          //         contentType: "text/csv",
          //       },
          //     });
          //     fileStream.on("error", (err) => {
          //       console.log("Error writing to file:", err);
          //     });
          //     fileStream.on("finish", () => {
          //       console.log("File uploaded successfully");
          //     });
          //     fileStream.end(results);
          //   });
        })
        .catch((error) => {
          console.error("Promise.all error:", error);
        });
    });
  });
  return res.status(200).data();
});

// create a local method to get products and return the data locally
const getProductsss = async (ndc) => {
  console.log("Getting products");
  try {
    const tokenResponse = await axios.post(
      "https://partners.honeybeehealth.com/oauth/token",
      "grant_type=client_credentials&client_id=_9zPdh0UntynX0sWJUlvzdQBGCZZfZBqxORdWyH-lNI&client_secret=svMyMhIzNhfZekpcd38APiR3eLzg70t8YuifESj_awo"
    );
    const token = tokenResponse.data.access_token;
    console.log("token", token);
    console.log("ndc", ndc);

    if (token == null || token === undefined) {
      return null;
    }

    if (ndc == null || ndc === undefined) {
      return null;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    const url = `https://partners.honeybeehealth.com/v1/products?ndc[]=${ndc}`;

    const response = await axios.get(url, config);
    // cors(req, res, () => {
    //   return response.data;
    // });
    return response.data;
  } catch (err) {
    console.log("ERROR", err.message);
    return null;
  }
};
// const functions = require("firebase-functions");
// const axios = require("axios");
// const cors = require("cors")({ origin: true });
// const admin = require("firebase-admin");
// const mysql = require("mysql2");
// admin.initializeApp();
// const storage = admin.storage

// const getAuth = () => {
//   axios
//     .post(
//       "https://partners.honeybeehealth.com/oauth/token",
//       "grant_type=client_credentials&client_id=_9zPdh0UntynX0sWJUlvzdQBGCZZfZBqxORdWyH-lNI&client_secret=svMyMhIzNhfZekpcd38APiR3eLzg70t8YuifESj_awo"
//     )
//     .then((res) => {
//       setToken(res.access_token);
//     });
// };
// exports.getProducts = functions.https.onRequest(async (req, res) => {
//   try {
//     const ndc = req.query.ndc;

//     const tokenResponse = await axios.post(
//       "https://partners.honeybeehealth.com/oauth/token",
//       "grant_type=client_credentials&client_id=_9zPdh0UntynX0sWJUlvzdQBGCZZfZBqxORdWyH-lNI&client_secret=svMyMhIzNhfZekpcd38APiR3eLzg70t8YuifESj_awo"
//     );
//     const token = tokenResponse.data.access_token;
//     console.log("token", token);
//     console.log("ndc", ndc);

//     if (token == null || token === undefined) {
//       return res.status(400).json({ message: "Token is required" });
//     }

//     if (ndc == null || ndc === undefined) {
//       return res.status(400).json({ message: "NDC is required" });
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     };

//     const url = `https://partners.honeybeehealth.com/v1/products?ndc[]=${ndc}`;

//     const response = await axios.get(url, config);
//     cors(req, res, () => {
//       return res.status(200).json({ data: response.data, success: true });
//     });

//     return res.status(200).json({ data: response.data, success: true });
//   } catch (err) {
//     console.log(err.message);
//     return res.status(500).json({ error: err });
//   }
// });

// exports.testingDB = functions.https.onRequest((req, res) => {
//   const connection = mysql.createConnection({
//     host: "server.geekybugs.com",
//     port: "3306",
//     user: "geekybugs",
//     password: "Server@GB12",
//     database: "medMind",
//   });
//   connection.connect((err) => {
//     if (err) {
//       console.error("Error connecting to the MySQL database:", err.message);
//       return;
//     }
//     console.log("Connected to the MySQL database");
//     connection.query("SELECT ndc FROM drugs ", (err, res) => {
//       if (err) {
//         console.error("Error executing the query:", err);
//         return;
//       }
//       const dataNDC = res;
//       const promises = dataNDC.map((item) => {
//         // console.log(item.ndc);
//         return axios
//           .get(
//             `https://us-central1-medmind-6f2a3.cloudfunctions.net/getProducts?ndc=${item.ndc}`
//           )
//           .then((response) => {
//             const successResponse = response.data;
//             if (successResponse && successResponse.data.length > 0) {
//               matchedNDC.push(item.ndc);
//             }
//             console.log("HoneyBee Response:", successResponse);
//           })
//           .catch((error) => {
//             console.error("Error calling API:", error);
//           });
//       });
//       console.log("res", res);
//     });
//   });
// });
