import { LuImagePlus } from "react-icons/lu";

export default function ImageField({
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
        onChange={handleImgChange}
        type="file"
        name={id}
        id={id}
        required
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
            <div className="absolute top-0 left-0 flex h-full w-full translate-y-full items-center justify-center gap-4 rounded bg-black/50 transition-all duration-200 ease-linear group-hover:translate-y-0">
              <label
                htmlFor={id}
                className="bg-dashboard-primary cursor-pointer rounded px-2 py-1 text-sm font-medium text-white"
              >
                Upload New {label}
              </label>
              <button
                onClick={handleRemoveImg}
                className="cursor-pointer rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-500 transition-all duration-200 ease-in-out hover:bg-red-200"
              >
                Cancel
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
              select your store logo
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
