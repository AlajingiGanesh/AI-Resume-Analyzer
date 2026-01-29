const API_BASE = "http://127.0.0.1:8000";

export async function postForm(endpoint, formData) {
  const res = await fetch(API_BASE + endpoint, {
    method: "POST",
    body: formData
  });
  return res.json();
}

export async function postJSON(endpoint, data) {
  const res = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

const BASE_URL = "https://ai-resume-analyzer-seven-rust.vercel.app/";
