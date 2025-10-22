/* Minimal Express server to back the existing static frontend */
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// CORS
app.use(
  cors({
    origin: CORS_ORIGIN === "*" ? true : CORS_ORIGIN,
    credentials: true,
  })
);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend (index.html, scripts, styles) from project root
app.use(express.static(path.join(__dirname, "..")));

// Root should serve the app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// API info root
app.get("/api", (req, res) => {
  res.json({
    name: "FMPtoWeb API",
    ok: true,
    endpoints: {
      health: "/health",
      hello: "/api/hello",
      projects: "/api/projects",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    env: NODE_ENV,
  });
});

// Example API route namespace (placeholder)
app.get("/api/hello", (req, res) => {
  res.json({ message: "API is alive 👋" });
});

// Projects API
app.use("/api/projects", require("./routes/projects"));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err); // Keep simple for now; add structured logging later
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
