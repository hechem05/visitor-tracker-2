const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const BOT_TOKEN = "8925461538:AAEjsJ3-ro3ZHJE4Z9xGlik6V4cq1up2_D8";

const CHAT_IDS = [
    "7822574012",  // Your account
    "8229986817",  // Friend 1
    "8754588699",  // Friend 2
    "8968966502"   // New account
];

app.post("/visit", async (req, res) => {

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

        try {

            const response = await axios.post(
                `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                {
                    chat_id: id,
                    text: text
                }
            );

            console.log(`✅ Message sent to ${id}`);

        } catch (error) {

            console.log(`❌ Failed to send to ${id}`);

            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }

        }
    }

    res.status(200).json({
        success: true
    });

});

app.get("/", (req, res) => {
    res.send("Visitor Tracker Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});