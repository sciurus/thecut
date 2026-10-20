import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { haircuts } from "../data/haircuts";
import type { Sides, Texture } from "../data/types";
import { buildBarberInstructions } from "../lib/barberCopy";
import {
  efforts,
  filterHaircuts,
  filterQuery,
  lengths,
  readFilters,
  sides,
  textures,
} from "../lib/browse";
import Illustration from "./Illustration";

type Props = {
  route: string;
  navigate: (route: string, replace?: boolean) => void;
  startQuiz: () => void;
};
const galleryPositions = new Map<string, number>();

export default function Browse({ route, navigate, startQuiz }: Props) {
  const [path, query = ""] = route.split("?");
  const filters = readFilters(query);
  const galleryRoute = `/browse${filterQuery(filters)}`;
  const id = path.startsWith("/hairstyles/")
    ? path.slice("/hairstyles/".length)
    : undefined;
  const haircut = haircuts.find((h) => h.id === id);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousPath = useRef<string | undefined>(undefined);
  useLayoutEffect(() => {
    if (previousPath.current === path) return;
    previousPath.current = path;
    heading.current?.focus({ preventScroll: true });
    window.scrollTo(0, id ? 0 : (galleryPositions.get(galleryRoute) ?? 0));
  }, [id, galleryRoute, path]);
  useEffect(() => {
    if (id) return;
    const remember = () => galleryPositions.set(galleryRoute, window.scrollY);
    window.addEventListener("scroll", remember);
    return () => window.removeEventListener("scroll", remember);
  }, [id, galleryRoute]);

  if (id)
    return haircut ? (
      <HaircutDetail
        key={id}
        haircut={haircut}
        galleryRoute={galleryRoute}
        navigate={navigate}
        startQuiz={startQuiz}
      />
    ) : (
      <main className="browse">
        <h1 ref={heading} tabIndex={-1}>
          Hairstyle not found
        </h1>
        <a
          href={`#${galleryRoute}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(galleryRoute);
          }}
        >
          Browse all hairstyles
        </a>
      </main>
    );

  const matches = filterHaircuts(filters);
  function update(key: keyof typeof filters, value: string) {
    navigate(`/browse${filterQuery({ ...filters, [key]: value })}`, true);
  }
  return (
    <main className="browse">
      <h1 ref={heading} tabIndex={-1}>
        Browse hairstyles<span className="rust">.</span>
      </h1>
      <p className="lead">Find a look you like. See what to ask for.</p>
      <div
        className="browse-filters"
        role="search"
        aria-label="Filter hairstyles"
      >
        <label>
          Search hairstyles
          <input
            type="search"
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Search by name"
          />
        </label>
        <label>
          Hair texture
          <select
            value={filters.texture}
            onChange={(e) => update("texture", e.target.value)}
          >
            <option value="">All textures</option>
            {Object.entries(textures).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Finished length
          <select
            value={filters.length}
            onChange={(e) => update("length", e.target.value)}
          >
            <option value="">All lengths</option>
            {Object.entries(lengths).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Styling effort
          <select
            value={filters.effort}
            onChange={(e) => update("effort", e.target.value)}
          >
            <option value="">Any effort</option>
            {Object.entries(efforts).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="browse-summary">
        <p role="status">
          {matches.length} {matches.length === 1 ? "hairstyle" : "hairstyles"}
        </p>
        {Object.values(filters).some(Boolean) && (
          <button
            className="text-button"
            onClick={() => navigate("/browse", true)}
          >
            Clear filters
          </button>
        )}
      </div>
      {matches.length ? (
        <div className="browse-grid">
          {matches.map((h) => (
            <a
              className="haircut-card"
              key={h.id}
              href={`#/hairstyles/${h.id}${filterQuery(filters)}`}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                galleryPositions.set(galleryRoute, window.scrollY);
                navigate(`/hairstyles/${h.id}${filterQuery(filters)}`);
              }}
            >
              <Illustration assetId={h.imageAssetId} loading="lazy" />
              <span className="card-info">
                <strong>
                  {h.name} <span aria-hidden="true">↗</span>
                </strong>
                <small>{h.description}</small>
                {filters.texture && (
                  <span className="fit-label">
                    {h.textureFit[filters.texture as Texture] === "ideal"
                      ? "Ideal fit"
                      : "Adaptable fit"}
                  </span>
                )}
              </span>
            </a>
          ))}
        </div>
      ) : (
        <div className="browse-empty">
          <h2>No hairstyles match these filters.</h2>
          <p>Try another search or clear your filters to see every style.</p>
          <button
            className="secondary"
            onClick={() => navigate("/browse", true)}
          >
            Clear filters
          </button>
        </div>
      )}
      <p className="quiz-prompt">
        Want help choosing?{" "}
        <button className="text-button" onClick={startQuiz}>
          Take the quiz ↗
        </button>
      </p>
    </main>
  );
}

function HaircutDetail({
  haircut: h,
  galleryRoute,
  navigate,
  startQuiz,
}: {
  haircut: (typeof haircuts)[number];
  galleryRoute: string;
  navigate: Props["navigate"];
  startQuiz: () => void;
}) {
  const [texture, setTexture] = useState<Texture | "">("");
  const [side, setSide] = useState<Sides>(h.defaultSides);
  const [copied, setCopied] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const script = buildBarberInstructions(h, {
    texture: texture || undefined,
    sidesPreference: side,
  });
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    setCopied("");
  }, [script]);
  return (
    <main className="results browse-detail">
      <a
        className="text-button"
        href={`#${galleryRoute}`}
        onClick={(e) => {
          e.preventDefault();
          navigate(galleryRoute);
        }}
      >
        ← Back to hairstyles
      </a>
      <div className="result-layout">
        <div className="result-art">
          <Illustration assetId={h.imageAssetId} />
        </div>
        <section className="result-copy">
          <h1 ref={heading} tabIndex={-1}>
            {h.name}
          </h1>
          <p className="lead">{h.description}</p>
          <dl className="style-facts">
            <dt>Finished length</dt>
            <dd>{lengths[h.resultLength]}</dd>
            <dt>Styling effort</dt>
            <dd>{efforts[h.stylingEffort]}</dd>
            <dt>Hair texture</dt>
            <dd>
              <ul>
                {Object.entries(textures).map(([value, label]) => (
                  <li key={value}>
                    {label}:{" "}
                    {
                      {
                        ideal: "Ideal fit",
                        adaptable: "Adaptable fit",
                        notRecommended: "Not recommended",
                      }[h.textureFit[value as Texture]]
                    }
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
        </section>
      </div>
      <section className="barber">
        <div className="barber-title">
          <h2>What to tell the barber</h2>
          <button
            disabled={!!texture && h.textureFit[texture] === "notRecommended"}
            className="text-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(script);
                setCopied("Copied to clipboard.");
              } catch {
                setCopied("Select the paragraph below to copy it.");
              }
            }}
          >
            Copy text
          </button>
        </div>
        <p className="detail-help">
          Choose your texture and sides to tailor these instructions.
        </p>
        <div className="detail-controls">
          <label>
            Your hair texture
            <select
              value={texture}
              onChange={(e) => setTexture(e.target.value as Texture | "")}
            >
              <option value="">General instructions</option>
              {Object.entries(textures).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sides
            <select
              value={side}
              onChange={(e) => setSide(e.target.value as Sides)}
            >
              {h.sideOptions.map((value) => (
                <option key={value} value={value}>
                  {sides[value]}
                </option>
              ))}
            </select>
          </label>
        </div>
        {texture && h.textureFit[texture] === "adaptable" && (
          <p className="growth">
            This style needs adapting to your natural texture. Discuss the shape
            with your barber.
          </p>
        )}
        {texture && h.textureFit[texture] === "notRecommended" ? (
          <p className="growth">
            This style is not recommended for your natural texture. Try another
            style or ask your barber about suitable alternatives.
          </p>
        ) : (
          <p>{script}</p>
        )}
        <span role="status">{copied}</span>
      </section>
      <p className="barber-note">
        Your barber can adjust the cut to your hair and current length.
      </p>
      <p className="quiz-prompt">
        Want help choosing?{" "}
        <button className="text-button" onClick={startQuiz}>
          Take the quiz ↗
        </button>
      </p>
    </main>
  );
}
