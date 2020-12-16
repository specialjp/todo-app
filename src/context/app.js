import React, { useReducer } from 'react'
export const AppContext = React.createContext()

export const ADD_TODO = 'ADD_TODO'
export const ADD_ALL_TODO = 'ADD_ALL_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'

const initialState = {
  todo: []
}

const reducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'ADD_ALL_TODO':
      return {
        ...state,
        todo: payload
      }
    case 'ADD_TODO':
      const todo = state.todo
      todo.push(payload)
      return {
        ...state,
        todo: todo
      }
    case 'UPDATE_TODO':
      const updateResult = state.todo.map(item => {
        if(payload.id !== item.id) {
          return {
            ...item
          }
        } else {
          return {
            ...item,
            ...payload
          }
        }
      })
      return {
        ...state,
        todo: updateResult
      }
    case 'DELETE_TODO':
      const deleteResult = state.todo.filter((item) => item.id !== payload);
      return {
        ...state,
        todo: deleteResult
      }
    default:
      return state
  }
}

export const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
}
