const axios = require("axios").default;

module.exports = (req, res) => {
  axios({
    method: "get",
    timeout: 10000,
    url: "https://api.reddit.com/r/nottheonion",
  })
    .then((response) => {
      if (response.status === 200) {
        res.status(200).json(response.data);
      } else {
        res.status(response.status).json(response.data);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
