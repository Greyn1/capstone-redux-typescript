import { FormInputLabel, Group, Input } from '../Styles/FormInput.styles.js';

const FormInput = ({ label, ...otherProps }) => {
    //console.log("otherprops: ", otherProps);
    return (
        <Group>
            <Input {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length} >{label}</FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput;