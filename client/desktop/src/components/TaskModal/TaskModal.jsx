import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./TaskModal.css";

const TaskModal = ({ show, onClose, token }) => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState("");
    const [editingTaskDescription, setEditingTaskDescription] = useState("");

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5555/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, [token]);

    useEffect(() => {
        if (show) {
            fetchTasks();
        }
    }, [show, fetchTasks]);

    const createTask = async () => {
        try {
            await axios.post(
                "http://localhost:5555/tasks",
                {
                    title: newTaskTitle,
                    description: newTaskDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchTasks();
            setNewTaskTitle("");
            setNewTaskDescription("");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const editTask = async () => {
        try {
            await axios.put(
                `http://localhost:5555/tasks/${selectedTask._id}`,
                {
                    title: editingTaskTitle,
                    description: editingTaskDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchTasks();
            setSelectedTask(null);
            setEditingTaskTitle("");
            setEditingTaskDescription("");
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5555/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className={`task-modal ${show ? "show" : "hide"}`}>
            <div className='modal-content'>
                <button className='close-button' onClick={onClose}>
                    Cerrar
                </button>
                <h2>Tareas</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <div>
                                <strong>{task.title}</strong>
                                <p>{task.description}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setSelectedTask(task);
                                        setEditingTaskTitle(task.title);
                                        setEditingTaskDescription(
                                            task.description
                                        );
                                    }}
                                >
                                    Editar
                                </button>
                                <button onClick={() => deleteTask(task._id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <hr />
                <div>
                    <input
                        type='text'
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder='Título'
                    />
                    <input
                        type='text'
                        value={newTaskDescription}
                        onChange={(e) =>
                            setNewTaskDescription(e.target.value)
                        }
                        placeholder='Descripción'
                    />
                    <button onClick={createTask}>Crear Tarea</button>
                </div>
                {selectedTask && (
                    <>
                        <h3>Editar Tarea</h3>
                        <input
                            type='text'
                            value={editingTaskTitle}
                            onChange={(e) =>
                                setEditingTaskTitle(e.target.value)
                            }
                        />
                        <input
                            type='text'
                            value={editingTaskDescription}
                            onChange={(e) =>
                                setEditingTaskDescription(e.target.value)
                            }
                        />
                        <button onClick={editTask}>Guardar Cambios</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskModal;
