'use client'

import {Box, Button, FormHelperText} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import {InputField} from "../../../components/form/InputField";
import {atom} from "@reatom/core";
import {reatomAsync} from "@reatom/async";
import {AuthInterface} from "../../../../../common/interfaces/auth/auth.interface";
import {login} from "./api/login";
import {reatomComponent, useAtom} from "@reatom/npm-react";
import {AxiosError} from "axios";
import {userAtom} from "../../../atoms/user.atom";
import Link from "next/link";
import {useSavedPage} from "../../../hooks/useSavedPage";
import {useEffect} from "react";

const loginErrorAtom = atom<string | null>(null, 'loginErrorAtom');

const fetchLogin = reatomAsync(async (ctx, body: AuthInterface) => {
    try {
        const userResult = await login(body);

        userAtom(ctx, userResult);

        return true;
    } catch (e) {
        if (e instanceof AxiosError) {
            loginErrorAtom(ctx, e.response?.data.message)
        }
        return false;
    }
})

const EmailRegex = /^\S+@\S+\.\S+$/

const LoginPage = reatomComponent(({ctx}) => {
    const methods = useForm<AuthInterface>();
    const {handleSubmit, setError} = methods;

    const [formError] = useAtom(loginErrorAtom);
    const [user] = useAtom(userAtom);

    const {navigate} = useSavedPage();

    useEffect(() => {
        if (user) {
            navigate();
        }
    }, [user, navigate]);

    const onSubmit = handleSubmit(async (data) => {
        if (!EmailRegex.test(data.email)) {
            setError('email', {
                message: 'Неверный формат email'
            })
        }

        const logined = await fetchLogin(ctx, data);

        if (logined) {
            navigate();
        }
    });

    return <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
            <h3>Вход</h3>
            <Box height={'20px'}/>
            <Box display={'flex'} width={'400px'} gap={'20px'}
                 flexDirection={'column'}>
                <InputField required type={'email'} size={'small'} fullWidth placeholder={'Введите имя пользователя'}
                            name={'email'}
                            label={'Email'}/>
                <InputField required size={'small'} placeholder={'Введите пароль'} type={'password'}
                            name={'password'}
                            label={'Пароль'}/>
            </Box>
            {formError && <>
                <Box height={'10px'}/>
                <FormHelperText error>{formError}</FormHelperText>
            </>}
            <Box height={'30px'}/>
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
                <Button type={'submit'} size={'medium'} variant={'contained'}>Войти</Button>
                <Button size={'medium'}><Link href={'/auth/register'}>Регистрация</Link></Button>
            </Box>
        </form>
    </FormProvider>
});

export default LoginPage;