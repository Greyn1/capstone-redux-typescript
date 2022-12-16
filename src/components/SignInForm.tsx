import { ChangeEvent, FormEvent, useState } from "react";
import {
    signInWithGooglePopUp,
    signInAuthUserWithEmailAndPassword
} from "../Utils/Firebase";
import FormInput from "./FormInput";
import Button, {BUTTON_TYPE_CLASSES} from './Button';
import '../Styles/SignInForm.styles.scss';
import { AuthError } from "firebase/auth";

const defaultFormFields = {
    email: '',
    password: ''
}

export default function SignInForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopUp();
    }

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch ((error as AuthError).code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;

                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;

                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit} >
                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password} />
                <div className="buttons-container">
                    <Button type="submit" >Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google} >Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}
