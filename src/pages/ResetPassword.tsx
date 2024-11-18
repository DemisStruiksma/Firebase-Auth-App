import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import Button from "../components/atoms/Button";
import InputField from "../components/atoms/InputField";
import Form from "../components/molecules/Form";
import { routes } from "../constants";

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetPasswordResponse = await auth.resetPassword({email});
        
        if(resetPasswordResponse instanceof Error) {
            // Use toast notification for error handling.
            toast.error(resetPasswordResponse.message);
        } else {
            toast.success("Password reset email sent successfully!");
            navigate(routes.home);
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
