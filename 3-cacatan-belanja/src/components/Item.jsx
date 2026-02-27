import { useState } from "react";

export default function Item({ item, onDeleteItem, onToggleChecked }) {
  return (
    <li>
      <input
        type="checkbox"
        defaultChecked={item.checked}
        onChange={() => onToggleChecked(item.id)}
      />
      <span
        style={{
          textDecoration: item.checked ? "line-through" : "none",
          opacity: item.checked ? 0.5 : 1,
        }}
      >
        {item.quantity} {item.name}
      </span>

      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}
