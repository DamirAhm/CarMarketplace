"use client";

import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Image } from "../../../../components/Image";
import { reatomComponent, useAtom } from "@reatom/npm-react";
import { userAtom } from "../../../../atoms/user.atom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ImageField } from "../../../../components/form/ImageField";
import { FormProvider, useForm } from "react-hook-form";
import React, { PropsWithChildren, useEffect } from "react";
import { IUpdateUser } from "../../../../../../common/interfaces/users/updateUser.interface";
import { updateUser } from "./api/updateUser";
import { fetchMe } from "../../../../components/UserFetcher";
import { InputField } from "../../../../components/form/InputField";
import { PhoneField } from "../../../../components/form/PhoneField";

const ProfilePage = reatomComponent(({ ctx }) => {
  const [user] = useAtom(userAtom);
  const methods = useForm<IUpdateUser>({
    defaultValues: {
      login: "",
      phoneNumber: "",
      email: ""
    }
  });

  useEffect(() => {
    methods.reset({
      login: user?.login,
      phoneNumber: user?.phoneNumber,
      email: user?.email
    });
  }, [methods, user]);

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (data.password && !data.prevPassword) {
      methods.setError("prevPassword", { message: "Введите предыдущий пароль" });
    }

    data.avatar = avatar;

    try {
      await updateUser(data);
      await fetchMe(ctx);
    } catch { /* empty */
    }
  });

  const handleDeleteAvatar = () => {
    methods.setValue("avatar", null as any);
  };

  const formAvatar = methods.watch("avatar");

  const avatar = formAvatar === undefined ? user?.avatar : formAvatar;

  return <Box display={"flex"} justifyContent={"center"} padding={"30px 0"}>
    <Paper>
      <Box width={"50vw"} padding={"20px"}>
        <Typography color={"black"} variant={"h4"}>
          Ваш профиль
        </Typography>
        <Box height={"40px"} />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <Grid container width={"100%"}>
              <Grid item xs={5} justifyContent={"center"}>
                {avatar
                  ? <Box width={"100%"} display={"flex"} flexDirection={"column"}
                         alignItems={"center"}>
                    <Image id={avatar} />
                    <Box width={"300px"} padding={"20px 0 0"} display={"flex"}
                         justifyContent={"space-between"}>
                      <ImageField display={false} name={"avatar"}
                                  RenderElement={({ children }: PropsWithChildren) => <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                  >
                                    Изменить
                                    {children}
                                  </Button>} />
                      <Button onClick={handleDeleteAvatar} color={"error"}>Удалить</Button>
                    </Box>
                  </Box>
                  : <ImageField name={"avatar"}
                                RenderElement={({ children }: PropsWithChildren) => <label><Box
                                  bgcolor={"lightcyan"}
                                  width={"300px"}
                                  height={"300px"}
                                  display={"flex"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                  borderRadius={"16px"}
                                  style={{ cursor: "pointer" }}
                                >
                                  <CloudUploadIcon />&nbsp;&nbsp;&nbsp;
                                  <Typography color={"black"} variant={"body1"}>
                                    Загрузить изображение
                                  </Typography>
                                  {children}
                                </Box></label>}
                  />
                }
              </Grid>
              <Grid item xs={7}>
                <Box padding={"0 10px 0 20px"} width={"100%"} display={"flex"} flexDirection={"column"}
                     gap={"30px"}>
                  <Typography color={"black"} variant={"h6"}>
                    Личные данные
                  </Typography>
                  <InputField label={"Имя пользователя"} name={"login"} />
                  <InputField name={"email"} label={"Адрес электронной почты"} />
                  <PhoneField name={"phoneNumber"}
                              label={"Номер телефона"} />

                  <Typography color={"black"} variant={"h6"}>
                    Смена пароля
                  </Typography>
                  <Grid container gap={2} width={"100%"}>
                    <Grid item xs={5.5}>
                      <InputField fullWidth name={"prevPassword"} label={"Предыдущий пароль"}
                                  type={"password"} />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField fullWidth name={"password"} label={"Новый пароль"}
                                  type={"password"} />
                    </Grid>
                  </Grid>
                  <Button type={"submit"}>Сохранить</Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Box>
    </Paper>
  </Box>;
});

export default ProfilePage;