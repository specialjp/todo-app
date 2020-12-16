import { useEffect, useState, useContext } from 'react'
import { AppContext } from 'context/app'
import Box from '../Box'
import './progress.scss'

type ObjProgress = {
  id: number;
  title: string;
  completed: boolean;
}

const Progress = () => {
  const { state } = useContext(AppContext)
  const [todoComplete, setTodoComplete] = useState<ObjProgress[]>([])
  const [perChg, setPerChg] = useState(0)

  useEffect(() => {
    const result = state.todo.filter((item: ObjProgress) => item.completed)
    const chg = (result.length / state.todo.length) * 100
    setTodoComplete(result)
    setPerChg(chg)
  }, [state])

  return (<Box boxClass='box--progress'>
    <div className='text-white title--progress'>Progress</div>
    <div className="meter">
      <span style={{ width: `${perChg}%` }}></span>
    </div>
    <div className='no-completed'>
      {
        `${todoComplete.length} Completed`
      }
    </div>

  </Box>)

}

export default Progress