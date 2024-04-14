import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card.tsx";
import Input from "./components/Input/Input.tsx";
import Select, { components } from "react-select";
import swapLogo from "./assets/svg/swap.svg";
import FancyForm from "./pages/FancyForm.tsx";

const options = [
  { value: "BLUR", label: "BLUR", icon: "BLUR.svg" },
  { value: "BUSD", label: "BUSD", icon: "BUSD.svg" },
  { value: "ETH", label: "ETH", icon: "ETH.svg" },
  { value: "EVMOS", label: "EVMOS", icon: "EVMOS.svg" },
  { value: "GMX", label: "GMX", icon: "GMX.svg" },
  { value: "LUNA", label: "LUNA", icon: "LUNA.svg" },
  { value: "RATOM", label: "RATOM", icon: "rATOM.svg" },
  { value: "STEVMOS", label: "STEVMOS", icon: "stEVMOS.svg" },
  { value: "STRD", label: "STRD", icon: "STRD.svg" },
  { value: "USD", label: "USD", icon: "USD.svg" },
];

function App() {
  const [fromCurrency, setFromCurrency] = useState(options[0]);
  const [toCurrency, setToCurrency] = useState(options[1]);
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleExchange = () => {
    setLoading(true);
    let fromCurrencyRate = 0;
    let toCurrencyRate = 0;
    for (let i = 0; i < exchangeRate.length; i++) {
      if (fromCurrency.value === exchangeRate[i].currency) {
        fromCurrencyRate = exchangeRate[i].price;
      }
      if (toCurrency.value === exchangeRate[i].currency) {
        toCurrencyRate = exchangeRate[i].price;
      }
      if (fromCurrencyRate && toCurrencyRate) {
        break;
      }
    }
    setTimeout(() => {
      setResult(((amount * fromCurrencyRate) / toCurrencyRate).toFixed(2));
      setLoading(false);
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/currency");
      const data = await res.json();
      setExchangeRate(data);
    })();
  }, []);

  return (
    <div className="App">
      <FancyForm/>
    </div>
  );
}

export default App;
