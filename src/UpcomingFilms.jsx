import { useEffect, useContext, useState } from "react"
import Tabs from "./Tabs"
import UpcomingFilmsUpload from "./UpcomingFilmsUpload"
import { AuthContext } from "./context"
import { baseUrl, getFilms } from "./api"


const UpcomingFilms = () => {  
  const { auth } = useContext(AuthContext)
  const [films, setFilms] = useState([])
  
  useEffect(() => {
    getFilms({auth})
    .then((response) => {
      console.log(response)
      setFilms(response.data)
    }) 
  })


  return (
    <div className='' >
      <div className="">
        <h1 className="p-5">The Kentucky Theater</h1>
        <Tabs activeTab="upcomingfilms"/>
      </div>
      <UpcomingFilmsUpload />
      <div className="d-lg-flex align-items-center">
        {films && films.map(film => (
          <div key={film.id} className="" style={{ borderStyle: "solid", margin: "10px", marginRight: "50px", maxWidth: "300px", maxHeight: "600px"}}>
              <img src={`${baseUrl}/${film.image}`} style={{ maxWidth: "97%", maxHeight: "90%", margin: "5px"}}/>
              <h5 className="d-flex justify-content-center"> {film.title}</h5>
              <p className="d-flex justify-content-center">Coming {film.release_date}</p>
            
          </div>
        ))}
      </div>
      <div>
        
      </div>
      
    </div>
  )
}


export default UpcomingFilms