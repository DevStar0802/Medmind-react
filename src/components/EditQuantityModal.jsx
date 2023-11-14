import { useState, useEffect } from "react";

export default function EditQuantityModal({ isOpen, product, onClose, onSave }) {
  const [newQuantity, setNewQuantity] = useState(product?.quantity || 1);

  const handleSave = () => {
    onSave(product.ndc, newQuantity);
    onClose();
  };

  return (
    isOpen ? (
      <div className="modal">
        <div>
          <input type="number" value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)} />
        </div>
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    ) : null
  );
}
