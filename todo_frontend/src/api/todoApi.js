const API_BASE = '/api/todos'

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const result = await response.json()

  if (result.status === 'error') {
    throw new Error(result.error || 'Something went wrong')
  }

  return result.data
}

export function getTodos() {
  return request(API_BASE)
}

export function createTodo(title) {
  return request(API_BASE, {
    method: 'POST',
    body: JSON.stringify({ title }),
  })
}

export function updateTodo(id, updates) {
  return request(`${API_BASE}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
}

export function deleteTodo(id) {
  return request(`${API_BASE}/${id}`, {
    method: 'DELETE',
  })
}
