import { useEffect, useState } from "react"
import Tabs from "./Tabs"
import { getShowtimes } from "./api"


const Showtimes = () => {  
  const [showtimes, setShowtimes] = useState([])

  useEffect(() => {
    getShowtimes()
    .then(response => {setShowtimes(response.data.showtimes[0].movies)})
  }, [])

  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="showtimes"/>
        <h2 className="m-2">Today</h2>
        {showtimes && showtimes.map((movie, index) => (
            <div key={index} className="m-2">
                <hr />
                <h6>{movie.name}</h6>
                <div className="d-flex">
                {movie.showing[0].time.map((t, index) => (
                    <div key={index} className="m-2">
                        {t}
                    </div>
                ))}
                </div>
            </div>
        ))}
      </div>
      <div>
        
      </div>
      
    </div>
  )
}


export default Showtimes