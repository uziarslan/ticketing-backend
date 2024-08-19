const axios = require("axios");
const qs = require("qs");

const ENDPOINT = "https://nikhilpujari.in/Xspace/wasserman/php";

const fetchCoat = async (req, res) => {
  const response = await axios.get(`${ENDPOINT}/fetch_coat.php`);
  res.status(200).json(response.data);
};

const borrowList = async (req, res) => {
  const response = await axios.get(`${ENDPOINT}/borrower-list.php`);
  res.status(200).json(response.data);
};

const handleFormSubmit = async (req, res) => {
  const formData = req.body;
  const response = await axios.post(
    `${ENDPOINT}/submit.php`,
    qs.stringify(formData),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (response.status === 200) {
    return res.status(200);
  }

  res.status(response.status);
};

module.exports = {
  fetchCoat,
  borrowList,
  handleFormSubmit,
};
