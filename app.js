// https://free.currencyconverterapi.com/api/v5/convert?q=GBP_EUR&compact=ultra
// https://free.currencyconverterapi.com/api/v5/convert?q=GBP_EUR

document.getElementById('converter-form').addEventListener('submit', getCurrencyRate);

function getCurrencyRate(e) {

  const amountValue = document.getElementById('amount').value;
  const value = document.getElementById('value');

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://free.currencyconverterapi.com/api/v5/convert?q=GBP_EUR&compact=ultra`, true);

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);

      // currencyRate = response.GBP_EUR;
      const currencyRate = response[Object.keys(response)[0]];
      const calculatedValue = amountValue * currencyRate;
      
      if(amountValue === '' || amountValue === '0') {
        showError('Please check your numbers');
        value.value = '';
      } else {
        value.value = calculatedValue.toFixed(2);
      }

    }
  }

  xhr.send();

  e.preventDefault();
}


function showError(error){

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 5000);
}

function clearError(){
  document.querySelector('.alert').remove();
}