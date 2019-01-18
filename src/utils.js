export const toSelectOption = value => ({ value, label: value });

export const toSelectOptions = values => values.map(toSelectOption);
