
export const getArrayFromField = input => JSON.parse($(input).val())
export const saveArrayToField = (input, value) => $(input).val(JSON.stringify(value))

