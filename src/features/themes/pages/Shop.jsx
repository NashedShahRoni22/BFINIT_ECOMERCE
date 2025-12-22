import { useState, useMemo } from "react";
import { Grid3x3, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import { dummyProducts } from "@/features/themes/utils/contstants";
import ProductCard from "../components/cards/products/ProductCard";

const gridLayoutMap = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

export default function ShopPage() {
  const { selectedStore } = useSelectedStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [gridLayout, setGridLayout] = useState(4);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const productsPerPage = 20;

  // Fetch products
  const { data: productsData, isLoading } = useGetQuery({
    endpoint: `/product/store?storeId=${selectedStore?.storeId}&page=${currentPage}&limit=${productsPerPage}`,
    token: true,
    clientId: true,
    queryKey: ["shop-products", selectedStore?.storeId, currentPage],
    enabled: !!selectedStore?.storeId,
  });

  const products =
    productsData?.data?.length > 0 ? productsData.data : dummyProducts;
  const totalPages = productsData?.totalPages || 1;

  // Extract unique values for filters
  const { categories, brands, tags } = useMemo(() => {
    const cats = [
      ...new Set(products.map((p) => p.productCategory).filter(Boolean)),
    ];
    const brds = [
      ...new Set(
        products
          .map((p) => p.productBrand)
          .filter((b) => b && b !== "Undefined")
      ),
    ];
    const tgs = [...new Set(products.flatMap((p) => p.tags || []))];
    return { categories: cats, brands: brds, tags: tgs };
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.includes(p.productCategory)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.includes(p.productBrand)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) =>
        p.tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    // Price filter
    filtered = filtered.filter((p) => {
      const price = p.productPrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.productPrice - b.productPrice);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.productPrice - a.productPrice);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    products,
    selectedCategories,
    selectedBrands,
    selectedTags,
    priceRange,
    sortBy,
  ]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedTags([]);
    setPriceRange([0, 10000]);
    setSortBy("default");
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedTags.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 10000;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Shop All Products
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of quality products curated just
            for you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <aside
            className={cn(
              "hidden lg:block w-64 flex-shrink-0",
              showFilters && "block"
            )}
          >
            <div className="sticky top-4 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-primary hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="mr-2 rounded border-border"
                        />
                        <span className="text-sm text-muted-foreground">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {brands.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Brands
                  </h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {brands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="mr-2 rounded border-border"
                        />
                        <span className="text-sm text-muted-foreground">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Price Range
                </h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1 text-xs rounded-full border transition-colors",
                          selectedTags.includes(tag)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-muted-foreground border-border hover:border-primary"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-background border border-border rounded-md text-sm text-foreground"
                  >
                    <option value="default">Default</option>
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>

                  {/* Grid Layout */}
                  <div className="hidden sm:flex items-center gap-1 bg-muted rounded-md p-1">
                    {[2, 3, 4, 5].map((cols) => (
                      <button
                        key={cols}
                        onClick={() => setGridLayout(cols)}
                        className={cn(
                          "p-2 rounded transition-colors",
                          gridLayout === cols
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {cols === 2 && <Grid3x3 className="w-4 h-4" />}
                        {cols === 3 && <LayoutGrid className="w-4 h-4" />}
                        {cols === 4 && <Grid3x3 className="w-4 h-4" />}
                        {cols === 5 && <List className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {cat}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {brand}
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className={cn("grid gap-6", gridLayoutMap[gridLayout])}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted aspect-square rounded-lg mb-4"></div>
                    <div className="bg-muted h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-muted h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && filteredProducts.length > 0 && (
              <div className={cn("grid gap-6", gridLayoutMap[gridLayout])}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.productId || product._id}
                    product={product}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                  <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && filteredProducts.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-6 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    // Show first, last, current, and adjacent pages
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={cn(
                            "w-10 h-10 border rounded-md text-sm font-medium transition-colors",
                            currentPage === pageNum
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-foreground hover:bg-accent"
                          )}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return (
                        <span key={pageNum} className="text-muted-foreground">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-6 py-2 border border-border rounded-md text-sm font-medium text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-card border-r border-border overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-accent rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Same filter content as desktop sidebar */}
            {/* ... (repeat filter sections here) ... */}
          </div>
        </div>
      )}
    </div>
  );
}
