import React, { useState, useEffect } from "react";

interface ProfileProps {
  username: string;
  onUsernameChange: React.Dispatch<React.SetStateAction<string>>;
}

export function Profile({ username, onUsernameChange }: ProfileProps) {
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    onUsernameChange(newUsername); // Update state in App
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  return (
    <div>
      {username === "User" ? (
        <div>
          <h2>
            Welcome, please log in or register. <br></br>It's a WIP<br></br>{" "}
            Would fetch user bio and images here. Also would have different
            mobile visuals as it would have the images more column-like to be
            scroll friendly
          </h2>
          <label>
            Username{" "}
            <input
              onChange={handleUsernameChange}
              style={{ border: "1px solid grey" }}
            />
          </label>
          <label>
            Password{" "}
            <input
              onChange={handlePasswordChange}
              style={{ border: "1px solid grey" }}
            />
          </label>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}</h2>
          <label>
            Username{" "}
            <input
              onChange={handleUsernameChange}
              style={{ border: "1px solid grey" }}
            />
          </label>
          <p className="Bio"></p>
          {/* Images */}
          <button>Upload Image Button</button>
        </div>
      )}
    </div>
  );
}
