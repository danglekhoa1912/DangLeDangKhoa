import Select from "react-select";
import { components } from "react-select";
import React from "react";
import { CurrencySelectProps } from "./CurrencySelectInterface";
import "./CurrencySelect.css";

const { Option } = components;

const IconOption = (props: any) => (
  <Option {...props}>
    <div className="wrap-option">
      <img
        src={require(`../../../assets/svg/${props.data.icon}`)}
        style={{ width: 12 }}
        alt={props.data.label}
      />
      <span className="label">{props.data.label}</span>
    </div>
  </Option>
);

const CurrencySelect = (props: CurrencySelectProps) => (
  <Select
    {...props}
    components={{ Option: IconOption }}
    styles={{
      menu: (styles) => ({ ...styles, width: "140px" }),
      control: (styles) => ({ ...styles, width: "140px" }),
      option: (styles) => ({
        ...styles,
        width: 140,
      }),
    }}
    menuPlacement="auto"
    menuPosition="fixed"
  />
);

export default CurrencySelect;
