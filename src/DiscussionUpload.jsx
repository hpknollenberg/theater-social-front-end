import { useContext, useState } from "react"
import { AdminContext, AuthContext, UserContext } from "./context"
import { createDiscussion } from "./api"


const DiscussionUpload = () => {
    const { auth } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const { user, setUser } = useContext(UserContext)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")


    const submitDiscussion = () => {
        createDiscussion({auth, user, admin, title, description, image})
    }


    if (admin === true) {
        return (
            <div>
                <div style={{ margin: "10px" }}>
                    Title: 
                    <input type="text" style={{ margin: "10px" }} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div style= {{ margin: "10px", display: "flex", alignItems: "center"}} >
                    Description:
                    <textarea style={{ margin: "10px", width: "300px" }} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setImage(e.target.files[0])} />
                </div>
                <button style={{ margin: '10px' }} onClick={() => submitDiscussion()}>Submit Discussion</button>
                <hr></hr>
            </div>
        )
    }

    
}

export default DiscussionUpload