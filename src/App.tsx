import React from 'react';

import classes from './App.module.css';
import Playground from './containers/Playground/Playground';
import Score from './containers/Score/Score';
import Next from './containers/Next/Next';

function App() {
  return (
    <div className={classes.App}>
      <Playground />
	  <div className={classes.Panel}>
		<Next />
		<Score />
	  </div>
    </div>
  );
}

export default App;
