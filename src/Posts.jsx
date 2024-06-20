import { getPosts, baseUrl, deletePost, editPost, updateLikes } from "./api"
import { AdminContext, AuthContext, ToggleContext, UserContext } from "./context"
import { useContext, useState, useEffect } from "react"


const Posts = () => {
    const { user, setUser } = useContext(UserContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const { auth } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [deleteCheck, setDeleteCheck] = useState(false)
    const {universalToggle, setUniversalToggle} = useContext(ToggleContext)


    useEffect(() => {
        getPosts({auth})
        .then((response) => {
            setPosts(response.data)
            console.log("POSTS: ", posts)
        })
        .catch(error => console.log('DISPLAY POSTS ERROR: ', error))
    }, [toggle, universalToggle])



    const submitDeletePost = ({id}) => {
        if (deleteCheck === true && deleteId === id) {
            deletePost({auth, user, admin, id})
            .then(()=> setUniversalToggle(universalToggle => !universalToggle))
        }
        setDeleteCheck(deleteCheck => !deleteCheck)
    }


    const DeleteCheck = ({id}) => {
        if (deleteCheck === true && deleteId === id) {
            return (
                <p style={{ margin: '10px' }}>Are you sure you want to delete?</p>
            )
        }
    }


    const DeletePostButton = ({id}) => {
        if (admin === true) {
            return (
                <button style={{ margin: '10px', marginLeft: '5px', backgroundColor: "red"}} onClick={() => {submitDeletePost({id}); setDeleteId(id)}}
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
                <textarea style={{ height: '100px', width: '95%', margin: "10px" }} onChange={e => setEditMessage(e.target.value)}>{content}</textarea>
                <div>
                    <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setEditImage(e.target.files[0])} />
                    <button style={{ margin: '10px' }} onClick={() => {editPost({auth, user, admin, id, editMessage, editImage}).then(()=> {setUniversalToggle(universalToggle => !universalToggle)})}}>Submit Edits</button>
                </div>
            </div>
            )
        }
    }


    const Image = ({image}) => {
        if (image) {
            return (
                <div className="d-flex justify-content-center">
                    <img src={`${baseUrl}${image}`} style={{ borderStyle: "", margin: '2.5%', maxWidth: "95%", color: 'white'}} />
                </div>
            )
        }
    }


    const LikesButton = ({post, likesCount, postObject}) => {
        const [liked, setLiked] = useState(false)
        const [alreadyLiked, setAlreadyLiked] = useState(postObject.likes.includes(user) ? true : false)
        return (
            <div >
                <button style={{margin: "10px", backgroundColor: `${alreadyLiked && !liked || !alreadyLiked && liked ? "goldenrod" : ""}`}} onClick={() => {updateLikes({auth, post}).then(() => setLiked(liked => !liked))}} >Like</button>
                Likes: {liked && !alreadyLiked ? likesCount + 1 : (liked && alreadyLiked ? likesCount - 1 : likesCount)}
            </div>
        )
    }

    return (
        <div className="d-flex flex-wrap align-items-start">
            {posts && posts.map(post => {
                return (
                <div key={post.id} style={{maxWidth: '375px', margin: '10px', marginBottom: '25px', borderStyle: 'dashed', borderColor: 'goldenrod'}}>
                    <Image image={post.image} />
                    <p style ={{ margin: '10px'}}>{post.content}</p>
                    <LikesButton post={post.id} likesCount={post.likes_count} postObject={post}/>
                    <EditButton id={post.id}/>
                    <DeletePostButton id={post.id} />
                    <DeleteCheck id={post.id}/>
                    <EditPanel content={post.content} id={post.id} image={post.image} />
                </div>
            )})}
        </div>
        )
}

export default Posts