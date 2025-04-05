import React, { useState, useRef } from "react";

function App() {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");

  const amountInput = useRef();
  const fromInput = useRef();
  const toInput = useRef();

  const availableCurrency = [
    "USD_USA Dollar",
    "AED_United Arab Emirates Dirham",
    "AFN_Afghan Afghani",
    "ALL_Albanian Lek",
    "AMD_Armenian Dram",
    "ANG_Netherlands Antillean Gulden",
    "AOA_Angolan Kwanza",
    "ARS_Argentine Peso",
    "AUD_Australian Dollar",
    "AZN_Azerbaijani Manat",
    "BDT_Bangladeshi Taka",
    "BHD_Bahraini Dinar",
    "CAD_Canadian Dollar",
    "CHF_Swiss Franc",
    "CNY_Chinese Yuan",
    "DKK_Danish Krone",
    "EGP_Egyptian Pound",
    "ETB_Ethiopian Birr", // ✅ Added here
    "EUR_Euro",
    "GBP_British Pound Sterling",
    "HKD_Hong Kong Dollar",
    "INR_Indian Rupee",
    "JPY_Japanese Yen",
    "KES_Kenyan Shilling",
    "KRW_South Korean Won",
    "MXN_Mexican Peso",
    "MYR_Malaysian Ringgit",
    "NGN_Nigerian Naira",
    "NOK_Norwegian Krone",
    "NZD_New Zealand Dollar",
    "PKR_Pakistani Rupee",
    "QAR_Qatari Rial",
    "RUB_Russian Ruble",
    "SAR_Saudi Riyal",
    "SEK_Swedish Krona",
    "SGD_Singapore Dollar",
    "THB_Thai Baht",
    "TRY_Turkish Lira",
    "UAH_Ukrainian Hryvnia",
    "ZAR_South African Rand",
  ];

  const currencyOptions = availableCurrency.map((currency, index) => {
    const [code, name] = currency.split("_");
    return (
      <option value={code} key={code}>
        {name} ({code})
      </option>
    );
  });

  async function getExchangeRates(fromCurrency) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/a990b82d2630e877ebcac318/latest/${fromCurrency}`
      );
      if (!res.ok) throw new Error("Failed to load exchange rates");

      const data = await res.json();
      return data.conversion_rates;
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput.current.value);
    const from = fromInput.current.value;
    const to = toInput.current.value;

    if (!amount || amount <= 0) {
      setErrorMessage("Please enter a valid amount.");
      return;
    }

    if (from === to) {
      setErrorMessage("From and To currency cannot be the same.");
      return;
    }

    const rates = await getExchangeRates(from);
    if (rates && rates[to]) {
      const rate = rates[to];
      setExchangeRate(rate);
      setConvertedAmount(rate * amount);
      setFromCurrency(from);
      setToCurrency(to);
      setErrorMessage(null);
    } else {
      setErrorMessage("Conversion rate not available.");
    }
  };

  const onClearHandler = () => {
    setExchangeRate(null);
    setConvertedAmount(null);
    setErrorMessage(null);
    amountInput.current.value = "";
    fromInput.current.value = "USD";
    toInput.current.value = "USD";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <header className="bg-[#2b2b2b] text-white flex items-center justify-between p-4 shadow">
        <img
          src="https://i.postimg.cc/8CBRhNb6/c4334ce1-02ae-47ea-a864-370163604484.png"
          alt="Logo"
          className="w-20 h-20 object-contain rounded"
        />
        <h1 className="text-3xl font-bold text-center flex-grow">
          Currency Converter
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-3xl bg-white p-6 rounded shadow-md"
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="from-currency" className="mb-2 font-semibold">
                From Currency:
              </label>
              <select
                ref={fromInput}
                id="from-currency"
                className="p-2 border rounded"
              >
                {currencyOptions}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="to-currency" className="mb-2 font-semibold">
                To Currency:
              </label>
              <select
                ref={toInput}
                id="to-currency"
                className="p-2 border rounded"
              >
                {currencyOptions}
              </select>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="amount" className="mb-2 font-semibold">
                Amount:
              </label>
              <input
                ref={amountInput}
                type="number"
                id="amount"
                placeholder="Enter amount"
                className="p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <button
              type="submit"
              className="bg-[#c62828] text-white px-6 py-2 rounded hover:bg-[#b71c1c] transition"
            >
              {loading ? "Converting..." : "Convert"}
            </button>
            <button
              type="button"
              onClick={onClearHandler}
              className="bg-[#f57c00] text-white px-6 py-2 rounded hover:bg-[#ef6c00] transition"
            >
              Clear
            </button>
          </div>
        </form>

        {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}

        {convertedAmount && !errorMessage && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">Converted Amount:</h2>
            <p className="text-lg">
              {convertedAmount.toFixed(2)} {toCurrency}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
          </div>
        )}
      </main>

      <footer className="bg-[#2b2b2b] text-white text-center py-4">
        © 2025 Currency Converter
      </footer>
    </div>
  );
}

export default App;
