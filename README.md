# Currency Converter

This is a simple **Currency Converter** application built with **React**. It allows users to convert an amount of one currency to another using real-time exchange rates from the and Show the real-time exchange rates from the **ExchangeRate-API**.

## Features

- Select from and to currencies from a dropdown list.
- Enter an amount to convert.
- Fetches the latest exchange rates for conversion.
- Displays the converted amount and exchange rate.
- Handles errors like invalid amount or unsupported conversion.
- Responsive UI, built with **Tailwind CSS**.

## Technologies Used

- **React** (Functional Components, Hooks)
- **Tailwind CSS** (for styling)
- **Fetch API** (to fetch exchange rates)
- **ExchangeRate-API** (for real-time exchange rate data)

## Installation

To get the project up and running locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Eyueal191/Currency_Converter.git
```

### 2. Install dependencies

Navigate to the project folder and install the necessary dependencies:

```bash
cd Currency_Converter
npm install
```

### 3. Start the development server

```bash
npm start
```

Your app will be running at [http://localhost:3000](http://localhost:3000).

## How It Works

- The app uses **React hooks** (`useState`, `useRef`) to manage the state of the currency conversion process.
- The user selects the source and target currencies from the dropdown, enters an amount, and hits "Convert".
- The app makes a request to **ExchangeRate-API** to fetch the latest exchange rates for the selected source currency.
- If the conversion is successful, it displays the converted amount, and the exchange rate.
- The user can clear the inputs using the "Clear" button.

## Available Currencies

The app supports the following currencies:

- **USD** - United States Dollar
- **AED** - United Arab Emirates Dirham
- **AFN** - Afghan Afghani
- **ALL** - Albanian Lek
- **AMD** - Armenian Dram
- **ANG** - Netherlands Antillean Gulden
- **AOA** - Angolan Kwanza
- **ARS** - Argentine Peso
- **AUD** - Australian Dollar
- **AZN** - Azerbaijani Manat
- **BDT** - Bangladeshi Taka
- **BHD** - Bahraini Dinar
- **CAD** - Canadian Dollar
- **CHF** - Swiss Franc
- **CNY** - Chinese Yuan
- **DKK** - Danish Krone
- **EGP** - Egyptian Pound
- **ETB** - Ethiopian Birr
- **EUR** - Euro
- **GBP** - British Pound Sterling
- **HKD** - Hong Kong Dollar
- **INR** - Indian Rupee
- **JPY** - Japanese Yen
- **KES** - Kenyan Shilling
- **KRW** - South Korean Won
- **MXN** - Mexican Peso
- **MYR** - Malaysian Ringgit
- **NGN** - Nigerian Naira
- **NOK** - Norwegian Krone
- **NZD** - New Zealand Dollar
- **PKR** - Pakistani Rupee
- **QAR** - Qatari Rial
- **RUB** - Russian Ruble
- **SAR** - Saudi Riyal
- **SEK** - Swedish Krona
- **SGD** - Singapore Dollar
- **THB** - Thai Baht
- **TRY** - Turkish Lira
- **UAH** - Ukrainian Hryvnia
- **ZAR** - South African Rand

## Troubleshooting

- If you encounter an error like "Failed to load exchange rates," it could be due to a problem with the **ExchangeRate-API** service. Please check their [API documentation](https://www.exchangerate-api.com/docs) for further details.
- If the app doesn't load or crashes, try checking the **console logs** for more information on what went wrong.
