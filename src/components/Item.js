export default function Item({ item, onDeleteItems, onPackedItems }) {
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
