import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import whyDidYouRender from "@welldone-software/why-did-you-render";
// import NewContent from 'Components/Loaders/NewContent';

if (process.env.NODE_ENV !== 'production') {
	whyDidYouRender(React, {
		trackHooks: true,
		onlyLogs: true,
		titleColor: "green",
		diffNameColor: "darkturquoise"
	});
}

serviceWorker.register();

// ReactDOM.render(<NewContent />, document.getElementById('update'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

ReactDOM.render(<App />, document.getElementById('root'));