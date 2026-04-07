import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { postApi } from "../lib/api";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    postApi("/analytics/visit", { path: location.pathname }).catch(() => {});
  }, [location.pathname]);

  return null;
}
