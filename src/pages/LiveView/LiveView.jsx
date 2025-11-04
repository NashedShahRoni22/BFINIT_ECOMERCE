import Preview from "@/components/customize/Preview";
import { useEffect, useState } from "react";

export default function LiveView() {
  const [sections, setSections] = useState({
    header: [],
    body: [],
    footer: [],
  });

  useEffect(() => {
    const previewData = localStorage.getItem("preview");

    if (previewData) {
      const parsed = JSON.parse(previewData);
      setSections(parsed.sections);
    }
  }, []);

  return <Preview sections={sections} liveView={true} />;
}
