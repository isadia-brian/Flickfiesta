import { model, models, Schema } from "mongoose";

const MovieSchema = new Schema({
  title: {
    type: String,
  },
  plot: {
    type: String,
  },
  runtime: {
    type: Number,
  },
  poster: {
    type: String,
  },
  year: {
    type: Number,
  },
  type: {
    type: String,
  },
});

const Movie = models.Movie || model("Movie", MovieSchema);
export default Movie;
