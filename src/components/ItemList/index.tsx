import Item from '../Item'

type ObjItem = {
  id: number;
  title: string;
  completed: boolean;
}

interface IItem {
  todo: ObjItem[]
}

const ItemList = ({ todo }: IItem) => {
  return <div>
    {todo.map((e: ObjItem) => <Item data={e} key={e.id} />)}
  </div>

}

export default ItemList