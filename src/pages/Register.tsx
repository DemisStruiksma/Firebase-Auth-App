import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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
        <div>
            <form onSubmit={handleRegister}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>

                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                <button type="submit">Register</button>
            </form>
            <p>Already registered? Go to <Link to="/login" title="Go to login">Login</Link></p>
        </div>
    );
  }
  
export default Register;