import React, { memo } from 'react';
import './Item.css';

export default memo(function Item(props) {
  const { id, name, value, isSelected, onSelect, onDelete } = props;

  function handleSelect() {
    onSelect(id);
  }

  function handleDelete(event) {
    event.stopPropagation();
    onDelete(id);
  }

  return (
    <div
      className={`item ${isSelected ? 'item-selected' : ''}`}
      onClick={handleSelect}
    >
      <div className="item-name">
        {name}
      </div>
      <div className="item-value">
        {value}
      </div>
      <div
        className="item-remove-icon"
        onClick={handleDelete}
      >X</div>
    </div>
  );
});
