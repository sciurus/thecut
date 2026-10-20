import { useEffect, useState } from "react";

// Hash routes work on static hosting as well as the development server.
export function useNavigation(defaultRoute: string) {
  const [route, setRoute] = useState(
    () => window.location.hash.slice(1) || defaultRoute,
  );
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}${window.location.search}#${defaultRoute}`,
      );
    }
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const sync = () => setRoute(window.location.hash.slice(1));
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.history.scrollRestoration = previousRestoration;
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, [defaultRoute]);
  function navigate(next: string, replace = false) {
    const url = `${window.location.pathname}${window.location.search}${next ? `#${next}` : ""}`;
    window.history[replace ? "replaceState" : "pushState"]({}, "", url);
    setRoute(next);
  }
  return { route, navigate };
}
