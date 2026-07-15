## InterviewIQ.AI

An AI-powered mock interview platform that helps users prepare for technical and HR interviews through intelligent voice-based conversations,
adaptive questioning, and detailed performance analytics.

Live Demo:** https://three-interview-client.onrender.com


## Overview

InterviewIQ.AI provides a realistic interview experience by generating role-specific questions, analyzing user responses, 
and delivering personalized feedback. The platform adapts the interview difficulty based on the user's selected role and
experience level, making interview preparation more effective.


##  Features

-  AI-powered mock interviews
-  Real-time voice interaction
-  Adaptive difficulty based on role and experience
-  Timer-based interview simulation
-  Dynamic follow-up questions
-  Performance analytics and scoring
-  Downloadable PDF interview reports
-  Credit-based interview access
-  Secure Firebase Authentication
-  Responsive and modern UI

---

##  Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Firebase Authentication
- JWT Authentication
- OpenRouter API

### Other Tools
- Render (Deployment)
- Git & GitHub


## Project Structure

```text
InterviewIQ.AI/
│
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                 # Express Backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── package.json
│
├── README.md
└── package.json
```



## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Manjeet112/3.interview.git
cd 3.interview
```

---

##  Backend Setup

Navigate to the backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key
```

Run the backend server:

```bash
npm run dev
```

The backend will run on:

```
http://localhost:8000
```

---

## 💻 Frontend Setup

Navigate to the frontend folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

---

##  How It Works

1. Sign in using Firebase Authentication.
2. Choose your target role and experience level.
3. Start an AI-powered mock interview.
4. Answer questions using voice interaction.
5. Receive intelligent follow-up questions.
6. View your interview score and analytics.
7. Download a detailed PDF performance report.

---

## 📊 Performance Evaluation

The platform evaluates users based on:

- Communication Skills
- Technical Knowledge
- Confidence Level
- Answer Relevance
- Problem-Solving Ability
- Overall Interview Performance

---

##  Authentication

- Firebase Google Authentication
- JWT-based Authorization
- Protected API Routes

---

##  Deployment

### Frontend

Hosted on **Render**

Live Demo:

https://three-interview-client.onrender.com

---

## 📦 APIs Used

- OpenRouter API (LLM Integration)
- Firebase Authentication API

---

## 📸 Screenshots

> Add screenshots of your application here.

Example:

```
screenshots/
├── home.png
├── interview.png
├── analytics.png
└── report.png
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Manjeet Kaur**

GitHub: https://github.com/Manjeet112

LinkedIn: *(https://www.linkedin.com/in/manjeet-kaur-310522328/)*

---
<img width="1515" height="857" alt="Screenshot 2026-07-15 153203" src="https://github.com/user-attachments/assets/883bc570-c88e-43cf-8928-a63e44ede799" />



## ⭐ Show Your Support

If you found this project helpful, please consider giving it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License.
