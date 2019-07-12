




export const UTCString = /[1-2][0-9]{3}-(([0][1-9])|([1][0-2]))-(([0-2][1-9])|([3][0-1]))T([0-5][0-9]):([0-5][0-9]):([0-5][0-9])Z/; 

export const yyyy_mm_dd_slash_delimiter = /^(19|20)\d{2}\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])$/;
export const mm_dd_yyyy_slash_delimiter = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
export const dd_mm_yyyy_slash_delimiter = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
export const yyyy_mm_dd_hyphen_delimiter = /^(19|20)\d{2}-(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])$/;
export const mm_dd_yyyy_hyphen_delimiter = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
export const dd_mm_yyyy_hyphen_delimiter = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;


export const alpha =  /([a-z]|[A-Z])+/;
export const alphaNumeric = /(([a-z]|[A-Z])+|[0-9]+)+/;
export const email = /^\w+@\w+\..{2,3}(.{2,3})?$/;
export const url = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

export const owaspStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;