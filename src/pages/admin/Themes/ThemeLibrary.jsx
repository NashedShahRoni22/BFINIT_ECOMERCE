import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

// Dummy theme data
const themes = [
  {
    id: 1,
    name: "Modern Minimal",
    description: "Clean and contemporary design",
    price: "Free",
    preview:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Modern",
  },
  {
    id: 2,
    name: "Elegant Store",
    description: "Sophisticated luxury aesthetic",
    price: "$49",
    preview:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
    category: "Elegant",
  },
  {
    id: 3,
    name: "Bold Commerce",
    description: "Eye-catching vibrant layout",
    price: "$39",
    preview:
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&h=600&fit=crop",
    category: "Bold",
  },
  {
    id: 4,
    name: "Creative Portfolio",
    description: "Showcase your creative work",
    price: "$29",
    preview:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    category: "Creative",
  },
  {
    id: 5,
    name: "Restaurant Pro",
    description: "Perfect for food businesses",
    price: "$39",
    preview:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    category: "Modern",
  },
  {
    id: 6,
    name: "Fitness Hub",
    description: "Energetic design for fitness brands",
    price: "Free",
    preview:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    category: "Bold",
  },
  {
    id: 7,
    name: "Tech Startup",
    description: "Modern SaaS and tech companies",
    price: "$49",
    preview:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    category: "Modern",
  },
  {
    id: 8,
    name: "Fashion Forward",
    description: "Elegant design for fashion brands",
    price: "$59",
    preview:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    category: "Elegant",
  },
  {
    id: 9,
    name: "Minimalist Shop",
    description: "Simple and clean e-commerce",
    price: "Free",
    preview:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    category: "Minimal",
  },
];

export default function ThemeLibrary() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Theme Library</h2>

      {/* Themes container */}
      <div className="grid grid-cols-1 gap-6 rounded-lg border bg-white p-6 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className="group overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg"
          >
            {/* Theme preview image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={theme.preview}
                alt={theme.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Price badge */}
              <div className="absolute top-3 right-3">
                <span className="rounded-full bg-white px-3 py-1 text-sm font-medium shadow-sm">
                  {theme.price}
                </span>
              </div>
            </div>

            {/* Theme details */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{theme.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{theme.description}</p>

              {/* Action buttons */}
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1">
                  Try Theme
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
