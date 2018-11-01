import React, { memo, useState } from 'react';

export default memo(function ListControls(props) {
  const { hasSelectedItems, onAdd, onRemove, onInput } = props;
  const [input, setInput] = useState(props.value || '');

  if (input !== props.value) {
    setInput(props.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && input) {
      handleAddItem();
    }
  }

  function handleAddItem() {
    onAdd(input);
  }

  function handleInput(event) {
    const nextInput = event.target.value;
    setInput(nextInput);
    onInput(nextInput);
  }

  return (
    <div className="controls">
      <input
        className="input-name"
        onKeyPress={handleKeyPress}
        onChange={handleInput}
        value={input} >
      </input>
      <button
        className="add-item-control"
        onClick={handleAddItem}
        disabled={!input}>
        Add
      </button>
      <button
        className="remove-items-control"
        onClick={onRemove}
        disabled={!hasSelectedItems}>
        Del
      </button>
    </div>
  );
});
