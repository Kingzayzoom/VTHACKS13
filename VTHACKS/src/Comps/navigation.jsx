import './navigation.css';


export default function Navigation() {
    return(<>
        <nav className="navbar">

            <div className="logoContainer">
                <div id="VT"><h3>VT</h3></div>
                <h3>Housing Portal</h3>
            </div>



                <ul className="linksContainer">
                    <li>Home</li>
                    <li>Dashboard</li>
                    <li>Application</li>
                    <li>Residents</li>
                </ul>



            <div className="buttonsContainer">
                <button className="button button-ghost">Sign In</button>
                <button className="button button-primary">Apply Now</button>
            </div>
        </nav>
    </>)
}