import { useContext, useEffect, useState } from "react"
import Tabs from "./Tabs"
import { deleteShowtime, deleteShowtimesDay, getShowtimes } from "./api"
import { AdminContext, AuthContext } from "./context"
import ShowtimesUpload from "./ShowtimesUpload"
import { DateTime } from "luxon"


const Showtimes = () => {
  const { auth } = useContext(AuthContext)
  const {admin, setAdmin} = useContext(AdminContext)
  const [showtimes, setShowtimes] = useState([])
  const [dates, setDates] = useState([])
  const [showtimeDate, setShowtimeDate] = useState("")
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  const [deleteDayCheck, setDeleteDayCheck] = useState(false)
  const [deleteDay, setDeleteDay] = useState("")

  useEffect(() => {
    getShowtimes({auth})
    .then((response) => {
      setShowtimes(response.data)
      let tempDates = []
      response.data.map(showtime => {
        if (!tempDates.includes(showtime.date) && !dates.includes(showtime.date)) {
          tempDates.push(showtime.date)
          setDates((dates) => [...dates, showtime.date])
        }
    })
    })
  }, [])


  const submitDelete = ({id}) => {
    if (deleteCheck === true && deleteId === id) {
      deleteShowtime({auth, admin, id})
    } 
    setDeleteCheck(deleteCheck => !deleteCheck)
  }

  const DeleteCheck = ({id}) => {
    if (deleteCheck === true && deleteId === id)
    return (
      <p>Are you sure you want to delete these showtimes?</p>
    )
  }

  const DeleteButton = ({id}) => {
    if (admin === true)
    return (
      <button style={{ backgroundColor: 'red'}} onClick={() => {submitDelete({id}); setDeleteId(id)}}>Delete</button>
    )
  }



  const submitDeleteDay = ({day}) => {
    if (deleteDayCheck === true && deleteDay === day) {
      deleteShowtimesDay({auth, admin, day})
    }
    setDeleteDayCheck(deleteDayCheck => !deleteDayCheck)
  }

  const DeleteDayCheck = ({day}) => {
    if (deleteDayCheck === true && deleteDay === day) {
      return (
        <p style={{margin: '10px'}}>Are you sure you want to delete showtimes for {day}?</p>
      )
    }
  }

  const DeleteDayButton = ({day}) => {
    if (admin === true && showtimeDate)
      return (
        <button style={{marginLeft: "15px", backgroundColor: "red"}} onClick={() => {submitDeleteDay({day}); setDeleteDay(day)}}>Delete Day</button>
      )
  }



  return (
    <div>
      <div>
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="showtimes" />
      </div>
      <ShowtimesUpload />
      <div className="m-2">
        {dates && dates.map((date) => {
          return (
              <button style={{ margin: '5px', backgroundColor: `${date === showtimeDate ? "goldenrod" : "white"}`}} onClick={() => setShowtimeDate(() => date)}>{date}</button>
          )
        })}
      </div>
      <div>
        <DeleteDayButton day={showtimeDate} />
        <DeleteDayCheck day={showtimeDate}/>
      </div>
      <div>
        {showtimes && showtimes.filter(x => x.date === showtimeDate).map(showtime => {
          return (
            <div key={showtime.id} style={{margin: '10px'}}>
              <div className="d-flex">
                <h6 style={{ marginRight: '10px'}}>{showtime.film}</h6>
                <DeleteButton id={showtime.id}/>
              </div>
              <DeleteCheck id={showtime.id}/>
              <div className="d-flex">
              {showtime.times && showtime.times.map(time => {
                return (
                  <div key={time.id} style={{margin: '10px'}}>
                    {DateTime.fromFormat(time.hour_minute, 'HH:mm:ss').toFormat('h:mm a')}
                  </div>
                )
              })}
              </div>
              <hr />
            </div>
          )
        })}
        
      </div>   
    </div>

  )
}


export default Showtimes