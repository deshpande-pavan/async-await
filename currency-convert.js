const axios = require('axios');


const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get(`https://api.fixer.io/latest?base=${from}`)
        const rate = response.data.rates[to];
        if (rate) {
            return rate;
        } else {
            throw new Error();
        }
    } catch (e) {
        throw new Error(`Unable to get exchange rate from ${from} and ${to}`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        const res = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return res.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to find countries with currency code ${currencyCode}`)
    }
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

convertCurrencyAlt('USD', 'EUR', 5000).then((amount) => {
    console.log(amount);
}).catch((e) => {
    console.log(e.message);
});