import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api";

const store = configureStore({
  //This object holds the different reducers that will be used in the store
  reducer: {
    //it tells the store to use the globalReducer for the "global" key in the state tree. In our case its the "name" of slice
    global: globalReducer,
    //it tells the store to use the api.reducer for the key specified in the reducerPath property of the api object. This key is "adminApi"
    [api.reducerPath]: api.reducer,
  },
  //this line of code is taking the default middleware and adding the api.middleware to it,
  //so that both the default middleware and the api.middleware will be used in the store
  //The api.middleware is then able to intercept and process actions that are related to the API calls
  //concat(api.middleware) is concatenating this default middleware with the api.middleware
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
