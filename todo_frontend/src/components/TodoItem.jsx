import { useState } from 'react'

export default function TodoItem({ todo, onToggle, onUpdate, onDelete, disabled }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const handleSave = async () => {
    const trimmed = editTitle.trim()
    if (!trimmed) return

    await onUpdate(todo.id, { title: trimmed })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-check">
        <input
          type="checkbox"
          checked={Boolean(todo.completed)}
          onChange={() => onToggle(todo.id, !todo.completed)}
          disabled={disabled || isEditing}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <span className="checkmark" />
      </label>

      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            autoFocus
            aria-label="Edit todo title"
          />
          <div className="todo-actions">
            <button type="button" onClick={handleSave} disabled={disabled || !editTitle.trim()}>
              Save
            </button>
            <button type="button" className="secondary" onClick={handleCancel} disabled={disabled}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>
          <div className="todo-actions">
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setEditTitle(todo.title)
                setIsEditing(true)
              }}
              disabled={disabled}
            >
              Edit
            </button>
            <button
              type="button"
              className="danger"
              onClick={() => onDelete(todo.id)}
              disabled={disabled}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}
