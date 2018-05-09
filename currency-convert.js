// currency from currency to amount
// USD CAD amount
// 23 usd is worth 28 cad. you can spend these in the following countries

// http://data.fixer.io/api/latest?access_key=f2c962f80592cf3d344f7de2729923ef

const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
    console.log(response);
    return response.date.rates[to];
  });
}
const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
    return response.data.map((country) => country.name);
  });
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')} `;
  });
};

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangedAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')} `;

}
// getExchangeRate('USD', 'EUR').then((rate) => {
//   console.log(rate);
// });
convertCurrency('USD', 'CAD', 100).then((status) => {
  console.log(status);
});
// getCountries('USD').then((countries) => {
//   console.log(countries);
// });
