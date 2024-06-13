import Tabs from "./Tabs"
import DiscussionUpload from "./DiscussionUpload"

const Discussion = () => {
    

    const DiscussionPosts = () => {

        return (
            <div>

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