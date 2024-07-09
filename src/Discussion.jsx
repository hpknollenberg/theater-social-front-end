import Tabs from "./Tabs"
import DiscussionUpload from "./DiscussionUpload"
import { useContext, useEffect, useRef, useState } from "react"
import { AdminContext, AuthContext, ToggleContext, UserContext } from "./context"
import { baseUrl, getDiscussions, createComment, getComments, updateCommentLikes, deleteDiscussion, deleteComment, getThreadComments, updateThreadCommentLikes, createThreadComment, deleteThreadComment } from "./api"



const Discussion = () => {
    const { auth } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const [discussions, setDiscussions] = useState([])
    const { user, setUser } = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
    const [deleteCheck, setDeleteCheck] = useState(false)
    const [discussionToggle, setDiscussionToggle] = useState(false)
    const [deleteId, setDeleteId] = useState(0)
    const [threadComments, setThreadComments] = useState([])
    const {universalToggle, setUniversalToggle} = useContext(ToggleContext)
    const [threadToggle, setThreadToggle] = useState(false)
    
    const [openIds, setOpenIds] = useState([])
    const [openThreadIds, setOpenThreadIds] = useState([])

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


    useEffect(() => {
        getThreadComments({auth})
        .then(response => {
            setThreadComments(response.data)
        })
    }, [threadToggle])


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
                    <button 
                        style={{backgroundColor: 'red' }} 
                        onClick={() => {submitDeleteDiscussion({discussion}); setDeleteId(discussion)}}
                        >Delete Discussion</button>
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
                    <button 
                        style={{backgroundColor: 'red' }} 
                        onClick={() => {submitDeleteComment({comment, deleteCommentId, deleteCommentCheck, setDeleteCommentCheck}); setDeleteCommentId(comment)}}
                        >Delete Comment</button>
                    <DeleteCommentCheck comment={comment} deleteCommentCheck={deleteCommentCheck} deleteCommentId={deleteCommentId}/>
                </div>
            )
        }
    }


    const submitDeleteThreadComment = ({threadComment, deleteThreadCommentId, deleteThreadCommentCheck, setDeleteThreadCommentCheck}) => {
        if (deleteThreadCommentCheck === true && deleteThreadCommentId === threadComment) {
            deleteThreadComment({auth, user, threadComment})
            .then(() => setThreadToggle(threadToggle => !threadToggle))
        }
        setDeleteThreadCommentCheck(deleteThreadCommentCheck => !deleteThreadCommentCheck)
    }


    const DeleteThreadCommentCheck = ({threadComment, deleteThreadCommentCheck, deleteThreadCommentId}) => {
        if (deleteThreadCommentCheck === true && deleteThreadCommentId === threadComment) {
            return (
                <p>Are you sure you want to delete this comment?</p>
            )
        }
    }


    const DeleteThreadCommentButton = ({threadComment, author}) => {
        const [deleteThreadCommentId, setDeleteThreadCommentId] = useState(0)
        const [deleteThreadCommentCheck, setDeleteThreadCommentCheck] = useState(false)
        if (admin === true || user === author) {
            return (
                <div style={{ marginTop: '10px' }}>   
                    <button 
                        style={{backgroundColor: 'red' }} 
                        onClick={() => {submitDeleteThreadComment({threadComment, deleteThreadCommentId, deleteThreadCommentCheck, setDeleteThreadCommentCheck}); setDeleteThreadCommentId(threadComment)}}
                        >Delete Comment</button>
                    <DeleteThreadCommentCheck threadComment={threadComment} deleteThreadCommentCheck={deleteThreadCommentCheck} deleteThreadCommentId={deleteThreadCommentId}/>
                </div>
            )
        }
    }


    const submitComment = ({discussion, content}) => {
        createComment({ auth, user, content, discussion })
        .then(() => setToggle(toggle => !toggle))
    }


    const CommentsUpload = ({discussion}) => {
        const [content, setContent] = useState("")
        return (
            <div style={{ margin: '10px' }}>
                <textarea 
                    style={{width: '300px', height: '100px'}} 
                    placeholder="Add a message to the discussion..." 
                    onChange={e => setContent(e.target.value)}
                    ></textarea>
                <button 
                    style={{ margin: '10px'}} 
                    onClick={() => submitComment({discussion, content})}
                    >Send Message</button>
            </div>
        )
    }


    const submitThreadComment = ({comment, threadContent}) => {
        return createThreadComment({ auth, user, threadContent, comment })
        .then(() => setThreadToggle(threadToggle => !threadToggle))
    }


    const ThreadCommentUpload = ({comment}) => {
        const [threadContent, setThreadContent] = useState("")
        return (
            <div style={{ margin: '10px' }}>
                <textarea 
                    style={{width: '300px', height: '100px'}} 
                    placeholder="Add a message to this thread..." 
                    onChange={e => setThreadContent(e.target.value)}
                    ></textarea>
                <button 
                    style={{ margin: '10px'}} 
                    onClick={() => submitThreadComment({comment, threadContent})}
                    >Reply</button>
            </div>
        )
    }


    const ThreadComments = ({comment}) => {
        if (openThreadIds.includes(comment)) {
            return (
                <div>
                    <div style={{ display: "flex", flexDirection: 'column-reverse', margin: `${threadComments.filter(x => x.comment.id === comment).length > 0 ? '20px' : ""}`, borderStyle: `${threadComments.filter(x => x.comment.id === comment).length > 0 ? "dashed" : ""}`, borderColor: 'goldenrod', padding: '10px', maxHeight: '400px', overflowY: "auto"}}>
                        {threadComments && threadComments.filter(x => x.comment.id === comment).map(threadComment => {
                            const alreadyLikedThread = threadComment.likes.includes(user) ? true : false
                            const [likedThread, setLikedThread] = useState(false)
                            return (
                                <div key={threadComment.id}>
                                    <h6>{threadComment.author.first_name}</h6>
                                    <p>{threadComment.content}</p>
                                    <p>
                                        <button 
                                            onClick={() => {updateThreadCommentLikes({auth, threadComment:threadComment.id}).then(() => setLikedThread(likedThread => !likedThread))}} 
                                            style={{ backgroundColor: `${alreadyLikedThread && !likedThread || !alreadyLikedThread && likedThread ? "goldenrod" : ""}`, marginRight: '5px'}}
                                            >Like</button> 
                                    Likes: {likedThread && !alreadyLikedThread ? threadComment.likes_count + 1 : (likedThread && alreadyLikedThread ? threadComment.likes_count - 1 : threadComment.likes_count)}</p>
                                    <DeleteThreadCommentButton threadComment={threadComment.id} author={threadComment.author.id}/>
                                    <hr></hr>
                                </div>
                            )
                        })}
                    </div>
                    <hr></hr>
                    <ThreadCommentUpload comment={comment} />
                </div>
            )
        }    
    }


    const Comments = ({discussion}) => {
        if (openIds.includes(discussion)) {
            return (
                <div>
                    <div style={{ display: "flex", flexDirection: 'column-reverse', margin: `${comments.filter(x => x.discussion.id === discussion).length > 0 ? '10px' : ""}` , borderStyle: `${comments.filter(x => x.discussion.id === discussion).length > 0 ? "dashed" : ""}`, borderColor: 'goldenrod', padding: '10px', maxHeight: '500px', overflowY: "auto"}} >
                        {comments && comments.filter(x => x.discussion.id === discussion).map(comment => {
                            const alreadyLiked = comment.likes.includes(user) ? true : false
                            const [liked, setLiked] = useState(false)
                            return (
                                <div key={comment.id}>
                                    <h6>{comment.author.first_name}</h6>
                                    <p>{comment.content}</p>
                                    <p>
                                        <button 
                                            onClick={() => {updateCommentLikes({auth, comment:comment.id}).then(() => setLiked(liked => !liked))}} 
                                            style={{ backgroundColor: `${alreadyLiked && !liked || !alreadyLiked && liked ? "goldenrod" : ""}`, marginRight: '5px'}}
                                            >Like</button> 
                                    Likes: {liked && !alreadyLiked ? comment.likes_count + 1 : (liked && alreadyLiked ? comment.likes_count - 1 : comment.likes_count)}</p>
                                    <DeleteCommentButton comment={comment.id} author={comment.author.id} />
                                    <button 
                                        style={{ margin: '10px'}} 
                                        onClick={() => {
                                            if (!openThreadIds.includes(comment.id)) {
                                                setOpenThreadIds([...openThreadIds, comment.id])
                                            } else {
                                                setOpenThreadIds(openThreadIds.filter(x => x !== comment.id))
                                            }
                                        }}
                                        >{openThreadIds.includes(comment.id) ? "Close Thread" : "Open Thread"}</button>
                                    <ThreadComments comment={comment.id}/>
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
                        <div key={discussion.id} 
                            style={{ margin: '10px', marginBottom: "25px", borderStyle: 'dashed', borderColor: 'goldenrod', padding: '10px'}}>
                            <div style={{ display: "flex", alignItems: "center", margin: '10px'}}>
                                <img src={`${baseUrl}${discussion.image}`} 
                                    style={{maxHeight: '200px'}} />
                                <div style={{ margin: '10px' }}>
                                    <h5>{discussion.name}</h5>
                                    <p>{discussion.description}</p>
                                </div>
                            </div>
                            <button style={{ margin: '10px'}} 
                                onClick={() => {
                                    if (!openIds.includes(discussion.id)) {
                                        setOpenIds([...openIds, discussion.id])
                                    } else {
                                        setOpenIds(openIds.filter(x => x !== discussion.id))
                                    }
                                }}
                                >{openIds.includes(discussion.id) ? "Close Discussion" : "Open Discussion"}</button>
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