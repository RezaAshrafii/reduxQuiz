import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import MovieList from "./components/MovieList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MovieList />
    </Provider>
  );
};

export default App;
