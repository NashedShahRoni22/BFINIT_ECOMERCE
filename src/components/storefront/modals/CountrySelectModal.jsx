import { Dialog, DialogContent } from "@/components/ui/dialog";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import useCountry from "@/hooks/useCountry";

export default function CountrySelectModal() {
  const { storeId } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const { selectedCountry, saveCountry } = useCountry();
  const { data: storePreference, isLoading } = useGetStorePreference(storeId);

  const countries = useMemo(
    () => storePreference?.countries || [],
    [storePreference?.countries],
  );

  const storeName = storePreference?.storeName || "STORE";

  useEffect(() => {
    const savedCountry = localStorage.getItem(`store_${storeId}_country`);
    if (savedCountry) {
      setIsOpen(false);
      saveCountry(JSON.parse(savedCountry));
      return;
    }
    if (countries.length === 1) {
      setIsOpen(false);
      const country = countries[0];
      saveCountry(country);
      localStorage.setItem(`store_${storeId}_country`, JSON.stringify(country));
      return;
    }
    if (countries.length > 1) {
      setIsOpen(true);
    }
  }, [countries, storeId]);

  const handleCountrySelect = (country) => {
    saveCountry(country);
    localStorage.setItem(`store_${storeId}_country`, JSON.stringify(country));
    setIsOpen(false);
  };

  const handleOpenChange = (open) => {
    if (!open && !selectedCountry) return;
    setIsOpen(false);
  };

  if (isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="bg-foreground/50 flex h-screen max-h-screen w-screen max-w-full! items-center justify-center rounded-none border-0 p-0 shadow-none backdrop-blur-sm [&>button]:hidden"
      >
        {/* Modal Card */}
        <div className="bg-background relative flex max-h-[90svh] w-full max-w-xl flex-col shadow-2xl">
          {/* Fixed header */}
          <div className="px-8 pt-8 pb-6 sm:px-10 sm:pt-10">
            <div className="mb-7">
              <h1 className="text-foreground text-xl font-light tracking-widest uppercase">
                {storeName}
              </h1>
            </div>
            <div className="border-border mb-6 border-t" />
            <p className="text-muted-foreground text-xs tracking-widest uppercase">
              Please select your location
            </p>
          </div>

          {/* Scrollable country list */}
          <div className="overflow-y-auto px-8 pb-8 sm:px-10 sm:pb-10">
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 sm:gap-x-10">
              {countries.map((country) => (
                <button
                  key={country._id}
                  onClick={() => handleCountrySelect(country)}
                  className="group hover:bg-muted active:bg-muted/70 flex cursor-pointer items-center justify-between rounded border-b px-2 py-3 text-left transition-colors duration-150 last:border-b-0 nth-last-2:border-b-0"
                >
                  <span className="text-muted-foreground group-hover:text-foreground text-xs tracking-widest uppercase transition-colors duration-150">
                    {country.country_name}
                  </span>
                  <span className="text-muted-foreground/0 group-hover:text-muted-foreground ml-2 shrink-0 text-xs transition-colors duration-150">
                    {country.currency_symbol}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
