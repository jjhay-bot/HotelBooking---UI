import { color } from "@constants";

// typography.js
const typography = {
  fontSize: 12,
  fontFamily: "'Poppins', sans-serif",

  h1: { fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" },
  h2: {
    fontSize: "1.75rem",
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.01em"
  },
  h3: { fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: "0.75px" }, //
  h4: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.5, letterSpacing: "0.75px" }, //
  h5: {
    fontSize: " 1.063rem",
    fontWeight: 700,
    lineHeight: 1.75,
    letterSpacing: "0.75px",
  }, //
  h6: { fontSize: "0.85rem", fontWeight: 700, lineHeight: 1.2, letterSpacing: "0.25px" }, //

  subtitle1: { fontSize: "1rem", fontWeight: 500 },
  subtitle2: { fontSize: "0.875rem", fontWeight: 500 },

  body1: { fontSize: "0.938rem", fontWeight: 500, lineHeight: 1.6 }, //
  body2: { fontSize: "0.813rem", fontWeight: 400, lineHeight: "1.375rem" }, //

  caption: {
    fontSize: "0.938rem",
    fontWeight: 400,
    letterSpacing: "0.75px",
    lineHeight: 1.5,
    color: color.mid,
  }, //

  overline: {
    fontSize: "0.625rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.25px",
  },

  label: {
    fontSize: "0.65rem",
    fontWeight: 500,
    letterSpacing: "0.25px",
    color: color.mid,
    paddingBottom: "4px",
  },

  button: { fontSize: "0.875rem", fontWeight: 700, textTransform: "none" }, //
  optional: { fontSize: "0.813rem", fontWeight: 500, color: color.low }, //
  low: { fontSize: "0.75rem", fontWeight: 400, color: color.low },
  mid: { fontSize: "0.813rem", fontWeight: 600, color: color.mid }, //
  high: {
    fontSize: "0.938rem",
    fontWeight: 700,
    color: color.high,
    letterSpacing: "0.75px",
  }, //
  error: {
    fontSize: "0.625rem",
    fontWeight: 400,
    letterSpacing: "0.25px",
  }, //
  toast: {
    fontSize: "0.813rem",
    fontWeight: 600,
    letterSpacing: "0.25px",
    color: color.green,
  }, //
};
export default typography;
