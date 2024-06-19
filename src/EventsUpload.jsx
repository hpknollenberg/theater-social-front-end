import { useContext, useState } from "react"
import { AdminContext, AuthContext } from "./context"
import { createEvent } from "./api"


const EventsUpload = () => {
    const {admin, setAdmin} = useContext(AdminContext)
    const {auth} = useContext(AuthContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [image, setImage] = useState("")


    const submitEvent = () => {
        createEvent({
            auth,
            admin,
            title,
            description,
            date,
            time,
            image
        })
        .then(response => console.log(response))
    }

    if (admin === true) {
        return (
            <div>
                <p style={{margin: '10px'}}>Title: <input style={{marginLeft: '5px' }} onChange={e => setTitle(e.target.value)}/></p>
                <p style={{margin: '10px'}}>Description: <textarea style={{ height: '100px', width: '375px', margin: "10px", verticalAlign: "top" }} onChange={e => setDescription(e.target.value)}></textarea></p>
                <p style={{margin: '10px'}}>Date: <input placeholder="YYYY-MM-DD" style={{marginLeft: '5px' }} onChange={e => setDate(e.target.value)}/></p>
                <p style={{margin: '10px'}}>Time: <input placeholder="H:mm AM/PM" style={{marginLeft: '5px' }} onChange={e => setTime(e.target.value)}/></p>
                <input style={{ margin: '10px' }} type="file" accept='image/*' onChange={e => setImage(e.target.files[0])}/>
                <button onClick={submitEvent}>Submit Event</button>
                <hr/>
            </div>
        )
    }  
}

export default EventsUpload