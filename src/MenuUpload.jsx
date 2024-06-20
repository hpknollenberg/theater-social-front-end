import { useContext, useState } from "react"
import { AdminContext, AuthContext, ToggleContext } from "./context"
import { createMenuItem } from "./api"

const MenuUpload = () => {
    const {admin, setAdmin} = useContext(AdminContext)
    const { auth } = useContext(AuthContext)
    const [itemCategory, setItemCategory] = useState("")
    const [itemName, setItemName] = useState("")
    const [itemPrice, setItemPrice] = useState(0)
    const {universalToggle, setUniversalToggle} = useContext(ToggleContext)



    const submitMenuItem = () => {
        createMenuItem({auth, admin, itemCategory, itemName, itemPrice})
        .then(() => {
            setUniversalToggle(universalToggle => !universalToggle)
        })
    }


    if (admin === true) {
        return (
            <div>   
                <p style={{ margin: '10px' }} >Category: <input style={{ marginLeft: '5px'}} onChange={(e) => setItemCategory(e.target.value)}></input></p>
                <p style={{ margin: '10px' }}>Name: <input style={{ marginLeft: '5px'}} onChange={(e) => setItemName(e.target.value)}></input></p>
                <p style={{ margin: '10px' }}>Price: <input style={{ marginLeft: '5px'}} onChange={(e) => setItemPrice(e.target.value)}></input></p>
                <button style={{ margin: '10px' }} onClick={() => {submitMenuItem()}}>Submit Menu Item</button>
                <hr />
            </div>
        )
    }
    
}

export default MenuUpload