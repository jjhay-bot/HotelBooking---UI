import { Grid } from "@mui/material";
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorInfo: error };
  }

  extractFileInfo(stack) {
    // Match paths like /src/pages/Home.jsx:8:46 or with ?t=...
    const match = stack?.match(/at\s+(?:.+\()?(.+\/src\/[^:\n]+):(\d+):(\d+)/);

    if (match) {
      const [, filePath, line, column] = match;
      const relativePath = filePath.split("/src/").pop(); // Trim before /src/
      return { file: "src/" + relativePath, line, column };
    }

    return null;
  }

  render() {
    if (this.state.hasError) {
      const { errorInfo } = this.state;
      console.log("errorInfo", errorInfo);

      const stack = errorInfo?.stack || "";
      const fileInfo = this.extractFileInfo(stack);

      return (
        <div style={{ color: "red", padding: "1rem" }}>
          <h2>Something went wrong.</h2>
          <p>
            <strong>{errorInfo.message}</strong>
          </p>

          {fileInfo && (
            <Grid container spacing={1}>
              <Grid>
                at <code>{fileInfo.file}</code>
              </Grid>
              <Grid>@</Grid>
              <Grid>
                <b>
                  <code>{fileInfo.line}</code> : <code>{fileInfo.column}</code>
                </b>
              </Grid>
            </Grid>
          )}

          <details style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>{stack}</details>
        </div>
      );
    }

    return this.props.children;
  }
}
