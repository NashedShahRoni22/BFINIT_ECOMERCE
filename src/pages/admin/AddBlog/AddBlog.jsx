import PageHeading from "../../../components/admin/PageHeading/PageHeading";
import BlogForm from "../../../components/admin/BlogForm";
import useStoreSelector from "../../../hooks/stores/useStoreSelector";
import StoreSelector from "../../../components/admin/StoreSelector";

export default function AddBlog() {
  const { stores, selectedStore, handleStoreChange } = useStoreSelector();

  return (
    <section>
      <PageHeading heading="Add New Blog" />
      <StoreSelector
        stores={stores}
        selectedStore={selectedStore}
        onChange={handleStoreChange}
        titleWhenSelected="Add New Blog to Store"
        titleWhenEmpty="Select a Store to Add New Blog"
      />

      {/* Blog form */}
      {selectedStore?.storeId && <BlogForm storeId={selectedStore?.storeId} />}
    </section>
  );
}
