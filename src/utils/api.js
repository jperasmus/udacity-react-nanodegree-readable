const API_USERNAME = process.env.REACT_APP_API_USERNAME || 'ANYTHING';
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD || '';
const API_BASE_URL = process.env.REACT_API_BASE_URL || 'http://localhost:3001';

const http = url => fetch(url, { headers: { Authorization: `${API_USERNAME}:${API_PASSWORD}` } });

export function fetchCategories() {
  return http(`${API_BASE_URL}/categories`)
    .then(res => res.json())
    .then(({ categories }) => categories);
}

export function fetchPosts(category) {
  return http(`${API_BASE_URL}/${category ? `${category}/posts` : 'posts'}`).then(res =>
    res.json()
  );
}
