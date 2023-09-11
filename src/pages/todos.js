import React, { useState } from 'react';

function Todos() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, active: false }]);
      setNewTask('');
    }
  };

  const saveEdit = () => {
    if (editText.trim() !== '' && editText.length > 1) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex].text = editText;
      setTasks(updatedTasks);
      setEditIndex(-1);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditIndex(-1);
    setEditText('');
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const toggleActive = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].active = !updatedTasks[index].active;
    setTasks(updatedTasks);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen font-medium ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
      <div className={`max-w-full p-8 rounded-lg shadow-lg w-96 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}`}>
        <div className="flex items-center mb-6">
          <h4 className={`font-semibold ml-3 text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Sam's Jobs</h4>
        </div>
        {tasks.map((task, index) => (
          <div key={index}>
            {editIndex === index ? (
              <div className={`flex items-center justify-between h-10 px-2 rounded cursor-pointer ${darkMode ? 'bg-gray-900' : 'hover:bg-gray-100'}`}>
                <div className="flex items-center">
                  <input
                    className="flex-grow h-8 bg-transparent focus:outline-none font-medium"
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                </div>
                <div className="space-x-2">
                  <button
                    className={`text-green-500 hover:text-green-600 ${darkMode ? 'text-gray-200' : ''}`}
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button
                    className={`text-red-500 hover:text-red-600 ${darkMode ? 'text-gray-200' : ''}`}
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  className="hidden"
                  type="checkbox"
                  id={`task_${index}`}
                  checked={!task.active}
                  onChange={() => toggleActive(index)}
                />
                <label
                  className={`flex items-center justify-between h-10 px-2 rounded cursor-pointer ${darkMode ? 'bg-gray-900' : task.active ? '' : 'bg-gray-600 hover:bg-gray-100'}`}
                  htmlFor={`task_${index}`}
                >
                  <div className="flex items-center">
                    <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
                      <svg
                        className={`w-4 h-4 fill-current ${
                          task.active ? 'text-gray-400' : 'text-green-500'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {task.active && (
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        )}
                        {!task.active && (
                          <path
                            fillRule="evenodd"
                            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        )}
                      </svg>
                    </span>
                    <span className={`ml-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{task.text}</span>
                  </div>
                  <div className="space-x-2">
                    <button
                      className={`text-blue-500 hover:text-blue-600 ${darkMode ? 'text-gray-200' : ''}`}
                      onClick={() => {
                        setEditIndex(index);
                        setEditText(task.text);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={`text-red-500 hover:text-red-600 ${darkMode ? 'text-gray-200' : ''}`}
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </div>
                </label>
              </div>
            )}
          </div>
        ))}
        <div>
          <button
            className={`flex items-center w-full h-8 px-2 mt-2 text-sm font-medium rounded ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-600'}`}
            onClick={addTask}
          >
            <svg
              className="w-5 h-5 text-gray-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <input
              className={`flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
              type="text"
              placeholder="add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </button>
        </div>
      </div>
      <button
  onClick={toggleDarkMode}
  className={`absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full`}
>
  {darkMode ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
    </svg>
  )}
</button>

    </div>
  );
}

export default Todos;
