import './App.css';
import { Todolist } from "./Todolist";
import { useState } from "react";
import { v1 } from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})



	// let [todolists, setTodolists] = useState<TodolistType[]>([
	// 	{ id: v1(), title: 'What to learn', filter: 'all' },
	// 	{ id: v1(), title: 'What to buy', filter: 'all' },
	// ])
	// const [tasks, setTasks] = useState<TaskType[]>([
	// 	{ id: v1(), title: 'HTML&CSS', isDone: true },
	// 	{ id: v1(), title: 'JS', isDone: true },
	// 	{ id: v1(), title: 'ReactJS', isDone: false },
	// ])
	//const [filter, setFilter] = useState<FilterValuesType>('all')
	const removeTask = (todolistID: string, taskId: string) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskId) })
		// const filteredTasks = tasks[todolistID1].filter((task) => {
		// 	return task.id !== taskId
		// })
		// setTasks(filteredTasks)
	}
	const addTask = (todolistID: string, title: string) => {
		setTasks({ ...tasks, [todolistID]: [...tasks[todolistID]] })
		// const newTask = {
		// 	id: v1(),
		// 	title: title,
		// 	isDone: false
		// }
		// const newTasks = [newTask, ...tasks]
		// setTasks(newTasks)
	}

	const deleteTodolist = (todolistID: string) => {
		setTodolists(todolists.filter(el => el.id !== todolistID))
		delete tasks[todolistID]
		setTasks({ ...tasks })
	}

	const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
		setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone: taskStatus } : el) });
	}

	const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
		setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: filterValue } : el))
		// const currentTodolist=todolists.find(el=>el.id===todolistId)
		// if(currentTodolist){
		// 	currentTodolist.filter=filterValue
		// 	setTodolists([...todolists])
		// }
	}

	return (
		<div className="App">
			{todolists.map(el => {
				let tasksForTodolist = tasks[el.id]
				if (el.filter === 'active') {
					tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
				}
				if (el.filter === 'completed') {
					tasksForTodolist = tasks[el.id].filter(task => task.isDone)
				}
				return (
					<Todolist
						key={el.id}
						todolistId={el.id}
						title={el.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						filter={el.filter}
						deleteTodolist={deleteTodolist}
					/>
				)
			})}
		</div>
	);
}

export default App;