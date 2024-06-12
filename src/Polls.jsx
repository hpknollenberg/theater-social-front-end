import { useContext, useEffect, useState } from "react"
import PollsUpload from "./PollsUpload"
import Tabs from "./Tabs"
import { getPolls, createVote, deletePoll, getProfileVotes } from "./api"
import { AdminContext, AuthContext, UserContext } from "./context"



const Polls = () => { 
  const { auth } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const { admin, setAdmin } = useContext(AdminContext)
  const [polls, setPolls] = useState([])
  const [selectedPoll, setSelectedPoll] = useState([])
  const [greyedOut, setGreyedOut] = useState([])
  const [toggle, setToggle] = useState(true)


  useEffect(() => {
      getProfileVotes({ auth })
      .then(response => {
        console.log("response: ", response.data)
        response.data.map((vote) => {
          if (!greyedOut.includes(vote.poll.id)) {
            setGreyedOut((greyedOut) => [...greyedOut, vote.poll.id])
          }
        })
      })
      .then(() => {
        getPolls({auth})
        .then(response => {
          console.log("Poll: ", response)
          setPolls(response.data)
        })
      })
  }, [toggle])
  

  const IndividualPoll = () => {
    const [selectedOption, setSelectedOption] = useState("")


    const DeleteButton = ({poll}) => {
      if (admin === true) {
        return(
          <div style={{ margin: '10px' }}>
            <button onClick={() => {console.log(poll); deletePoll({auth, user, admin, poll})}}>Delete Poll</button>
          </div>
        )
      }
    }

    const handleOptionChange = changeEvent => {
      setSelectedOption(changeEvent.target.value)
    }



    const submitPoll = () => {
      createVote({auth, user, selectedPoll, selectedOption})
      .then(() => {
        setToggle(toggle => !toggle)
      })}

    return (
      <div>
      {polls && polls.map((poll, index) => {
        console.log("greyed out: ", greyedOut)
        if (!greyedOut.includes(poll.id) && admin !== true) {
          return (
          <div key={index} style={{ margin: '10px'}}>
            <h5>{poll.name}</h5>
            {poll.choices && poll.choices.map((choice, index) => (
              <div key={index}>
              <label  name={choice.name} >
                <input type="radio" value={choice.id} checked={selectedOption === `${choice.id}`} onChange={(changeEvent) => {handleOptionChange(changeEvent); setSelectedPoll(poll.id)}} style={{ margin: '5px', marginLeft: '15px' }}/>
                {choice.name}
              </label>
              </div>
            ))}
            <button style={{ margin: '10px' }} onClick={() => {submitPoll()}}>Submit Poll</button>
            <DeleteButton poll={poll.id}/>
            <hr></hr>
          </div>
      )} else {
        return (
          <div key={index} style={{ margin: '10px'}}>
            <h5>{poll.name}</h5>
            {poll.choices && poll.choices.map((choice, index) => (
              <div key={index}>
                {choice.name} - {choice.vote_count}
              </div>
            ))}
            <DeleteButton poll={poll.id}/>
            <hr></hr>
          </div>
      )
      }
      })}
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