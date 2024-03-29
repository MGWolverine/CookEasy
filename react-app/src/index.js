import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ModalProvider, Modal } from "./context/Modal";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import App from "./App";

import "./index.css";

// Configure the Redux store using the configureStore function
const store = configureStore();

// Check if the environment is not set to production
if (process.env.NODE_ENV !== "production") {
	// If not in production mode, expose the store to the global window object
	// This allows accessing the store from the browser's developer console
	window.store = store;

	// Also, expose sessionActions to the global window object
	window.sessionActions = sessionActions;
}

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
	return (
		<ModalProvider>
			<Provider store={store}>
				<BrowserRouter>
					<App />
					<Modal />
				</BrowserRouter>
			</Provider>
		</ModalProvider>
	);
}

// Render the root component of the React application
ReactDOM.render(
	// Use React.StrictMode for stricter development mode checks
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	// Specify the DOM element where the React application will be mounted
	document.getElementById("root")
);