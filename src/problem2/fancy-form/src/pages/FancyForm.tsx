import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import CurrencySelect from "./components/CurrencySelect/CurrencySelect";
import swapLogo from "../assets/svg/swap.svg";
import "./FancyForm.css";
import { IFancyForm, ICurrencyOption, IToken } from "./FancyForm.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

const options: ICurrencyOption[] = [
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

export default function FancyForm() {
  const [fromCurrency, setFromCurrency] = useState(options[0]);
  const [toCurrency, setToCurrency] = useState(options[1]);
  const [exchangeRate, setExchangeRate] = useState<IToken[]>([]);
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
  } = useForm<IFancyForm>();

  useEffect(() => {
    async function fetchExchangeRate() {
      const res = await fetch("/api/currency");
      const data = await res.json();
      setExchangeRate(data);
    }
    fetchExchangeRate();
  }, []);

  const onSubmit: SubmitHandler<IFancyForm> = (data) => {
    if (exchangeRate?.length === 0) return;
    setLoading(true);
    const fromRate =
      exchangeRate.find((rate) => rate?.currency === fromCurrency.value)
        ?.price || 0;
    const toRate =
      exchangeRate.find((rate) => rate?.currency === toCurrency.value)?.price ||
      0;
    setTimeout(() => {
      setResult(+((data.amount * fromRate) / toRate).toFixed(2));
      setLoading(false);
    }, 3000);
  };

  return (
    <Card>
      <div className="container">
        <div className="title">Currency exchange</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="content">
            <div className="wrap-input">
              <Controller
                rules={{
                  required: "Please enter the amount.",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <Input
                    isDecimal
                    value={value}
                    onChangeText={onChange}
                    disabled={loading}
                    errorMessage={error?.message}
                  />
                )}
                name="amount"
                control={control}
              />

              <div className="result">{fromCurrency?.label}</div>
            </div>
            <div className="wrap-select">
              <CurrencySelect
                isDisabled={loading}
                defaultValue={options[0]}
                onChange={(value) => setFromCurrency(value as ICurrencyOption)}
                options={options}
              />
              <img src={swapLogo} alt="" />
              <CurrencySelect
                isDisabled={loading}
                defaultValue={options[1]}
                onChange={(value) => setToCurrency(value as ICurrencyOption)}
                options={options}
              />
              <button type="submit" disabled={loading} className="exchange-btn">
                {loading ? (
                  <img className="loading" src={swapLogo} alt="" />
                ) : (
                  "Go"
                )}
              </button>
            </div>
          </div>
        </form>
        <div className="result">
          {result} {toCurrency?.label}
        </div>
      </div>
    </Card>
  );
}
