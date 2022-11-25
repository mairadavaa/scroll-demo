export const emailValidator: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordValidator: RegExp = new RegExp("^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&/*-+]).{8,}$");
