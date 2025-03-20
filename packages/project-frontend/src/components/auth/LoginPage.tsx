import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { Link, useNavigate } from "react-router";
import { sendPostRequest } from "../sendPostRequest.js";
import { jwtDecode, JwtPayload } from "jwt-decode";
import "./auth.css";

interface LoginProps {
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

export function LoginPage({ setAuthToken, setLoggedInUsername }: LoginProps) {
  const navigate = useNavigate();
  async function handleLogin({
    username: username,
    password: password,
  }: Credentials) {
    const response = await sendPostRequest(`/auth/login`, {
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
      <h1>Login</h1>
      <UsernamePasswordForm onSubmit={handleLogin} />
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
}
