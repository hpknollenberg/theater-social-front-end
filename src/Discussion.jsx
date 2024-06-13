import Tabs from "./Tabs"
import DiscussionUpload from "./DiscussionUpload"
import { useContext, useEffect, useState } from "react"
import { AuthContext, UserContext } from "./context"
import { baseUrl, getDiscussions, createComment, getComments } from "./api"

const Discussion = () => {
    const { auth } = useContext(AuthContext)
    const [discussions, setDiscussions] = useState([])
    const [open, setOpen] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [toggle, setToggle] = useState(false)
    
    useEffect(() => {
        getDiscussions({auth})
        .then(response => {
            setDiscussions(response.data)
            console.log(response.data)
        })
    }, [])


    useEffect(() => {
        getComments({auth})
        .then(response => {
            setComments(response.data)
            console.log(response.data)
        })
    }, [toggle])



    const submitComment = ({discussion, content}) => {
        createComment({ auth, user, content, discussion })
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
        if (open === true) {
            return (
                <div>
                    <div style={{ margin: '10px', borderStyle: 'solid', color: 'goldenrod', padding: '10px', maxHeight: '300px', overflowY: "scroll"}}>
                        {comments && comments.filter(x => x.discussion.id === discussion).map(comment => {
                            return (
                                <div>
                                    <h6>{comment.author.first_name}</h6>
                                    <p style={{color: 'white'}}>{comment.content}</p>
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
                            <button style={{ margin: '10px'}} onClick={() => setOpen(open => !open)}>Open Discussion</button>
                            <Comments discussion={discussion.id}/>
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