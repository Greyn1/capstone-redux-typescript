import { InputHTMLAttributes } from 'react';
import { FormInputLabel, Group, Input } from '../Styles/FormInput.styles.js';

export type FormInputProps = {
    label : string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...otherProps }:FormInputProps) => {
    //console.log("otherprops: ", otherProps);

    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)} >{label}</FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput;
