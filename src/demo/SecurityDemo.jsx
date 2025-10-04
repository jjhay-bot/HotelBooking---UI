import { useState } from "react";

export default function SecurityDemo() {
  const [userInput, setUserInput] = useState("");
  const [useDangerous, setUseDangerous] = useState(false);

  //SAMPLE
  // <img src="x" onerror="window.location='https://bedderdeals.fun-at.work/'">

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Security Demo: XSS Prevention</h2>
      <p>Type anything below, including HTML or script tags, and see how it's rendered with and without protection:</p>
      <input
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Try: <img src=x onerror=alert('XSS')> or <script>alert('XSS')</script> or"
        style={{ width: "100%", padding: 8, marginBottom: 16 }}
      />
      <label style={{ display: "block", marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={useDangerous}
          onChange={e => setUseDangerous(e.target.checked)}
        />
        {' '}Use dangerouslySetInnerHTML (unsafe)
      </label>
      
      <div style={{ background: "#f9f9f9", padding: 12, borderRadius: 4 }}>
        <strong>Rendered Output:</strong>
        <div style={{ marginTop: 8, color: "#333" }}>
          {useDangerous ? (
            // Unsafe: will render raw HTML and execute scripts/events
            <div dangerouslySetInnerHTML={{ __html: userInput }} />
          ) : (
            // Safe: React escapes, or you can use escapeHTML for extra safety
            <span>{userInput}</span>
          )}
        </div>
      </div>
    </div>
  );
}
