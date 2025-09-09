"use server";

export async function convert(amount, baseCurrency, currency) {
    if (baseCurrency === currency) {
        return amount;
    }
    const response = await fetch(` https://api.currencyapi.com/v3/latest?apikey=${process.env.API_KEY}&base_currency=${baseCurrency}&currencies=${currency}`).then(
        res => res.json()
    ).then(msg => {
        if (Object.keys(msg).includes('errors')) {
            throw new Error(Object.values(msg.errors).join(',\n'));
        } else {
            return msg;
        }
    });
    const rate = await response.data[currency].value;
    return amount * rate;
}