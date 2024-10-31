import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Movie {
  id: string;
  name: string;
  rating: number;
  genre: string;
}

interface MovieState {
  movies: Movie[];
  sortColumn: keyof Movie | null;
  sortDirection: "asc" | "desc";
}

const initialState: MovieState = {
  movies: [],
  sortColumn: null,
  sortDirection: "asc",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Omit<Movie, "id">>) => {
      state.movies.push({ ...action.payload, id: uuidv4() });
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    sortMovies: (state, action: PayloadAction<keyof Movie>) => {
      if (state.sortColumn === action.payload) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortColumn = action.payload;
        state.sortDirection = "asc";
      }

      state.movies.sort((a, b) => {
        if (a[action.payload] < b[action.payload])
          return state.sortDirection === "asc" ? -1 : 1;
        if (a[action.payload] > b[action.payload])
          return state.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },
  },
});

export const { addMovie, removeMovie, sortMovies } = movieSlice.actions;
export default movieSlice.reducer;
