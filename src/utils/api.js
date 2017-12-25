const API_USERNAME = process.env.REACT_APP_API_USERNAME || 'ANYTHING';
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD || '';
const API_BASE_URL = process.env.REACT_API_BASE_URL || 'http://localhost:3001';

const http = (url, options = {}) =>
  fetch(url, {
    ...options,
    ...{ headers: { Authorization: `${API_USERNAME}:${API_PASSWORD}`, 'Content-Type': 'application/json' } }
  });

export function fetchCategories() {
  return http(`${API_BASE_URL}/categories`)
    .then(res => res.json())
    .then(({ categories }) => categories);
}

export function fetchPosts(category) {
  return http(`${API_BASE_URL}/${category ? `${category}/posts` : 'posts'}`).then(res => res.json());
}

export function fetchCurrentPost(postId) {
  return http(`${API_BASE_URL}/posts/${postId}`).then(res => res.json());
}

export function fetchCurrentPostComments(postId) {
  return http(`${API_BASE_URL}/posts/${postId}/comments`).then(res => res.json());
}

export function voteUp(type, id) {
  return http(`${API_BASE_URL}/${type}/${id}`, { method: 'POST', body: JSON.stringify({ option: 'upVote' }) }).then(
    res => res.json()
  );
}

export function voteDown(type, id) {
  return http(`${API_BASE_URL}/${type}/${id}`, { method: 'POST', body: JSON.stringify({ option: 'downVote' }) }).then(
    res => res.json()
  );
}

export function deletePost(id) {
  return http(`${API_BASE_URL}/posts/${id}`, { method: 'DELETE' }).then(res => res.json());
}

export function deleteComment(id) {
  return http(`${API_BASE_URL}/comments/${id}`, { method: 'DELETE' }).then(res => res.json());
}

export function addPost(payload) {
  const body = { ...payload, id: btoa(Date.now()), timestamp: Date.now() };
  return http(`${API_BASE_URL}/posts`, { method: 'POST', body: JSON.stringify(body) }).then(res => res.json());
}

export function editPost(payload) {
  const { id } = payload;
  const body = { ...payload };
  delete body.id;

  return http(`${API_BASE_URL}/posts/${id}`, { method: 'PUT', body: JSON.stringify(body) }).then(res => res.json());
}
