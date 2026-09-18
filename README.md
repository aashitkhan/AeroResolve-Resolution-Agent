# AeroResolve - Airline Disruption Resolution Agent

## Live Link: https://airline-resolution-agent--aashitkhan07.replit.app/<img width="1600" height="900" alt="Screenshot 2026-09-18 141435" src="https://github.com/user-attachments/assets/9812b845-9b7b-4c83-871e-8dee5c37fbcf" />
<img width="1600" height="900" alt="Screenshot 2026-09-18 140327" src="https://github.com/user-attachments/assets/bb72ea7a-a699-485a-a107-e16d939466b6" />
<img width="1600" height="900" alt="Screenshot 2026-09-18 140700" src="https://github.com/user-attachments/assets/8faeac1c-a096-4829-8fa0-c275d8a9bc12" />

## About This Project
It handles realistic customer journeys regarding airline disruptions (cancellations and delays) by understanding customer intent, verifying loyalty tiers, and enforcing strict service policies.

* **Framework:** Node.js with Express.js.
  
##Architecture Flow:
1.Client Interface: API consumer (Postman, Web Application, or Chat Interface) sending JSON payloads.
2.Hosting Environment: Cloud-based execution environment (Replit) handling routing and server deployment.
3.Server / Routing Layer: Express.js application handling the POST /chat endpoint.Data Layer: In-memory local database storing customer profiles, PNRs, and flight status (simulating a live airline CRM). 
4.Policy Engine: Rule-based logic blocks determining compensation limits (e.g., ₹1,500 max waiver, 5-hour hotel thresholds)

##Process Flow:
#Request Ingestion: The agent receives a JSON request containing the customer's pnr and a text message.Customer Verification: The system looks up the pnr in the database.
# If invalid, it immediately rejects the request. If valid, it retrieves the customer's name, loyalty tier, and flight disruption status. 
#  Classification & Context Mapping: The agent maps the customer's text message to their specific flight situation (Scenario 1: Cancellation, Scenario 2: 4h Delay, Scenario 3: 6h Delay).  
# Policy Evaluation: The agent evaluates the requested compensation against strict business rules:Check 1: Does a 4h delay qualify for a hotel? (Result: No, only meal/lounge). 
# Check 2: Can a ₹2,000 fare difference be waived? (Result: No, exceeds ₹1,500 limit).  
# Check 3: Are free business class upgrades allowed? (Result: No, prohibited).
# Action Execution & Escalation: Based on the evaluation, the agent executes the allowed automated actions (e.g., processing refunds, applying vouchers) or escalates the #request to a human supervisor for prohibited/exceeded actions.  
# Response Generation: The agent returns a structured JSON response containing the personalized reply and the final resolution status.

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
