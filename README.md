# University Chatbot

A conversational AI chatbot that answers university-related queries (admissions, tuition, co-op, etc.) using real-time web search and LLM summarization.

---

## Features

- **Conversational UI**: Modern, chat-based interface (React + Vite)
- **FastAPI Backend**: Handles queries, runs web search (Serper.dev), and generates answers (OpenAI/Together/Gemini APIs)
- **Live Search**: Retrieves fresh information from Google
- **LLM Summarization**: Summarizes search results for accurate, concise responses
- **Source Citations**: Shows links and snippets for answers
- **Session/Memory**: (Optional/Planned) Maintains conversational context

---

## Project Structure

```
university_chatbot/
├── backend/
│   ├── api.py
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
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── style.css
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── requirements.txt
└── README.md
```

---

## Prerequisites

- Python 3.9+
- Node.js (18+ recommended), npm
- **API Keys** for:
    - [Serper.dev (Google Search API)](https://serper.dev)
    - [Together.ai](https://platform.together.ai/) **or** [OpenAI](https://platform.openai.com/)
    - [Gemini](https://ai.google.dev/) *(optional)*

---

## 1. Backend Setup (FastAPI)

### Install Python dependencies

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

---

## 2. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```
- The app runs at [http://localhost:5173](http://localhost:5173)

---

## 3. Usage

- Open [http://localhost:5173](http://localhost:5173)
- Type your question about any university (e.g., "What is the tuition fee for MPS Analytics at Northeastern University Toronto?")
- Wait for the bot to respond with an answer and sources.

---

## 4. Troubleshooting

- **CORS Error**: Make sure the FastAPI backend allows CORS for the frontend port.
- **"Failed to fetch response from backend"**: Ensure your backend is running, API keys are valid, and `/ask` endpoint is accessible.
- **API key errors**: Double-check your `.env` file and API key limits/usage.

---

## 5. Customization & Extending

- To enable **memory/conversational history**, extend backend API and store the chat session in-memory or in a database.
- To improve the UI, use component libraries like [shadcn/ui](https://ui.shadcn.com/), [Material-UI](https://mui.com/), or [Chakra UI](https://chakra-ui.com/).
- To support more universities, customize prompt templates and search queries.


---

## Credits

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Serper.dev](https://serper.dev/)
- [Together.ai](https://platform.together.ai/)
- [OpenAI](https://openai.com/)
- [Google Gemini](https://ai.google.dev/)
