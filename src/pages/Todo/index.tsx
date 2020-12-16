import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Box from '../../components/Box'
import Progress from '../../components/Progress'
import ItemList from '../../components/ItemList'
import Input from '../../components/Input'
import AllFilter from '../../components/AllFilter'
import { AppContext, ADD_TODO, ADD_ALL_TODO } from 'context/app'

const TodoPage = () => {
  const { state, dispatch } = useContext(AppContext)
  const [newTodoText, setNewTodoText] = useState('')
  const [todoList, setTodoList] = useState([])
  const [filterStatus, setFilterStatus] = useState('All')

  const handleFilter = (value: any) => {
    setFilterStatus(value)
  }

  const fetchData = async () => {
    const result = await axios('http://localhost:3001/todos')
    return result.data
  }

  useEffect(() => {

    (async () => {
      try {
        const result = await fetchData()
        dispatch({ type: ADD_ALL_TODO, payload: result })
        setTodoList(result)
      } catch (e) {
        alert(e)
        console.error(e)
      }
    })()

  }, [])

  const handleChangeInput = (value: string) => {
    setNewTodoText(value)
  }

  const onSubmitNewTodo = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      try {
        const result = await axios.post('http://localhost:3001/todos', { title: newTodoText, completed: false })
        dispatch({ type: ADD_TODO, payload: result.data })
        setNewTodoText('')
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    if (filterStatus === 'All') {
      setTodoList(state.todo)
    } else if (filterStatus === 'Done') {
      const result = state.todo.filter((item: any) => item.completed)
      setTodoList(result)
    } else {
      const result = state.todo.filter((item: any) => !item.completed)
      setTodoList(result)
    }

  }, [filterStatus])

  return (<Box boxClass='box-container'>
    <Progress />
    <div className='d-flex justify-content-between'>
      <div className='headline'>
        Tasks
      </div>
      <AllFilter onChange={handleFilter} />
    </div>
    <ItemList todo={todoList} />
    <Box boxClass='box--input'>
      <Input handleChangeInput={handleChangeInput} value={newTodoText} onKeyDown={onSubmitNewTodo} />
    </Box>
  </Box>)
}
export default TodoPage