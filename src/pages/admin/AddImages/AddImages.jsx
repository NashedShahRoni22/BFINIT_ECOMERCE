import { LuImage } from "react-icons/lu";
import { BsInfoCircle, BsPlusCircle } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

const AddImages = ({
  selectedImages,
  setSelectedImages,
  imagePreviews,
  setImagePreviews,
}) => {
  // Add New Image
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    let totalSize = selectedImages.reduce((acc, img) => acc + img.size, 0); // Get current total size

    const newImages = [];
    const newPreviews = [];

    for (let file of files) {
      if (totalSize + file.size > 2 * 1024 * 1024) {
        // 2MB limit
        alert("Total image size cannot exceed 2MB.");
        break;
      }
      newImages.push(file);
      newPreviews.push(URL.createObjectURL(file));
      totalSize += file.size;
    }

    setSelectedImages([...selectedImages, ...newImages]);
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  // Delete image
  const handleImageRemove = (index) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="col-span-12 rounded-lg border border-neutral-200 bg-white px-4 pt-6 pb-4 lg:col-span-4">
      <div className="mb-6">
        <h3 className="flex items-center gap-1 font-semibold">
          Product Images
          <span
            className="group tooltip font-normal"
            data-tip="You need to select at least 5 images."
          >
            <BsInfoCircle className="text-gray-500 transition-all group-hover:text-black" />
          </span>
        </h3>
        <p className="font-regular text-xs text-gray-400">
          NOTE: Images size should be smaller than 2MB
        </p>
      </div>

      {/* Image select div */}
      <div className="border-2 border-dashed border-neutral-200 bg-[#f8f9fb] px-4 py-10 text-center">
        <input
          multiple
          onChange={handleImageChange}
          className="hidden"
          type="file"
          id="images"
        />

        {imagePreviews && imagePreviews.length > 0 ? (
          <div className="flex w-full flex-wrap items-center gap-x-1.5 gap-y-2">
            {imagePreviews &&
              imagePreviews.map((preview, i) => (
                <div
                  key={i}
                  className="group relative size-16 overflow-hidden rounded"
                >
                  <img
                    src={preview}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute top-0 left-0 flex h-full w-full translate-y-full items-center justify-center bg-black/70 transition-all duration-200 ease-in-out group-hover:translate-y-0">
                    <RiDeleteBinLine
                      onClick={() => handleImageRemove(i)}
                      className="cursor-pointer text-xl text-white transition-all duration-200 ease-in-out hover:text-red-400"
                    />
                  </div>
                </div>
              ))}
            <div className="flex size-16 items-center justify-center rounded bg-white">
              <label htmlFor="images">
                <BsPlusCircle className="hover:text-primary cursor-pointer text-xl transition-all duration-200 ease-in-out" />
              </label>
            </div>
          </div>
        ) : (
          <>
            <LuImage className="inline-block text-3xl text-gray-500" />
            <div className="mt-2 text-xs text-gray-600">
              Drop your image or
              <label
                className="block cursor-pointer font-medium text-blue-400"
                htmlFor="images"
              >
                click to browse
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddImages;
