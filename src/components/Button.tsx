import { ButtonHTMLAttributes, ReactNode } from 'react';
import {BaseButton, GoogleSignInButton, InvertedButton,} from '../Styles/Button.styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

export type ButtonProps = {
  children ?: ReactNode;
  buttonType ?: BUTTON_TYPE_CLASSES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({children, buttonType, ...otherProps}:ButtonProps) => {
    // console.log("button-children: ", children);
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...otherProps} >
            {children}
        </CustomButton>
    );
}

export default Button;