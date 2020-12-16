import { ReactNode } from 'react'
import './box.scss'

interface IBoxProps {
  children?: ReactNode
  boxClass?: string
}

const Box = ({ children, boxClass }: IBoxProps) => {
  return (<div
    className={`box ${boxClass}`}
  >
    {children}
  </div>)
}

export default Box