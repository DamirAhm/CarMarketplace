import { IAuth } from "./auth.interface";

export interface IRegister extends IAuth {
  phoneNumber: string;
  login: string;
}