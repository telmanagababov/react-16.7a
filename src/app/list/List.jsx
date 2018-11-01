import React, { memo, useState } from 'react';
import Item from './item/Item';
import { generateItems, getRandomValue } from './item/items';
import ListControls from './controls/ListControls';
import './List.css';

export default memo(function List(props) {
  const { size, onSizeChange } = props;
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState(generateItems(size));
  const [filteredItems, setFilteredItems] = useState(items);
  const [hasSelectedItems, setHasSelectedItems] = useState(false);

  function updateItems(nextItems, nextFilter = filter) {
    setItems(nextItems);
    setFilter(nextFilter);
    setFilteredItems(filterByName(nextItems, nextFilter));
    setHasSelectedItems(nextItems.some(isSelected));

    if (nextItems.length !== items.length) {
      onSizeChange(nextItems.length);
    }
  }

  function handleSelect(id) {
    updateItems(toggleItem(items, id));
  }

  function handleInput(input) {
    updateItems(items, input);
  }

  function handleAddItem(name) {
    updateItems(addItem(items, name), '');
  }

  function handleRemoveItems() {
    updateItems(removeSelectedItems(items));
  }

  function handleDelete(index) {
    updateItems(removeItemByIndex(items, index));
  }

  return (
    <div className="list-container">
      <ListControls
        hasSelectedItems={hasSelectedItems}
        value={filter}
        onInput={handleInput}
        onAdd={handleAddItem}
        onRemove={handleRemoveItems}
      />

      <div className="list">
        {filteredItems.map((item, index) => (
          <Item
            {...item}
            key={index}
            id={index}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />))}
      </div>

      <div className="footer">
        {`items: ${filteredItems.length}`}
      </div>
    </div>
  );
});

function toggleItem(items, id) {
  const toggledItems = [...items];
  toggledItems[id].isSelected = !toggledItems[id].isSelected;
  return toggledItems;
}

function addItem(items, name) {
  const newItem = { name, value: getRandomValue() };
  return [newItem, ...items];
}

function removeSelectedItems(items) {
  return items.filter(item => !isSelected(item));
}

function removeItemByIndex(items, index) {
  return items.slice(0, index).concat(items.slice(index + 1));
}

function isSelected(item) {
  return item.isSelected;
}

function filterByName(items, filter) {
  if (filter === '') return items;
  return items.filter(item => (
    item.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  ));
}