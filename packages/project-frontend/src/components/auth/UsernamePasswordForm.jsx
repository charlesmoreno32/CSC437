import { useActionState, useState } from "react";

export function UsernamePasswordForm(props) {
  const [submissionError, setSubmissionError] = useState("");
  const [result, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const username = formData.get("username");
      const password = formData.get("password");
      if (!username || !password) {
        return {
          type: "error",
          message: `Please fill in your username and password.`,
        };
      }
      // console.log(username, password);
      const submitStatus = await props.onSubmit({
        username: username,
        password: password,
      });
      if (submitStatus === 400) {
        setSubmissionError("Missing username or password");
      } else if (submitStatus === 401) {
        setSubmissionError("Invalid username or password");
      } else if (submitStatus === 500) {
        setSubmissionError("Internal Server Error logging in");
      } else if (submitStatus === 2) {
        // Covers status codes in the range 200-299
        setSubmissionError("");
      } else {
        setSubmissionError("Unexpected response status: " + submitStatus);
      }

      return {
        type: "success",
        message: `You have succesfully been authenticated!`,
      };
    },
    null
  );

  return (
    <div>
      <form action={submitAction}>
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
        <button type="submit">Submit</button>
      </form>
      {result?.type === "error" && (
        <div style={{ color: "red" }}>{result.message}</div>
      )}
      {submissionError !== "" && (
        <div style={{ color: "red" }}>{submissionError}</div>
      )}
    </div>
  );
}
