import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [quantity, setQuantity] = useState(1);
  const [ item, setItem ] = useState('');
  const [itemList, setItemList] = useState([]);
  const [packedItems, setPackedItems] = useState([]);

  function packedItemHandler() {
    if(itemList.length > 0) {
      const itemsToBePacked = itemList.filter((item) => item.packedStatus === true);
      setPackedItems(itemsToBePacked)
    }
  }

  useEffect(() => {
      packedItemHandler()
    }, [itemList]
  )
  
  console.log(packedItems.length)

  return (
    <div className="App">
      <Header />
      <EnteringItem quantity = {quantity} setQuantity = {setQuantity} item = {item} setItem= {setItem} itemList = {itemList} setItemList={setItemList}/>
      <div className='' style={{height: '100vw'}}>
        <Content itemList = {itemList} setItemList={setItemList} setPackedItems={setPackedItems}/>
      </div>
      <Stats itemList = {itemList} packedItems={packedItems} />
    </div>
  );
}

function Header() {
  return(
    <div className='header'>
      <h1>FAR AWAY</h1>
    </div>
  )
  
}

function addItemsHandler(quantity, item, setItemList, itemList, setItem) {
  if (!item) {
    return alert("Item must not be empty")
  } else{
    setItemList([...itemList, {
      itemQuanity: quantity,
      itemName: item,
      packedStatus: false
    }])
    console.log(quantity, item, itemList);
    setItem("")
  }
}

function EnteringItem ({ quantity, setQuantity, item, setItem, itemList, setItemList }) {
  return (
      <div className='enter-item'>
        <h3>What do yo need for your trip?</h3>
        <select onChange={(e) => setQuantity(parseInt(e.target.value))} className='quantity-selection'>
          {
            Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], (x) => {
             return <option>{x}</option>
            })
          }
        </select>
        <input type='text' onChange={(e) => {
          setItem(e.target.value)
        }} value={item} className='text_value'/>
        <button onClick={ () => addItemsHandler(quantity, item, setItemList, itemList, setItem) } className='addBtn'>ADD</button>
      </div>
  )
}

function removeItemHandler(itemList, setItemList, indexNum) {
  let itemToBeRemoved = [...itemList];
  itemToBeRemoved.splice(indexNum, 1);
  setItemList([...itemToBeRemoved])
}

function Content({itemList, setItemList, setPackedItems}) {
  
  return (
      <div className='items-div'>
        <div className='item-container'>
        {itemList.map((item, idx) => {
          return(<div className='item-div' style={{ textDecoration: item.packedStatus ? 'line-through' : 'none' }}>
            <CheckBox  idx= {idx} itemList= {itemList} setItemList= {setItemList} setPackedItems={setPackedItems}/>
            <span>{item.itemQuanity}</span>
            <span>{item.itemName}</span>
            <button className='removeBtn' onClick={ () => removeItemHandler( itemList, setItemList, idx) }>X</button>
          </div>)
        })}
        </div>
        <PackingList />
      </div>
  )
}

function CheckBox({ idx, itemList, setItemList, setPackedItems }) {
  const [ checkBoxState, setCheckBoxState ] = useState(true);
  
  
  return (
    <input type='checkbox' onChange={() =>  {
      if(checkBoxState) {
        const packedItemState = [...itemList]
        packedItemState[idx].packedStatus = checkBoxState
        setItemList(packedItemState);
        setCheckBoxState(false);
      } else {
        const packedItemState = [...itemList]
        packedItemState[idx].packedStatus = checkBoxState
        setItemList(packedItemState);
        setCheckBoxState(true);
      }      
    }}/>
  )
}

function PackingList() {
  return (
    <div className='sorting_deletion-div'>
      <div className='clearDiv'>
        <p>Clear list</p>
      </div>
        <select className='sortingSelection'>
          <option>Sort by input order</option>
          <option>Sort by description</option>
          <option></option>
        </select>
    </div>
  )
}

function Stats ({ itemList, packedItems }) {
  return(
    <p className='stats'>You have {itemList.length} of items on your list and you have packed {packedItems.length} of them</p>
  )
}


export default App;
