import { useState } from "react";
import StoreDeleteModal from "../../modals/StoreDeleteModal";

export default function StoreCard({ store = {} }) {
  const { name } = store;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div>{name}</div>

      {/* Delete Confirmation Dialog */}
      <StoreDeleteModal
        store={store}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />
    </>
  );
}
