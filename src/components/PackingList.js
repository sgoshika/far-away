import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onDeleteAllItems,
  onPackedItems,
}) {
  const [sortAction, setSortAction] = useState("input");

  let sortedItems;

  if (sortAction === "input") sortedItems = items;

  if (sortAction === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortAction === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onPackedItems={onPackedItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        {/* Controlled element */}
        <select
          value={sortAction}
          onChange={(e) => setSortAction(e.target.value)}
        >
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED</option>
        </select>

        <button onClick={() => onDeleteAllItems()}>Clear All Items</button>
      </div>
    </div>
  );
}
