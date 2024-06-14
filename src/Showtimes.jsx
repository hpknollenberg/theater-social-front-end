import { useEffect, useState } from "react"
import Tabs from "./Tabs"
import { getShowtimes } from "./api"


const Showtimes = () => {  
  const [showtimes, setShowtimes] = useState([])
  const [dayDisplay, setDayDisplay] = useState("Today")

  useEffect(() => {
    getShowtimes()
    .then(response => {setShowtimes(response.data.showtimes); console.log(response.data)})
  }, [])

  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="showtimes"/>
        <div style={{margin: '5px'}}>
          <button onClick={() => setDayDisplay("Today")} style={{margin: '5px', backgroundColor: `${dayDisplay === "Today" ? "white" : "goldenrod"}`}}>Today</button>
          <button onClick={() => setDayDisplay("Tomorrow")} style={{margin: '5px', backgroundColor: `${dayDisplay === "Tomorrow" ? "white" : "goldenrod"}`}}>Tomorrow</button>
        </div>
        {showtimes && showtimes.map((day, index) => {
          if (day.day === dayDisplay) {
          return (
            <div key={index} className="m-3">
                <h2>{day.day}</h2>
                <hr />
                <div className="">
                {day.movies.map((movie, index) => (
                    <div key={index} className="m-2">
                      <h5>{movie.name}</h5>
                      <div className="d-flex">
                        {movie.time.map(time => (
                          <div className="m-2">
                            {time}
                          </div>
                        )
                        )}
                      </div>
                    </div>
                ))}
                </div>
            </div>
        )}})}
      </div>
      <div>
        
      </div>
      
    </div>
  )
}


export default Showtimes