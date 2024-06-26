import Tabs from "./Tabs"
import DiscussionUpload from "./DiscussionUpload"
import { useContext, useEffect, useRef, useState } from "react"
import { AdminContext, AuthContext, ToggleContext, UserContext } from "./context"
import { baseUrl, getDiscussions, createComment, getComments, updateCommentLikes, deleteDiscussion, deleteComment } from "./api"


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
    
    const {universalToggle, setUniversalToggle} = useContext(ToggleContext)


    useEffect(() => {
        getDiscussions({auth})
        .then(response => {
            setDiscussions(response.data)
        })
    }, [discussionToggle, universalToggle])


    useEffect(() => {
        getComments({auth})
        .then(response => {
            setComments(response.data)
        })
    }, [toggle])



    const submitDeleteDiscussion = ({discussion}) => {
        if (deleteCheck === true && deleteId === discussion) {
            deleteDiscussion({auth, user, admin, discussion})
            .then(() => setDiscussionToggle(discussionToggle => !discussionToggle))
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


    const submitDeleteComment = ({comment, deleteCommentId, deleteCommentCheck, setDeleteCommentCheck}) => {
        if (deleteCommentCheck === true && deleteCommentId === comment) {
            deleteComment({auth, user, comment})
            .then(() => setToggle(toggle => !toggle))
        }
        setDeleteCommentCheck(deleteCommentCheck => !deleteCommentCheck)
        
    }


    const DeleteCommentCheck = ({comment, deleteCommentCheck, deleteCommentId}) => {
        if (deleteCommentCheck === true && deleteCommentId === comment) {
            return (
                <p>Are you sure you want to delete this comment?</p>
            )
        }
    }


    const DeleteCommentButton = ({comment, author}) => {
        const [deleteCommentId, setDeleteCommentId] = useState(0)
        const [deleteCommentCheck, setDeleteCommentCheck] = useState(false)

        if (admin === true || user === author) {
            return (
                <div style={{ marginTop: '10px' }}>   
                    <button style={{backgroundColor: 'red' }} onClick={() => {submitDeleteComment({comment, deleteCommentId, deleteCommentCheck, setDeleteCommentCheck}); setDeleteCommentId(comment)}}>Delete Comment</button>
                    <DeleteCommentCheck comment={comment} deleteCommentCheck={deleteCommentCheck} deleteCommentId={deleteCommentId}/>
                </div>
            )
        }
    }


    const submitComment = ({discussion, content}) => {
        return createComment({ auth, user, content, discussion })
        .then(() => setToggle(toggle => !toggle))
    }


    const CommentsUpload = ({discussion}) => {
        const [content, setContent] = useState("")

        return (
            <div style={{ margin: '10px' }}>
                <textarea style={{width: '300px', height: '100px'}} placeholder="Add a message to the discussion..." onChange={e => setContent(e.target.value)}></textarea>
                <button style={{ margin: '10px'}} onClick={() => submitComment({discussion, content})}>Send Message</button>
            </div>
        )
    }


    const Comments = ({discussion}) => {
        if (open === true && discussion === openId) {
            return (
                <div>
                    <div style={{ display: "flex", flexDirection: 'column-reverse', margin: `${comments.filter(x => x.discussion.id === discussion).length > 0 ? '10px' : ""}` , borderStyle: `${comments.filter(x => x.discussion.id === discussion).length > 0 ? "dashed" : ""}`, borderColor: 'goldenrod', padding: '10px', maxHeight: '400px', overflowY: "auto"}} >
                        {comments && comments.filter(x => x.discussion.id === discussion).map(comment => {
                            const [alreadyLiked, setAlreadyLiked] = useState(comment.likes.includes(user) ? true : false)
                            const [liked, setLiked] = useState(false)
                            return (
                                <div key={comment.id}>
                                    <h6>{comment.author.first_name}</h6>
                                    <p>{comment.content}</p>
                                    <p><button onClick={() => {updateCommentLikes({auth, comment:comment.id}).then(() => setLiked(liked => !liked))}} style={{ backgroundColor: `${alreadyLiked && !liked || !alreadyLiked && liked ? "goldenrod" : ""}`, marginRight: '5px'}}>Like</button> 
                                    Likes: {liked && !alreadyLiked ? comment.likes_count + 1 : (liked && alreadyLiked ? comment.likes_count - 1 : comment.likes_count)}</p>
                                    <DeleteCommentButton comment={comment.id} author={comment.author.id} />
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
                        <div key={discussion.id} style={{ margin: '10px', marginBottom: "25px", borderStyle: 'dashed', borderColor: 'goldenrod', padding: '10px'}}>
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
                <div style={{ maxWidth: '1000px'}}>
                    <DiscussionPosts />
                </div>
            </div>
        </div>
    )
}

export default Discussion