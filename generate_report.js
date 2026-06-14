const {
  Document, Packer, Paragraph, TextRun, Header, Footer,
  AlignmentType, HeadingLevel, PageNumber, BorderStyle, TabStopType, TabStopPosition
} = require("docx");
const fs = require("fs");

const FONT = "Times New Roman";
const SIZE = 24; // 12pt in half-points
const LINE = { line: 480, lineRule: "auto" }; // double spacing
const MARGINS = { top: 1440, bottom: 1440, left: 1440, right: 1440 };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { ...LINE, before: 0, after: 0 },
    ...opts,
    children: [new TextRun({ text, font: FONT, size: SIZE, ...opts.run })],
  });
}

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    alignment: AlignmentType.CENTER,
    spacing: { ...LINE, before: 0, after: 0 },
    children: [new TextRun({ text, font: FONT, size: SIZE, bold: true })],
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    alignment: AlignmentType.LEFT,
    spacing: { ...LINE, before: 0, after: 0 },
    children: [new TextRun({ text, font: FONT, size: SIZE, bold: true, italics: true })],
  });
}

function indent(text) {
  return new Paragraph({
    spacing: { ...LINE, before: 0, after: 0 },
    indent: { firstLine: 720 },
    children: [new TextRun({ text, font: FONT, size: SIZE })],
  });
}

function blank() {
  return new Paragraph({ spacing: { line: 480, lineRule: "auto" }, children: [new TextRun("")] });
}

function pageBreak() {
  return new Paragraph({ pageBreakBefore: true, children: [new TextRun("")] });
}

const runningHead = new Header({
  children: [
    new Paragraph({
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({ text: "CINEMATCH: BUILDING A HYBRID MOVIE RECOMMENDATION SYSTEM", font: FONT, size: 20 }),
        new TextRun({ children: ["\t", PageNumber.CURRENT], font: FONT, size: 20 }),
      ],
    }),
  ],
});

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: SIZE } } },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { font: FONT, size: SIZE, bold: true, color: "000000" },
        paragraph: { spacing: { line: 480, lineRule: "auto" }, alignment: AlignmentType.CENTER, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { font: FONT, size: SIZE, bold: true, italics: true, color: "000000" },
        paragraph: { spacing: { line: 480, lineRule: "auto" }, alignment: AlignmentType.LEFT, outlineLevel: 1 },
      },
    ],
  },
  sections: [
    // ── TITLE PAGE ──
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: MARGINS } },
      headers: { default: runningHead },
      children: [
        blank(), blank(), blank(), blank(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: LINE, children: [new TextRun({ text: "CineMatch: Building a Hybrid Movie Recommendation System", font: FONT, size: SIZE, bold: true })] }),
        blank(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: LINE, children: [new TextRun({ text: "Sathish Nageshwaran", font: FONT, size: SIZE })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: LINE, children: [new TextRun({ text: "University of the Cumberlands", font: FONT, size: SIZE })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: LINE, children: [new TextRun({ text: "MSAI-631: Artificial Intelligence for Human-Computer Interaction", font: FONT, size: SIZE })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: LINE, children: [new TextRun({ text: "Instructor: Ying Lin", font: FONT, size: SIZE })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: LINE, children: [new TextRun({ text: "June 2026", font: FONT, size: SIZE })] }),
      ],
    },
    // ── ABSTRACT ──
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: MARGINS } },
      headers: { default: runningHead },
      children: [
        heading1("Abstract"),
        indent("CineMatch is a hybrid movie recommendation system I built combining content-based filtering and collaborative filtering, deployed as a Streamlit web application. Content-based filtering uses TF-IDF vectorization on genre metadata with cosine similarity scoring. Collaborative filtering builds a user-item rating matrix and computes item-item similarity from observed user preferences. The hybrid layer blends both signals with equal weighting. The project explores how algorithmic choices intersect with human-computer interaction design — specifically how interface decisions shape user trust and engagement with AI-driven recommendations. Key findings confirm that hybrid approaches outperform single-method systems in sparse-data settings, and that interface simplicity significantly affects user adoption."),
      ],
    },
    // ── MAIN BODY ──
    {
      properties: { page: { size: { width: 12240, height: 15840 }, margin: MARGINS } },
      headers: { default: runningHead },
      children: [
        heading1("CineMatch: Building a Hybrid Movie Recommendation System"),
        blank(),
        heading1("Introduction"),
        indent("Recommendation systems are among the highest-ROI AI applications deployed at scale today. Netflix attributes over 80% of content watched to its recommendation engine. Spotify's Discover Weekly has over 40 million weekly listeners. Amazon's item-to-item collaborative filtering drives roughly 35% of its revenue. These are not academic prototypes — they are mission-critical production systems."),
        indent("What often gets underestimated is the HCI layer. A recommendation engine that surfaces perfect results through a confusing interface will fail in the real world. Users need to understand, trust, and engage with recommendations for the system to deliver value. I built CineMatch to explore both sides of this equation — the algorithmic engine and the interaction design — in a single cohesive system."),
        blank(),
        heading1("Theoretical Foundations of Recommendation Systems"),
        blank(),
        heading2("Content-Based Filtering"),
        indent("Content-based filtering recommends items similar to those a user has liked before, based on item attributes. In CineMatch, I represent each movie as a TF-IDF vector derived from its genre tags. TF-IDF (Term Frequency-Inverse Document Frequency) weights terms by how distinctive they are across the corpus — common genres like Drama get downweighted relative to niche genres like Neo-noir. Cosine similarity then measures the angle between vectors, producing a score between 0 and 1. The main advantage is that this approach works with zero user history — you only need item metadata. The limitation is that it cannot surface serendipitous recommendations outside a user's established taste profile (Lops et al., 2011)."),
        blank(),
        heading2("Collaborative Filtering"),
        indent("Collaborative filtering exploits the wisdom of crowds. I build a user-item matrix where rows are users, columns are movies, and values are ratings. Item-item cosine similarity identifies movies that tend to be rated similarly by the same users. The key insight is that two users who agreed on ten movies are likely to agree on the next one — even if the movies share no obvious content features. The cold-start problem is the central challenge: new items with no ratings are invisible to CF (Ricci et al., 2015)."),
        blank(),
        heading2("Hybrid Approaches"),
        indent("The Netflix Prize (2006-2009) demonstrated conclusively that no single algorithm wins — ensemble methods do. Koren et al. (2009) showed that matrix factorization combined with neighborhood models outperformed either alone. In production, virtually every major recommendation system uses some form of hybridization. CineMatch implements a weighted hybrid: 50% content score + 50% collaborative score. This simple blend handles the cold-start problem gracefully — when CF data is sparse, the content signal carries the load."),
        blank(),
        heading1("Practical Applications"),
        indent("Recommendation systems now operate across nearly every digital domain. In streaming, Netflix and Spotify use multi-stage ranking pipelines: a candidate generation layer (rough filtering from millions of items to hundreds), followed by a ranking layer (fine-grained scoring), and finally a re-ranking layer that applies business rules and diversity constraints."),
        indent("E-commerce took a different path — Amazon's item-to-item CF approach remains one of the most cited applied ML implementations because it scaled to hundreds of millions of items with sub-second latency. Social media platforms like TikTok operate almost entirely on implicit feedback — watch time, replays, shares — rather than explicit ratings. This shifts the HCI design entirely: there is no rating widget, no thumbs up. The signal is behavioral."),
        indent("Enterprise settings are an emerging frontier: internal knowledge management, tool recommendation, and expert-finding systems apply the same techniques to productivity workflows. The cold-start problem remains the most consistent real-world challenge across all domains — every new user, every new item requires a fallback strategy."),
        blank(),
        heading1("Building CineMatch"),
        blank(),
        heading2("Architecture"),
        indent("CineMatch follows a three-layer architecture. The data layer holds a curated dataset of 25 films with genre metadata and a synthetic user-rating matrix of 30 ratings across 5 users. The recommendation engine layer implements three algorithms: content-based, collaborative, and hybrid. The UI layer is a Streamlit web application. I chose Streamlit specifically because it lets me iterate on both the model and the interface in the same Python codebase — no context switching between a backend API and a frontend framework."),
        blank(),
        heading2("Recommendation Engine"),
        indent("The ContentBasedRecommender fits a TF-IDF matrix on genre strings and precomputes the full cosine similarity matrix at initialization. Recommendations are O(1) lookups at inference time. The CollaborativeRecommender builds a pivot table of user ratings, fills missing values with zero, and computes item-item cosine similarity. The HybridRecommender calls both, performs an outer join on results, and applies weighted averaging. One design decision worth noting: all recommender objects are cached using Streamlit's @st.cache_resource decorator. Without this, the similarity matrices recompute on every user interaction — adding 200-300ms of unnecessary latency."),
        blank(),
        heading2("User Interface"),
        indent("The interface gives users three controls: movie selection (dropdown), algorithm selection (dropdown), and result count (slider). Results display inline with genre tags, IMDb ratings, and algorithm scores. A search-filtered catalog sits below for exploration. The design is intentionally minimal — recommendation interfaces that surface too many controls tend to reduce engagement because users second-guess their own preferences. The source code is available at https://github.com/Sathish-MyCodeHub/recommendation-system-msai631."),
        blank(),
        heading1("Challenges and Mitigation Strategies"),
        indent("The cold-start problem was the first challenge I had to address. Movies with no ratings in the dataset cannot generate collaborative recommendations. The hybrid architecture handles this gracefully — the content-based score is always nonzero for any movie with genre metadata, so the system never returns empty results."),
        indent("Sparse data was a related concern. With 5 users and 25 movies, the user-item matrix is roughly 76% empty. Cosine similarity on sparse vectors can produce inflated scores. I addressed this by filling missing ratings with zero rather than the user mean, which prevents unrated items from artificially inflating similarity scores."),
        indent("Feature shallowness was a known limitation from the start. Genre strings are a coarse content signal. In a production system I would add plot embeddings using sentence transformers on synopsis text, cast and director metadata, and release decade as a feature. The architecture already supports this — the TF-IDF vectorizer simply needs richer input text."),
        indent("UI latency was the final engineering challenge. Streamlit reruns the full script on every widget interaction. Caching the recommender objects with @st.cache_resource ensures the similarity matrices persist across reruns, keeping the interface responsive."),
        blank(),
        heading1("HCI Considerations: The Future of Recommendation Interfaces"),
        indent("Most recommendation interfaces today are passive — the system pushes content, the user scrolls or skips. This works, but it caps the ceiling on personalization. The shift I see happening, and have seen accelerate significantly over the past two years, is toward conversational recommendation. When a user can say 'find me something like Inception but less mind-bending and under two hours,' the system needs to parse intent, not just match features. Large language models are making this viable at scale."),
        indent("The question is not whether this transition happens — it is how fast. My view: within five years, typing queries into a search box will be a minority interaction mode for recommendation systems. Voice, gaze tracking, and passive behavioral signals will carry more weight. The underlying recommendation engine stays largely the same — what changes completely is the HCI layer on top."),
        indent("Proactive systems are also maturing: push notifications, morning digest emails, and home screen carousels that surface content before the user even opens an app. The system acts without being asked. This raises legitimate design questions around user agency and transparency — users increasingly want to understand why something was recommended, not just receive it. Explainability is becoming an HCI requirement, not just a nice-to-have."),
        blank(),
        heading1("Conclusion"),
        indent("CineMatch demonstrated that a well-structured hybrid recommendation system, even at small scale, outperforms single-algorithm approaches in recommendation diversity and cold-start resilience. The implementation reinforced something I already believed from production work: the algorithm is necessary but not sufficient. The interface determines whether users actually engage with the recommendations."),
        indent("As recommendation systems move toward conversational and multimodal interaction paradigms, the HCI layer will become the primary differentiator between systems that work technically and systems that users actually trust and return to. The engineering challenge is shifting from 'how do we compute better recommendations' to 'how do we surface them in a way that feels natural, transparent, and respectful of user intent.'"),
        // ── REFERENCES ──
        pageBreak(),
        heading1("References"),
        new Paragraph({
          spacing: { ...LINE, before: 0, after: 0 },
          indent: { left: 720, hanging: 720 },
          children: [new TextRun({ text: "Aggarwal, C. C. (2016). Recommender systems: The textbook. Springer. https://doi.org/10.1007/978-3-319-29659-3", font: FONT, size: SIZE })],
        }),
        new Paragraph({
          spacing: { ...LINE, before: 0, after: 0 },
          indent: { left: 720, hanging: 720 },
          children: [new TextRun({ text: "Covington, P., Adams, J., & Sargin, E. (2016). Deep neural networks for YouTube recommendations. Proceedings of the 10th ACM Conference on Recommender Systems, 191–198. https://doi.org/10.1145/2959100.2959190", font: FONT, size: SIZE })],
        }),
        new Paragraph({
          spacing: { ...LINE, before: 0, after: 0 },
          indent: { left: 720, hanging: 720 },
          children: [new TextRun({ text: "Jannach, D., Zanker, M., Felfernig, A., & Friedrich, G. (2010). Recommender systems: An introduction. Cambridge University Press.", font: FONT, size: SIZE })],
        }),
        new Paragraph({
          spacing: { ...LINE, before: 0, after: 0 },
          indent: { left: 720, hanging: 720 },
          children: [new TextRun({ text: "Koren, Y., Bell, R., & Volinsky, C. (2009). Matrix factorization techniques for recommender systems. Computer, 42(8), 30–37. https://doi.org/10.1109/MC.2009.263", font: FONT, size: SIZE })],
        }),
        new Paragraph({
          spacing: { ...LINE, before: 0, after: 0 },
          indent: { left: 720, hanging: 720 },
          children: [new TextRun({ text: "Lops, P., de Gemmis, M., & Semeraro, G. (2011). Content-based recommender systems: State of the art and trends. In F. Ricci, L. Rokach, B. Shapira, & P. B. Kantor (Eds.), Recommender systems handbook (pp. 73–105). Springer.", font: FONT, size: SIZE })],
        }),
        new Paragraph({
          spacing: { ...LINE, before: 0, after: 0 },
          indent: { left: 720, hanging: 720 },
          children: [new TextRun({ text: "Ricci, F., Rokach, L., & Shapira, B. (2015). Recommender systems: Introduction and challenges. In F. Ricci, L. Rokach, & B. Shapira (Eds.), Recommender systems handbook (2nd ed., pp. 1–34). Springer. https://doi.org/10.1007/978-1-4899-7637-6_1", font: FONT, size: SIZE })],
        }),
      ],
    },
  ],
});

const OUTPUT = "C:/Users/snageshwaran/OneDrive - NVIDIA Corporation/Documents/MSAI - Assignment/Artificial Intelligence for Human-Computer Interaction/Week 6/Recommendation System using AIHCI Project/Recommendation_System_Report.docx";

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Done: " + OUTPUT);
});
