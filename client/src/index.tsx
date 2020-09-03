import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { WidthContextProvider } from './Context/WidthContext';
import { AuthContextProvider } from './Context/AuthContext';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);

serviceWorker.unregister();
