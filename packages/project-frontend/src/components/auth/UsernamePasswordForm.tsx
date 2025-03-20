import { useState, FormEvent } from "react";

interface UsernamePasswordFormProps {
  onSubmit: (credentials: {
    username: string;
    password: string;
  }) => Promise<number>;
}

export function UsernamePasswordForm({ onSubmit }: UsernamePasswordFormProps) {
  const [submissionError, setSubmissionError] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setSubmissionError("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      setSubmissionError("Please fill in your username and password.");
      setIsPending(false);
      return;
    }

    try {
      const submitStatus = await onSubmit({ username, password });

      if (submitStatus === 400) {
        setSubmissionError("Missing username or password");
      } else if (submitStatus === 401) {
        setSubmissionError("Invalid username or password");
      } else if (submitStatus === 500) {
        setSubmissionError("Internal Server Error logging in");
      } else if (submitStatus >= 200 && submitStatus < 300) {
        setSuccessMessage("You have successfully been authenticated!");
      } else {
        setSubmissionError(`Unexpected response status: ${submitStatus}`);
      }
    } catch (error) {
      setSubmissionError("An error occurred during submission.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            disabled={isPending}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            disabled={isPending}
          />
        </div>
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
      {submissionError && <div style={{ color: "red" }}>{submissionError}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
    </div>
  );
}
