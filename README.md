# CampusAI – Your Global University & College Chatbot

CampusAI is a modern AI-powered chatbot and web app that helps students explore and compare universities and colleges worldwide, get instant answers to academic queries, and discover campuses in any city.  
Built with a React frontend and a FastAPI backend (deployed to Render.com), CampusAI is easy to deploy, maintain, and extend.


## Features

-  **Global university & campus/city search** (not limited to Canada!)
-  **Conversational AI:** Get instant answers to questions about programs, admissions, scholarships, campus life, and more.
-  **Smart autocomplete** for cities/campuses worldwide.
-  **Source-backed answers:** Key responses include links to official sources.
-  **Fast, scalable architecture:** React + FastAPI backend, serverless/cloud-ready.
-  **Seamless user experience:** Modern UI, testimonials, glassmorphism design.


##  Tech Stack

- **Frontend:** ReactJS (with functional components & hooks)
- **Backend:** FastAPI (Python)
- **Deployment:** 
  - Frontend: [Netlify](https://netlify.com)
  - Backend: [Render.com](https://render.com)
- **Other:** 
  - GitHub for version control
  - Google Custom Search API (or similar) for web results


##  Project Structure

```
university_chatbot/
├── backend/
│   ├── main.py
│   ├── agents/
│   │   ├── search_agent.py
│   │   ├── summary_agent.py
│   │   └── together_agent.py
│   ├── tools/
│   │   └── config.py
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
|   |   └── cities.json
|   |   └── university-generic.png
│   ├── src/
|   |   └── Components
|   |         └── Chat.jsx
|   |         └── HomePage.jsx
|   |         └── PrivacyPolicy.jsx
|   |         └── Sidebar.jsx
|   |         └── TermsOfService.jsx
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── style.css
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── requirements.txt
└── README.md
```


## Prerequisites

- Python 3.9+
- Node.js (18+ recommended), npm
- **API Keys** for:
    - [Serper.dev (Google Search API)](https://serper.dev)
    - [Together.ai](https://platform.together.ai/) **or** [OpenAI](https://platform.openai.com/)
    - [Gemini](https://ai.google.dev/) *(optional)*


## Quickstart

### 1. **Clone the Repository**

```bash
git clone https://github.com/charishmag21/university-bot.git
cd university-bot
```

### 2. **Backend Setup (FastAPI)**

```bash
cd backend
pip install -r ../requirements.txt
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```
SERPER_API_KEY=your_serper_api_key
TOGETHER_API_KEY=your_together_api_key
GEMINI_API_KEY=your_gemini_api_key  # optional
OPENAI_API_KEY=your_openai_api_key  # if using OpenAI
```

### Run FastAPI server

```bash
# From the root or backend directory
uvicorn backend.api:app --reload --port 8000
```

- The server runs at [http://localhost:8000](http://localhost:8000)
- API docs at [http://localhost:8000/docs](http://localhost:8000/docs)


## 3. Frontend Setup (React + Vite)

```bash
cd ../frontend
npm install
npm run dev
```
- The app runs at [http://localhost:5173](http://localhost:5173)


## 4. Usage

- Open [http://localhost:5173](http://localhost:5173)
- Type your question about any university (e.g., "What is the tuition fee for MPS Analytics at Northeastern University Toronto?")
- Wait for the bot to respond with an answer and sources.


## 5. Troubleshooting

- **CORS Error**: Make sure the FastAPI backend allows CORS for the frontend port.
- **"Failed to fetch response from backend"**: Ensure your backend is running, API keys are valid, and `/ask` endpoint is accessible.
- **API key errors**: Double-check your `.env` file and API key limits/usage.


## 6. Customization & Extending

- To enable **memory/conversational history**, extend backend API and store the chat session in-memory or in a database.
- To improve the UI, use component libraries like [shadcn/ui](https://ui.shadcn.com/), [Material-UI](https://mui.com/), or [Chakra UI](https://chakra-ui.com/).
- To support more universities, customize prompt templates and search queries.


**Live Demo
Frontend:** [your-frontend.netlify.app](https://unibotai.netlify.app/)
**Backend:** [your-backend.onrender.com](https://unibotai-1.onrender.com)

## Credits

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Serper.dev](https://serper.dev/)
- [Together.ai](https://platform.together.ai/)
- [OpenAI](https://openai.com/)
- [Google Gemini](https://ai.google.dev/)
