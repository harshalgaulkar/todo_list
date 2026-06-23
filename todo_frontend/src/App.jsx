import { useCallback, useEffect, useState } from 'react'
import * as todoApi from './api/todoApi'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const loadTodos = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await todoApi.getTodos()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  const runAction = async (action) => {
    setBusy(true)
    setError('')
    try {
      await action()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleAdd = (title) =>
    runAction(async () => {
      const newTodo = await todoApi.createTodo(title)
      setTodos((prev) => [newTodo, ...prev])
    })

  const handleToggle = (id, completed) =>
    runAction(async () => {
      const updated = await todoApi.updateTodo(id, { completed })
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
    })

  const handleUpdate = (id, updates) =>
    runAction(async () => {
      const updated = await todoApi.updateTodo(id, updates)
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
    })

  const handleDelete = (id) =>
    runAction(async () => {
      await todoApi.deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List</h1>
        <p>Manage your tasks — add, edit, complete, or delete.</p>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          {error}
          <button type="button" onClick={loadTodos} disabled={loading || busy}>
            Retry
          </button>
        </div>
      )}

      <main className="app-main">
        <TodoForm onAdd={handleAdd} disabled={busy} />
        <TodoList
          todos={todos}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          loading={loading || busy}
        />
      </main>
    </div>
  )
}

export default App
