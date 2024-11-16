import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormEvent, useState } from 'react';
import { auth } from '../services/firebase';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleRegister = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Create new user with filled in email and password after form submission.
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error: unknown) {
            // Check if given error is a Firebase (in this case register) error, if so display error message. Otherwise throw an unknown error.
            if (error instanceof FirebaseError) {                
                // Capture error message in state to display in UI, if any.
                setErrorMessage(error.message);
            } else {
                console.error('An unknown error occurred', error);
            }
        }
    }

    return (
        <main>
            <form onSubmit={handleRegister}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>

                <label>Password</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
                <button type="submit">Register</button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </main>
    );
  }
  
export default Register;