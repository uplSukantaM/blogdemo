import { createStore, applyMiddleware } from "redux";
import reducers from "./index";
import thunk from "redux-thunk";
import logger from "redux-logger";

export default function ConfigureStore() {
	const store = createStore(reducers, applyMiddleware(thunk, logger));

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require("./index").default;
			store.replaceReducer(nextRootReducer);
		});
	}
	return store;
}
