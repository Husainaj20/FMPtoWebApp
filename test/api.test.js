const request = require("supertest");
const app = require("../server");

describe("API basic tests", () => {
  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health").expect(200);
    expect(res.body).toHaveProperty("ok", true);
    expect(res.body).toHaveProperty("timestamp");
  });

  test("GET /api/projects pagination returns items and total", async () => {
    const res = await request(app).get("/api/projects?page=1").expect(200);
    expect(res.body).toHaveProperty("items");
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body).toHaveProperty("total");
    expect(typeof res.body.total).toBe("number");
    expect(res.body).toHaveProperty("page", 1);
    expect(res.body).toHaveProperty("limit");
    expect(res.body.items.length).toBeGreaterThanOrEqual(0);
  });
});
