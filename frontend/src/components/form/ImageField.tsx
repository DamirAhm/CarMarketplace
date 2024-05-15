import {useController, useFormContext} from "react-hook-form";
import React, {PropsWithChildren, useState} from "react";
import {Box, Button, Skeleton, styled} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {createImage} from "./api/createImage";
import {Image} from "../Image";

type Props = {
    name: string;
    RenderElement?: React.FC<PropsWithChildren>;
    display?: boolean;
}

const DefaultRenderElement = ({children}: PropsWithChildren) => <Button
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
>
    Загрузить изображение&nbsp;&nbsp;&nbsp;<CloudUploadIcon/>
    {children}
</Button>

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
}) as any as React.FC<any>;

export const ImageField: React.FC<Props> = ({name, display = true, RenderElement = DefaultRenderElement}) => {
    const {control} = useFormContext();
    const {field} = useController({
        name,
        control
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setIsLoading(true);
            const fileId = await createImage(file);
            setIsLoading(false);
            field.onChange(fileId);
        }
    };

    return <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {field.value && display && <Image id={field.value}/>}
        {(!field.value || !display) && !isLoading && <RenderElement>
            <VisuallyHiddenInput accept={'image/*'} onChange={handleChange} type="file"/>
        </RenderElement>}
        {
            !field.value && isLoading && <Skeleton/>
        }
    </Box>
}