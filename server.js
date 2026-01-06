const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) console.warn('Warning: OPENAI_API_KEY not set. See .env.example');
const client = new OpenAI({ apiKey });
const mockMode = !apiKey;
if (mockMode) console.warn('Mock mode enabled: server will return canned responses since OPENAI_API_KEY is not set.');

function extractTextFromChoice(choice) {
  try {
    // New SDK may put text in different shapes; try common variants
    if (choice?.message?.content) {
      const content = choice.message.content;
      if (Array.isArray(content)) {
        // content array of objects
        const textParts = content.map(c => c.text || c?.content || '').filter(Boolean);
        return textParts.join('\n');
      }
      if (typeof content === 'string') return content;
    }
    if (choice?.text) return choice.text;
    if (choice?.message?.length) return JSON.stringify(choice.message);
  } catch (e) {
    return '';
  }
  return JSON.stringify(choice);
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, content } = req.body || {};
    if (!message) return res.status(400).json({ error: 'No message provided' });
    if (mockMode) {
      // Return a simple canned response for development when no API key is present
      const reply = `Mock reply: received question "${message}". Provide content-aware answers when OpenAI is configured.`;
      return res.json({ response: reply, success: true });
    }

    const systemPrompt = `You are an intelligent AI assistant for students studying from syllabus content.\n\n${content || ''}`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const choice = response.choices && response.choices[0];
    const aiText = extractTextFromChoice(choice) || '';

    return res.json({ response: aiText, success: true });
  } catch (err) {
    console.error('Chat error:', err?.message || err);
    return res.status(500).json({ error: 'Failed to process request', details: (err && err.message) || String(err), success: false });
  }
});

app.post('/api/generate-questions', async (req, res) => {
  try {
    const { content, num_questions = 5 } = req.body || {};
    if (!content) return res.status(400).json({ error: 'No content provided' });

    const prompt = `Generate ${num_questions} multiple-choice questions from the following syllabus content. Each question should have 4 options (A, B, C, D) with one correct answer clearly marked.\n\nContent:\n${content}`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a question generation expert.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.8
    });

    const choice = response.choices && response.choices[0];
    const questions = extractTextFromChoice(choice);
    return res.json({ questions, success: true });
  } catch (err) {
    console.error('Generate questions error:', err?.message || err);
    return res.status(500).json({ error: 'Failed to generate questions', details: (err && err.message) || String(err), success: false });
  }
});

app.post('/api/summarize', async (req, res) => {
  try {
    const { content } = req.body || {};
    if (!content) return res.status(400).json({ error: 'No content provided' });

    const prompt = `Provide a concise summary of the following syllabus content. Include main topics, key concepts and learning objectives.\n\nContent:\n${content}`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a summarization expert.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.3
    });

    const choice = response.choices && response.choices[0];
    const summary = extractTextFromChoice(choice);
    return res.json({ summary, success: true });
  } catch (err) {
    console.error('Summarize error:', err?.message || err);
    return res.status(500).json({ error: 'Failed to summarize content', details: (err && err.message) || String(err), success: false });
  }
});

app.post('/api/search', async (req, res) => {
  try {
    const { query, content } = req.body || {};
    if (!query || !content) return res.status(400).json({ error: 'Query and content required' });

    const prompt = `Search the following syllabus content for information related to: "${query}"\n\nContent:\n${content}\n\nProvide relevant excerpts and explanations.`;

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a search and retrieval expert.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 600,
      temperature: 0.2
    });

    const choice = response.choices && response.choices[0];
    const results = extractTextFromChoice(choice);
    return res.json({ results, success: true });
  } catch (err) {
    console.error('Search error:', err?.message || err);
    return res.status(500).json({ error: 'Failed to search content', details: (err && err.message) || String(err), success: false });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
