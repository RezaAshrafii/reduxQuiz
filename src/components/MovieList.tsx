import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RootState } from "../store";
import { addMovie, removeMovie, sortMovies, Movie } from "../store/movieSlice";

const genreOptions = [
  "action",
  "adventure",
  "comedy",
  "drama",
  "fantasy",
  "horror",
  "musicals",
  "mystery",
  "romance",
  "science fiction",
  "sports",
  "thriller",
  "Western",
];

const schema = z.object({
  name: z.string().min(1, "Movie name is required"),
  rating: z.number().min(0).max(10, "Rating must be between 0 and 10"),
  genre: z.string().min(1, "Genre is required"),
});

type FormData = z.infer<typeof schema>;

const MovieList: React.FC = () => {
  const dispatch = useDispatch();
  const { movies, sortColumn, sortDirection } = useSelector(
    (state: RootState) => state.movies
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(addMovie(data));
    reset();
  };

  const handleSort = (column: keyof Movie) => {
    dispatch(sortMovies(column));
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">
      <header className="bg-[#121212] py-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-[#f5c518] mb-2 text-center">
            Movie List
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-8 bg-[#242424] p-6 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <input
              {...register("name")}
              placeholder="Movie Name"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#f5c518] text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("rating", { valueAsNumber: true })}
              type="number"
              step="0.1"
              placeholder="Rating (0-10)"
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#f5c518] text-white"
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <select
              {...register("genre")}
              className="w-full p-2 bg-[#1a1a1a] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-[#f5c518] text-white"
            >
              <option value="">Select a genre</option>
              {genreOptions.map((genre) => (
                <option key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#f5c518] text-[#1a1a1a] py-2 px-4 rounded font-bold hover:bg-[#e6b700] transition duration-300"
          >
            Add Movie
          </button>
        </form>

        <div className="bg-[#242424] rounded-lg overflow-hidden shadow-lg">
          <table className="w-full">
            <thead className="bg-[#1a1a1a] text-[#f5c518]">
              <tr>
                <th
                  className="p-3 cursor-pointer text-left"
                  onClick={() => handleSort("name")}
                >
                  Name{" "}
                  {sortColumn === "name" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="p-3 cursor-pointer text-left"
                  onClick={() => handleSort("rating")}
                >
                  Rating{" "}
                  {sortColumn === "rating" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="p-3 cursor-pointer text-left"
                  onClick={() => handleSort("genre")}
                >
                  Genre{" "}
                  {sortColumn === "genre" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr
                  key={movie.id}
                  className="border-b border-gray-700 hover:bg-[#2a2a2a]"
                >
                  <td className="p-3">{movie.name}</td>
                  <td className="p-3">
                    <span className="bg-[#f5c518] text-[#1a1a1a] px-2 py-1 rounded font-bold">
                      {movie.rating}
                    </span>
                  </td>
                  <td className="p-3">{movie.genre}</td>
                  <td className="p-3">
                    <button
                      onClick={() => dispatch(removeMovie(movie.id))}
                      className="bg-[#e50914] text-white py-1 px-3 rounded hover:bg-[#b2070e] transition duration-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MovieList;
