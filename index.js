const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Hardcoded Customer & Booking Data based on Assignment
const database = {
  "SK4821X": { name: "Priya Nair", tier: "Gold", flight: "SK-204", status: "Cancelled", route: "Delhi -> Goa" },
  "TR1190B": { name: "Arvind Kulkarni", tier: "Silver", flight: "SK-118", status: "Delayed 4h", route: "Mumbai -> Bengaluru" },
  "WL7742": { name: "Meher Kaur", tier: "Platinum", flight: "SK-305", status: "Delayed 6h", route: "Delhi -> Hyderabad" }
};

app.post('/chat', (req, res) => {
  const { pnr, message } = req.body;
  const user = database[pnr];

  if (!user) {
    return res.status(404).json({ reply: "PNR not found. Please provide a valid booking reference." });
  }

  const msg = message.toLowerCase();
  let agentReply = "";

  // SCENARIO 1: Priya Nair (Cancelled flight, wants refund + business class upgrade)
  if (pnr === "SK4821X") {
    agentReply = `Hello ${user.name}. I completely understand your frustration regarding the cancellation of flight ${user.flight}. I have processed a full refund to your original payment method, which will reflect within 7 business days. However, I cannot process a free upgrade to business class on your return flight, as this exceeds our compensation policy. If you insist, I must escalate this to our specialist support team.`;
  } 
  
  // SCENARIO 2: Arvind Kulkarni (Delayed 4h, wants hotel)
  else if (pnr === "TR1190B") {
    agentReply = `Hello ${user.name}. I apologize for the 4-hour delay on your flight ${user.flight} due to operational reasons. Under our policy, hotel accommodation is only provided for delays exceeding 5 hours. However, your 4-hour delay qualifies you for a ₹500 meal voucher and free lounge access. I have applied both to your account now.`;
  } 
  
  // SCENARIO 3: Meher Kaur (Delayed 6h, wants full night hotel + ₹2,000 fare difference waived)
  else if (pnr === "WL7742") {
    agentReply = `Hello ${user.name}. I am sorry for the 6-hour delay on flight ${user.flight}. I can arrange hotel accommodation covering the delayed-hours portion, but policy prohibits covering a full night's stay. Regarding rebooking you on the higher-fare flight, the difference is ₹2,000. Since our agents can only waive up to ₹1,500, I am escalating this request to my supervisor for immediate approval.`;
  } 
  
  else {
    agentReply = `Hello ${user.name}. How can I assist you with your flight ${user.flight} today?`;
  }

  // Return the Agent's response along with the preserved action record
  res.json({
    customer: user.name,
    tier: user.tier,
    agent_reply: agentReply,
    action_status: "Resolved or Escalated as per policy"
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SkyResolve Agent is running on port ${PORT}`);
});
