import { useContext, useState } from "react"
import { AdminContext, AuthContext, ToggleContext } from "./context"
import { v4 as uuidv4 } from 'uuid'
import { createShowtime } from "./api"


const ShowtimesUpload = () => {
    const { auth } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const [showtimes, setShowtimes] = useState([])
    const [currentShowtime, setCurrentShowtime] = useState("")
    const [date, setDate] = useState("")
    const [film, setFilm] = useState("")
    const [id, setId] = useState(uuidv4())
    const [timeIds, setTimeIds] = useState([])
    const {universalToggle, setUniversalToggle} = useContext(ToggleContext)

    if (admin === true) {
        return (
            <div>
                <p style={{ margin: '10px'}} onChange={e => setDate(e.target.value)}>Date: <input type="text" placeholder="YYYY-MM-DD" style={{marginLeft: "5px"}} /></p>
                <p style={{ margin: '10px'}} onChange={e => setFilm(e.target.value)}>Film: <input type="text" style={{marginLeft: "5px"}} /></p>
                <p style={{ margin: '10px'}}>Showtime: <input placeholder="H:mm AM/PM" style={{marginLeft: "5px"}} onChange={e => setCurrentShowtime(e.target.value)}/> <button onClick={() => {setShowtimes([...showtimes, currentShowtime]); setTimeIds([...timeIds, uuidv4()])}}>Add</button></p>
                <p className="d-flex m-2" >
                    {showtimes && showtimes.map(showtime => {
                        return (
                            <div className="m-2">
                                {showtime}
                            </div>
                        )
                    })}
                </p>
                <button style={{ margin: '10px'}} onClick={() => {setId(() => uuidv4()); createShowtime({auth, admin, showtimes, date, film, id, timeIds}).then(() => {setUniversalToggle(universalToggle => !universalToggle); setTimeIds([]); setShowtimes([])})}}>Submit Showtimes</button>
                <hr />
            </div>
        )
    }
}

export default ShowtimesUpload