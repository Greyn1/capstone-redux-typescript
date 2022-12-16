import { ChangeEvent, FormEvent, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../Utils/Firebase";
import FormInput from "./FormInput";
import Button from './Button';
import '../Styles/SignUpForm.styles.scss';
import { AuthError, AuthErrorCodes, UserCredential } from "firebase/auth";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export type UserProps = {
  user ?: UserCredential;
}

export default function SignUpForm() {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match")
      return;
    }

    try {
      const { user }:UserProps = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create user, email already in use');
      } else {
        console.log("error: ", error);
      }
    }
  }

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit} >
        <FormInput label='Display Name' type="text" required onChange={handleChange} name='displayName' value={displayName} />

        <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email} />

        <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password} />

        <FormInput label='Confirm Password' type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword} />

        <Button type="submit" >Sign Up</Button>
      </form>
    </div>
  )
}
