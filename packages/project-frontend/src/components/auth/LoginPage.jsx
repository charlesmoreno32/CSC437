import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { Link, useNavigate } from "react-router";
import { sendPostRequest } from "../sendPostRequest";
import { jwtDecode } from "jwt-decode";

export function LoginPage({ setAuthToken, setLoggedInUsername }) {
  const navigate = useNavigate();
  async function handleLogin({ username: username, password: password }) {
    const response = await sendPostRequest(`/auth/login`, {
      username,
      password,
    });
    if (!response.ok) {
      return response.status;
    }
    const responseData = await response.json();
    if (responseData.token) {
      const decodedToken = jwtDecode(responseData.token);
      setAuthToken(responseData.token);
      setLoggedInUsername(decodedToken.username);
    }
    navigate("/");
    return 2;
  }
  return (
    <div>
      <h1>Login</h1>
      <UsernamePasswordForm onSubmit={handleLogin} />
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
}
