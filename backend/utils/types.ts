export interface IAddress {
  _id: string;
  owner: IUser;
  detail: string;
  country: string;
  citySoum: string;
  phoneNum: string;
  zipPostcode: string;
  stateProvince: string;
  apartmentSuite: string;
}
export interface IUser {
  _id: string;
  role: string;
  email: string;
  orders: IOrder[];
  password: string;
  address: IAddress;
  emailToken: string;
  phoneNumber: string;
  isVerified: boolean;
}
export interface IOrder {
  _id: string;
  user: IUser;
  fullname: string;
  email: string;
  address: IAddress;
  orderItems: IProduct[];
  orderStatus: string;
  paymentID: string;
}
export interface ICategory {
  _id: string;
  name: string;
}
export interface IProduct {
  _id: string;
  title: string;
  price: number;
  gender: string;
  unique: boolean;
  images: object[];
  quantity: number;
  category: ICategory;
  description: string;
}
