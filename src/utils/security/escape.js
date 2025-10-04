// Utility to escape HTML special characters in user input
// Prevents XSS when rendering user-generated content as HTML

export function escapeHTML(str) {
  return str.replace(/[&<>"]|'/g, function (m) {
    return (
      {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[m] || m
    );
  });
}

// Example usage:
// const safeText = escapeHTML(userInput);
// <span>{safeText}</span>
