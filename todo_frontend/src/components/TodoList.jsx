import TodoItem from './TodoItem'

export default function TodoList({ todos, onToggle, onUpdate, onDelete, loading }) {
  if (loading) {
    return <p className="status-message">Loading todos...</p>
  }

  if (todos.length === 0) {
    return <p className="status-message empty">No todos yet. Add one above!</p>
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <section className="todo-list-section">
      <div className="todo-stats">
        <span>{todos.length} total</span>
        <span>{completedCount} completed</span>
        <span>{todos.length - completedCount} remaining</span>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
            disabled={loading}
          />
        ))}
      </ul>
    </section>
  )
}
