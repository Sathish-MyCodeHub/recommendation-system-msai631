import streamlit as st
import pandas as pd
from src.recommender import ContentBasedRecommender, CollaborativeRecommender, HybridRecommender
from src.data import get_movies_df

st.set_page_config(
    page_title="CineMatch - Movie Recommendation System",
    page_icon="🎬",
    layout="wide"
)

st.markdown("""
    <style>
    .main-header { font-size: 2.5rem; font-weight: 700; color: #E50914; text-align: center; }
    .sub-header { font-size: 1.1rem; color: #aaa; text-align: center; margin-bottom: 2rem; }
    .metric-card { background: #1a1a2e; border-radius: 10px; padding: 1rem; text-align: center; }
    .stButton>button { background-color: #E50914; color: white; border-radius: 8px; border: none; }
    </style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-header">🎬 CineMatch</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-header">AI-Powered Movie Recommendation System</div>', unsafe_allow_html=True)

@st.cache_resource
def load_recommenders():
    return {
        "content": ContentBasedRecommender(),
        "collaborative": CollaborativeRecommender(),
        "hybrid": HybridRecommender(),
    }

recommenders = load_recommenders()
movies_df = get_movies_df()

with st.sidebar:
    st.header("Settings")
    algorithm = st.selectbox(
        "Recommendation Algorithm",
        ["Hybrid (Content + Collaborative)", "Content-Based Filtering", "Collaborative Filtering"],
    )
    top_n = st.slider("Number of Recommendations", min_value=3, max_value=10, value=5)
    st.markdown("---")
    st.markdown("**About CineMatch**")
    st.markdown(
        "CineMatch uses three AI techniques to recommend movies: "
        "Content-Based Filtering, Collaborative Filtering, and a Hybrid approach "
        "that blends both for improved accuracy."
    )

col1, col2 = st.columns([2, 1])

with col1:
    selected_movie = st.selectbox(
        "Select a movie you enjoy:",
        options=movies_df["title"].tolist(),
        index=0,
    )

with col2:
    st.markdown("<br>", unsafe_allow_html=True)
    get_recs = st.button("Get Recommendations", use_container_width=True)

if get_recs or selected_movie:
    movie_info = movies_df[movies_df["title"] == selected_movie].iloc[0]

    st.markdown("---")
    c1, c2, c3 = st.columns(3)
    c1.metric("Selected Movie", selected_movie)
    c2.metric("Year", int(movie_info["year"]))
    c3.metric("IMDb Rating", f"{movie_info['rating']}/10")

    st.markdown(f"**Genres:** `{movie_info['genres']}`")
    st.markdown("---")

    st.subheader(f"Top {top_n} Recommendations")

    if algorithm == "Content-Based Filtering":
        recs = recommenders["content"].recommend(selected_movie, top_n=top_n)
        score_col = "similarity_score"
        score_label = "Content Similarity"
    elif algorithm == "Collaborative Filtering":
        movie_id = int(movie_info["movie_id"])
        recs = recommenders["collaborative"].recommend(movie_id, top_n=top_n)
        score_col = "collaborative_score"
        score_label = "Collaborative Score"
    else:
        recs = recommenders["hybrid"].recommend(selected_movie, top_n=top_n)
        score_col = "hybrid_score"
        score_label = "Hybrid Score"

    if recs.empty:
        st.warning("Not enough data to generate recommendations for this movie.")
    else:
        for i, row in recs.iterrows():
            with st.container():
                r1, r2, r3, r4 = st.columns([3, 2, 1, 1])
                r1.markdown(f"**{i+1}. {row['title']}**")
                r2.markdown(f"`{row['genres']}`")
                r3.metric("IMDb", f"{row['rating']}")
                r4.metric(score_label, f"{row[score_col]:.2f}")
                st.markdown("---")

st.markdown("---")
st.markdown("### Explore the Full Movie Catalog")
search = st.text_input("Search movies by title or genre")
if search:
    filtered = movies_df[
        movies_df["title"].str.contains(search, case=False) |
        movies_df["genres"].str.contains(search, case=False)
    ]
else:
    filtered = movies_df

st.dataframe(
    filtered[["title", "genres", "year", "rating"]].rename(
        columns={"title": "Title", "genres": "Genres", "year": "Year", "rating": "IMDb Rating"}
    ),
    use_container_width=True,
    hide_index=True,
)
