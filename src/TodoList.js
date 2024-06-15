const TodoList = ({list, remove, removeSubTodo, addSubTodo, setSubTodoTitle, subTodoTitle}) => {
    return (
        <>
            {list?.length > 0 ? (
                <ul className="todo-list">
                    {list.map((entry) => (
                        <div className="todo" key={entry.id}>
                            <li>
                                <strong>Title:</strong> {entry.title} <br/>
                                <strong>Description:</strong> {entry.description} <br/>
                                <strong>Status:</strong> {entry.status ? entry.status.Value === 0 ? "Completed" : "In Progress" : "N/A"}
                                <br/>
                                <strong>SubTodos:</strong>
                                {entry.subTodos?.length > 0 ? (
                                    <ul>
                                        {entry.subTodos.map((subTodo) => (
                                            <li key={subTodo.id}>
                                                <strong>Title:</strong> {subTodo.title} <br/>
                                                <strong>Status:</strong> {subTodo.status ? subTodo.status.Value === 0 ? "Completed" : "In Progress" : "N/A"}
                                                <button
                                                    className="deleteSubTodo"
                                                    onClick={() => removeSubTodo(subTodo.id)}
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No sub-tasks found</p>
                                )}
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="subTodo"
                                        value={subTodoTitle}
                                        placeholder="Create a new subTodo"
                                        onChange={(e) => {
                                            setSubTodoTitle(e.target.value);
                                        }}
                                    />
                                    <button className="add-button" onClick={() => addSubTodo(entry.id)}>
                                        Add SubTodo
                                    </button>
                                </div>
                            </li>
                            <button
                                className="delete-button"
                                onClick={() => remove(entry.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </ul>
            ) : (
                <div className="empty">
                    <p>No task found</p>
                </div>
            )}
        </>
    );
};

export default TodoList;
