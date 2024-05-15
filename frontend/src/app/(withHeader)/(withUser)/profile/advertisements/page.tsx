'use client'

import {Box, Button, ButtonGroup, Modal, Paper, Typography} from "@mui/material";
import {AdvertismentComponent, AdWithIncludes} from "../../../components/AdvertisementComponent";
import React, {useEffect, useState} from "react";
import {getMyAdvertisements} from "./api/getMyAdvertisements";
import {deleteAdvertisement} from "./api/deleteAdvertisement";

export default function MyAdvertisementsPage() {
    const [ads, setAds] = useState<AdWithIncludes[] | null>(null);

    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const res = await getMyAdvertisements();

            setAds(res);
        })()
    }, [])

    const handleDelete = async (id: string) => {
        setDeleting(null);
        try {
            await deleteAdvertisement(id);
            setAds((ads) => ads && ads.filter((ad) => ad.id !== id))
        } catch { /* empty */
        }
    }

    const handleClickDelete = (id: string) => {
        setDeleting(id);
    }
    const handleModalClose = () => {
        setDeleting(null);
    }

    return <Box padding={'30px 0'}>
        <Typography gutterBottom variant={'h4'} color={'black'}>Ваши объявления</Typography>

        {
            ads?.map(ad => <AdvertismentComponent onDelete={handleClickDelete} key={ad.id} {...ad} />)
        }

        <Modal
            open={!!deleting}
            onClose={handleModalClose}
        >
            <Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Paper>
                    <Box padding={'30px'}>
                        <Typography variant={'h6'} color={'black'}>Вы уверены, что хотите удалить
                            объявление?</Typography>
                        <Box height={'40px'}/>
                        <ButtonGroup size={'medium'}>
                            <Button variant={'contained'} color={'error'}
                                    onClick={() => handleDelete(deleting!)}>Удалить</Button>
                            <Box width={'40px'}/>
                            <Button variant={'contained'} onClick={handleModalClose}>Отмена</Button>
                        </ButtonGroup>
                    </Box>
                </Paper>
            </Box>
        </Modal>
    </Box>
}
