'use client'
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import {SelectField} from "../../../../../components/form/SelectField";
import {
    CreateAdvertismentInterface,
    Currencies
} from "../../../../../../../common/interfaces/advertisments/createAdvertisment.interface";
import {Bodies, Brands, EngineTypes, Transmissions} from "../../../../../../../common/constants/CarFeatures";
import {InputField} from "../../../../../components/form/InputField";
import {ImageField} from "../../../../../components/form/ImageField";
import {createAdvertisement} from "./api/createAdvertisement";
import {useRouter} from "next/navigation";

const currentYear = new Date().getFullYear();
const Years = Array.from({length: 50}, (_, i) => currentYear - i).map((value) => ({
    value,
    title: String(value)
}));

export default function CreateAdvertisementsPage() {
    const methods = useForm<CreateAdvertismentInterface>();
    const {handleSubmit} = methods;
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        await createAdvertisement(data);
        router.push('/');
    });

    return <Box padding={'30px 0'}>
        <Typography variant={'h4'} color={'black'}>Создание объявления</Typography>
        <Box height={"20px"}/>
        <Paper>
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <Box gap={"10px"} display={'flex'} flexDirection={'column'} padding={'20px'}>
                        <Typography variant={'h6'} color={'black'}>Заполните информацию о выставляемой
                            машине</Typography>
                        <SelectField name={'brand'} label={'Марка *'} options={Brands} required/>
                        <InputField name={'model'} label={'Модель'} required/>
                        <Box height={"10px"}/>
                        <Typography variant={'h6'} color={'black'}>Характеристики</Typography>
                        <SelectField required name={'year'} label={'Год выпуска *'} options={Years}/>
                        <SelectField name={'body'} label={'Кузов'} options={Bodies}/>
                        <SelectField name={'engineType'} label={'Двигатель'} options={EngineTypes}/>
                        <SelectField name={'transmission'} label={'Коробка передач'} options={Transmissions}/>
                        <InputField name={'engineVolume'} label={'Объем двигателя'} type={'number'}/>
                        <InputField name={'mileage'} label={'Пробег'} type={'number'}/>
                        <Box height={"10px"}/>
                        <Typography variant={'h6'} color={'black'}>Цена</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <InputField required fullWidth name={'cost'} label={'Сумма'} type={'number'}/>
                            </Grid>
                            <Grid item xs={2}>
                                <SelectField required fullWidth defaultValue={Currencies.RUB} name={'currency'}
                                             label={'Валюта'}
                                             options={Object.values(Currencies)}/>
                            </Grid>
                        </Grid>
                        <Box height={"10px"}/>
                        <Typography variant={'h6'} color={'black'}>Фотографии</Typography>
                        <ImageField name={'imageId'}/>
                        <Box height={"10px"}/>
                        <Box width={'200px'}>
                            <Button fullWidth type={'submit'} color={'success'}
                                    variant={'contained'}>Создать</Button>
                        </Box>
                    </Box>
                </form>
            </FormProvider>
        </Paper>
    </Box>
}
