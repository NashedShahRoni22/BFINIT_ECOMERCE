import { Card } from "@/components/ui/card";
import SubcategoryItem from "./SubcategoryItem";

export default function SubcategoryCard({ category }) {
  const { category_name, subcategories } = category;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between text-sm">
        <p className="text-sm font-medium">{category_name}</p>
        {subcategories?.length > 0 && (
          <p className="bg-accent text-accent-foreground flex size-4.5 items-center justify-center rounded-full border text-xs">
            {subcategories.length}
          </p>
        )}
      </div>

      <div className="custom-scrollbar-hide h-64 space-y-2 overflow-y-auto border-t pt-4">
        {subcategories?.map((subcategory) => (
          <SubcategoryItem
            key={subcategory.id}
            category={category}
            subcategory={subcategory}
          />
        ))}
      </div>
    </Card>
  );
}
