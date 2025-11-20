import express from "express";
import cors from "cors";
import { generateSnapshot, getConfig } from "./simulator";
import { EMIT_INTERVAL_MS } from "./config";

const app = express();
app.use(cors());
app.use(express.json());

let DEFAULT_SERVICE_COUNT = 5;
app.get("/config", (req, res) => {
    const q = req.query.count as string | undefined;
    if (q) {
        const n = parseInt(q, 10);
        if (!isNaN(n) && n >= 1 && n <= 100)
            DEFAULT_SERVICE_COUNT = n;
    }
    res.json(getConfig(DEFAULT_SERVICE_COUNT));
});

app.get("/metrics/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });
    res.flushHeaders();

    const interval = setInterval(() => {
        res.write(`event: metrics\n`);
        res.write(`data: ${JSON.stringify(generateSnapshot(DEFAULT_SERVICE_COUNT))}\n\n`);
    }, EMIT_INTERVAL_MS);

    req.on("close", () => clearInterval(interval));
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}\n http://localhost:${PORT}`);
});
