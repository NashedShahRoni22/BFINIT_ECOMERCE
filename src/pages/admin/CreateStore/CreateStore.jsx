import { useState } from "react";
import ImageField from "../../../components/admin/ImageField/ImageField";
import { handleImgChange } from "../../../utils/admin/handleImgChange";
import { handleRemoveImg } from "../../../utils/admin/handleRemoveImg";
const themes = [
  {
    id: 1,
    name: "black theme",
    primary: "#000000",
    accent: "#ff6900",
    text: "#fff",
  },
  {
    id: 2,
    name: "blue theme",
    primary: "#1e96fc",
    accent: "#FF8C42",
    text: "#fff",
  },
  {
    id: 3,
    name: "green theme",
    primary: "#2f855a",
    accent: "#84cc16",
    text: "#fff",
  },
  {
    id: 4,
    name: "cream theme",
    primary: "#faf3e0",
    accent: "#c084fc",
    text: "#000",
  },
];

export default function CreateStore() {
  const [selectedImages, setSelectedImages] = useState({
    logo: null,
    favicon: null,
  });
  const [selectedThemes, setSelectedThemes] = useState("");

  return (
    <section className="p-5">
      <h1 className="text-center text-xl font-semibold capitalize">
        Create new store
      </h1>

      <form className="mt-8 space-y-5">
        <div className="grid gap-8 md:grid-cols-2">
          {/* logo */}
          <ImageField
            id="logo"
            label="Logo"
            selectedImg={selectedImages.logo}
            handleImgChange={(e) =>
              handleImgChange(e, "logo", setSelectedImages)
            }
            handleRemoveImg={() => handleRemoveImg("logo", setSelectedImages)}
          />

          {/* favicon */}
          <ImageField
            id="favicon"
            label="Favicon"
            selectedImg={selectedImages.favicon}
            handleImgChange={(e) =>
              handleImgChange(e, "favicon", setSelectedImages)
            }
            handleRemoveImg={() =>
              handleRemoveImg("favicon", setSelectedImages)
            }
          />
        </div>

        {/* store name & contact info */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Store Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="text-sm font-medium">
              Mobile No:
            </label>
            <input
              type="text"
              name="mobile"
              id="mobile"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
          <div>
            <label htmlFor="telephone" className="text-sm font-medium">
              Telephone:
            </label>
            <input
              type="text"
              name="telephone"
              id="telephone"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="address" className="text-sm font-medium">
              Address:
            </label>
            <textarea
              rows={3}
              name="address"
              id="address"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
        </div>

        {/* social info */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <label htmlFor="facebook" className="text-sm font-medium">
              Facebook:
            </label>
            <input
              type="url"
              name="facebook"
              id="facebook"
              placeholder="https://facebook.com/john.doe"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
          <div>
            <label htmlFor="twitter" className="text-sm font-medium">
              X:
            </label>
            <input
              type="url"
              name="twitter"
              id="twitter"
              placeholder="https://x.com/john.doe"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
          <div>
            <label htmlFor="instagram" className="text-sm font-medium">
              Instagram:
            </label>
            <input
              type="url"
              name="instagram"
              id="instagram"
              placeholder="https://www.instagram.com/john.doe"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
          <div>
            <label htmlFor="youtube" className="text-sm font-medium">
              Youtube:
            </label>
            <input
              type="url"
              name="youtube"
              id="youtube"
              placeholder="https://www.youtube.com/@john.doe"
              required
              className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
            />
          </div>
        </div>

        {/* theme */}
        <div>
          <p className="text-sm font-medium">Choose Theme:</p>
          <div className="mt-2 grid grid-cols-2 gap-8 md:grid-cols-4">
            {themes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => setSelectedThemes(theme.id)}
                className={`cursor-pointer rounded border bg-neutral-50 p-3.5 ${selectedThemes === theme.id ? "border-dashboard-primary" : "border-neutral-200"}`}
              >
                <div className="flex justify-center gap-1">
                  <div
                    style={{ backgroundColor: theme.primary }}
                    className="size-8 rounded-full border border-neutral-200"
                  ></div>
                  <div
                    style={{ backgroundColor: theme.accent }}
                    className="size-8 rounded-full border border-neutral-200"
                  ></div>
                  <div
                    style={{ backgroundColor: theme.text }}
                    className="size-8 rounded-full border border-neutral-200"
                  ></div>
                </div>
                <p
                  className={`mt-2.5 text-center text-sm font-semibold capitalize ${selectedThemes === theme.id ? "text-neutral-800" : "text-neutral-500"}`}
                >
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* submit button */}
        <div className="mt-12 mb-5 text-center">
          <button
            type="submit"
            className="bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer rounded px-4 py-1 text-white transition duration-200 ease-in-out"
          >
            Create New Store
          </button>
        </div>
      </form>
    </section>
  );
}
