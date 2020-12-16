import './input.scss'
interface IInput {
  value?: string
  handleChangeInput: Function
  onKeyDown?: any
}

const Input = ({ value, handleChangeInput, onKeyDown }: IInput) => {
  return (<input
    placeholder='Add your todo...'
    value={value}
    onChange={(event: any) => handleChangeInput(event.target.value)}
    onKeyDown={onKeyDown}
  />)
}

export default Input