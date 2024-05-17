import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	payload: {
		taskId: string
		todolistId: string
	}
}

export type AddTaskActionType = {
	type: 'ADD-TASK'
	payload: {
		title: string
		todolistId: string
	}
}

export type ChangeStatusActionType = {
	type: 'CHANGE-STATUS'
	payload: {
		taskId: string
		taskStatus: boolean
		todolistId: string
	}
}

export type UpdateTaskActionType = {
	type: 'UPDATE-TASK'
	payload: {
		taskId: string
		title: string
		todolistId: string
	}
}

type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeStatusActionType
	| UpdateTaskActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TasksStateType = {
	[todolistID1]: [
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
	],
	[todolistID2]: [
		{ id: v1(), title: 'Rest API', isDone: true },
		{ id: v1(), title: 'GraphQL', isDone: false },
	],
}
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state }
			const tasks = state[action.payload.todolistId]
			const deletedTasks = tasks.filter(t => t.id !== action.payload.taskId)
			stateCopy[action.payload.todolistId] = deletedTasks
			return stateCopy
		}
		case 'ADD-TASK': {
			const newTask = {
				id: v1(),
				title: action.payload.title,
				isDone: false
			}

			const stateCopy = { ...state }
			const tasks = state[action.payload.todolistId]
			const addedTasks = [...tasks, newTask]
			stateCopy[action.payload.todolistId] = addedTasks
			return stateCopy
		}
		case 'CHANGE-STATUS': {
			const stateCopy = { ...state }
			const tasks = state[action.payload.todolistId]
			const changedStatus = tasks.map(t => t.id == action.payload.taskId ? { ...t, isDone: action.payload.taskStatus } : t)
			stateCopy[action.payload.todolistId] = changedStatus
			return stateCopy
		}

		case 'UPDATE-TASK': {
			const stateCopy = { ...state }
			const tasks = state[action.payload.todolistId]
			const updatedTask = tasks.map(t => t.id == action.payload.taskId ? { ...t, title: action.payload.title } : t)
			stateCopy[action.payload.todolistId] = updatedTask
			return stateCopy
		}

		case 'ADD-TODOLIST': {
			const stateCopy = { ...state }

			stateCopy[action.payload.todolistId] = []
			return stateCopy
		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = { ...state }

			delete stateCopy[action.payload.id]
			return stateCopy
		}
		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return {
		type: 'REMOVE-TASK',
		payload: {
			taskId,
			todolistId
		},
	} as const
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return {
		type: 'ADD-TASK',
		payload: {
			title,
			todolistId
		},
	} as const
}

export const changeStatusAC = (taskId: string, taskStatus: boolean, todolistId: string): ChangeStatusActionType => {
	return {
		type: 'CHANGE-STATUS',
		payload: {
			taskId,
			taskStatus,
			todolistId,
		},
	} as const
}

export const updateTaskAC = (taskId: string, title: string, todolistId: string): UpdateTaskActionType => {
	return {
		type: 'UPDATE-TASK',
		payload: {
			taskId,
			title,
			todolistId,
		},
	} as const
}

