import Box from '../Box'
import './savebutton.scss'

interface ISaveButton {
  onChange: Function
}
const SaveButton = ({ onChange }: ISaveButton) => {
  return (<Box boxClass='box--save'>
    <div className='can-click' onClick={() => onChange()}>
      Save
    </div>
  </Box>
  )
}

export default SaveButton