import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../sendPostRequest";
import { useNavigate } from "react-router";
import { jwtDecode, JwtPayload } from "jwt-decode";
import "./auth.css";

interface RegisterProps {
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
  setLoggedInUsername: React.Dispatch<React.SetStateAction<string>>;
}

interface Credentials {
  username: string;
  password: string;
}

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

export function RegisterPage({
  setAuthToken,
  setLoggedInUsername,
}: RegisterProps) {
  const navigate = useNavigate();
  async function handleRegistration({
    username: username,
    password: password,
  }: Credentials) {
    const response = await sendPostRequest(`/auth/register`, {
      username,
      password,
    });
    if (!response) {
      return 500;
    }
    if (!response.ok) {
      return response.status;
    }
    const responseData = await response.json();
    if (responseData.token) {
      const decodedToken = jwtDecode<CustomJwtPayload>(responseData.token);
      setAuthToken(responseData.token);
      setLoggedInUsername(decodedToken.username);
    }
    navigate("/");
    return 2;
  }
  return (
    <div className="wrapper">
      <h1>Register a New Account</h1>
      <UsernamePasswordForm onSubmit={handleRegistration} />
    </div>
  );
}
