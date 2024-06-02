"use client";

import { Box, Button, FormHelperText } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../../components/form/InputField";
import { atom } from "@reatom/core";
import { reatomAsync } from "@reatom/async";
import { register } from "./api/register";
import { reatomComponent, useAtom } from "@reatom/npm-react";
import { AxiosError } from "axios";
import { userAtom } from "../../../atoms/user.atom";
import Link from "next/link";
import { useSavedPage } from "../../../hooks/useSavedPage";
import { PhoneField } from "../../../components/form/PhoneField";
import { IRegister } from "../../../../../common/interfaces/auth/register.interface";

const registerErrorAtom = atom<string | null>(null, "loginErrorAtom");

const fetchRegister = reatomAsync(async (ctx, body: IRegister) => {
  try {
    const userResult = await register(body);

    userAtom(ctx, userResult);

    return true;
  } catch (e) {
    if (e instanceof AxiosError) {
      registerErrorAtom(ctx, e.response?.data.message);
    }

    return false;
  }
});

// const PasswordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const EmailRegex = /^\S+@\S+\.\S+$/;

const LoginPage = reatomComponent(({ ctx }) => {
  const methods = useForm<IRegister & { password_repeat: string }>();
  const { handleSubmit, setError } = methods;

  const [formError, setFormError] = useAtom(registerErrorAtom);

  const { navigate } = useSavedPage();

  const onSubmit = handleSubmit(async (data) => {
    if (!EmailRegex.test(data.email)) {
      setError("email", {
        message: "Неверный формат email"
      });
    }

    if (data.password !== data.password_repeat) {
      setFormError("Пароли не совпадают");
      setError("password_repeat", {});

      return;
    }

    if (data.password.length < 8) {
      setError("password", {
        message: "Длина пароля не может быть меньше 8 символов"
      });
      setError("password_repeat", {
        message: "Длина пароля не может быть меньше 8 символов"
      });

      return;
    }

    const registered = await fetchRegister(ctx, data);

    if (registered) {
      navigate();
    }
  });

  return <FormProvider {...methods}>
    <form onSubmit={onSubmit}>
      <h3>Регистрация</h3>
      <Box height={"20px"} />
      <Box display={"flex"} width={"400px"} gap={"20px"}
           flexDirection={"column"}>
        <InputField name={"login"} label={"Имя пользователя"} size={"small"} required fullWidth
                    placeholder={"Введите имя пользователя"} />
        <PhoneField name={"phoneNumber"} label={"Номер телефона"} size={"small"} required fullWidth />
        <InputField required size={"small"} fullWidth placeholder={"Введите email"}
                    name={"email"}
                    label={"Email"} />
        <InputField required size={"small"} placeholder={"Введите пароль"} type={"password"}
                    name={"password"}
                    label={"Пароль"} />
        <InputField required size={"small"} placeholder={"Повторно введите пароль"} type={"password"}
                    name={"password_repeat"}
                    label={"Повторите пароль"} />
      </Box>
      {formError && <>
        <Box height={"10px"} />
        <FormHelperText error>{formError}</FormHelperText>
      </>}
      <Box height={"30px"} />
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Button type={"submit"} size={"medium"} variant={"contained"}>Регистрация</Button>
        <Link href={"/auth/login"}><Button size={"medium"}>Войти</Button></Link>
      </Box>
    </form>
  </FormProvider>;
});

export default LoginPage;