import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import { Button, InputField } from "../components/atoms";
import { Form } from "../components/molecules";
import { Card } from "../components/organisms";
import { routes } from "../constants";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginResponse = await auth.login({ email, password });

    if (loginResponse instanceof Error) {
      // Use toast notification for error handling.
      toast.error(loginResponse.message);
    } else {
      toast.success("Logged in successfully.");
      navigate(routes.home);
    }
  };

  return (
    <Card title="Welcome Back" subTitle="Sign in to your account to continue.">
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

        <p className="text-sm text-body text-right">
          <Link
            to="/reset-password"
            className="text-primary underline hover:text-opacity-80"
          >
            Forgot Password?
          </Link>
        </p>

        <Button
          text="Login"
          buttonType="submit"
          variant="primary"
          customClassNames="w-full"
        />
      </Form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            title="Go to register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default Login;
