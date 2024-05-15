import {Advertisment} from "@prisma/client";
import React from "react";
import {Button, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

export type AdWithImage = Advertisment & {
    imageIds: string[],
};

export const AdvertismentComponent: React.FC<AdWithImage & {
    // eslint-disable-next-line no-unused-vars
    onDelete?: (id: string) => void
}> = ({
          model,
          imageIds,
          brand,
          description,
          cost,
          currency,
          onDelete,
          id
      }) => {
    return <Card sx={{maxWidth: 345}}>
        <CardActionArea>
            <CardMedia
                component={'img'}
                image={`http://localhost:3000/images/${imageIds[0]}`}
                height="200"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {brand} {model}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="h6" color={'green'} gutterBottom component="div">
                    {cost} {currency}
                </Typography>

                {onDelete &&
                    <Button onClick={() => onDelete(id)} size={'small'} color={'error'}
                            variant={'contained'}>Удалить</Button>}
            </CardContent>
        </CardActionArea>
    </Card>
}