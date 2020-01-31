const axios = require('axios');

module.exports = async (word) => {
  const response = await axios.get(`https://api.datamuse.com/words?sl=${word}`);

  return response.data;
};
