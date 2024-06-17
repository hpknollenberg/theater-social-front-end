import Tabs from "./Tabs"
import { useContext, useEffect, useState } from "react"
import { getMenuItems } from "./api"
import { AuthContext } from "./context"

const Menu = () => {  
  const [menu, setMenu] = useState([])
  const [drinkMenu, setDrinkMenu] = useState([])
  const { auth } = useContext(AuthContext)
  const [categories, setCategories] = useState([])
  let categoriesTemp = []

  useEffect(() => {
    getMenuItems({ auth })
    .then((response) => {
      setMenu(response.data)
      response.data.map((item) => {
        if (!categoriesTemp.includes(item.category)) {
          categoriesTemp.push(item.category)
          setCategories((categories) => [...categories, item.category])
        }
      })
    })
    .then(console.log(categories))
  }, [])


  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="menu"/>
      </div>
      <div>
        {categories && categories.map((category, index) => {
          return (
            <div key={index}>
              <h3 style={{ margin: '10px' }}>{category}</h3>
              <div style={{ margin: '10px' }}>
              {menu && menu.filter(x => x.category === category).map(item => (
                <div key={item.id} style={{ margin: '10px'}}>
                  {item.name} - ${item.price}
                </div>
                ))}
              </div>
            </div>
          )
        })}     
        </div>
      <div style={{ margin: "10px"}}>
        {drinkMenu && drinkMenu.map(drink => (
          <div>
            {drink.name} - ${drink.price}
          </div>
        ))}
      </div>
    </div>
  )
}


export default Menu