import pandas as pd

MOVIES = [
    {"movie_id": 1, "title": "The Dark Knight", "genres": "Action Crime Drama Thriller", "year": 2008, "rating": 9.0},
    {"movie_id": 2, "title": "Inception", "genres": "Action Adventure Sci-Fi Thriller", "year": 2010, "rating": 8.8},
    {"movie_id": 3, "title": "Interstellar", "genres": "Adventure Drama Sci-Fi", "year": 2014, "rating": 8.6},
    {"movie_id": 4, "title": "The Matrix", "genres": "Action Sci-Fi", "year": 1999, "rating": 8.7},
    {"movie_id": 5, "title": "Pulp Fiction", "genres": "Crime Drama", "year": 1994, "rating": 8.9},
    {"movie_id": 6, "title": "Forrest Gump", "genres": "Drama Romance", "year": 1994, "rating": 8.8},
    {"movie_id": 7, "title": "The Godfather", "genres": "Crime Drama", "year": 1972, "rating": 9.2},
    {"movie_id": 8, "title": "Avengers: Endgame", "genres": "Action Adventure Sci-Fi", "year": 2019, "rating": 8.4},
    {"movie_id": 9, "title": "Parasite", "genres": "Drama Thriller", "year": 2019, "rating": 8.6},
    {"movie_id": 10, "title": "Joker", "genres": "Crime Drama Thriller", "year": 2019, "rating": 8.4},
    {"movie_id": 11, "title": "Dune", "genres": "Adventure Drama Sci-Fi", "year": 2021, "rating": 8.0},
    {"movie_id": 12, "title": "The Shawshank Redemption", "genres": "Drama", "year": 1994, "rating": 9.3},
    {"movie_id": 13, "title": "Fight Club", "genres": "Drama Thriller", "year": 1999, "rating": 8.8},
    {"movie_id": 14, "title": "Gladiator", "genres": "Action Adventure Drama", "year": 2000, "rating": 8.5},
    {"movie_id": 15, "title": "The Silence of the Lambs", "genres": "Crime Drama Thriller", "year": 1991, "rating": 8.6},
    {"movie_id": 16, "title": "Schindler's List", "genres": "Biography Drama History War", "year": 1993, "rating": 9.0},
    {"movie_id": 17, "title": "Whiplash", "genres": "Drama Music", "year": 2014, "rating": 8.5},
    {"movie_id": 18, "title": "The Grand Budapest Hotel", "genres": "Adventure Comedy Crime", "year": 2014, "rating": 8.1},
    {"movie_id": 19, "title": "Her", "genres": "Drama Romance Sci-Fi", "year": 2013, "rating": 8.0},
    {"movie_id": 20, "title": "Blade Runner 2049", "genres": "Action Drama Sci-Fi Thriller", "year": 2017, "rating": 8.0},
    {"movie_id": 21, "title": "No Country for Old Men", "genres": "Crime Drama Thriller", "year": 2007, "rating": 8.2},
    {"movie_id": 22, "title": "The Revenant", "genres": "Action Adventure Drama", "year": 2015, "rating": 8.0},
    {"movie_id": 23, "title": "Mad Max: Fury Road", "genres": "Action Adventure Sci-Fi", "year": 2015, "rating": 8.1},
    {"movie_id": 24, "title": "La La Land", "genres": "Comedy Drama Music Romance", "year": 2016, "rating": 8.0},
    {"movie_id": 25, "title": "Everything Everywhere All at Once", "genres": "Action Adventure Comedy Sci-Fi", "year": 2022, "rating": 7.8},
]

RATINGS = [
    {"user_id": 1, "movie_id": 1, "rating": 5}, {"user_id": 1, "movie_id": 2, "rating": 5},
    {"user_id": 1, "movie_id": 4, "rating": 4}, {"user_id": 1, "movie_id": 8, "rating": 4},
    {"user_id": 1, "movie_id": 11, "rating": 5}, {"user_id": 1, "movie_id": 20, "rating": 4},
    {"user_id": 2, "movie_id": 5, "rating": 5}, {"user_id": 2, "movie_id": 7, "rating": 5},
    {"user_id": 2, "movie_id": 12, "rating": 5}, {"user_id": 2, "movie_id": 15, "rating": 4},
    {"user_id": 2, "movie_id": 21, "rating": 5}, {"user_id": 2, "movie_id": 9, "rating": 4},
    {"user_id": 3, "movie_id": 6, "rating": 5}, {"user_id": 3, "movie_id": 12, "rating": 5},
    {"user_id": 3, "movie_id": 17, "rating": 4}, {"user_id": 3, "movie_id": 24, "rating": 5},
    {"user_id": 3, "movie_id": 19, "rating": 4}, {"user_id": 3, "movie_id": 18, "rating": 4},
    {"user_id": 4, "movie_id": 2, "rating": 5}, {"user_id": 4, "movie_id": 3, "rating": 5},
    {"user_id": 4, "movie_id": 11, "rating": 4}, {"user_id": 4, "movie_id": 19, "rating": 4},
    {"user_id": 4, "movie_id": 20, "rating": 5}, {"user_id": 4, "movie_id": 23, "rating": 4},
    {"user_id": 5, "movie_id": 1, "rating": 5}, {"user_id": 5, "movie_id": 10, "rating": 5},
    {"user_id": 5, "movie_id": 13, "rating": 5}, {"user_id": 5, "movie_id": 15, "rating": 4},
    {"user_id": 5, "movie_id": 9, "rating": 4}, {"user_id": 5, "movie_id": 21, "rating": 5},
]


def get_movies_df():
    return pd.DataFrame(MOVIES)


def get_ratings_df():
    return pd.DataFrame(RATINGS)
