import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

interface Todo {
    id: number;
    name: string;
    surname: string;
    age: number;
    email: string;
    comment: string;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [age, setAge] = useState<number | ''>('');
    const [email, setEmail] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addOrUpdateTodo = () => {
        if (name && surname && age !== '' && email && comment) {
            const newTodo: Todo = {
                id: editingId || Date.now(),
                name,
                surname,
                age: Number(age),
                email,
                comment,
            };
            if (editingId) {
                setTodos(todos.map(todo => (todo.id === editingId ? newTodo : todo)));
                setEditingId(null);
            } else {
                setTodos([...todos, newTodo]);
            }
            setName('');
            setSurname('');
            setAge('');
            setEmail('');
            setComment('');
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const startEditTodo = (todo: Todo) => {
        setEditingId(todo.id);
        setName(todo.name);
        setSurname(todo.surname);
        setAge(todo.age);
        setEmail(todo.email);
        setComment(todo.comment);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Todo App</h1>
            <div className="grid grid-cols-1 gap-4 mb-6 w-full max-w-md m-auto">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Ism"
                />
                <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Familiya"
                />
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                    className="input input-bordered w-full"
                    placeholder="Yosh"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Email"
                />
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Izoh"
                />
                <button onClick={addOrUpdateTodo} className="btn btn-primary w-full">
                    <FaPlus className="mr-1" /> {editingId ? 'Saqlash' : "Qo'shish"}
                </button>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {todos.map(todo => (
                    <li key={todo.id} className="p-4 rounded-lg shadow bg-base-100 flex flex-col space-y-2 border w-full">
                        <div><strong>Ism:</strong> {todo.name}</div>
                        <div><strong>Familiya:</strong> {todo.surname}</div>
                        <div><strong>Yosh:</strong> {todo.age}</div>
                        <div><strong>Email:</strong> {todo.email}</div>
                        <div><strong>Izoh:</strong> {todo.comment}</div>
                        <div className="flex justify-end space-x-2 mt-2">
                            <button onClick={() => startEditTodo(todo)} className="btn btn-warning btn-sm">
                                <FaEdit className="mr-1" /> Tahrirlash
                            </button>
                            <button onClick={() => deleteTodo(todo.id)} className="btn btn-error btn-sm">
                                <FaTrash className="mr-1" /> O'chirish
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
