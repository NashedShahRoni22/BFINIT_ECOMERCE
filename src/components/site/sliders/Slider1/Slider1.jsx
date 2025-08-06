import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import SliderUpdateCard from "../../../admin/SliderUpdateCard/SliderUpdateCard";
import Spinner from "../../../admin/loaders/Spinner";
import useUpdateMutation from "../../../../hooks/mutations/useUpdateMutation";
import useAuth from "../../../../hooks/auth/useAuth";
import useGetQuery from "../../../../hooks/queries/useGetQuery";
import { carouselData } from "../../../../data/carouselData";
import "swiper/css";
import "swiper/css/navigation";
import "./slider1.css";

// Skeleton Loading Component
const SliderSkeleton = () => {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-gray-200 sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-gray-400">
          <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function Slider1() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { pathname } = useLocation();
  const pathSegment = pathname?.split("/")[1];
  const storeId = pathname?.split("/")[2];
  const isCustomize = pathSegment === "customize-store";

  // get slider data from api
  const { data: sliderApiData, isLoading: isSliderLoading } = useGetQuery({
    endpoint: `/slider/images?storeId=${storeId}`,
    queryKey: ["slider1", storeId],
    enabled: !!storeId,
  });

  // upload slider image
  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/slider/images/${storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const [showSlideEdit, setShowSlideEdit] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const [deleteImgUrls, setDeleteImgUrls] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // calculate total images count
  const totalImg = useMemo(() => {
    return sliderData.reduce((acc, img) => {
      return img.img ? acc + 1 : acc;
    }, 0);
  }, [sliderData]);

  // update placeholder slider image with slider api data
  useEffect(() => {
    if (sliderApiData?.message === "Slider Images successfully retrieved ") {
      // make api data image object into array of objects
      const imagesArray = Object.entries(sliderApiData?.data).map(
        ([key, value], i) => ({
          id: i + 1,
          img: value && `https://ecomback.bfinit.com${value}`,
          url: "/",
        }),
      );

      setSliderData(imagesArray);
      setIsDataLoaded(true);
    } else if (
      sliderApiData &&
      sliderApiData?.message !== "Slider Images successfully retrieved "
    ) {
      // If API returns but no data, use default carousel data
      setSliderData([...carouselData]);
      setIsDataLoaded(true);
    }
  }, [sliderApiData]);

  // Fallback for when storeId is not available or API fails
  useEffect(() => {
    if (!storeId || (!isSliderLoading && !sliderApiData)) {
      setSliderData([...carouselData]);
      setIsDataLoaded(true);
    }
  }, [storeId, isSliderLoading, sliderApiData]);

  // toggle slide edit component
  const toggleSlideEdit = () => {
    setShowSlideEdit((prev) => !prev);
  };

  // remove image
  const handleImgRemove = (id) => {
    if (totalImg <= 1) {
      return toast.error("At least 1 image must be selected!");
    }

    const findSlider = sliderData.find((slider) => slider.id === id);

    if (findSlider && findSlider.img !== null) {
      setDeleteImgUrls((prev) => [...prev, `image${findSlider.id}`]);
    }

    const filteredImg = sliderData.map((slider) =>
      slider.id === id ? { ...slider, img: null } : slider,
    );
    setSliderData(filteredImg);
  };

  // handle image change
  const handleImgChange = (e, id) => {
    const file = e.target.files[0];
    e.target.value = null;

    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        return toast.error("Image size must be 2MB or less.");
      }
    }

    const filteredImg = sliderData.map((slider) =>
      slider.id === id ? { ...slider, img: file } : slider,
    );
    setSliderData(filteredImg);
  };

  // handle update
  const handleUpdate = () => {
    const formData = new FormData();

    sliderData.forEach((sliderImg, i) => {
      if (sliderImg.img instanceof File) {
        formData.append(`image${i + 1}`, sliderImg.img);
      }
    });

    if (deleteImgUrls.length > 0) {
      formData.append("deleteImageUrl", JSON.stringify(deleteImgUrls));
    }

    // function to upload/delete or update image
    mutate(formData, {
      onSuccess: (res) => {
        if (res?.message === "Images Uploaded Successfully") {
          toast.success("Slider updated");
          queryClient.invalidateQueries(["slider1", storeId]);
        }
      },

      onError: (err) => {
        console.log(err);
      },

      onSettled: () => {
        toggleSlideEdit();
      },
    });
  };

  // Show skeleton while loading
  if (isSliderLoading || !isDataLoaded) {
    return (
      <section className="mx-5 py-5 md:container md:mx-auto">
        <SliderSkeleton />
      </section>
    );
  }

  return (
    <section className="mx-5 py-5 md:container md:mx-auto">
      {/* Slider edit button and customization for admin */}
      {showSlideEdit && isCustomize && (
        <div className="relative w-full overflow-hidden rounded-lg border border-dashed border-neutral-200 p-4">
          <div className="mb-4 flex justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Edit Slider Image
            </h3>
            <div>
              <p className="text-xs text-gray-600">Recommended: 1536x600px</p>
              <p className="text-xs text-gray-600">Max size: 2MB</p>
            </div>
          </div>

          {/* slider cards container */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {sliderData?.map((data, i) => (
              // slider image card
              <SliderUpdateCard
                key={data.id}
                i={i}
                data={data}
                handleImgRemove={handleImgRemove}
                handleImgChange={handleImgChange}
              />
            ))}
          </div>

          {/* action buttons container */}
          <div className="mt-4 flex items-center justify-end gap-4">
            <button
              onClick={toggleSlideEdit}
              className="rounded-lg bg-neutral-200 px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ease-in-out hover:bg-neutral-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className={`inline-flex min-w-[110px] items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-white transition-all duration-200 ease-in-out ${isPending ? "bg-dashboard-primary/50 cursor-not-allowed" : "bg-dashboard-primary hover:bg-dashboard-primary-hover cursor-pointer"}`}
            >
              {isPending ? (
                <>
                  <Spinner />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      )}

      {/* swiper slider */}
      {!showSlideEdit && (
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Navigation]}
          id="slider1"
          className="relative h-[200px] w-full overflow-hidden rounded-lg sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]"
        >
          {isCustomize && (
            <button
              onClick={toggleSlideEdit}
              className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded bg-white/80 px-3 py-1 text-sm shadow hover:bg-white"
            >
              <HiOutlinePencilSquare className="h-4 w-4" />
              Edit Slideshow
            </button>
          )}

          {sliderData.map(
            (data, i) =>
              data.img !== null && (
                <SwiperSlide key={i}>
                  <div className="block h-full w-full">
                    <img
                      src={data.img}
                      alt={data.title || `Slide ${i + 1}`}
                      className="h-full w-full object-cover"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </SwiperSlide>
              ),
          )}
        </Swiper>
      )}
    </section>
  );
}
