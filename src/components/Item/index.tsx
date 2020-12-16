import React, { useState, useContext } from 'react'
import { AppContext, UPDATE_TODO, DELETE_TODO } from 'context/app'
import axios from 'axios'
import Box from '../Box'
import EditButton from '../EditButton'
import SaveButton from '../SaveButton'
import Input from '../Input'
import './item.scss'

type ObjItem = {
  id: number;
  title: string;
  completed: boolean;
}

interface IObjItem {
  data: ObjItem
}


const Item = ({ data }: IObjItem) => {
  const { dispatch } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [text, setText] = useState(data.title || '')
  const [isChecked, setIsCheck] = useState(data.completed)

  const handleChange = async (value: string) => {
    if (value === 'edit') {
      setIsEdit(true)
    } else {
      try {
        await axios.delete(`http://localhost:3001/todos/${data.id}`)
        dispatch({ type: DELETE_TODO, payload: data.id })
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleSave = async () => {
    setIsEdit(false)
    try {
      const result = await axios.put(`http://localhost:3001/todos/${data.id}`, { title: text, completed: isChecked })
      dispatch({ type: UPDATE_TODO, payload: result.data })
    } catch (e) {
      console.error(e)
    }
  }

  const handleChangeCheckbox = async (value: boolean) => {
    setIsCheck(value)
    try {
      const result = await axios.put(`http://localhost:3001/todos/${data.id}`, { title: text, completed: value })
      dispatch({ type: UPDATE_TODO, payload: result.data })
    } catch (e) {
      console.error(e)
    }
  }

  const handleChangeInput = (value: string) => {
    setText(value)
  }

  return (<Box boxClass='box--input d-flex justify-content-between'>
    {
      isEdit ? (<Input value={text} handleChangeInput={handleChangeInput} />) : (<label className="container">
        <input
          type='checkbox'
          onChange={(event: any) => handleChangeCheckbox(event.target.checked)}
          checked={isChecked}
        />
        <div className='checkbox-text'>{text}</div>
        <span className='checkmark'></span>
      </label>)
    }
    {
      isEdit ? (<SaveButton onChange={handleSave} />) : (<EditButton onChange={handleChange} />)
    }
  </Box>)

}

export default React.memo(Item)