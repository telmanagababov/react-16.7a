import React, { PureComponent } from 'react';

class ListControls extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: props.value || '',
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ input: props.value });
  }

  applyInputChange(input) {
    const { onInput } = this.props;

    this.setState({
      input,
    }, () => {
      onInput(input);
    });
  }

  handleKeyPress = (event) => {
    const { key } = event;
    const { input } = this.state;

    if (key === 'Enter' && input) {
      this.handleAddItem();
    }
  };

  handleInput = (event) => {
    const input = event.target.value;

    this.applyInputChange(input);
  };

  handleAddItem = () => {
    const { onAdd } = this.props;
    const { input } = this.state;

    onAdd(input);
  };

  render() {
    const { hasSelectedItems, onRemove } = this.props;
    const { input } = this.state;

    return (
      <dv className="controls">
        <input
          className="input-name"
          onKeyPress={this.handleKeyPress}
          onChange={this.handleInput}
          value={input} >
        </input>
        <button
          className="add-item-control"
          onClick={this.handleAddItem}
          disabled={!input}>
          Add
          </button>
        <button
          className="remove-items-control"
          onClick={onRemove}
          disabled={!hasSelectedItems}>
          Del
          </button>
      </dv>
    );
  }
}

export default ListControls;
