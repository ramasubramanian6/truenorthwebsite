// Centralised API base URL — set VITE_API_URL in .env.local for dev
// and in your hosting environment for production.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5002').replace(/\/$/, '');
