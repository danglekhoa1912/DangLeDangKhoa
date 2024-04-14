import React from "react";
import "./Input.css";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChangeText?: (value: string) => void;
  errorMessage?: string;
  isDecimal?: boolean;
}

export default function Input(props: InputProps) {
  const { errorMessage, isDecimal, onChangeText, ...rest } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!isDecimal) {
      onChangeText?.(value);
      return;
    }
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      onChangeText?.(value);
      return;
    }
  };

  return (
    <div className="container-input">
      <input {...rest} onChange={handleChange} />
      {errorMessage && <div className="error">* {errorMessage}</div>}
    </div>
  );
}
