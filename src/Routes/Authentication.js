import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import '../Styles/Authentication.styles.scss';

export default function Authentication() {

  return (
    <div className="authentication-container">
        <SignInForm />
        <SignUpForm />
    </div>
  );
}
