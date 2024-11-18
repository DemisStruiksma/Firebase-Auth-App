import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../AuthProvider";
import Button from "../components/atoms/Button";
import InputField from "../components/atoms/InputField";
import Form from "../components/molecules/Form";
import Card from "../components/organisms/Card";
import { routes } from "../constants";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add client-side validation for Firebase password policy which is set to a minimum of 6 chars and a max of 4096.
    if (password.length < 6 || password.length > 4096) {
      setErrorMessage("Password must be 6 characters or longer.");
      return;
    }

    const registerResponse = await auth.register({ email, password });

    if (registerResponse instanceof Error) {
      // Use toast notification for error handling.
      toast.error(registerResponse.message);
    } else {
      toast.success("Account has been successfully created.");
      navigate(routes.home);
    }
  };

  return (
    <Card
      title="Create an Account"
      subTitle="Fill in the details below to create your account."
    >
      <Form onSubmit={handleRegister} classNames="mt-6 space-y-5">
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

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <Button
          text="Register"
          buttonType="submit"
          variant="primary"
          customClassNames="w-full"
        />
      </Form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-700">
          Already registered?{" "}
          <Link
            to="/login"
            title="Go to login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </Card>
  );
}

export default Register;
