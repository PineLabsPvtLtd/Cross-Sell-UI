import CurrencyTextField from '@unicef/material-ui-currency-textfield';

export default function MyComponent({ value, onChange}) {
  return (
    <CurrencyTextField
        label="Amount"
        variant="standard"
        value={value}
        currencySymbol="$"
        outputFormat="string"
        onChange={onChange}
    />
  );
}