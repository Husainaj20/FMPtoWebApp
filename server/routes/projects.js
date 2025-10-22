const express = require("express");
const router = express.Router();

const allProjects = require("../data/projects");

function normalizeStatus(s) {
  if (!s) return null;
  const v = String(s).toLowerCase();
  if (v === "inprogress" || v === "progress" || v === "in progress") return "progress";
  if (v === "onhold" || v === "hold" || v === "on hold") return "hold";
  if (v === "blocked") return "blocked";
  if (v === "active") return "active";
  if (v === "other") return "other";
  if (v === "all") return null;
  return null;
}

router.get("/", (req, res) => {
  try {
    const { status, q, page = "1", limit = "12" } = req.query;
    const normalized = normalizeStatus(status);
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    // Default and maximum page size is 12 to match the UI requirement
    const limitNum = Math.min(12, Math.max(1, parseInt(limit, 10) || 12));

    let items = allProjects.slice();

    if (normalized) {
      items = items.filter((p) => normalizeStatus(p.status) === normalized);
    }

    if (q && String(q).trim()) {
      const needle = String(q).toLowerCase();
      items = items.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(needle) ||
          (p.description || "").toLowerCase().includes(needle) ||
          (p.status || "").toLowerCase().includes(needle)
      );
    }

    const total = items.length;
    const offset = (pageNum - 1) * limitNum;
    const paged = items.slice(offset, offset + limitNum);

    res.json({ items: paged, total, page: pageNum, limit: limitNum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
