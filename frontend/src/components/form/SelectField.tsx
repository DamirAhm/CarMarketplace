import {useController, useFormContext} from "react-hook-form";
import {FormControl, InputLabel, MenuItem, Select, SelectProps} from "@mui/material";

type OptionType = {
    value: string | number;
    title: string;
}

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options: OptionType[] | string[];
    defaultValue?: string;
} & Partial<SelectProps>

export const SelectField = ({name, defaultValue, placeholder, required, options, label, ...rest}: Props) => {
    const {control} = useFormContext();
    const {field, fieldState} = useController({
        control,
        name,
        defaultValue,
        rules: {
            required
        }
    });

    const onChange: SelectProps['onChange'] = (e) => {
        field.onChange(e.target.value);
    }

    const preparedOptions: OptionType[] = typeof options[0] === 'string' ? options.map((value) => ({
        value: value as string,
        title: value as string
    })) : options as OptionType[];

    return <FormControl fullWidth>
        <InputLabel id={name}>{label}</InputLabel>
        <Select defaultValue={defaultValue} value={field.value} required={required} labelId={name}
                placeholder={placeholder ?? label} label={label}
                onChange={onChange}
                onBlur={field.onBlur}
                error={!!fieldState.error} {...rest}>
            {
                preparedOptions
                    .map(({value, title}) =>
                        <MenuItem key={value} value={value}>{title}</MenuItem>
                    )
            }
        </Select>
    </FormControl>
}