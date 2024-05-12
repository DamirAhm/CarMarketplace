import {useController, useFormContext} from "react-hook-form";
import {TextField, TextFieldProps} from "@mui/material";

type Props = {
    name: string;
    label: string;
    required?: boolean;
} & Partial<TextFieldProps>

export const InputField = ({name, required, label, ...rest}: Props) => {
    const {control} = useFormContext();
    const {field, fieldState} = useController({
        control,
        name,
        rules: {
            required
        }
    });

    const onChange: TextFieldProps['onChange'] = (e) => {
        field.onChange(e.target.value);
    }

    return <TextField label={label} onChange={onChange} onBlur={field.onBlur}
                      error={!!fieldState.error} helperText={fieldState.error && fieldState.error.message} {...rest}/>
}