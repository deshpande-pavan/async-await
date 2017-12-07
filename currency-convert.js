const axios = require('axios');
const getExchangeRate = (from, to) => {
    return axios.get(`https://api.fixer.io/latest?base=${from}`).then((response) => {
        return response.data.rates[to];
    });
};

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((res) => {
        return res.data.map((country) => {
            return country.name;
        })
    });
};


// const convertCurrency = (from, to, amount) => {
//     let countries;
//     return getCountries(to).then((tempCountries) => {
//         countries = tempCountries;
//         return getExchangeRate(from, to);
//     }).then((rate) => {
//         const exchangedAmount = amount * rate;
//         return `${amount} ${from} is worth ${exchangedAmount} ${to}. \n${to} can be used in the following countries:-\n${countries.join(', ')}.` ;
//     });
// }



const convertCurrencyAlt = async (from, to, amount) => {
    const countries = await getCountries(to);
    const exchangeRate = await getExchangeRate(from, to);
    const exchangedAmount = amount * exchangeRate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. \n${to} can be used in the following countries:-\n${countries.join(', ')}.`;
};

convertCurrencyAlt('USD', 'INR', 75000).then((amount) => {
    console.log(amount);
});