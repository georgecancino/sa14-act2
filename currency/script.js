const form = document.querySelector('#currency-form');
const sourceCurrencySelect = document.querySelector('#source-currency');
const targetCurrencySelect = document.querySelector('#target-currency');
const amountInput = document.querySelector('#amount');
const conversionResult = document.querySelector('#conversion-result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sourceCurrency = sourceCurrencySelect.value;
    const targetCurrency = targetCurrencySelect.value;
    const amount = amountInput.value;

    if (amount.trim() === '' || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    fetchCurrencyConversion(sourceCurrency, targetCurrency, amount);
});

function fetchCurrencyConversion(sourceCurrency, targetCurrency, amount) {
    const apiKey = '11a4c589d66ae874f767a3aa';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${sourceCurrency}/${targetCurrency}/${amount}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                displayConversionResult(data.conversion_result, sourceCurrency, targetCurrency);
            } else {
                alert('Failed to perform currency conversion. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error fetching currency conversion:', error);
            alert('Failed to fetch currency conversion data. Please try again later.');
        });
}

function displayConversionResult(result, sourceCurrency, targetCurrency) {
    conversionResult.innerHTML = `
        <p>${amountInput.value} ${sourceCurrency} = ${result.toFixed(2)} ${targetCurrency}</p>
    `;
}
