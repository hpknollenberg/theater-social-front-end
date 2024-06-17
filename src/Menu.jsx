import Tabs from "./Tabs"
import { useEffect, useState } from "react"
import { getMenu } from "./api"


const Menu = () => {  
  const [menu, setMenu] = useState([])
  const [drinkMenu, setDrinkMenu] = useState([])

  useEffect(() => {
    getMenu()
    .then((response) => {
      setMenu(response.data.menu)
      setDrinkMenu(response.data.drink_menu)
    })
  }, [])

  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="menu"/>
      </div>
      <div>
        {menu && menu.map(item => (
          <div style={{ margin: '10px'}}>
            <h3>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h3>
            <p>Small: ${item.small}</p>
            <p>Medium: ${item.medium}</p>
            <p>Large: ${item.large}</p>
            <hr />
          </div>
        )
        )}
      </div>
      <div style={{ margin: "10px"}}>
        <h3>Beer</h3>
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