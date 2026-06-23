import { useState } from 'react'

export default function TodoForm({ onAdd, disabled }) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    await onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={disabled}
        aria-label="New todo title"
      />
      <button type="submit" disabled={disabled || !title.trim()}>
        Add Todo
      </button>
    </form>
  )
}
