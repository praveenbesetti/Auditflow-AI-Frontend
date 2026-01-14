🛡️ Project Title: AuditFlow AI
Role: Full-Stack Engineer / Lead Architect

Category: DevSecOps / AI Infrastructure

📖 Executive Summary
AuditFlow AI is a specialized Static Analysis Security Testing (SAST) platform that integrates directly into the GitHub CI/CD pipeline. Unlike traditional tools that just flag syntax errors, AuditFlow uses Large Language Models (LLMs) to understand the logic and intent of code changes. It acts as an automated Senior Security Architect, performing real-time code reviews, identifying vulnerabilities (like SQLi, XSS, or logic flaws), and providing COPY-PASTE ready fixes.

🏗️ Technical Architecture & System Design
1. The Real-Time Event Loop (Event-Driven Architecture)
The core of the system is an asynchronous webhook processor.

The Flow: When a developer pushes code, GitHub dispatches a push event. My backend validates the payload signature for security, acknowledges the request immediately to avoid GitHub’s 10-second timeout, and moves the processing to a background task.

The "Diff" Logic: Instead of analyzing entire files (which is expensive and slow), the system uses the GitHub Compare API to isolate the exact lines changed. This "Diff-Only" approach reduces token consumption by up to 80%.

2. AI Inference & Prompt Engineering
I implemented a specialized "Security Persona" using the Llama 3.3 70B model via Groq’s LPUs (Language Processing Units).

Context Window Management: I designed the system to be polyglot, capable of auditing JS, Python, Go, and Rust by injecting language-specific security protocols into the System Prompt.

Output Structuring: To ensure the data could be parsed by both humans and machines, I forced the AI to output in a specific Markdown format, which allows the frontend to render "🔴 Rejected" or "🟢 Passed" badges automatically.

3. Real-Time Full-Stack Integration
Backend (Node.js/Express): Handles OAuth2 authentication, session management, and the GitHub REST API (Octokit) for automated commit commenting.

Frontend (React 18): Features a "Security Command Center" where organization heads can track health metrics across multiple repositories.

Data Persistence: MongoDB stores audit history, but for security and privacy, the system uses On-Demand Fetching. We store commit hashes and file paths rather than raw source code, ensuring the user's IP (Intellectual Property) remains on GitHub.

🚀 Key Engineering Challenges Solved
The GitHub Timeout Trap: Solved the 10-second webhook timeout by implementing an asynchronous background worker pattern. The user gets a 202 Accepted response instantly, while the AI audit continues in the background.

Version Conflict & Dependency Management: Debugged and resolved complex React 19 vs. React 18 hook dispatcher conflicts (useRef null errors) to ensure stability with legacy react-scripts.

Token Optimization: Built a filter that ignores non-code files (images, JSON, lock files), ensuring the AI only spends its "brainpower" on logic-heavy files.

📈 Impact & Business Value
Reduction in Review Time: Reduces the manual code review burden on Senior Engineers by filtering out common security mistakes before a human even looks at the PR.

Education: Acts as a real-time tutor for junior developers by explaining why a piece of code is dangerous and showing the impact of a potential attack.

Security Posture: Gives CTOs a bird's-eye view of their team's code quality and security trends through the Analytics Dashboard.
