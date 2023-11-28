import { useState, useEffect } from "react";

export default function EditdvdQuantityModal({ isOpenvd product, ovdvdnvdity || 1);
vdv
  cvdvdvonst handleSave = () => {
    onSave(product.ndc, newQuantity);d
  };
vdv
  return (
    isOpen ? (
      <div className="modal">displayvdvvd
  vdvdvd        <input type="numdvber" value={newQuantity} onChdv{(e)d => setNewQuantity(e.target.value)} />
        </div>dv
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onCvdvdose}>Cancel</button>
        </div>
      </div>
    ) : null
  );
}
