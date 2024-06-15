const TodoInput = ({ title, setTitle, description, setDescription, status, setStatus, addTodo }) => {
    return (
        <div className="input-wrapper">
            <input
                type="text"
                name="title"
                value={title}
                placeholder="Todo title"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <input
                type="text"
                name="description"
                value={description}
                placeholder="Todo description"
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <select
                name="status"
                value={status}
                onChange={(e) => {
                    setStatus(parseInt(e.target.value));
                }}
            >
                <option value="">Select status</option>
                <option value="0">Completed</option>
                <option value="1">In Progress</option>
            </select>
            <button className="add-button" onClick={addTodo}>
                Add Todo
            </button>
        </div>
    );
};

export default TodoInput;
