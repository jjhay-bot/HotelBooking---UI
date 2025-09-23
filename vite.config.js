import { defineConfig, loadEnv } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

// __filename and __dirname equivalents in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Load environment variables based on current mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react({
        // Enable React Fast Refresh
        fastRefresh: true,
        // Include .jsx files
        include: "**/*.{jsx,tsx}",
      }),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@ui": path.resolve(__dirname, "src/ui"),
        "@routes": path.resolve(__dirname, "src/routes"),
        "@gql": path.resolve(__dirname, "src/gql"),
      },
    },

    // Optimize dependency pre-bundling
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
        "react-router-dom",
        "@apollo/client",
      ],
    },

    // Build optimizations
    build: {
      // Generate sourcemaps for production debugging
      sourcemap: mode === "development",
      // Optimize chunk splitting
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            mui: [
              "@mui/material",
              "@mui/icons-material",
              "@emotion/react",
              "@emotion/styled",
            ],
            apollo: ["@apollo/client"],
            router: ["react-router-dom"],
          },
        },
      },
      // Set chunk size warning limit
      chunkSizeWarningLimit: 1000,
    },

    server: {
      // Enable host to access from network
      host: true,
      // Set specific port
      port: 5173,
      // Auto open browser
      open: false,
      // Enable CORS
      cors: true,
      // Improve HMR performance
      hmr: {
        overlay: true,
      },
      proxy: {
        "/admin-gs": {
          target: env.VITE_PROXY_ADMIN_GS,
          changeOrigin: true,
          secure: false,
          // 👇 rewrite "/admin-gs/locality" → "/api/locality"
          rewrite: (path) => path.replace(/^\/admin-gs/, ""),
        },
        "/s3-bucket": {
          target: env.VITE_PROXY_UPLOAD_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/s3-bucket/, ""),
        },
      },
    },

    // Performance optimizations
    esbuild: {
      // Remove console.log in production only, keep in development
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
  };
});
