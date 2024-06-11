import { createFilm } from "./api"
import { AdminContext, AuthContext, UserContext } from "./context"
import { useContext, useState } from "react"


const UpcomingFilmsUpload = () => {
    const { user, setUser } = useContext(UserContext)
    const { auth } = useContext(AuthContext)
    const { admin, setAdmin } = useContext(AdminContext)
    const [filmDate, setFilmDate] = useState("")
    const [filmName, setFilmName] = useState("")
    const [filmImage, setFilmImage] = useState("")


    const submitFilm = () => {
        createFilm({
            auth,
            user,
            admin,
            filmDate,
            filmName,
            filmImage
        })
    }


    if (admin === true) {
        return (
            <div>
                <div>
                    <p style={{ margin: "10px" }}>Film Title:
                        <input type="text" onChange={(e) => {setFilmName(e.target.value)}} style={{ margin: '10px'}}></input>
                    </p>
                </div>
                <div>
                    <p style={{ margin: "10px" }}>Release Date:
                        <input type="text" onChange={(e) => {setFilmDate(e.target.value)}} style={{ margin: '10px'}}></input>
                    </p>
                </div>
                <div>
                    <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setFilmImage(e.target.files[0])} />
                    <button style={{ margin: '10px' }} onClick={() => {submitFilm()}}>Submit Film</button>
                </div>
                <hr />
            </div>
        )
    }
}

export default UpcomingFilmsUpload