import { createPost } from "./api"
import { AuthContext, UserContext } from "./context"
import { useContext, useState } from "react"


const PostUpload = () => {
    const { user, setUser } = useContext(UserContext)
    const { auth } = useContext(AuthContext)
    const [postMessage, setPostMessage] = useState([])
    const [postImage, setPostImage] = useState([])


    const submitPost = () => {
        createPost({
            auth,
            user,
            postMessage,
            postImage
        })
    }


    if (user === 1) {
        return (
            <div>
                <div>
                    <textarea style={{ height: '100px', width: '300px', margin: "10px" }} onChange={e => setPostMessage(e.target.value)} ></textarea>
                </div>
                <div>
                    <input style={{ margin: '10px', width: '300px' }} type="file" accept='image/*' onChange={e => setPostImage(e.target.files[0])} />
                    <button style={{ margin: '10px' }} onClick={() => {submitPost()}}>Submit Post</button>
                </div>
            </div>
        )
    }
}

export default PostUpload