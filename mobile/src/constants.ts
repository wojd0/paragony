import type { Flag } from "./types";

export const AVAILABLE_FLAGS: Flag[] = [
  { id: "red", color: "#FF0000", order: 1 },
  { id: "blue", color: "#0000FF", order: 2 },
  { id: "green", color: "#00FF00", order: 3 },
  { id: "yellow", color: "#FFFF00", order: 4 },
];

export const API_BASE_URL = __DEV__
  ? "http://localhost:8000"
  : "http://localhost:8000";
