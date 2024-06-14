import { useEffect, useContext, useState } from "react"
import Tabs from "./Tabs"
import UpcomingFilmsUpload from "./UpcomingFilmsUpload"
import { AdminContext, AuthContext, UserContext } from "./context"
import { baseUrl, getFilms, editFilm, deleteFilm } from "./api"


const UpcomingFilms = () => {  
  const { auth } = useContext(AuthContext)
  const { admin, setAdmin } = useContext(AdminContext)
  const { user, setUser } = useContext(UserContext)
  const [films, setFilms] = useState([])
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState(0)
  const [deleteId, setDeleteId] = useState(0)
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [filmToggle, setFilmToggle] = useState(false)
  
  useEffect(() => {
    getFilms({auth})
    .then((response) => {
      console.log(response)
      setFilms(response.data)
    }) 
  }, [filmToggle])


  const submitDeleteFilm = ({id}) => {
    if (deleteCheck === true && deleteId === id) {
        deleteFilm({auth, user, admin, id})
        setFilmToggle(filmToggle => !filmToggle)
    }
    setDeleteCheck(deleteCheck => !deleteCheck)
    
  }


  const DeleteCheck = ({id}) => {
    if (deleteCheck === true && deleteId === id) {
        return (
            <p style={{ margin: '10px' }}>Are you sure you want to delete?</p>
        )
    }
  }

  const DeleteFilmButton = ({id}) => {
    if (admin === true) {
        return (
            <button style={{ margin: '10px', marginLeft: '5px', backgroundColor: 'red' }}
                onClick={() => {submitDeleteFilm({id}); setDeleteId(id)}}
            >Delete</button>
        )
    }
  }



  const EditButton = ({id}) => {
    if (admin === true) {
        return (
            <button style={{ margin: '10px', marginRight: '5px' }}
                onClick={() => {
                  setEdit(!edit)
                  setEditId(id)
                }}
            >Edit</button>
        )
    }
  }

  const EditPanel = ({name, id, date}) => {
    const [editFilmName, setEditFilmName] = useState(name)
    const [editDate, setEditDate] = useState(date)
    const [editFilmImage, setEditFilmImage] = useState("")


    if (admin === true && edit === true && editId === id) {
      return (
        <div>
            <div>
                <p style={{ margin: "10px" }}>Film Title:
                    <input type="text" onChange={(e) => {setEditFilmName(e.target.value)}} style={{ margin: '10px'}} value={editFilmName}></input>
                </p>
            </div>
            <div>
                <p style={{ margin: "10px" }}>Release Date:
                    <input type="text" onChange={(e) => {setEditDate(e.target.value)}} style={{ margin: '10px'}} value={editDate}></input>
                </p>
            </div>
            <div>
                <input style={{ margin: '10px', width: '275px' }} type="file" accept='image/*' onChange={e => setEditFilmImage(e.target.files[0])} />
                <button style={{ margin: '10px' }} onClick={() => {editFilm({auth, user, admin, id, editFilmName, editDate, editFilmImage})}}>Submit Edits</button>
            </div>
        </div>
      )
    }
  }



  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="upcomingfilms"/>
      </div>
      <UpcomingFilmsUpload />
      <div className="d-lg-flex align-items-center">
        {films && films.map(film => (
          <div key={film.id} className="" style={{ borderStyle: "solid", margin: "10px", marginRight: "50px", maxWidth: "300px"}}>
              <img src={`${baseUrl}${film.image}`} style={{ maxWidth: "97%", maxHeight: "90%", margin: "5px"}}/>
              <h5 className="d-flex justify-content-center"> {film.title}</h5>
              <p className="d-flex justify-content-center">Coming {film.release_date}</p>
              <EditButton id={film.id}/>
              <DeleteFilmButton id={film.id} />
              <DeleteCheck id={film.id} />
              <EditPanel name={film.title} id={film.id} date={film.release_date} />
          </div>
        ))}
      </div>
      <div>
        
      </div>
      
    </div>
  )
}


export default UpcomingFilms