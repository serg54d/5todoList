import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

// type RemoveTodolistActionType2=ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
		todolistId: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
                 return state.filter(tl=>tl.id!==action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const todolistId = action.payload.todolistId
            const newTodolist: TodolistType = {id: todolistId, title: action.payload.title, filter: 'all'}
                   return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
                  return state.map(el=>el.id===action.payload.id ? {...el,title:action.payload.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {

            return state.map(el=>el.id===action.payload.id ? {...el,filter:action.payload.filter} :el)
        }

        default:
            return state
    }
}

export const removeTodolistAC=(id:string)=>{
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        },
    } as const
}
export const addTodolistAC=(title:string, todolistId: string)=> {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
			todolistId
        },
    } as const
}
export const updateTodolistAC=(id:string,title:string)=> {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        },
    } as const
}

export const changeFilterAC=(id:string,filter: FilterValuesType)=>{
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        },
    }as const
}