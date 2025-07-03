import { HiOutlineArrowUpTray, HiOutlineTrash } from "react-icons/hi2";
import { LuImagePlus } from "react-icons/lu";

export default function ImageField({
  ref,
  id,
  label,
  selectedImg,
  handleImgChange,
  handleRemoveImg,
  sizeMention,
  formatMention,
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}: <span className="text-red-600">*</span>
      </label>
      <input
        ref={ref}
        onChange={handleImgChange}
        type="file"
        name={id}
        id={id}
        accept="image/*"
        className="hidden"
      />
      <div className="mt-2 flex h-[210px] w-full flex-col justify-center rounded border border-dashed border-neutral-300 bg-neutral-50 px-3 py-6 text-center">
        {selectedImg ? (
          <div className="group relative h-40 overflow-hidden">
            <img
              src={URL.createObjectURL(selectedImg)}
              alt=""
              className="h-full w-full rounded object-contain"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-t from-black/80 via-black/60 to-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:opacity-100">
              <label
                htmlFor={id}
                className="bg-dashboard-primary flex min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                <HiOutlineArrowUpTray className="h-4 w-4 flex-shrink-0" />
                <span>Upload New {label}</span>
              </label>

              <button
                onClick={handleRemoveImg}
                className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg bg-white/90 px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-all hover:bg-white hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                aria-label={`Remove ${label}`}
              >
                <HiOutlineTrash className="h-4 w-4 flex-shrink-0" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <LuImagePlus className="mx-auto text-2xl text-neutral-500" />
            <div className="mt-1.5 text-sm text-neutral-500">
              <label
                htmlFor={id}
                className="text-dashboard-primary cursor-pointer underline"
              >
                Click to upload
              </label>{" "}
              & <br />
              select your <span className="lowercase">{label}</span>
              {sizeMention && (
                <p className="mt-1 text-xs text-neutral-400">
                  Required: {sizeMention} <br />
                  <span className="text-[11px]">
                    Recommended: {formatMention}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
