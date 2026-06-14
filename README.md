# CineMatch — Movie Recommendation System

A hybrid AI-powered movie recommendation system built as part of MSAI-631 (Artificial Intelligence for Human-Computer Interaction).

## Overview

CineMatch implements three recommendation strategies:

- **Content-Based Filtering** — recommends movies with similar genre profiles using TF-IDF vectorization and cosine similarity
- **Collaborative Filtering** — identifies patterns from user rating behavior using item-item cosine similarity on a user-item matrix
- **Hybrid Filtering** — combines both approaches with a weighted scoring mechanism for improved recommendation quality

## Tech Stack

- Python 3.10+
- Streamlit (web interface)
- scikit-learn (TF-IDF, cosine similarity)
- pandas / numpy

## Setup

```bash
pip install -r requirements.txt
streamlit run app.py
```

## Project Structure

```
├── app.py              # Streamlit web application
├── src/
│   ├── data.py         # Movie and ratings dataset
│   └── recommender.py  # Recommendation engine (CB, CF, Hybrid)
├── requirements.txt
└── README.md
```

## Course

MSAI-631 — Artificial Intelligence for Human-Computer Interaction  
University of the Cumberlands | Summer 2026
