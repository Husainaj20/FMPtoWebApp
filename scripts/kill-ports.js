#!/usr/bin/env node
/* Kill any process listening on the specified ports (macOS/Linux). */
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const ports = args.length ? args.map(Number) : [3000, 4000];

function killPort(port) {
  try {
    const out = execSync(`lsof -ti tcp:${port}`, {
      stdio: ["ignore", "pipe", "ignore"],
    }).toString();
    const pids = out.split("\n").filter(Boolean);
    if (pids.length === 0) return;
    for (const pid of pids) {
      try {
        process.kill(Number(pid), "SIGKILL");
      } catch {
        void 0; // Ignore failures killing individual PIDs (may have already exited)
      }
    }
    console.log(
      `Freed port ${port} (killed ${pids.length} process${pids.length > 1 ? "es" : ""}).`
    );
  } catch {
    void 0; // nothing listening on this port
  }
}

for (const port of ports) killPort(port);
