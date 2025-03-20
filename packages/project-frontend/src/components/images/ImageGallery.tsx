import { MainLayout } from "../MainLayout.js";
import { useImageFetching } from "./useImageFetching.js";
import "./ImageGallery.css";
import { Link } from "react-router";

interface Image {
  _id: string;
  src: string;
  name: string;
  author: string;
  cat_ids: string[];
}

interface ImageGalleryProps {
  authToken: string;
  isLoading: boolean;
  fetchedImages: Image[];
}

export function ImageGallery({
  isLoading,
  fetchedImages,
  authToken,
}: ImageGalleryProps) {
  const imageElements = fetchedImages.map((image: Image) => (
    <div key={image._id} className="ImageGallery-photo-container">
      <img src={image.src} alt={image.name} />
    </div>
  ));
  return (
    <div>
      {isLoading && "Loading..."}
      <div className="ImageGallery">{imageElements}</div>
    </div>
  );
}
