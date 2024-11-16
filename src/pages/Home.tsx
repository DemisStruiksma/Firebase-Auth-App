import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/atoms/Button";
import { auth } from "../services/firebase";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut().then(() => toast.success("Logged out successfully."))
      navigate("/login")
    } catch (error: unknown) {
      // Check if given error is a Firebase (in this case logout) error, if so display error message. Otherwise throw an unknown error.
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
      <h1 className="text-lg text-black">Home page.</h1>

      <Button text="Logout" buttonType="button" variant="primary" onClick={handleLogout} customClassNames="w-fit px-6" />
    </div>
  )
}
  
export default Home;