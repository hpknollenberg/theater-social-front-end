import { getPosts, baseUrl, deletePost, editPost } from "./api"
import { AuthContext, UserContext } from "./context"
import { useContext, useState, useEffect } from "react"


const Posts = () => {
    const { user, setUser } = useContext(UserContext)
    const { auth } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [edit, setEdit] = useState(false)
    


    useEffect(() => {
        getPosts({auth})
        .then((response) => {
            setPosts(response.data)
            console.log("POSTS: ", posts)
        })
        .catch(error => console.log('DISPLAY POSTS ERROR: ', error))
    }, [])


    const Delete = ({id}) => {
        if (user === 1) {
            return (
                <button style={{ margin: '10px', marginLeft: '5px' }}
                    onClick={() => {deletePost({auth, user, id})}}
                >Delete</button>
            )
        }
    }


    const EditButton = () => {
        if (user === 1 ) {
            return (
                <button style={{ margin: '10px', marginRight: '5px' }}
                    onClick={() => setEdit(!edit)}
                >Edit</button>
            )
        }
    }


    const EditPanel = ({content, id, image}) => {
        const [editMessage, setEditMessage] = useState(content)
        const [editImage, setEditImage] = useState("")


        if (user === 1 && edit === true) {
            return (
            <div>
                <textarea style={{ height: '100px', width: '375px', margin: "10px" }} onChange={e => setEditMessage(e.target.value)}>{content}</textarea>
                <div>
                    <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setEditImage(e.target.files[0])} />
                    <button style={{ margin: '10px' }} onClick={() => {editPost({auth, user, id, editMessage, editImage})}}>Submit Edits</button>
                </div>
            </div>
            )
        }
    }


    const Image = ({image}) => {
        if (image) {
            return (
                <img src={`${baseUrl}${image}`} style={{ borderStyle: "", margin: '2.5%', maxWidth: "95%", color: 'white'}} />
            )
        }
    }


    return (
        <div>
            {posts && posts.map(post => (
                <div key={post.id} style={{ maxWidth: '400px', margin: '10px', marginBottom: '25px', borderStyle: 'solid', color: 'white'}}>
                    <Image image={post.image} />
                    <p style ={{ margin: '10px' }}>{post.content}</p>
                    <EditButton />
                    <Delete id={post.id} />
                    <EditPanel content={post.content} id={post.id} image={post.image} />
                </div>
            ))}
        </div>
        )
}

export default Posts