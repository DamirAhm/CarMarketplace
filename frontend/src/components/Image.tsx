type Props = {
  id: string;
  size?: number
}

export const Image = ({ id, size = 300 }: Props) => {
  return <div style={{
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(http://localhost:3000/images/${id})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }} />;
};