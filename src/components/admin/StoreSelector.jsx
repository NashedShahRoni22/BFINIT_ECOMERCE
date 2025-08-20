export default function StoreSelector({
  stores,
  selectedStore,
  onChange,
  titleWhenSelected,
  titleWhenEmpty,
}) {
  return (
    <div className="my-6 flex flex-wrap items-center justify-between">
      <h3 className="text-lg font-semibold">
        {selectedStore?.storeId ? (
          <>
            {titleWhenSelected}{" "}
            <span className="font-semibold">{selectedStore?.storeName}</span>
          </>
        ) : (
          titleWhenEmpty
        )}
      </h3>

      <div className="relative">
        <label htmlFor="storeSelect" className="sr-only">
          Select Store
        </label>
        <select
          id="storeSelect"
          value={selectedStore?.storeId || ""}
          onChange={onChange}
          className="rounded-md border border-neutral-300 p-2 text-sm focus:outline-none"
        >
          <option value="" disabled>
            Select Store
          </option>
          {stores?.data?.map((store) => (
            <option key={store?.storeId} value={store?.storeId}>
              {store?.storeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
