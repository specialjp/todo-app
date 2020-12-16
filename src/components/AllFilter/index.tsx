import { useState, useEffect, useRef } from 'react'
import Box from '../Box'
import './allfilter.scss'

const list = [
  'All',
  'Done',
  'Undone'
]

interface IAllFilter {
  onChange: Function
}
const AllFilter = ({ onChange }: IAllFilter) => {

  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState('All')

  const onSelect = (value: string) => {
    setShow(false)
    setSelected(value)
    onChange(value)
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
    <Box boxClass='box--input'>
      <div ref={ref} className='filter-container'>
        <div className='all-filter--button' onClick={() => setShow(!show)}>
          {selected}
        </div>
        {show && (<div className='content'>
          {
            list.map((item: string, index: number) => {
              return (<div key={index} onClick={() => onSelect(item)} className='content-item'>
                {item}
              </div>)
            })
          }
        </div>)}
      </div>
    </Box>
  )
}

export default AllFilter