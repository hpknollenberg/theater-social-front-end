import { getPosts, baseUrl, deletePost, editPost, updateLikes } from "./api"
import { AdminContext, AuthContext, UserContext } from "./context"
import { useContext, useState, useEffect } from "react"


const Posts = () => {
    const { user, setUser } = useContext(UserContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const { auth } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(0)
    const [toggle, setToggle] = useState(false)
    


    useEffect(() => {
        getPosts({auth})
        .then((response) => {
            setPosts(response.data)
            console.log("POSTS: ", posts)
        })
        .catch(error => console.log('DISPLAY POSTS ERROR: ', error))
    }, [toggle])


    const Delete = ({id}) => {
        if (admin === true) {
            return (
                <button style={{ margin: '10px', marginLeft: '5px' }}
                    onClick={() => {deletePost({auth, user, admin, id})}}
                >Delete</button>
            )
        }
    }


    const EditButton = ({id}) => {
        if (admin === true ) {
            return (
                <button style={{ margin: '10px', marginRight: '5px' }}
                    onClick={() => {
                        setEdit(!edit)
                        setEditId(id)
                    }}
                >Edit</button>
            )
        }
    }


    const EditPanel = ({content, id, image}) => {
        const [editMessage, setEditMessage] = useState(content)
        const [editImage, setEditImage] = useState("")


        if (admin === true && edit === true && id === editId) {
            return (
            <div>
                <textarea style={{ height: '100px', width: '375px', margin: "10px" }} onChange={e => setEditMessage(e.target.value)}>{content}</textarea>
                <div>
                    <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setEditImage(e.target.files[0])} />
                    <button style={{ margin: '10px' }} onClick={() => {editPost({auth, user, admin, id, editMessage, editImage})}}>Submit Edits</button>
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


    const LikesButton = ({post, likesCount}) => {
        return (
            <div>
                <button style={{margin: "10px"}} onClick={() => {updateLikes({auth, post}).then(() => setToggle(toggle => !toggle))}}>Like</button>
                Likes: {likesCount}
            </div>
        )
    }

    return (
        <div>
            {posts && posts.map(post => (
                <div key={post.id} style={{ maxWidth: '400px', margin: '10px', marginBottom: '25px', borderStyle: 'solid', color: 'white'}}>
                    <Image image={post.image} />
                    <p style ={{ margin: '10px' }}>{post.content}</p>
                    <LikesButton post={post.id} likesCount={post.likes_count}/>
                    <EditButton id={post.id}/>
                    <Delete id={post.id} />
                    <EditPanel content={post.content} id={post.id} image={post.image} />
                </div>
            ))}
        </div>
        )
}

export default Posts