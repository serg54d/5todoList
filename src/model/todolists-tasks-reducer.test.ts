import { v1 } from "uuid"
import { TasksStateType, TodolistType } from "../App"
import { tasksReducer } from "./tasks-reducer"
import { addTodolistAC, todolistsReducer } from "./todolists-reducer"

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {}
	const startTodolistState: Array<TodolistType> = []
	const todolistId = v1()
	const action = addTodolistAC('new todolist', todolistId);
	
	const endTasksState = tasksReducer(startTasksState, action)
	const endTodolistState = todolistsReducer(startTodolistState, action)

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0]
	const idFromTodolists = endTodolistState[0].id

	expect(idFromTasks).toBe(action.payload.todolistId)
	expect(idFromTodolists).toBe(action.payload.todolistId)

})