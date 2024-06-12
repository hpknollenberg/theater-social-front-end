
const Tabs = ({activeTab}) => {
    
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "feed" ? "active" : "")}`} aria-current="page" href="/" style={{color: `${(activeTab === "feed") ? "black" : "white"}`}}>Feed</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "showtimes" ? "active" : "")}`} href="/showtimes" style={{color: `${(activeTab === "showtimes") ? "black" : "white"}` }}>Showtimes</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "upcomingfilms" ? "active" : "")}`} href="/upcomingfilms" style={{color: `${(activeTab === "upcomingfilms") ? "black" : "white"}` }}>Upcoming Films</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "menu" ? "active" : "")}`} href="/menu" style={{color: `${(activeTab === "menu") ? "black" : "white"}` }}>Menu</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "polls" ? "active" : "")}`} href="/polls" style={{color: `${(activeTab === "polls") ? "black" : "white"}` }}>Polls</a>
                </li>
            </ul>
        </div>
    )
}

export default Tabs