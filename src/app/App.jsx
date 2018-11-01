import React, { memo, useState } from 'react';
import List from './list/List';
import './App.css';

export default memo(function App() {
  const [size, setSize] = useState(100);

  return (
    <div className="app">
      <header>Items ({size})</header>

      <main>
        <List
          size={size}
          onSizeChange={setSize}>
        </List>
      </main>
    </div>
  );
});