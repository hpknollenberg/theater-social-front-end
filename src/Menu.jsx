import Tabs from "./Tabs"
import { useContext, useEffect, useState } from "react"
import { deleteMenuItem, getMenuItems } from "./api"
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
  
  
  useEffect(() => {
    getMenuItems({ auth })
    .then((response) => {
      setMenu(response.data)
      let categoriesTemp = []
      response.data.map((item) => {
        if (!categoriesTemp.includes(item.category)) {
          categoriesTemp.push(item.category)
          setCategories((categories) => [...categories, item.category])
        }
      })
    })
    .then(console.log(categories))
  }, [])


  const deleteSubmit = ({id}) => {
    if (deleteCheck === true && id === deleteId) {
      deleteMenuItem({auth, admin, deleteId})
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


  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="menu"/>
      </div>
      <MenuUpload />
      <div>
        {categories && categories.map((category, index) => {
          return (
            <div key={index}>
              <h3 style={{ margin: '10px' }}>{category}</h3>
              <div style={{ margin: '10px' }}>
              {menu && menu.filter(x => x.category === category).map(item => (
                <div key={item.id} style={{ margin: '10px'}}>
                  {item.name} - ${item.price}
                  <DeleteButton id={item.id}/>
                  <DeleteCheck id={item.id}/>
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