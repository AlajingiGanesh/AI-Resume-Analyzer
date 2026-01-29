const API_BASE = "https://ai-resume-backend.vercel.app";

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
