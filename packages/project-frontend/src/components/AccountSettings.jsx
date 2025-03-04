import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings({ onUsernameChange }) {
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    onUsernameChange(newUsername); // Update state in App
  };

  return (
    <div>
      <h2>Account settings</h2>
      <label>
        Username <input onChange={handleUsernameChange} />
      </label>
      <p>
        <i>Changes are auto-saved.</i>
      </p>
    </div>
  );
}
