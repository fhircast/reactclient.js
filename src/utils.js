export const toSelectOption = value => ({ value, label: value });

export const toSelectOptions = values => values.map(toSelectOption);

export const isSuccessStatus = status =>
  status && status >= 200 && status < 300;
