import { useState, useRef, useEffect } from 'react'
import Box from '../Box'
import './editbutton.scss'

interface IEditButton {
  onChange?: Function
}
const EditButton = ({ onChange }: IEditButton) => {

  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  const onSelect = (value: string) => {
    setShow(false)
    onChange && onChange(value)
  }

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShow(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return (
    <Box boxClass='box--edit'>
      <div className='edit-button--title can-click' onClick={() => setShow(!show)}>
        ...
      </div>
      {show && (<div className='content can-click'>
        <div onClick={() => onSelect('edit')} className='content-item'>
          Edit
        </div>
        <div onClick={() => onSelect('delete')} className='content-item text-red'>
          Delete
        </div>
      </div>)}
    </Box>
  )
}

export default EditButton