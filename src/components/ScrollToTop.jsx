import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let the browser handle anchor scrolling

    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {

      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}