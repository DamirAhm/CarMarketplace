type Props = {
    id: string;
}

export const Image = ({id}: Props) => {
    return <div style={{
        width: '300px',
        height: '300px',
        backgroundImage: `url(http://localhost:3000/images/${id})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }}/>
}