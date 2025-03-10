import { useState } from "react";
import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import EditableListItem from "../../../components/admin/EditableListItem/EditableListItem";

export default function SubCategory() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ]);
  const [subCategories, setSubCategories] = useState([
    { id: 1, categoryId: 1, name: "Sub-Category 1" },
    { id: 2, categoryId: 1, name: "Sub-Category 2" },
    { id: 3, categoryId: 2, name: "Sub-Category 3" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryNameChange = (e) => {
    setSubCategoryName(e.target.value);
  };

  const handleAddSubCategory = () => {
    if (subCategoryName.trim() === "") {
      alert("Sub-category name cannot be empty!");
      return;
    }
    const newSubCategory = {
      id: subCategories.length + 1,
      categoryId: selectedCategory,
      name: subCategoryName,
    };
    setSubCategories([...subCategories, newSubCategory]);
    setSubCategoryName("");
    setSelectedCategory("");
  };

  const filteredSubCategories = subCategories.filter(
    (subCat) => subCat.categoryId === parseInt(selectedCategory),
  );

  return (
    <section>
      <PageHeading heading="Add Sub-Category" />
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Left Side: Add Sub-Category Form */}
        <div>
          <label htmlFor="category" className="text-sm text-gray-600">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 mb-2 w-full rounded-md border border-neutral-200 bg-[#f8fafb] px-2 py-1.5 outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <div className="mt-4">
              <label htmlFor="subCategoryName" className="text-sm font-medium">
                Sub-Category Name
              </label>
              <input
                type="text"
                id="subCategoryName"
                name="subCategoryName"
                value={subCategoryName}
                onChange={handleSubCategoryNameChange}
                className="mt-1.5 w-full rounded border border-neutral-200 bg-neutral-50 px-4 py-1 outline-none focus:border-neutral-400"
                placeholder="Enter sub-category name"
              />
              <button
                disabled={!subCategoryName}
                onClick={handleAddSubCategory}
                className={`mt-4 w-full rounded px-4 py-2 transition duration-200 ease-in-out ${!subCategoryName ? "bg-neutral-200 text-neutral-600" : "bg-dashboard-primary/90 hover:bg-dashboard-primary cursor-pointer text-white"}`}
              >
                Add Sub-Category
              </button>
            </div>
          )}
        </div>

        {/* Right Side: List of Sub-Categories */}
        <div>
          <p className="rounded bg-neutral-50 px-4 py-2 font-semibold">
            Existing Sub-Categories
          </p>
          {selectedCategory ? (
            <ul className="space-y-2">
              {filteredSubCategories && filteredSubCategories.length > 0 ? (
                filteredSubCategories.map((subCat) => (
                  <EditableListItem key={subCat.id} item={subCat} />
                ))
              ) : (
                <p className="bg-neutral-50 px-4 pb-2">
                  No sub-categories found. Start by adding a new one.
                </p>
              )}
            </ul>
          ) : (
            <p className="bg-neutral-50 px-4 pb-2">
              Select a category to view sub-categories.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
