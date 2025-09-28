import './navigation.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import VTECH from '../../../assets/Vtech.png';

export default function Navigation() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="logoContainer" onClick={() => navigate("/")}>
                <div id="VT">
                    <img src={VTECH} alt="VT Logo" />
                </div>
            </div>

            <ul className="linksContainer">
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                <li onClick={() => navigate("/application")}>Application</li>
                <li onClick={() => navigate("/residents")}>Residents</li>
            </ul>

            <div className="buttonsContainer">
                {user ? (
                    <>
                        <span className="user-greeting">
                            Hi {user.displayName || user.email.split('@')[0]}!
                        </span>
                        <button
                            className="button button-ghost"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="button button-ghost"
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </button>
                        <button
                            className="button button-primary"
                            onClick={() => navigate("/application")}
                        >
                            Apply Now
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
