const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const BOT_TOKEN = "8925461538:AAEjsJ3-ro3ZHJE4Z9xGlik6V4cq1up2_D8";

const CHAT_IDS = [
    "7822574012",  // Your account
    "8229986817",   // Friend 1
    "8754588699",
    "8968966502"   // Friend 2
];

app.post("/visit", async (req, res) => {

    try {

        const v = req.body;

        const text = `
🚨 NEW VISITOR

🌐 Website:
${v.website || "Unknown"}

🌍 Country: ${v.country}
🏙 City: ${v.city}

📱 Device: ${v.device}

🔗 Page:
${v.page}

🕒 ${new Date().toLocaleString()}
`;

        for (const id of CHAT_IDS) {

            await axios.post(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    chat_id: id,
                    text: text
                }
            );
        }

        res.status(200).json({ success: true });

    } catch (err) {

        console.log(err.message);

        res.status(500).json({ success: false });
    }
});

app.get("/", (req, res) => {
    res.send("Visitor Tracker Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});