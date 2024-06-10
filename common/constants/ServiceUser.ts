import { UserRole } from "./UserRole";
import { UserWithAvatar } from "../../frontend/src/atoms/user.atom";

export const SUPPORT_USER_ID = "support";
export const SUPPORT_USER_LOGIN = "Поддержка";
export const SUPPORT_USER_PASSWORD = "12345678";
export const SUPPORT_USER_MAIL = "support@auto.ru";
export const SUPPORT_USER_PHONE = "+7 000 000 00 00";
export const SUPPORT_AVATAR = "SUPPORT_AVATAR";

export const SupportUser: UserWithAvatar = {
  createdAt: new Date(),
  email: SUPPORT_USER_MAIL,
  id: SUPPORT_USER_ID,
  avatar: SUPPORT_AVATAR,
  imageId: "",
  password: "",
  phoneNumber: SUPPORT_USER_PHONE,
  role: UserRole.Regular,
  login: SUPPORT_USER_LOGIN
};

export const ADMIN_USER_ID = "admin";
export const ADMIN_USER_LOGIN = "Администратор";
export const ADMIN_USER_PASSWORD = "12345678";
export const ADMIN_USER_MAIL = "admin@auto.ru";
export const ADMIN_USER_PHONE = "+7 888 888 88 88";
export const ADMIN_AVATAR = "ADMIN_AVATAR";

export const AdminUser: UserWithAvatar = {
  createdAt: new Date(),
  email: ADMIN_USER_MAIL,
  id: ADMIN_USER_ID,
  avatar: ADMIN_AVATAR,
  imageId: "",
  password: "",
  phoneNumber: ADMIN_USER_PHONE,
  role: UserRole.Regular,
  login: ADMIN_USER_LOGIN
};