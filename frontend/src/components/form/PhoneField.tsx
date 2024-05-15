import {useController, useFormContext} from "react-hook-form";
import {TextFieldProps} from "@mui/material";
import {MuiTelInput} from 'mui-tel-input'

type Props = {
    name: string;
    label: string;
    required?: boolean;
} & Partial<TextFieldProps>

export const PhoneField = ({name, type, required, label, ...rest}: Props) => {
    const {control} = useFormContext();
    const {field, fieldState} = useController({
        control,
        name,
        rules: {
            required
        }
    });

    const onChange: any = (value: string) => {
        console.log(value)
        field.onChange(type === 'number' ? Number(value) : value);
    }

    return <MuiTelInput
        defaultCountry={'RU'}
        value={field.value}
        required={required}
        label={label}
        onChange={onChange}
        onBlur={field.onBlur}
        error={!!fieldState.error}
        helperText={fieldState.error && fieldState.error.message}
        {...rest}
    />
}