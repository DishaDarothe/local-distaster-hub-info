

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors({ origin: "*" })); // sab allow
// app.use(bodyParser.json());

// // Path to data.json file
// const dataFilePath = path.join(__dirname, "data.json");

// // API route to accept help requests
// app.post("/api/submit", (req, res) => {
//     const { name, location, help } = req.body;

//     if (!name || !location || !help) {
//         return res.status(400).json({ success: false, error: "All fields are required" });
//     }

//     // New request object
//     const newRequest = { name, location, request: help };

//     console.log("✅ Request Received:", newRequest);

//     // Read existing data
//     let requests = [];
//     if (fs.existsSync(dataFilePath)) {
//         const fileData = fs.readFileSync(dataFilePath);
//         try {
//             requests = JSON.parse(fileData);
//         } catch (err) {
//             requests = [];
//         }
//     }

//     // Add new request
//     requests.push(newRequest);

//     // Save back to data.json
//     fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2));

//     res.json({ success: true, message: "Help request saved successfully!" });
// });

// // API to fetch all requests
// app.get("/api/help", (req, res) => {
//     if (fs.existsSync(dataFilePath)) {
//         const fileData = fs.readFileSync(dataFilePath);
//         try {
//             const requests = JSON.parse(fileData);
//             return res.json(requests);
//         } catch (err) {
//             return res.json([]);
//         }
//     } else {
//         return res.json([]);
//     }
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins
app.use(bodyParser.json());

// Path to data.json file
const dataFilePath = path.join(__dirname, "data.json");

// API route to accept help requests
app.post("/api/help", (req, res) => {
    const { name, location, message } = req.body; // 🔄 use message instead of help

    if (!name || !location || !message) {
        return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // New request object
    const newRequest = { id: Date.now(), name, location, message, date: new Date().toISOString() };

    console.log("✅ Request Received:", newRequest);

    // Read existing data
    let requests = [];
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath);
        try {
            requests = JSON.parse(fileData);
        } catch (err) {
            requests = [];
        }
    }

    // Add new request
    requests.push(newRequest);

    // Save back to data.json
    fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2));

    res.json({ success: true, message: "Help request saved successfully!" });
});

// API to fetch all requests
app.get("/api/help", (req, res) => {
    if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath);
        try {
            const requests = JSON.parse(fileData);
            return res.json(requests);
        } catch (err) {
            return res.json([]);
        }
    } else {
        return res.json([]);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://127.0.0.1:${PORT}`);
});
