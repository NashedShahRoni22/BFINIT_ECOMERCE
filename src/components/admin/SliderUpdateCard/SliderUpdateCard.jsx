import {
  HiMiniArrowPath,
  HiOutlineTrash,
  HiOutlineArrowUpTray,
} from "react-icons/hi2";

export default function SliderUpdateCard({
  i,
  data,
  handleImgRemove,
  handleImgChange,
  handleUpdate,
}) {
  return (
    <div className="flex flex-col rounded-lg border border-dashed border-neutral-200 p-2.5">
      <p>Slider {i + 1}</p>

      {data.img ? (
        <div className="group relative h-[150px] w-full overflow-hidden rounded-lg bg-neutral-100 px-2">
          <img
            src={
              data.img instanceof File
                ? URL.createObjectURL(data.img)
                : data.img
            }
            alt=""
            className="h-full w-full rounded object-contain"
          />

          {/* hover img change/remove overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-lg bg-gradient-to-t from-black/80 via-black/60 to-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:opacity-100">
            <label
              htmlFor={`sliderImg${i}`}
              className="bg-dashboard-primary hover:bg-dashboard-primary-hover flex min-w-[140px] cursor-pointer items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-white shadow-md transition-all hover:shadow-lg"
            >
              <HiMiniArrowPath className="size-4 flex-shrink-0" />
              <span>Change Image</span>
            </label>

            <button
              onClick={() => handleImgRemove(data.id)}
              className="flex min-w-[140px] items-center justify-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[13px] font-medium text-gray-800 shadow-md transition-all hover:bg-white/90 hover:text-red-600 hover:shadow-lg"
            >
              <HiOutlineTrash className="h-4 w-4 flex-shrink-0" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 content-center rounded-lg bg-neutral-100 p-4">
          <label
            htmlFor={`sliderImg${i}`}
            className="bg-dashboard-primary hover:bg-dashboard-primary-hover flex min-w-[140px] cursor-pointer items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-[13px] font-medium text-white shadow-md transition-all hover:shadow-lg"
          >
            <HiOutlineArrowUpTray className="size-4 flex-shrink-0" />
            <span>Add Image</span>
          </label>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        id={`sliderImg${i}`}
        className="hidden"
        onChange={(e) => handleImgChange(e, data.id)}
      />
    </div>
  );
}
