'use client'

import {Box, Typography} from "@mui/material";
import React, {useState} from 'react';
import {SearchForm} from "./components/SearchForm";
import {AdvertismentComponent, AdWithImage} from "./components/AdvertisementComponent";

export default function Page() {
    const [advertisments, setAdvertisments] = useState<AdWithImage[] | null>(null);

    const handleSearch = (ads: AdWithImage[]) => {
        setAdvertisments(ads);
    };

    return <Box padding={'30px 0'}>
        <Typography variant={'h4'} color={'black'}>Поиск</Typography>
        <SearchForm onSuccess={handleSearch}/>
        <Box height={'20px'}/>
        {
            advertisments?.map(ad => <AdvertismentComponent key={ad.id} {...ad} />)
        }
    </Box>
}