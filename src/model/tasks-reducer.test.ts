import { addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC } from './todolists-reducer'
import { v1 } from 'uuid'
import { TasksStateType, TodolistType } from '../App'
import { addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskAC } from './tasks-reducer'

test('correct task should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

	// 2. Действие
	const action = removeTaskAC('1', todolistId1)
	const endState = tasksReducer(startState, action)

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию

	expect(endState[todolistId1].length).toBe(2)
	expect(endState[todolistId1].every(t => t.id != '1')).toBeTruthy()
})

test('correct task should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

	// 2. Действие
	const action = addTaskAC('NewTask!', todolistId2)
	const endState = tasksReducer(startState, action)

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию

	expect(endState[todolistId2].length).toBe(3)
	expect(endState[todolistId2][2].title).toBe('NewTask!')
	expect(endState[todolistId2].length).toBe(3)
	expect(endState[todolistId2][2].id).toBeDefined()
	expect(endState[todolistId2][2].isDone).toBe(false)
})

test('correct task should be change status', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

	// 2. Действие
	const action = changeStatusAC('3', true, todolistId1)
	const endState = tasksReducer(startState, action)

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию

	expect(endState[todolistId1][2].id).toBe('3')
	expect(endState[todolistId1][2].isDone).toBe(true)
})

test('correct task should be change title', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

	// 2. Действие
	const action = updateTaskAC('3', 'NewTitleTask', todolistId1)
	const endState = tasksReducer(startState, action)

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию

	expect(endState[todolistId1][2].id).toBe('3')
	expect(endState[todolistId1][2].title).toBe('NewTitleTask')
})

test('new property with new array should be added when new todolist is added ', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

	// 2. Действие
	const todolistId = v1()
	const action = addTodolistAC('title no metter', todolistId)
	const endState = tasksReducer(startState, action)
	const keys = Object.keys(endState)
	const newKey = keys.find(k => k != todolistId1 && k != todolistId2)
	if (!newKey) {
		throw Error("new key should be added ")
	}
	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test('new property with new array should be added when new todolist is added ', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	// 1. Стартовый state
	const startState: TasksStateType = {
		[todolistId1]: [
			{ id: '1', title: 'HTML&CSS', isDone: true },
			{ id: '2', title: 'JS', isDone: true },
			{ id: '3', title: 'ReactJS', isDone: false },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	}

	// 2. Действие
	const action = removeTodolistAC(todolistId2)
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)

	// 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию

	expect(keys.length).toBe(1)
	expect(endState[todolistId2]).not.toBeDefined()


})