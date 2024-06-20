import { useContext, useEffect, useState } from "react"
import PollsUpload from "./PollsUpload"
import Tabs from "./Tabs"
import { getPolls, createVote, deletePoll, getProfileVotes } from "./api"
import { AdminContext, AuthContext, ToggleContext, UserContext } from "./context"



const Polls = () => { 
  const { auth } = useContext(AuthContext)
  const { user, setUser } = useContext(UserContext)
  const { admin, setAdmin } = useContext(AdminContext)
  const [polls, setPolls] = useState([])
  const [selectedPoll, setSelectedPoll] = useState([])
  const [greyedOut, setGreyedOut] = useState([])
  const [toggle, setToggle] = useState(true)
  const [deleteId, setDeleteId] = useState(0)
  const [deleteCheck, setDeleteCheck] = useState(false)
  const {universalToggle, setUniversalToggle} = useContext(ToggleContext)

  useEffect(() => {
      getProfileVotes({ auth })
      .then(response => {
        response.data.map((vote) => {
          if (!greyedOut.includes(vote.poll.id)) {
            setGreyedOut((greyedOut) => [...greyedOut, vote.poll.id])
          }
        })
      })
      .then(() => {
        getPolls({auth})
        .then(response => {
          setPolls(response.data)
        })
      })
  }, [toggle, universalToggle])
  

  const IndividualPoll = () => {
    const [selectedOption, setSelectedOption] = useState("")


    const submitDeletePost = ({poll}) => {
        if (deleteCheck === true && deleteId === poll) {
            deletePoll({auth, user, admin, poll})
            .then(() => setToggle(toggle => !toggle))
        }
        setDeleteCheck(deleteCheck => !deleteCheck)
    }


    const DeleteCheck = ({poll}) => {
      if (deleteCheck === true && deleteId === poll) {
          return (
              <p style={{ margin: '10px' }}>Are you sure you want to delete?</p>
          )
      }
    }

    const DeleteButton = ({poll}) => {
      if (admin === true) {
        return(
          <div style={{ marginTop: '10px' }}>
            <button style={{backgroundColor: 'red'}} onClick={() => {submitDeletePost({poll}); setDeleteId(poll)}}>Delete Poll</button>
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
      <div className='d-flex flex-wrap'>
      {polls && polls.map((poll, index) => {
        if (!greyedOut.includes(poll.id) && admin !== true) {
          return (
          <div key={index} style={{ margin: '10px', marginLeft: '25px'}}>
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
            <hr></hr>
          </div>
      )} else {
        return (
          <div key={index} style={{ margin: '10px', marginLeft: '25px'}}>
            <h5>{poll.name}</h5>
            {poll.choices && poll.choices.map((choice, index) => (
              <div key={index}>
                {choice.name} - {choice.vote_count}
              </div>
            ))}
            <DeleteButton poll={poll.id}/>
            <DeleteCheck poll={poll.id}/>
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