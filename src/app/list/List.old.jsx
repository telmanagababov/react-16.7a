import React, { PureComponent } from 'react';
import Item from './item/Item';
import { generateItems, getRandomValue } from './item/items';
import ListControls from './controls/ListControls';
import './List.css';

class List extends PureComponent {
  constructor(props) {
    super(props);

    const items = generateItems(props.size);
    const filter = ''
    const filteredItems = this.getFilteredItems(items, filter);

    this.state = {
      items,
      filteredItems,
      filter,
    };
  }

  getFilteredItems(items, input = '') {
    if (input === '') return items;
    return items.filter(item => (
      item.name.toLowerCase().indexOf(input.toLowerCase()) >= 0
    ));
  }

  handleInput = (input) => {
    const { items } = this.state;
    const filter = input;
    const filteredItems = this.getFilteredItems(items, filter);

    this.setState({
      filteredItems,
      filter,
    });
  };

  handleAddItem = (name) => {
    const { onSizeChange } = this.props;
    const { filter } = this.state;
    const newItem = { name, value: getRandomValue() };
    const items = [newItem, ...this.state.items];
    const filteredItems = this.getFilteredItems(items, filter);

    this.setState({
      items,
      filteredItems,
    }, () => {
      onSizeChange(this.state.items.length);
    });
  };

  handleRemoveItems = () => {
    const { onSizeChange } = this.props;
    const filter = '';
    const items = this.state.items.filter(item => !item.isSelected);
    const filteredItems = this.getFilteredItems(items, filter);

    this.setState({
      items,
      filter,
      filteredItems,
    }, () => {
      onSizeChange(this.state.items.length);
    });
  };

  handleDelete = (id) => {
    const { onSizeChange } = this.props;
    const { items, filter } = this.state;
    const remainingItems = items.slice(0, id).concat(items.slice(id + 1));
    const filteredItems = this.getFilteredItems(remainingItems, filter);

    this.setState({
      items: remainingItems,
      filteredItems,
    }, () => {
      onSizeChange(this.state.items.length);
    });
  };

  handleSelect = (id) => {
    const filteredItems = this.state.filteredItems.concat();
    filteredItems[id].isSelected = !filteredItems[id].isSelected;
    this.setState({ filteredItems })
  };

  render() {
    const { filter, filteredItems } = this.state;
    const hasSelectedItems = filteredItems.some(item => item.isSelected);

    return (
      <div className="list-container">
        <ListControls
          hasSelectedItems={hasSelectedItems}
          value={filter}
          onInput={this.handleInput}
          onAdd={this.handleAddItem}
          onRemove={this.handleRemoveItems}
        />

        <div className="list">
          {filteredItems.map((item, index) => (
            <Item
              {...item}
              key={index}
              id={index}
              onSelect={this.handleSelect}
              onDelete={this.handleDelete}
            />))}
        </div>

        <div className="footer">
          {`items: ${filteredItems.length}`}
        </div>
      </div>
    );
  }
}

export default List;
