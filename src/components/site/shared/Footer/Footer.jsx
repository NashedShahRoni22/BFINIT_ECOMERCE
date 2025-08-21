import { Link, useParams } from "react-router";
import { customerCare } from "../../../../data/footer/customercare";
import { LuCopyright } from "react-icons/lu";
import useGetQuery from "../../../../hooks/queries/useGetQuery";
import fbIcon from "../../../../assets/icons/facebook.png";
import ytIcon from "../../../../assets/icons/youtube.png";
import xIcon from "../../../../assets/icons/x.png";
import igIcon from "../../../../assets/icons/instagram.png";

export default function Footer() {
  const { storeId } = useParams();
  const currentYear = new Date().getFullYear();

  // fetch store preference
  const { data: storePreferenceData } = useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId}`,
    queryKey: ["storePreference", storeId],
    enabled: !!storeId,
  });

  return (
    <footer className="bg-primary text-on-primary py-12">
      <div className="container mx-auto px-5">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Customer Care Section */}
          <div>
            <h3 className="border-accent mb-5 inline-block border-b-2 pb-2 text-lg font-semibold">
              Customer Care
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {customerCare.map((info, i) => (
                <Link
                  key={i}
                  to={info.path}
                  className="text-on-primary py-1 text-sm transition-all duration-200 ease-linear hover:pl-2 hover:underline"
                >
                  {info.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="border-accent mb-5 inline-block border-b-2 pb-2 text-lg font-semibold">
              Follow Us
            </h3>

            <div className="flex items-center gap-5">
              <Link to={storePreferenceData?.storeFacebookLink} target="_blank">
                <img src={fbIcon} alt="social links" className="size-8" />
              </Link>

              <Link
                to={storePreferenceData?.storeInstagramLink}
                target="_blank"
              >
                <img src={igIcon} alt="social links" className="size-8" />
              </Link>

              <Link to={storePreferenceData?.storeTwitterLink} target="_blank">
                <img src={xIcon} alt="social links" className="size-8" />
              </Link>

              <Link to={storePreferenceData?.storeYoutubeLink} target="_blank">
                <img src={ytIcon} alt="social links" className="size-8" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="mb-3 flex items-center justify-center gap-2 border-t border-gray-700 pt-8 text-sm text-gray-400 md:mb-0">
          <LuCopyright /> {currentYear} {storePreferenceData?.storeName}. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
