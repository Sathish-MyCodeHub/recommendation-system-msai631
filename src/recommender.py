import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from src.data import get_movies_df, get_ratings_df


class ContentBasedRecommender:
    def __init__(self):
        self.movies_df = get_movies_df()
        self.tfidf = TfidfVectorizer(stop_words="english")
        self.similarity_matrix = None
        self._build()

    def _build(self):
        tfidf_matrix = self.tfidf.fit_transform(self.movies_df["genres"])
        self.similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

    def recommend(self, movie_title: str, top_n: int = 5):
        movies = self.movies_df
        if movie_title not in movies["title"].values:
            return pd.DataFrame()

        idx = movies[movies["title"] == movie_title].index[0]
        sim_scores = list(enumerate(self.similarity_matrix[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = [s for s in sim_scores if s[0] != idx][:top_n]

        movie_indices = [s[0] for s in sim_scores]
        scores = [round(s[1], 3) for s in sim_scores]

        result = movies.iloc[movie_indices][["title", "genres", "year", "rating"]].copy()
        result["similarity_score"] = scores
        return result.reset_index(drop=True)


class CollaborativeRecommender:
    def __init__(self):
        self.movies_df = get_movies_df()
        self.ratings_df = get_ratings_df()
        self.user_item_matrix = None
        self.similarity_matrix = None
        self._build()

    def _build(self):
        self.user_item_matrix = self.ratings_df.pivot_table(
            index="user_id", columns="movie_id", values="rating"
        ).fillna(0)
        self.similarity_matrix = cosine_similarity(self.user_item_matrix.T)

    def recommend(self, movie_id: int, top_n: int = 5):
        movies = self.movies_df
        if movie_id not in self.user_item_matrix.columns:
            return pd.DataFrame()

        col_index = list(self.user_item_matrix.columns).index(movie_id)
        sim_scores = list(enumerate(self.similarity_matrix[col_index]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = [s for s in sim_scores if list(self.user_item_matrix.columns)[s[0]] != movie_id][:top_n]

        rec_movie_ids = [list(self.user_item_matrix.columns)[s[0]] for s in sim_scores]
        scores = [round(s[1], 3) for s in sim_scores]

        result = movies[movies["movie_id"].isin(rec_movie_ids)].copy()
        score_map = dict(zip(rec_movie_ids, scores))
        result["collaborative_score"] = result["movie_id"].map(score_map)
        result = result.sort_values("collaborative_score", ascending=False)
        return result[["title", "genres", "year", "rating", "collaborative_score"]].reset_index(drop=True)


class HybridRecommender:
    def __init__(self):
        self.cb = ContentBasedRecommender()
        self.cf = CollaborativeRecommender()
        self.movies_df = get_movies_df()

    def recommend(self, movie_title: str, top_n: int = 5):
        movie_row = self.movies_df[self.movies_df["title"] == movie_title]
        if movie_row.empty:
            return pd.DataFrame()

        movie_id = int(movie_row.iloc[0]["movie_id"])

        cb_recs = self.cb.recommend(movie_title, top_n=10)
        cf_recs = self.cf.recommend(movie_id, top_n=10)

        cb_recs = cb_recs.rename(columns={"similarity_score": "cb_score"})
        cf_recs = cf_recs.rename(columns={"collaborative_score": "cf_score"})

        merged = pd.merge(
            cb_recs[["title", "genres", "year", "rating", "cb_score"]],
            cf_recs[["title", "cf_score"]],
            on="title",
            how="outer"
        ).fillna(0)

        merged["hybrid_score"] = (merged["cb_score"] * 0.5) + (merged["cf_score"] * 0.5)
        merged = merged.sort_values("hybrid_score", ascending=False).head(top_n)
        return merged[["title", "genres", "year", "rating", "hybrid_score"]].reset_index(drop=True)
