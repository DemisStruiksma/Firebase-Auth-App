import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/atoms/Button";
import InputField from "../components/atoms/InputField";
import Form from "../components/molecules/Form";
import { auth } from "../services/firebase";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent successfully!");
            navigate("/login");
        } catch (error: unknown) {
            // Check if given error is a Firebase (in this case password reset) error, if so display error message. Otherwise throw an unknown error.
            if (error instanceof FirebaseError) {                
                // Use toast notification for error handling.
                toast.error(error.message);
            } else {
                toast.error(`An unknown error occurred', ${error}`);
        
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-body mb-6 text-center">Reset Password</h1>

                <Form onSubmit={handleResetPassword}>
                    <InputField 
                        value={email}
                        type="email"
                        label="Email:"
                        required={true}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <Button text="Reset Password" buttonType="submit" variant="primary" customClassNames="w-full mt-6" />
                </Form>

                <p className="text-body mt-4 text-sm text-center">
                    <span>Remembered your password?</span>
                    <Link to="/login" className="text-primary underline ml-1 hover:text-opacity-80">
                    Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
