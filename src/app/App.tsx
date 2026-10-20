import { useEffect, useRef, useState } from "react";
import { haircuts } from "../data/haircuts";
import { questions } from "../data/questions";
import { answerAt, derivePath } from "../lib/quizFlow";
import { getRecommendations } from "../lib/recommendation";
import { initial, loadState, saveState } from "../lib/persistence";
import { validateCatalog } from "../lib/validators";
import Illustration from "../components/Illustration";
import Browse from "../components/Browse";
import { useNavigation } from "../lib/navigation";
validateCatalog(haircuts);
export default function App() {
  const [state, setState] = useState(loadState);
  const initialRoute = useRef(state.screen === "landing" ? "/" : "/quiz");
  const { route, navigate } = useNavigation(initialRoute.current);
  const screen =
    route === "/" || route === ""
      ? "landing"
      : state.screen === "landing"
        ? "quiz"
        : state.screen;
  const browsing =
    route.startsWith("/browse") || route.startsWith("/hairstyles/");
  const startQuiz = () => {
    setState((current) => ({ ...current, screen: "quiz" }));
    navigate("/quiz");
    window.scrollTo(0, 0);
  };
  const [copied, setCopied] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const previous = useRef(state);
  useEffect(() => {
    saveState(state);
    if (previous.current === state) return;
    previous.current = state;
    heading.current?.focus();
    setCopied("");
  }, [state]);
  const flow = derivePath(state.answers, haircuts);
  const recs = getRecommendations(state.answers, haircuts);
  const selected =
    recs.find((r) => r.haircut.id === state.selectedResultId) ?? recs[0];
  const reset = () => {
    setState({ ...initial });
    navigate("/");
  };
  const back = () => {
    const index = flow.path.indexOf(state.currentQuestionId);
    if (state.screen === "results")
      setState({
        ...state,
        screen: "quiz",
        currentQuestionId: flow.path.at(-1)!,
      });
    else if (index > 0)
      setState({ ...state, currentQuestionId: flow.path[index - 1] });
    else {
      setState({ ...state, screen: "landing" });
      navigate("/");
    }
  };
  const q = questions[state.currentQuestionId];
  return (
    <div className="app">
      <header>
        <a
          className="brand"
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            setState({ ...state, screen: "landing" });
            navigate("/");
          }}
          title="The Cut home"
        >
          <span className="brand-mark" aria-hidden="true">
            Ⅱ
          </span>{" "}
          THE CUT
          <span className="brand-sub">HAIRCUT FINDER</span>
        </a>
        <nav aria-label="Main navigation">
          {(browsing || screen !== "landing") && (
            <a
              className="text-button"
              href="#/browse"
              onClick={(e) => {
                e.preventDefault();
                navigate("/browse");
              }}
            >
              Browse hairstyles
            </a>
          )}
          {!browsing && screen !== "landing" && (
            <button
              className="text-button"
              onClick={() => {
                reset();
                navigate("/");
              }}
            >
              Start over ↻
            </button>
          )}
        </nav>
      </header>
      {browsing ? (
        <Browse route={route} navigate={navigate} startQuiz={startQuiz} />
      ) : screen === "landing" ? (
        <main className="landing">
          <section className="intro">
            <h1 ref={heading} tabIndex={-1}>
              Find your
              <br />
              next haircut<span className="rust">.</span>
            </h1>
            <p className="lead">
              Pick what you like. We'll suggest a cut
              <br className="desktop-break" /> and what to tell the barber.
            </p>
            <div className="landing-actions">
              <button className="primary" onClick={startQuiz}>
                Find my haircut <span>↗</span>
              </button>
              <a
                className="secondary"
                href="#/browse"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/browse");
                }}
              >
                Browse hairstyles
              </a>
            </div>
            <p className="privacy">
              <span aria-hidden="true">◈</span> No photo or account needed.
            </p>
          </section>
          <div className="hero-art">
            <Illustration assetId="hero" />
          </div>
        </main>
      ) : screen === "quiz" ? (
        <main className="quiz">
          <div className="quiz-nav">
            <button className="text-button" onClick={back}>
              ← Back
            </button>
            <span className="eyebrow">{q.stage}</span>
            <span className="nav-dot">✳</span>
          </div>
          <div className="stage-track" aria-label={`Stage: ${q.stage}`}>
            <span className="active">Your hair</span>
            <i />
            <span className={q.stage !== "Your hair" ? "active" : ""}>
              Your style
            </span>
            <i />
            <span>The details</span>
          </div>
          <div className="question-layout">
            <div
              className={`question-art ${["currentLength", "preferredLength", "texture"].includes(q.id) ? "comparison" : ""}`}
            >
              <Illustration assetId={q.imageAssetId} />
            </div>
            <section>
              <h1 className="question-title" ref={heading} tabIndex={-1}>
                {q.title}
              </h1>
              {q.helpText && <p className="helper">{q.helpText}</p>}
              <div className="choices" role="group" aria-label={q.title}>
                {q.options.map((o) => (
                  <button
                    key={o.value}
                    className={`choice ${state.answers[q.id] === o.value ? "selected" : ""}`}
                    aria-pressed={state.answers[q.id] === o.value}
                    onClick={() => {
                      const next = answerAt(
                        state.answers,
                        q.id,
                        o.value,
                        haircuts,
                      );
                      setState({
                        screen: next.complete ? "results" : "quiz",
                        answers: next.answers,
                        currentQuestionId: next.path.at(-1)!,
                      });
                    }}
                  >
                    <span>
                      {o.label}
                      {o.description && <small>{o.description}</small>}
                    </span>
                    <span aria-hidden="true">
                      {state.answers[q.id] === o.value ? "✓" : "↗"}
                    </span>
                  </button>
                ))}
              </div>
              <p className="quiet">
                Go with what feels like you. You can always go back.
              </p>
            </section>
          </div>
        </main>
      ) : (
        selected && (
          <main className="results">
            <div className="quiz-nav">
              <button className="text-button" onClick={back}>
                ← Back to answers
              </button>
              <span className="eyebrow">YOUR NEXT LOOK</span>
            </div>
            <div className="result-layout">
              <div className="result-art">
                <Illustration assetId={selected.haircut.imageAssetId} />
              </div>
              <section className="result-copy">
                <p className="eyebrow">
                  {selected === recs[0]
                    ? "YOUR TOP SUGGESTION"
                    : "ANOTHER OPTION"}
                </p>
                <h1 ref={heading} tabIndex={-1}>
                  {selected.haircut.name}
                </h1>
                <p className="lead">{selected.haircut.description}</p>
                {selected.requiresGrowth && (
                  <p className="growth">
                    <strong>A look to grow toward.</strong> You'll need to grow
                    the top longer before this cut is possible.
                  </p>
                )}
                <ul className="reasons">
                  {selected.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </section>
            </div>
            <section className="barber">
              <div className="barber-title">
                <h2>What to tell the barber</h2>
                <button
                  className="text-button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        selected.barberScript,
                      );
                      setCopied("Copied to clipboard.");
                    } catch {
                      setCopied("Select the paragraph below to copy it.");
                    }
                  }}
                >
                  Copy text
                </button>
              </div>
              <p>{selected.barberScript}</p>
              <span role="status">{copied}</span>
            </section>
            <section className="alternatives">
              <div className="section-heading">
                <h2>
                  {selected === recs[0]
                    ? "A few other good options"
                    : "Your other options"}
                </h2>
                <p>See something you like? Take a closer look.</p>
              </div>
              <div className="cards">
                {recs
                  .filter((r) => r !== selected)
                  .map((r) => (
                    <button
                      className="haircut-card"
                      key={r.haircut.id}
                      onClick={() =>
                        setState({ ...state, selectedResultId: r.haircut.id })
                      }
                    >
                      <Illustration assetId={r.haircut.imageAssetId} />
                      <span className="card-info">
                        <span className="card-kicker">
                          {r === recs[0] ? "TOP SUGGESTION" : "ANOTHER OPTION"}
                        </span>
                        <strong>
                          {r.haircut.name} <span>↗</span>
                        </strong>
                        <small>{r.haircut.description}</small>
                        {r.requiresGrowth && (
                          <small className="rust">Needs longer hair</small>
                        )}
                      </span>
                    </button>
                  ))}
              </div>
            </section>
            <p className="barber-note">
              Your barber can adjust the cut to your hair and current length.
            </p>
            <button className="text-button restart" onClick={reset}>
              Find a fresh start ↻
            </button>
          </main>
        )
      )}
    </div>
  );
}
