import { useParams } from "react-router";
import { Copyright } from "lucide-react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import bitssLogo from "../../../assets/logo/bitss.png";

export default function Contact() {
  const { storeId } = useParams();
  const { data: storePreferenceData } = useGetStorePreference(storeId);
  const currentYear = new Date().getFullYear();

  return (
    <section className="min-h-[calc(100vh-124px)] px-5 py-10 md:container md:mx-auto md:py-16">
      <ContactInfo storePreferenceData={storePreferenceData} />
      <ContactForm />

      {/* Footer */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <Copyright className="size-3" />
            {currentYear} BFIN. BITSS by BFIN. All rights reserved.
          </p>
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              src={bitssLogo}
              alt="BITSS Logo"
              loading="lazy"
              className="h-8"
            />
            <p className="text-xs text-gray-500">
              This form is powered by bitss cyber security
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
