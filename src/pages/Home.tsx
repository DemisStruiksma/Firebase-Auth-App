import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import Button from "../components/atoms/Button";
import Card from "../components/organisms/Card";
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
  };

  return (
    <Card
      title={
        auth.userState?.type === "success"
          ? `You're logged in with the following email address: ${auth.userState.user.email}`
          : ""
      }
    >
      <Button
        text="Logout"
        buttonType="button"
        variant="primary"
        onClick={handleLogout}
        customClassNames="w-fit px-6 mt-6"
      />
    </Card>
  );
}

export default Home;
