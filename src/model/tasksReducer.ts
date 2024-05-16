import { v1 } from "uuid";
import { TaskType } from "../App";

export const tasksReducer = (state: TaskType[], action: TasksReducerActionsType): TaskType[] => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			// const filteredTasks = tasks.filter((task) => {
			// 	return task.id !== taskId
			// })
			// setTasks(filteredTasks)
			return state.filter(el => el.id !== action.payload.id) 
		}
		case 'ADD-TASK': {

			const newTask = {
				id: v1(),
				title: action.payload.title,
				isDone: false
			}
			// const newTasks = [newTask, ...tasks]
			// setTasks(newTasks)
			return state = [...state, newTask]
		}
		default: return state
	}
}

type TasksReducerActionsType = RemoveTaskACType | AddTaskACType

type RemoveTaskACType = {
	type: 'REMOVE-TASK'
	payload: { id: string }
}

type AddTaskACType = {
	type: 'ADD-TASK'
	payload: { title: string }
}

export const removeTaskAC = (id: string) => {
	return {
		type: 'REMOVE-TASK',
		payload: {
			id
		}
	} as const
}

export const addTaskAC = (title: string) => {
	return {
		type: 'ADD-TASK',
		payload: {
			title
		}
	} as const
}