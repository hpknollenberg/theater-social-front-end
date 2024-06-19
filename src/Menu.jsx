import Tabs from "./Tabs"
import { useContext, useEffect, useState } from "react"
import { deleteMenuItem, editMenuItem, getMenuItems } from "./api"
import { AdminContext, AuthContext } from "./context"
import MenuUpload from "./MenuUpload"

const Menu = () => {  
  const [menu, setMenu] = useState([])
  const [drinkMenu, setDrinkMenu] = useState([])
  const { auth } = useContext(AuthContext)
  const { admin, setAdmin } = useContext(AdminContext)
  const [categories, setCategories] = useState([])
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  const [editCheck, setEditCheck] = useState(false)
  const [editId, setEditId] = useState(0)
  const [toggle, setToggle] = useState(false)
  
  
  
  useEffect(() => {
    getMenuItems({ auth })
    .then((response) => {
      setMenu(response.data)
      let categoriesTemp = []
      response.data.map((item) => {
        if (!categoriesTemp.includes(item.category) && !categories.includes(item.category)) {
          categoriesTemp.push(item.category)
          setCategories((categories) => [...categories, item.category])
        }
      })
    })
    .then(console.log(categories))
  }, [toggle])


  const deleteSubmit = ({id}) => {
    if (deleteCheck === true && id === deleteId) {
      deleteMenuItem({auth, admin, deleteId})
      setToggle(!toggle)
    }
    setDeleteCheck(deleteCheck => !deleteCheck)
  }


  const DeleteCheck = ({id}) => {
    if (deleteCheck === true && id === deleteId) {
      return (
        <p>Are you sure you want to delete menu item?</p>
      )
    }
  }

  const DeleteButton = ({id}) => {
    if (admin === true) {
      return (
          <button style={{backgroundColor: 'red', marginLeft: '10px'}} onClick={() => {deleteSubmit({id}); setDeleteId(id)}}>Delete</button>
      )
    }
  }


  const EditButton = ({id}) => {
    if (admin === true) {
      return (
        <button style={{ marginLeft: '10px'}} onClick={() => {setEditCheck(editCheck => !editCheck); setEditId(id)}}>Edit</button>
      )
    }
  }


  const EditPanel = ({id}) => {
    const [editName, setEditName] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editPrice, setEditPrice] = useState("")

    if (admin === true && editCheck === true && editId === id) {
      return (
        <div>
          <p style={{ margin: '10px' }} >Category: <input style={{ marginLeft: '5px'}} onChange={(e) => setEditCategory(e.target.value)}></input></p>
          <p style={{ margin: '10px' }}>Name: <input style={{ marginLeft: '5px'}} onChange={(e) => setEditName(e.target.value)}></input></p>
          <p style={{ margin: '10px' }}>Price: <input style={{ marginLeft: '5px'}} onChange={(e) => setEditPrice(e.target.value)}></input></p>
          <button style={{ margin: '10px' }} onClick={() => {editMenuItem({auth, admin, editCategory, editName, editPrice, editId}); setToggle(!toggle)}}>Submit Edit</button>
          <hr />
        </div>
      )
    }
  }


  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="menu"/>
      </div>
      <MenuUpload />
      <div style={{ maxWidth: "1000px" }} className="d-flex flex-wrap">
        {categories && categories.map((category, index) => {
          return (
            <div style={{margin: '10px', marginRight: '50px' }}key={index}>
              <h3 style={{ margin: '10px' }}>{category}</h3>
              <div style={{ margin: '10px' }}>
              {menu && menu.filter(x => x.category === category).map(item => (
                <div key={item.id} style={{ margin: '10px'}}>
                  {item.name} - ${item.price}
                  <EditButton id={item.id}/>
                  <DeleteButton id={item.id}/>
                  <DeleteCheck id={item.id}/>
                  <EditPanel id={item.id}/>
                </div>
                ))}
              </div>
              <hr/>
            </div>
          )
        })}     
      </div>
    </div>
  )
}


export default Menu