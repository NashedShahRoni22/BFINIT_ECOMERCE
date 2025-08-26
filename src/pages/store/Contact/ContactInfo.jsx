import { Link } from "react-router";
import { House, Mail, Phone } from "lucide-react";
import fbIcon from "../../../assets/icons/facebook.png";
import ytIcon from "../../../assets/icons/youtube.png";
import xIcon from "../../../assets/icons/x.png";
import igIcon from "../../../assets/icons/instagram.png";

export default function ContactInfo({ storePreferenceData }) {
  const encodedLocation = encodeURIComponent(
    `${storePreferenceData?.storeAddress} ${storePreferenceData?.country}`,
  );
  const hasSocialLink = !!(
    storePreferenceData?.storeFacebookLink ||
    storePreferenceData?.storeInstagramLink ||
    storePreferenceData?.storeTwitterLink ||
    storePreferenceData?.storeYoutubeLink
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* contact info side */}
      <div>
        <h5 className="font-bold text-gray-900 md:text-2xl">Contact Us</h5>
        <p className="mt-4 text-balance text-gray-600">
          To make requests for further information, contact us via our social
          channels or reach out directly using the information below.
        </p>

        <div className="mt-6 flex gap-5">
          <div className="text-accent flex h-fit w-fit items-center justify-center rounded-xl bg-[#f6f8fa] p-4">
            <House className="size-5 md:size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-gray-900">Address</h5>
            <p className="w-full max-w-72 text-gray-600">
              {storePreferenceData?.storeAddress},{" "}
              {storePreferenceData?.country}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-5">
          <div className="text-accent flex h-fit w-fit items-center justify-center rounded-xl bg-[#f6f8fa] p-4">
            <Phone className="size-5 md:size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-gray-900">Phone</h5>
            <p className="text-gray-600">{storePreferenceData?.storePhone}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-5">
          <div className="text-accent flex h-fit w-fit items-center justify-center rounded-xl bg-[#f6f8fa] p-4">
            <Mail className="size-5 md:size-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="font-semibold text-gray-900">Email</h5>
            <p className="text-gray-600">{storePreferenceData?.storeEmail}</p>
          </div>
        </div>

        {/* social links */}
        {hasSocialLink && (
          <>
            <h2 className="mt-8 text-lg font-semibold">
              Follow us on social media:
            </h2>
            <div className="mt-2 flex items-center gap-2">
              {storePreferenceData?.storeFacebookLink && (
                <Link
                  to={storePreferenceData.storeFacebookLink}
                  target="_blank"
                >
                  <img src={fbIcon} alt="social links" className="size-8" />
                </Link>
              )}

              {storePreferenceData?.storeInstagramLink && (
                <Link
                  to={storePreferenceData.storeInstagramLink}
                  target="_blank"
                >
                  <img src={igIcon} alt="social links" className="size-8" />
                </Link>
              )}

              {storePreferenceData?.storeTwitterLink && (
                <Link to={storePreferenceData.storeTwitterLink} target="_blank">
                  <img src={xIcon} alt="social links" className="size-8" />
                </Link>
              )}

              {storePreferenceData?.storeYoutubeLink && (
                <Link to={storePreferenceData.storeYoutubeLink} target="_blank">
                  <img src={ytIcon} alt="social links" className="size-8" />
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* google map */}
      <div className="overflow-hidden rounded-xl shadow-sm">
        <iframe
          src={`https://www.google.com/maps?q=${encodedLocation}&output=embed`}
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
