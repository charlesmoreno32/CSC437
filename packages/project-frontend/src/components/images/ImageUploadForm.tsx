import { useId, useState } from "react";

interface ImageUploadFormProps {
  authToken: string;
}

interface ActionState {
  type: "success" | "error";
  message: string;
}

export function ImageUploadForm({ authToken }: ImageUploadFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState("");
  const [result, setResult] = useState<ActionState | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fileInputId = useId();
  const titleInputId = useId();
  const categoryInputId = useId();

  function readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result as string);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(file);
    });
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readAsDataURL(file);
        setPreviewUrl(dataUrl);
      } catch (error) {
        console.error("Error reading file: ", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const image = formData.get("image") as File;
    const name = formData.get("name") as string;

    if (!image || !name) {
      setResult({
        type: "error",
        message: "Please fill in your image and name.",
      });
      setIsPending(false);
      return;
    }

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          setSubmissionError("400 bad upload");
        } else if (response.status === 401) {
          setSubmissionError("401 Unauthorized");
        } else if (response.status === 500) {
          setSubmissionError("500 Internal Server Error");
        } else {
          setSubmissionError("Unexpected response status: " + response.status);
        }
      } else {
        setResult({
          type: "success",
          message: "You have successfully been authenticated!",
        });
      }
    } catch (error) {
      console.error(error);
      setResult({ type: "error", message: `Network error: ${error}` });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={fileInputId}>Choose image to upload: </label>
        <input
          id={fileInputId}
          name="image"
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor={titleInputId}>
          <span>Image title: </span>
          <input id={titleInputId} name="name" />
        </label>
      </div>
      <div>
        <label htmlFor={categoryInputId}>
          <span>Image category: </span>
          <input id={categoryInputId} name="category" />
        </label>
      </div>

      <div>
        {previewUrl && (
          <img style={{ maxWidth: "20em" }} src={previewUrl} alt="" />
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Uploading..." : "Confirm upload"}
      </button>
      {result?.type === "error" && (
        <div style={{ color: "red" }}>{result.message}</div>
      )}
      {submissionError !== "" && (
        <div style={{ color: "red" }}>{submissionError}</div>
      )}
    </form>
  );
}
