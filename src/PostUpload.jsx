import { createPost } from "./api"
import { AdminContext, AuthContext, UserContext } from "./context"
import { useContext, useState } from "react"


const PostUpload = () => {
    const { user, setUser } = useContext(UserContext)
    const { auth } = useContext(AuthContext)
    const {admin, setAdmin } = useContext(AdminContext)
    const [postMessage, setPostMessage] = useState("")
    const [postImage, setPostImage] = useState("")


    const submitPost = () => {
        createPost({
            auth,
            user,
            admin,
            postMessage,
            postImage
        })
    }


    if (admin === true) {
        return (
            <div>
                <div>
                    <textarea style={{ height: '100px', width: '375px', margin: "10px" }} onChange={e => setPostMessage(e.target.value)} ></textarea>
                </div>
                <div>
                    <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setPostImage(e.target.files[0])} />
                    <button style={{ margin: '10px' }} onClick={() => {submitPost()}}>Submit Post</button>
                </div>
                <hr />
            </div>
        )
    }
}

export default PostUpload