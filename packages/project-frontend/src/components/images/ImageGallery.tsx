import { MainLayout } from "../MainLayout.js";
import { useImageFetching } from "./useImageFetching.js";
import { ImageUploadForm } from "./ImageUploadForm.js";
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
      <Link to={"/images/" + image._id}>
        <img src={image.src} alt={image.name} />
      </Link>
    </div>
  ));
  return (
    <div>
      <h3>Upload Images</h3>
      <ImageUploadForm authToken={authToken} />
      <h2>Image Gallery</h2>
      {isLoading && "Loading..."}
      <div className="ImageGallery">{imageElements}</div>
    </div>
  );
}
