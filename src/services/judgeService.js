const axios = require('axios');

exports.submitToJudge0 = async (code, language_id = 71) => {
  const response = await axios.post(
    'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
    {
      source_code: code,
      language_id,
    },
    {
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
        'X-RapidAPI-Host': process.env.JUDGE0_HOST,
      },
    }
  );

  return response.data;
};
