import { useController, useFormContext } from "react-hook-form";
import { Rating, RatingProps } from "@mui/material";

type Props = {
  name: string;
  label: string;
} & Partial<RatingProps>

export const RatingField = ({ name }: Props) => {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name
  });

  const onChange: RatingProps["onChange"] = (_, newValue) => {
    field.onChange(newValue);
  };

  return <Rating value={field.value} onChange={onChange as any}
                 onBlur={field.onBlur} />;
};