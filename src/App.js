import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 1, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Chargers", quantity: 2, packed: true },
  { id: 4, description: "Laptop", quantity: 2, packed: true },
  { id: 5, description: "KB & Mouse", quantity: 1, packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(item) {
    setItems((items) => items.filter((i) => item.id !== i.id));
  }

  function handleDeleteAllItems() {
    setItems((items) => []);
  }

  function handlePackedItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onDeleteAllItems={handleDeleteAllItems}
        onPackedItems={handlePackedItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1> 🌴 Far Away ✈️🧳</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({
  items,
  onDeleteItems,
  onDeleteAllItems,
  onPackedItems,
}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onPackedItems={onPackedItems}
            key={item.id}
          />
        ))}
      </ul>
      <select value={""}>
        <option value={""}>Quantity</option>
        <option value={""}>Packed/Unpacked</option>
      </select>
      <button onClick={() => onDeleteAllItems()}>Clear All Items</button>
    </div>
  );
}

function Item({ item, onDeleteItems, onPackedItems }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onPackedItems(item.id)}
      />

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button onClick={() => onDeleteItems(item)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>Start packing for your trip! 🚀 </em>
      </footer>
    );
  }
  const packedItemsCount = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItemsCount / items.length) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercentage < 100
          ? `You've ${items.length} items in your list and you already packed
        ${packedItemsCount} (${packedPercentage}%)`
          : "You got everything! Ready to go! ✈️🌟🤩"}
      </em>
    </footer>
  );
}
