import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/atoms/Button";
import InputField from "../components/atoms/InputField";
import Form from "../components/molecules/Form";
import { auth } from "../services/firebase";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try { 
            // Login with filled in email and password, display success notifcation after.
            await signInWithEmailAndPassword(auth, email, password).then(() => toast.success("Logged in successfully."));
            navigate("/");
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
                <h2 className="text-2xl font-semibold text-heading text-center">Welcome Back</h2>
                <p className="mt-2 text-sm text-gray-700 text-center">
                    Sign in to your account to continue.
                </p>

                <Form onSubmit={handleLogin} classNames="mt-6 space-y-5">
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

                    <Button text="Login" buttonType="submit" variant="primary" customClassNames="w-full" />
                </Form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-700">
                        Don't have an account?{' '}
                        <Link to={"/register"} title="Go to register" className="font-medium text-primary hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
    </div>
    );
  }
  
export default Login;