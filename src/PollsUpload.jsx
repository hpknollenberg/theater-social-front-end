import { useState, useContext } from "react"
import { AdminContext, AuthContext, UserContext } from "./context"
import { createPoll } from "./api"
import { v4 as uuidv4 } from 'uuid'


const PollsUpload = () => { 
  const [currentChoice, setCurrentChoice] = useState("")
  const [choices, setChoices] = useState([])
  const [title, setTitle] = useState("")
  const { admin, setAdmin } = useContext(AdminContext)
  const { auth } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const [pollId, setPollId] = useState(uuidv4())


    if (admin === true) {
      return (
        <div>
          <div>
            <p style={{ margin: '10px'}}>Title:
            <input type="text" style={{ margin: '10px'}} value={title} onChange={(e) => {setTitle(e.target.value)}}/></p>
          </div>
          <div>
            <input type="text" style={{ margin: '10px'}} value={currentChoice} onChange={(e) => {setCurrentChoice(e.target.value)}}/>
            <button onClick={() => {setChoices([...choices, currentChoice])}}>Add Choice</button>
          </div>
          <div>
            <h5 style={{ margin: '10px'}}>PREVIEW:</h5>
            <h6 style={{ margin: '10px'}}>{title}</h6>
            <div>
                {choices && choices.map((choice) => (
                    <div style={{ margin: '10px'}}>
                        {choice}
                    </div>
                )
                )}
            </div>
            <button style={{ margin: '10px'}} onClick={() => {setPollId(uuidv4()); createPoll({auth, user, admin, title, choices, pollId})}}>Add Poll</button>
          </div>
        </div>
      )
    }
  }


export default PollsUpload