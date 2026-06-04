import { X } from "lucide-react";
import { useState } from "react";

const COUNTRIES = [
  { value: "us", label: "🇺🇸 United States" },
  { value: "gb", label: "🇬🇧 United Kingdom" },
  { value: "fr", label: "🇫🇷 France" },
  { value: "de", label: "🇩🇪 Germany" },
  { value: "jp", label: "🇯🇵 Japan" },
  { value: "au", label: "🇦🇺 Australia" },
  { value: "ca", label: "🇨🇦 Canada" },
  { value: "sg", label: "🇸🇬 Singapore" },
  { value: "ae", label: "🇦🇪 United Arab Emirates" },
  { value: "bd", label: "🇧🇩 Bangladesh" },
  { value: "in", label: "🇮🇳 India" },
  { value: "br", label: "🇧🇷 Brazil" },
  { value: "it", label: "🇮🇹 Italy" },
  { value: "es", label: "🇪🇸 Spain" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "ja", label: "日本語" },
  { value: "ar", label: "العربية" },
  { value: "bn", label: "বাংলা" },
  { value: "pt", label: "Português" },
  { value: "it", label: "Italiano" },
  { value: "es", label: "Español" },
  { value: "zh", label: "中文" },
];

const SidePanel = ({ open, onClose, onApply }) => {
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");

  const handleApply = () => {
    onApply({ country, language });
    onClose();
  };

  const selectedCountryLabel =
    COUNTRIES.find((c) => c.value === country)?.label || null;
  const selectedLangLabel =
    LANGUAGES.find((l) => l.value === language)?.label || null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-2000 transition-all duration-400 ${open ? "pointer-events-auto bg-black/40" : "pointer-events-none bg-transparent"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-2001 flex w-96 max-w-[94vw] flex-col bg-white shadow-[−32px_0_80px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-out ${open ? "translate-x-0" : "translate-x-full"} `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-0">
          <p className="max-w-[200px] text-xl leading-snug font-light text-gray-900">
            Change your country &amp; language
          </p>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-7 overflow-y-auto p-8">
          {/* Country */}
          <div>
            <label className="mb-2.5 block text-[11px] font-medium tracking-widest text-gray-400 uppercase">
              Country / Region
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-xs text-gray-800 transition-colors hover:border-amber-400 focus:border-amber-400 focus:bg-white focus:outline-none"
            >
              <option value="">Select country...</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value} className="text-xs">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Language */}
          <div>
            <label className="mb-2.5 block text-[11px] font-medium tracking-widest text-gray-400 uppercase">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-xs text-gray-800 transition-colors hover:border-amber-400 focus:border-amber-400 focus:bg-white focus:outline-none"
            >
              <option value="" className="text-xs">
                Select language...
              </option>
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Preview */}
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">
            {selectedCountryLabel || selectedLangLabel ? (
              <>
                <span className="font-medium text-gray-900">Selected: </span>
                {selectedCountryLabel || "—"} &nbsp;·&nbsp;{" "}
                {selectedLangLabel || "—"}
              </>
            ) : (
              <>
                <span className="font-medium text-gray-900">Current: </span>No
                selection made yet
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 pt-0">
          <button
            onClick={handleApply}
            className="w-full rounded-lg bg-gray-900 py-3.5 text-sm tracking-wide text-white transition-all duration-200 hover:bg-gray-700 active:scale-[0.98]"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
