import './heroSection.css'
import heroBackground from '../assets/hero-sectionbackground.jpeg'

export default function HeroSection() {
    return (
        <section className="heroSection">
            <div className="overlay"></div>

            <div className="heroContent">
                <div id="housingIcon">

                    <span>Virginia Tech Housing Portal</span>
                </div>
                <div className="heroContentText">
                    <h1>Hokie Housing</h1>
                    <h1 id="excellence">Excellence</h1>
                    <p>Join the Virginia Tech community with premium on-campus housing. Experience Hokie spirit, academic excellence, and lifelong friendships in our state-of-the-art residential facilities.</p>
                </div>

                <div className="heroButton">
                    <button id="apply">Apply for Housing</button>
                    <button id="view">View Dashboard</button>
                </div>
            </div>
        </section>
    );
}
