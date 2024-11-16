import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import Form from "../components/molecules/Form";
import { auth } from '../services/firebase';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    const handleRegister = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Add client-side validation for Firebase password policy which is set to a minimum of 6 chars and a max of 4096.
        if(password.length >= 6 && password.length <= 4096) {
            setErrorMessage("");

            try {
                // Create new user with filled in email and password after form submission.
                await createUserWithEmailAndPassword(auth, email, password).then(() => toast.success("Account has been successfully created."));
                // Navigate to the login page after successfully creating an account.
                navigate("/login");
            } catch (error: unknown) {
                // Check if given error is a Firebase (in this case register) error, if so display error message. Otherwise throw an unknown error.
                if (error instanceof FirebaseError) {                
                    // Use toast notification for error handling.
                    toast.error(error.message);
                } else {
                    toast.error(`An unknown error occurred', ${error}`);

                }
            }
        } else {
            setErrorMessage("Password must be 6 characters or longer.")
        }
        
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary px-6">
            <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-semibold text-heading text-center">Create an Account</h2>
            
                <Form onSubmit={handleRegister} classNames="mt-6 space-y-5">
                    <InputField 
                        value={email}
                        type="email"
                        label="Email:"
                        required={true}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <InputField 
                        value={password}
                        type="password"
                        label="Password:"
                        required={true}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                    <Button text="Register" buttonType="submit" variant="primary" customClassNames="w-full" />
                </Form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700">
                        Already registered?{' '}
                        <Link to="/login" title="Go to login" className="font-medium text-primary hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
  }
  
export default Register;