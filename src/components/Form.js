import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return; //guard clause: to avoid form submit

    const newItem = {
      description,
      quantity,
      package: false,
      id: Date.now(),
    };
    onAddItems(newItem);

    //To reset the Input elements
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 💫✨</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num} Qty of
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="item..."
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />
      <button>Add</button>
    </form>
  );
}
