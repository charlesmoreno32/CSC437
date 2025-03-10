import React, { useState, useEffect } from "react";

interface AccountSettingsProps {
  onUsernameChange: React.Dispatch<React.SetStateAction<string>>;
}
export function AccountSettings({ onUsernameChange }: AccountSettingsProps) {
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
