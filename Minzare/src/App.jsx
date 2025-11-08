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
    "ETB_Ethiopian Birr",
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

  const currencyOptions = availableCurrency.map((currency) => {
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
      {/* Header */}
      <header className="bg-black text-white flex flex-col sm:flex-row items-center justify-between p-4 shadow-md">
        <img
          src="https://i.postimg.cc/8CBRhNb6/c4334ce1-02ae-47ea-a864-370163604484.png"
          alt="Logo"
          className="w-20 h-20 object-contain rounded mb-2 sm:mb-0"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-center flex-grow">
          Minzare Currency Converter
        </h1>
      </header>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md sm:max-w-3xl bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col">
              <label htmlFor="from-currency" className="mb-2 font-semibold">
                From Currency:
              </label>
              <select
                ref={fromInput}
                id="from-currency"
                className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {currencyOptions}
              </select>
            </div>

            <div className="flex flex-col col-span-1 sm:col-span-2">
              <label htmlFor="amount" className="mb-2 font-semibold">
                Amount:
              </label>
              <input
                ref={amountInput}
                type="number"
                id="amount"
                placeholder="Enter amount"
                className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center mt-6 space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition shadow-md w-full sm:w-auto"
            >
              {loading ? "Converting..." : "Convert"}
            </button>
            <button
              type="button"
              onClick={onClearHandler}
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition shadow-md w-full sm:w-auto"
            >
              Clear
            </button>
          </div>
        </form>

        {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}

        {convertedAmount && !errorMessage && (
          <div className="mt-6 text-center bg-white p-4 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
            <h2 className="text-xl font-semibold">Converted Amount:</h2>
            <p className="text-lg mt-2">
              {convertedAmount.toFixed(2)} {toCurrency}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4 shadow-inner mt-auto">
        © 2025 Minzare Currency Converter
      </footer>
    </div>
  );
}
export default App;
