import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import SunEditor from "suneditor-react";
import { FaCloudUploadAlt, FaRegTrashAlt } from "react-icons/fa";
import { TbPhotoPlus } from "react-icons/tb";
import { BsFillInfoCircleFill } from "react-icons/bs";
import useAuth from "../../../hooks/auth/useAuth";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useUpdateMutation from "../../../hooks/mutations/useUpdateMutation";
import "suneditor/dist/css/suneditor.min.css";
import Spinner from "../loaders/Spinner";
import { useQueryClient } from "@tanstack/react-query";

export default function BlogUpdateModal({ blogId, storeId, close }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const thumbnailRef = useRef();
  const [selectedThumbnail, setSelectedThumbnail] = useState("");
  const [formData, setFormData] = useState({
    blogHeading: "",
    blogCustomUrl: "",
    blogDescription: "",
    blogImage: "",
  });

  // fetch blog details
  const { data: blogDetails } = useGetQuery({
    endpoint: `/blog/?blogId=${blogId}`,
    token: user?.token,
    queryKey: ["blog", blogId],
    enabled: !!blogId && !!user?.token,
  });

  // update blog field value from api response
  useEffect(() => {
    setFormData({
      blogHeading: blogDetails?.data.blogName,
      blogCustomUrl: blogDetails?.data.blogCustomUrl,
      blogDescription: blogDetails?.data.blogDescription,
      blogImage: blogDetails?.data.blogImage[0],
    });
  }, [blogDetails]);

  // handle input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle description of suneditor
  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({ ...prev, blogDescription: content }));
  };

  // Update selectedThumbnail image
  const handleThumbnail = (e) => {
    const image = e.target.files?.[0];
    if (image) {
      setSelectedThumbnail(image);
    }
  };

  // Delete selectedThumbnail image & reset previously selected image
  const deleteThumbnail = () => {
    setSelectedThumbnail("");
    // reset previously selected thumbnail
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  // custom function for blog update
  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/blog/update/${blogId}`,
    token: user?.token,
  });

  // Handle Add New Blog Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("blogData", JSON.stringify(formData));
    if (selectedThumbnail) {
      payload.append("blogImages", selectedThumbnail);
      payload.append("deleteImageUrl", JSON.stringify([formData?.blogImage]));
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success("New blog added");
        close();
        navigate("/blogs/manage");
        queryClient.invalidateQueries(["blogs", storeId]);
      },
      onError: () => {
        toast.error("Something went wrong!");
        close();
      },
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex w-full flex-col gap-8 py-6">
        {/* Image Upload Container */}
        <div className="border-primary/40 h-44 flex-col items-center justify-center rounded-lg border border-dashed text-neutral-400">
          {selectedThumbnail || formData?.blogImage ? (
            <div className="group relative h-full w-full">
              <img
                src={
                  selectedThumbnail
                    ? URL.createObjectURL(selectedThumbnail)
                    : `https://ecomback.bfinit.com${formData?.blogImage}`
                }
                alt=""
                className="h-full w-full object-contain"
              />

              {/*Add & Delete Button Overlay */}
              <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center gap-x-6 bg-black/50 group-hover:flex">
                {/* add new image button */}
                <label
                  htmlFor="thumbnail"
                  className="border-primary bg-primary hover:bg-primary-hover flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-medium text-white transition-all"
                >
                  <TbPhotoPlus className="text-base" /> <span>New Image</span>
                </label>
                {/* delete image button */}
                <button
                  onClick={deleteThumbnail}
                  className="flex items-center gap-1.5 rounded-md border border-red-400 bg-red-50 px-2.5 py-1.5 text-sm font-medium text-red-500 transition-all hover:bg-red-100"
                >
                  <FaRegTrashAlt className="text-base" /> <span>Delete</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor="thumbnail"
                className="bg-subtle-white flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg"
              >
                <FaCloudUploadAlt className="text-3xl" />
                <span className="mt-1.5">Upload Thumbnail</span>
                <div className="mt-1 flex max-w-56 items-center gap-1.5 text-center text-sm md:max-w-full">
                  <BsFillInfoCircleFill className="hidden md:block" />
                  Image should be maximum 2 MB, with a 600 X 400 pixels.
                </div>
              </label>
            </>
          )}
        </div>
        {/* Image Upload input tag Default Hidden */}
        <input
          ref={thumbnailRef}
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          onChange={handleThumbnail}
          className="hidden"
        />

        {/* Title field */}
        <div className="flex w-full flex-col">
          <label htmlFor="blogHeading" className="text-sm text-gray-600">
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="blogHeading"
            id="blogHeading"
            required
            value={formData.blogHeading}
            onChange={handleInputChange}
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
          />

          {/* Custom URL Filled */}
          <label htmlFor="blogCustomUrl" className="text-sm text-gray-600">
            Custom URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="blogCustomUrl"
            id="blogCustomUrl"
            required
            value={formData.blogCustomUrl}
            onChange={handleInputChange}
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
          />
        </div>

        {/* Blog Details Container */}
        <div>
          <label className="mb-2 block font-medium text-neutral-700">
            Details <span className="text-red-500">*</span>
          </label>
          <SunEditor
            onChange={handleDescriptionChange}
            name="blogDescription"
            height="220px"
            setContents={formData.blogDescription}
            setOptions={{
              buttonList: [
                [
                  "undo",
                  "redo",
                  "formatBlock",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                ],
                [
                  "fontSize",
                  "fontColor",
                  "hiliteColor",
                  "align",
                  "list",
                  "link",
                  "image",
                  "video",
                ],
                ["removeFormat", "preview"],
              ],
              charCounter: true,
            }}
          />
        </div>

        <div className="col-span-12 mt-12 mb-5 flex items-center justify-center">
          <button
            className="bg-dashboard-primary/90 hover:bg-dashboard-primary flex min-h-8 min-w-[164px] cursor-pointer items-center justify-center rounded px-4 py-1 text-white transition duration-200 ease-in-out"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Upload"}
          </button>
        </div>
      </div>
    </form>
  );
}
