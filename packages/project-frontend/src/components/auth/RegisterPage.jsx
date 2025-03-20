import { UsernamePasswordForm } from "./UsernamePasswordForm";
import { sendPostRequest } from "../sendPostRequest";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export function RegisterPage({ setAuthToken, setLoggedInUsername }) {
  const navigate = useNavigate();
  async function handleRegistration({
    username: username,
    password: password,
  }) {
    const response = await sendPostRequest(`/auth/register`, {
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
      <h1>Register a New Account</h1>
      <UsernamePasswordForm onSubmit={handleRegistration} />
    </div>
  );
}
