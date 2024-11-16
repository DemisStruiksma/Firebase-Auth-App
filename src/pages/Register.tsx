import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/atoms/Button';
import { auth } from '../services/firebase';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleRegister = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary px-6">
            <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-md">
                <h2 className="text-2xl font-semibold text-heading text-center">Create an Account</h2>
            
                <form onSubmit={handleRegister} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-heading">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-secondary focus:ring-secondary"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-heading">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-secondary focus:ring-secondary"
                        />
                    </div>

                    <Button text="Register" buttonType="submit" variant="primary" />
                </form>

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