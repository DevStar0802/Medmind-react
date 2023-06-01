const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
admin.initializeApp();

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
