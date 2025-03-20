import { useState } from "react";

interface Image {
  _id: string;
  src: string;
  name: string;
  author: string;
  cat_ids: string[];
}

interface ImageEditFormProps {
  authToken: string;
  isLoading: boolean;
  fetchedImages: Image[];
}

export function ImageEditForm({ authToken }: ImageEditFormProps) {
  const [imageId, setImageId] = useState("");
  const [imageName, setImageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: imageName }),
      });

      if (!response.ok) {
        console.log("Failed to update image");
      }

      const result = response.json();
      console.log("Image updated successfully:", result);
    } catch (error) {
      console.error("Error updating image:", error);
    } finally {
      setImageId("");
      setImageName("");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <label style={{ display: "block" }}>
        Image ID
        <input
          value={imageId}
          disabled={isLoading}
          onChange={(e) => setImageId(e.target.value)}
        />
      </label>
      <label style={{ display: "block" }}>
        New image name
        <input
          value={imageName}
          disabled={isLoading}
          onChange={(e) => setImageName(e.target.value)}
        />
      </label>
      <button disabled={isLoading} onClick={handleSubmit}>
        Send request
      </button>
    </div>
  );
}
