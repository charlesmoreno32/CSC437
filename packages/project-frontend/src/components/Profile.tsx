import React, { useState, useEffect } from "react";
import { ImageUploadForm } from "./images/ImageUploadForm";
import { ImageGallery } from "./images/ImageGallery";

interface Image {
  _id: string;
  src: string;
  name: string;
  author: string;
  cat_ids: string[];
}

interface ProfileProps {
  username: string;
  authToken: string;
  isLoading: boolean;
  userImages: Image[];
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

export function Profile({
  username,
  authToken,
  isLoading,
  userImages,
  setAuthToken,
}: ProfileProps) {
  if (!username || typeof username !== "string") {
    return <h2>No username was found</h2>;
  }

  if (!userImages) {
    return <h2>Category not found</h2>;
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAuthToken("");
  }

  return (
    <div>
      <h1>{username}'s Home</h1>
      <button onClick={handleClick}>Log Out</button>
      <ImageUploadForm authToken={authToken} />
      <h2>History</h2>
      <ImageGallery
        isLoading={isLoading}
        fetchedImages={userImages}
        authToken={authToken}
      />
    </div>
  );
}
