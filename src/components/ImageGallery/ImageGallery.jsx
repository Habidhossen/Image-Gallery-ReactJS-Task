import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import addImage from "../../assets/images/add-image.png";
import image1 from "../../assets/images/image-1.webp";
import image10 from "../../assets/images/image-10.jpeg";
import image11 from "../../assets/images/image-11.jpeg";
import image2 from "../../assets/images/image-2.webp";
import image3 from "../../assets/images/image-3.webp";
import image4 from "../../assets/images/image-4.webp";
import image5 from "../../assets/images/image-5.webp";
import image6 from "../../assets/images/image-6.webp";
import image7 from "../../assets/images/image-7.webp";
import image8 from "../../assets/images/image-8.webp";
import image9 from "../../assets/images/image-9.webp";

const ImageGallery = () => {
  // State to manage selected images and the gallery images.
  const [selectedImages, setSelectedImages] = useState([]);
  // gallery images
  const [images, setImages] = useState([
    { id: 1, url: image1, isFeatured: true },
    { id: 2, url: image2, isFeatured: false },
    { id: 3, url: image3, isFeatured: false },
    { id: 4, url: image4, isFeatured: false },
    { id: 5, url: image5, isFeatured: false },
    { id: 6, url: image6, isFeatured: false },
    { id: 7, url: image7, isFeatured: false },
    { id: 8, url: image8, isFeatured: false },
    { id: 9, url: image9, isFeatured: false },
    { id: 10, url: image10, isFeatured: false },
    { id: 11, url: image11, isFeatured: false },
  ]);

  // Function to handle image sorting.
  const handleSort = (newImages) => {
    // Update images and set the first image as featured.
    const updatedImages = newImages.map((image, index) => {
      return {
        ...image,
        isFeatured: index === 0, // The first image is featured.
      };
    });
    setImages(updatedImages);
  };

  // Function to handle image selection (toggling selection).
  const handleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  // Function to delete selected images.
  const handleDeleteSelected = () => {
    const remainingImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(remainingImages);
    setSelectedImages([]);
  };

  // Count of selected images.
  const selectedImageCount = selectedImages.length;

  return (
    <div>
      <div className="mx-6 md:mx-8 lg:mx-24 mb-12">
        {/* header */}
        <div className="flex items-center justify-between py-6 border-b mb-6">
          <div className="flex items-center gap-2">
            {selectedImageCount > 0 && (
              <input
                type="checkbox"
                className="w-4 h-4"
                defaultChecked={true}
              />
            )}
            <h1 className="font-semibold">
              {selectedImageCount > 0
                ? `${selectedImageCount} ${
                    selectedImageCount === 1 ? "File" : "Files"
                  } Selected`
                : "Image Gallery"}
            </h1>
          </div>
          {/* delete button */}
          <button
            className="text-red-500 font-medium hover:underline"
            onClick={handleDeleteSelected}
          >
            Delete Files
          </button>
        </div>
        {/* image gallery */}
        <ReactSortable
          list={images}
          setList={handleSort}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-4"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`${
                image.isFeatured
                  ? "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2"
                  : "col-span-1 row-span-1"
              } relative`}
            >
              <img
                src={image.url}
                alt={`Image ${index + 1}`}
                className="w-full h-auto border rounded-xl"
              />

              <div
                className={`absolute inset-0 bg-gray-800 transition-opacity group hover:opacity-60 duration-300 border rounded-xl ${
                  selectedImages.includes(image.id) ? "opacity-30" : "opacity-0"
                }`}
              >
                <input
                  onClick={() => handleImageSelection(image.id)}
                  type="checkbox"
                  className="absolute top-3 left-3 w-6 h-6"
                />
              </div>
            </div>
          ))}
          {/* upload dummy image */}
          <div>
            <img
              src={addImage}
              alt="add mage"
              className="w-full h-auto border rounded-xl"
            />
          </div>
        </ReactSortable>
      </div>
    </div>
  );
};

export default ImageGallery;
