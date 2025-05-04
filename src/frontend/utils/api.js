const API_BASE = '/api';

export const fetchColorCodes = async () => {
  const res = await fetch(`${API_BASE}/color-codes`);
  if (!res.ok) throw new Error('Failed to fetch color codes');
  return await res.json();
};

export const fetchColorCode = async (id) => {
  const res = await fetch(`${API_BASE}/color-codes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch color code');
  return await res.json();
};

export const createColorCode = async (data) => {
  const res = await fetch(`${API_BASE}/color-codes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create color code');
  return await res.json();
};

export const updateColorCode = async (id, data) => {
  const res = await fetch(`${API_BASE}/color-codes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update color code');
  return await res.json();
};

export const deleteColorCode = async (id) => {
  const res = await fetch(`${API_BASE}/color-codes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete color code');
  return await res.json();
};

export const fetchFundamentalColors = async (query) => {
  const url = query 
    ? `${API_BASE}/fundamental-colors/search?q=${encodeURIComponent(query)}`
    : `${API_BASE}/fundamental-colors`;
  
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch fundamental colors');
  return await res.json();
};

export const createFundamentalColor = async (colorName) => {
  const res = await fetch(`${API_BASE}/fundamental-colors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ colorName })
  });
  if (!res.ok) throw new Error('Failed to create fundamental color');
  return await res.json();
};