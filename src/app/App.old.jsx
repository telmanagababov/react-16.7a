import React, { Component } from 'react';
import List from './list/List';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsNumber: 100,
    };
  }

  addItems = (itemsNumber) => {
    this.setState({ itemsNumber });
  };

  render() {
    const { itemsNumber } = this.state;

    return (
      <div className="app">
        <header>Items ({itemsNumber})</header>

        <main>
          <List
            size={itemsNumber}
            onSizeChange={this.addItems}>
          </List>
        </main>
      </div>
    );
  }
}

export default App;
