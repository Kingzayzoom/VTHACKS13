import { useEffect } from "react";
import "./applicationProcess.css";

export default function ApplicationProcess() {
    useEffect(() => {
        const elements = document.querySelectorAll(".hidden");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        elements.forEach((el) => observer.observe(el));
    }, []);

    return (
        <section className="applicationProcess">
            <h2 className="processTitle hidden fadeDown">Application Process</h2>
            <p className="processSubtitle hidden fadeDown">
                Streamlined digital workflow designed for efficiency and transparency.
                Complete your housing application with real-time progress tracking.
            </p>

            <div className="processContainer">
                <div className="stepsSection hidden slideLeft">
                    <div className="step">
                        <span className="stepNumber">01</span>
                        <div>
                            <h3>Personal Information</h3>
                            <p>
                                Submit verified student credentials, contact details, and
                                academic standing information
                            </p>
                        </div>
                    </div>

                    <div className="step">
                        <span className="stepNumber outlined">02</span>
                        <div>
                            <h3>Housing Preferences</h3>
                            <p>
                                Configure accommodation preferences, location priorities, and
                                compatibility requirements
                            </p>
                        </div>
                    </div>

                    <div className="step">
                        <span className="stepNumber orange">03</span>
                        <div>
                            <h3>Review &amp; Submit</h3>
                            <p>
                                Finalize application details and monitor processing status
                                through integrated dashboard
                            </p>
                        </div>
                    </div>

                    <button className="beginButton">Begin Application</button>
                </div>

                <div className="statusSection hidden slideRight">
                    <div className="statusCard">
                        <div className="statusHeader">
                            <h4>Application Status</h4>
                            <span className="badge">Under Review</span>
                        </div>
                        <p className="statusMeta">
                            Submitted March 15, 2024 • ID: #2024-0315-001
                        </p>
                        <ul>
                            <li className="complete">✔ Personal information verified</li>
                            <li className="complete">✔ Housing preferences recorded</li>
                            <li className="progress">⧗ Administrative review in progress</li>
                            <li className="pending">… Housing assignment pending</li>
                        </ul>
                    </div>

                    <div className="timelineCard">
                        <h4>Timeline &amp; Next Steps</h4>
                        <p className="subtext">Expected processing schedule</p>
                        <div className="timelineRow">
                            <span>Review Period</span>
                            <span>3–5 business days</span>
                        </div>
                        <div className="timelineRow">
                            <span>Status Updates</span>
                            <span>Email notifications</span>
                        </div>
                        <div className="timelineRow">
                            <span>Assignment Release</span>
                            <span>April 1, 2024</span>
                        </div>
                        <div className="timelineRow">
                            <span>Payment Due</span>
                            <span>Upon assignment</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
