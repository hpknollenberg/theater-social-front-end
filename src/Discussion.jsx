import Tabs from "./Tabs"
import DiscussionUpload from "./DiscussionUpload"
import { useContext, useEffect, useRef, useState } from "react"
import { AdminContext, AuthContext, UserContext } from "./context"
import { baseUrl, getDiscussions, createComment, getComments, updateCommentLikes, deleteDiscussion } from "./api"

const Discussion = () => {
    const { auth } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const [discussions, setDiscussions] = useState([])
    const [open, setOpen] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
    const [deleteCheck, setDeleteCheck] = useState(false)
    const [discussionToggle, setDiscussionToggle] = useState(false)
    const [openId, setOpenId] = useState(0)
    const [deleteId, setDeleteId] = useState(0)
    
    useEffect(() => {
        getDiscussions({auth})
        .then(response => {
            setDiscussions(response.data)
            console.log(response.data)
        })
    }, [discussionToggle])


    useEffect(() => {
        getComments({auth})
        .then(response => {
            setComments(response.data)
            console.log(response.data)
        })
    }, [toggle])


    const submitDeleteDiscussion = ({discussion}) => {
        if (deleteCheck === true && deleteId === discussion) {
            deleteDiscussion({auth, user, admin, discussion})
            setDiscussionToggle(discussionToggle => !discussionToggle)
        }
        setDeleteCheck(deleteCheck => !deleteCheck)
        
    }

    
    const DeleteCheck = ({id}) => {
        if (deleteCheck === true && deleteId === id) {
            return (
                <p>Are you sure you want to delete?</p>
            )
        }
    }


    const DeleteDiscussionButton = ({discussion}) => {
        if (admin === true) {
            return (
                <div style={{ margin: '10px' }}>   
                    <button style={{backgroundColor: 'red' }} onClick={() => {submitDeleteDiscussion({discussion}); setDeleteId(discussion)}}>Delete Discussion</button>
                    <DeleteCheck id={discussion}/>
                </div>
            )
        }
    }


    const submitComment = ({discussion, content}) => {
        createComment({ auth, user, content, discussion })
        .then(() => setToggle(toggle => !toggle))
    }


    const submitLike = (comment) => {
        updateCommentLikes({ auth, comment })
        .then(() => setToggle(toggle => !toggle))
    }


    const CommentsUpload = ({discussion}) => {
        const [content, setContent] = useState("")

        return (
            <div style={{ margin: '10px' }}>
                <textarea style={{ width: '300px', height: '100px'}} onChange={e => setContent(e.target.value)}></textarea>
                <button style={{ margin: '10px'}} onClick={() => submitComment({discussion, content})}>Send Message</button>
            </div>
        )
    }


    const Comments = ({discussion}) => {
        if (open === true && discussion === openId) {
            return (
                <div>
                    <div style={{ display: "flex", flexDirection: 'column-reverse', margin: '10px', borderStyle: 'solid', color: 'goldenrod', padding: '10px', maxHeight: '300px', overflowY: "scroll" }}>
                        {comments && comments.filter(x => x.discussion.id === discussion).map(comment => {
                            return (
                                <div key={comment.id}>
                                    <h6>{comment.author.first_name}</h6>
                                    <p style={{color: 'white'}}>{comment.content}</p>
                                    <p>Likes: {comment.likes_count}</p>
                                    <button onClick={() => submitLike(comment.id)}>Like</button>
                                    <hr></hr>
                                </div>
                            )
                        })}
                    </div>
                    <CommentsUpload discussion={discussion}/>
                </div>
            )
        }
        
    }




    const DiscussionPosts = () => {

        return (
            <div>
                {discussions && discussions.map((discussion) => {
                    return (
                        <div style={{ margin: '10px', marginBottom: "25px", borderStyle: 'solid', padding: '10px'}}>
                            <div style={{ display: "flex", alignItems: "center", margin: '10px'}}>
                                <img src={`${baseUrl}${discussion.image}`} style={{maxHeight: '200px'}} />
                                <div style={{ margin: '10px' }}>
                                    <h5>{discussion.name}</h5>
                                    <p>{discussion.description}</p>
                                </div>
                            </div>
                            <button style={{ margin: '10px'}} onClick={() => {setOpen(open => !open); setOpenId(discussion.id)}}>Open Discussion</button>
                            <Comments discussion={discussion.id}/>
                            <DeleteDiscussionButton discussion={discussion.id}/>
                        </div>
                    )
                })}
            </div>
        )
    }


    return (
        <div className='' >
            <div className="">
                <h1 className="p-5">The Kentucky Theater</h1>
                <Tabs activeTab="discussion"/>
            </div>
            <div>
                <DiscussionUpload />
                <DiscussionPosts />
            </div>
        </div>
    )
}

export default Discussion