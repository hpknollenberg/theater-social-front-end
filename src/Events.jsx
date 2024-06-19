import { useContext, useEffect, useState } from "react"
import Tabs from "./Tabs"
import { baseUrl, getEvents } from "./api"
import { AdminContext, AuthContext } from "./context"
import EventsUpload from "./EventsUpload"
import { DateTime } from "luxon"

const Events = () => {
    const {auth} = useContext(AuthContext)
    const [events, setEvents] = useState([])
    const {admin, setAdmin} = useContext(AdminContext)
    
    useEffect(() => {
        getEvents({auth})
        .then(response => {
            console.log(response)
            setEvents(response.data)
        })
    }, [])
    

    

    return (
        <div>
            <div className='' >
                <h1 className="p-5">The Kentucky Theater</h1>
                <Tabs activeTab="events" />
            </div>
            <EventsUpload />
            <div>
                {events && events.map(event => {
                    return (
                        <div style={{ borderStyle: "dashed", borderColor: "goldenrod", margin: "10px", maxWidth: "350px"}}>
                            <img src={`${baseUrl}${event.image}`} style={{ width: "95%", margin: "2.5%"}} />
                            <h5 style={{ margin: '10px'}}>{event.title}</h5>
                            <p style={{ margin: '10px'}}>{event.description}</p>
                            <h6 style={{ margin: '10px'}}>{event.date} at {DateTime.fromFormat(event.time, 'HH:mm:ss').toFormat('h:mm a')}</h6>
                            <p style={{ margin: '10px' }}><button style={{marginRight: '5px'}}>RSVP</button>{event.rsvp_count} people have RSVP'd.</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Events