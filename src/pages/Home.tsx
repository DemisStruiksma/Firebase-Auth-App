import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import Button from "../components/atoms/Button";
import { routes } from "../constants";

function Home() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = async () => {
    const logoutResponse = await auth.logout();
    
    if (logoutResponse.success) {
      toast.success("Logged out successfully.");
      navigate(routes.login);
    } else {
      toast.error(logoutResponse.message);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-body text-2xl font-bold mb-4">
          {auth.userState?.type === "success" && `You're logged in with the following email address: ${auth.userState.user.email}`}
        </h1>

        <Button
          text="Logout"
          buttonType="button"
          variant="primary"
          onClick={handleLogout}
          customClassNames="w-fit px-6 mt-6"
        />
      </div>
    </div>
  )
}
  
export default Home;