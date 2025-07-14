export default function Stats({ items }) {
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
