
const Tabs = () => {
    return (
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Feed</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{ color: "white" }}>Showtimes</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{ color: "white" }}>Upcoming Films</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{ color: "white" }}>Menu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" style={{ color: "white" }}>Discussion</a>
                </li>
            </ul>
        </div>
    )
}

export default Tabs