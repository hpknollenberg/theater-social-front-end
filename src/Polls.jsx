import { useContext, useEffect, useState } from "react"
import PollsUpload from "./PollsUpload"
import Tabs from "./Tabs"
import { getPolls, createVote } from "./api"
import { AuthContext, UserContext } from "./context"



const Polls = () => { 
  const { auth } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const [polls, setPolls] = useState([])
  const [selectedPoll, setSelectedPoll] = useState([])

  useEffect(() => {
    getPolls({auth})
    .then(response => {
      setPolls(response.data)
    })
  }, [])


  const IndividualPoll = () => {
    const [selectedOption, setSelectedOption] = useState("")


    const handleOptionChange = changeEvent => {
      setSelectedOption(changeEvent.target.value)
    }

    const submitPoll = () => {
      console.log(user, selectedPoll, selectedOption)
      createVote({auth, user, selectedPoll, selectedOption})
      .then(response => {console.log(response)})
    }

    return (
      <div>
      {polls && polls.map((poll, index) => (
        <div key={index} style={{ margin: '10px'}}>
          <h5>{poll.name}</h5>
          {poll.choices && poll.choices.map((choice, index) => (
            <div>
            <label key={index} name={choice.name} >
              <input type="radio" value={choice.id} checked={selectedOption === `${choice.id}`} onChange={(changeEvent) => {handleOptionChange(changeEvent); setSelectedPoll(poll.id)}} style={{ margin: '5px', marginLeft: '15px' }}/>
              {choice.name}
            </label>
            </div>
          ))}
          <button style={{ margin: '10px' }} onClick={() => {submitPoll()}}>Submit Poll</button>
          <hr></hr>
        </div>
      ))}
      </div>
    )
  }

  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="polls"/>
      </div>
        <PollsUpload />
        <hr></hr>
        <IndividualPoll />

    </div>
  )
}


export default Polls