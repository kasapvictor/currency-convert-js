let form = document.querySelector(".form"),
    currency = form.querySelector(".currency"),
    inputSum = form.querySelector(".input-sum"),
    btn = form.querySelector(".btn"),
    result = document.querySelectorAll(".result"),
    total = document.querySelectorAll(".total"),
    resultRub = document.querySelector(".total-rub .total"),
    resultUsd =  document.querySelector(".total-usd .total"),
    resultEur =  document.querySelector(".total-eur .total"),
    url = "https://api.exchangeratesapi.io/latest";

// api.exchangeratesapi.io/latest?base=EUR&symbols=MXN,RUB


currency.onchange = changeCurrency;
btn.onclick = function(e) {
    e.preventDefault();
    convert(inputSum.value);
}

function changeCurrency () {
    for (i = 0; i < result.length; i++) {
        result[i].classList.remove("hide");
    }
    for (i = 0; i < total.length; i++) {
        total[i].innerText = "";
    }

    document.querySelector(`.total-${this.value.toLowerCase()}`).classList.add("hide");

    convert(inputSum.value);
}

function convert (sum) {
    fetch (url + `?base=${currency.value}`)
        .then (response => {
            return response.text();
        })
        .then (response => {
            response = JSON.parse(response);

            let rub = sum * response.rates.RUB,
                usd = sum * response.rates.USD,
                eur = sum * response.rates.EUR;

            resultRub.innerText = rub.toFixed(2);
            resultUsd.innerText = usd.toFixed(2);
            resultEur.innerText = eur.toFixed(2);
        });
}
