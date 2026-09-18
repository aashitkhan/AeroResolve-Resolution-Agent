# AeroResolve - Airline Disruption Resolution Agent

## Live Link: https://airline-resolution-agent--aashitkhan07.replit.app/<img width="1600" height="900" alt="Screenshot 2026-09-18 141435" src="https://github.com/user-attachments/assets/9812b845-9b7b-4c83-871e-8dee5c37fbcf" />
<img width="1600" height="900" alt="Screenshot 2026-09-18 140327" src="https://github.com/user-attachments/assets/bb72ea7a-a699-485a-a107-e16d939466b6" />
<img width="1600" height="900" alt="Screenshot 2026-09-18 140700" src="https://github.com/user-attachments/assets/8faeac1c-a096-4829-8fa0-c275d8a9bc12" />

## About This Project
It handles realistic customer journeys regarding airline disruptions (cancellations and delays) by understanding customer intent, verifying loyalty tiers, and enforcing strict service policies.

## Architecture and Process Flow

* **Process Flow:** 
  1. The user sends a POST request to the `/chat` endpoint containing their `pnr` and a `message`.
  2. The rule-based agent matches the PNR with the provided customer database (Priya, Arvind, Meher).
  3. The agent evaluates the specific disruption (e.g., cancelled flight, 4h delay, 6h delay) against the business rules.
  4. It returns an appropriate response: executing the correct next action, handling frustration politely, or escalating to a human supervisor if policies are exceeded (e.g., fare differences > ₹1,500).

## Inputs, Sources, and Assumptions
* **Inputs:** JSON payload containing `pnr` (String) and `message` (String).
* **Sources:** All customer profiles, booking data, and service rules were strictly sourced from the provided assignment brief. No external data was invented.
* **Assumptions:** 
  * The agent currently operates via API endpoints to simulate a chat-based backend.
  * Customer authentication is simulated directly via PNR verification.
  * Simple rule-matching was used for this prototype to guarantee 100% policy compliance without AI hallucinations.

## AI Tools Used
* **Gemini / Replit AI:** Used as a coding assistant to rapidly generate the Express.js boilerplate and write the core business logic based on the assignment constraints.
* **Prompt Engineering:** Structuring the exact policy parameters from the assignment images to ensure the generated code strictly adhered to allowed vs. prohibited actions.

## Screenshots
<img width="1600" height="900" alt="Screenshot 2026-09-18 140740" src="https://github.com/user-attachments/assets/841fe9ac-10cc-4a73-8725-aae70de8464f" />
<img width="1600" height="900" alt="Screenshot 2026-09-18 140700" src="https://github.com/user-attachments/assets/39a061c4-4f6a-4beb-9c05-7b86b176e386" />
<img width="1600" height="900" alt="Screenshot 2026-09-18 140327" src="https://github.com/user-attachments/assets/0eabd2aa-9806-4170-a13a-861c3308541d" />
<img width="1600" height="900" alt="2" src="https://github.com/user-attachments/assets/b275907c-2c48-4113-9f9d-cd1de89a1a30" />
<img width="1600" height="900" alt="project" src="https://github.com/user-attachments/assets/19d2ca3a-a369-45e4-924a-a614f82febc3" />

## How to Test (Demo Scenarios)
Send a `POST` request to `/chat` with the following JSON payloads:

**Scenario 1: Priya (Cancelled, wants upgrade)**
```json
{
  "pnr": "SK4821X",
  "message": "I am furious! My flight is cancelled. I want a refund and a free business class upgrade!"
}

//Scenario 2: Arvind (4h Delay, wants hotel)

JSON//
{
  "pnr": "TR1190B",
  "message": "I missed my meeting due to this 4h delay. Give me a hotel room now."
}

//Scenario 3: Meher (6h Delay, wants expensive rebooking)

JSON//
{
  "pnr": "WL7742",
  "message": "My flight is delayed 6 hours. I want a full night hotel and rebook me on the next flight (fare difference is 2000)."
}
