import { useContext, useEffect, useState } from "react"
import Tabs from "./Tabs"
import { baseUrl, deleteEvent, editEvent, getEvents, updateRsvp } from "./api"
import { AdminContext, AuthContext, UserContext } from "./context"
import EventsUpload from "./EventsUpload"
import { DateTime } from "luxon"

const Events = () => {
    const {auth} = useContext(AuthContext)
    const [events, setEvents] = useState([])
    const {admin, setAdmin} = useContext(AdminContext)
    const [deleteCheck, setDeleteCheck] = useState(false)
    const [deleteId, setDeleteId] = useState(false)
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(0)
    const {user, setUser} = useContext(UserContext)
    
    
    useEffect(() => {
        getEvents({auth})
        .then(response => {
            console.log(response)
            setEvents(response.data)
        })
    }, [])
    

    const submitDelete = ({event}) => {
        if (deleteCheck === true && deleteId === event) {
            deleteEvent({auth, admin, event})
        }
        setDeleteCheck(deleteCheck => !deleteCheck)
    }


    const DeleteCheck = ({event}) => {
        if (deleteCheck === true && deleteId === event ) {
            return (
                <p style={{marginLeft: '10px'}}>Are you sure you want to delete event?</p>
            )
        }
    }


    const DeleteButton = ({event}) => {
        if (admin === true) {
            return (
                <button style={{ margin: "10px", backgroundColor: "red"}} onClick={() => {submitDelete({event}); setDeleteId(event)}}>Delete</button>
            )
        }
    }




    const EditButton = ({id}) => {
        if (admin === true) {
            return (
                <button style={{ marginLeft: "10px"}} onClick={() => {setEdit(edit => !edit); setEditId(id)}}>Edit</button>
            )
        }
    }


    const EditPanel = ({id, title, description, date, time}) => {
        const [editTitle, setEditTitle] = useState(title)
        const [editDescription, setEditDescription] = useState(description)
        const [editDate, setEditDate] = useState(date)
        const [editTime, setEditTime] = useState(time)
        const [editImage, setEditImage] = useState("")

        if (admin === true && edit === true && editId === id) {
            return (
                <div>
                    <p style={{margin: '10px'}}>Title: <input style={{marginLeft: '5px' }} value={editTitle} onChange={e => setEditTitle(e.target.value)}/></p>
                    <p style={{margin: '10px'}}>Description: <textarea style={{ height: '100px', width: '95%', margin: "10px", verticalAlign: "top" }} onChange={e => setEditDescription(e.target.value)} value={editDescription}></textarea></p>
                    <p style={{margin: '10px'}}>Date: <input placeholder="YYYY-MM-DD" style={{marginLeft: '5px' }} onChange={e => setEditDate(e.target.value)} value={editDate}/></p>
                    <p style={{margin: '10px'}}>Time: <input placeholder="H:mm AM/PM" style={{marginLeft: '5px' }} onChange={e => setEditTime(e.target.value)} value={editTime}/></p>
                    <input style={{ margin: '10px' }} type="file" accept='image/*' onChange={e => setEditImage(e.target.files[0])}/>
                    <button style={{ margin: '10px'}} onClick={() => {editEvent({auth, admin, id, editTitle, editDescription, editDate, editTime, editImage})}}>Submit Edit</button>
                </div>
            )
        }
    }


    const Image = ({image}) => {
        if (image) {
            return (
                <img src={`${baseUrl}${image}`} style={{ width: "95%", margin: "2.5%"}} />
            )
        }
    }


    const Rsvp = ({event, rsvpCount, rsvp}) => {
        const [clickRsvp, setClickRsvp] = useState(false)
        const [alreadyRsvp, setAlreadyRSVP] = useState(rsvp.includes(user))
        return (
            <div>
                <p style={{ margin: '10px' }}><button style={{marginRight: '5px', backgroundColor: `${alreadyRsvp && !clickRsvp || !alreadyRsvp && clickRsvp ? "goldenrod" : ""}`}} onClick={() => {updateRsvp({auth, event}).then(()=> setClickRsvp(clickRsvp => !clickRsvp))}}>RSVP</button>{clickRsvp && !alreadyRsvp ? (rsvpCount + 1 === 1 ? `${rsvpCount + 1} person has RSVP'd` : `${rsvpCount + 1} people have RSVP'd`) : (clickRsvp && alreadyRsvp ? (rsvpCount - 1 === 1 ? `${rsvpCount - 1} person has RSVP'd` : `${rsvpCount - 1} people have RSVP'd`) : (rsvpCount === 1 ? `${rsvpCount} person has RSVP'd` : `${rsvpCount} people have RSVP'd`))}.</p>
            </div>
        )
    }


    return (
        <div>
            <div className='' >
                <h1 className="p-5">The Kentucky Theater</h1>
                <Tabs activeTab="events" />
            </div>
            <EventsUpload />
            <div className="d-flex flex-wrap align-items-start">
                {events && events.map(event => {
                    return (
                        <div style={{ borderStyle: "dashed", borderColor: "goldenrod", margin: "10px", maxWidth: "350px"}}>
                            <Image image={event.image} />
                            <h5 style={{ margin: '10px'}}>{event.title}</h5>
                            <p style={{ margin: '10px'}}>{event.description}</p>
                            <h6 style={{ margin: '10px'}}>{event.date} at {DateTime.fromFormat(event.time, 'HH:mm:ss').toFormat('h:mm a')}</h6>

                            <Rsvp event={event.id} rsvpCount={event.rsvp_count} rsvp={event.rsvp}/>
                            <EditButton id={event.id}/>
                            <DeleteButton event={event.id}/>
                            <DeleteCheck event={event.id}/>
                            <EditPanel id={event.id} title={event.title} description={event.description} date={event.date} time={DateTime.fromFormat(event.time, 'HH:mm:ss').toFormat('h:mm a')} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Events