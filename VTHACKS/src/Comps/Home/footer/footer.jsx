import './footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerContainer">
                <div className="footerSection">
                    <h3>CampusHousing</h3>
                    <p>Your trusted partner for student housing solutions on campus.</p>
                </div>

                <div className="footerSection">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>Apply Now</li>
                        <li>Dashboard</li>
                        <li>Residents</li>
                    </ul>
                </div>

                <div className="footerSection">
                    <h3>Support</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>Contact Us</li>
                        <li>FAQ</li>
                        <li>Policies</li>
                    </ul>
                </div>

                <div className="footerSection">
                    <h3>Contact Info</h3>
                    <ul>
                        <li>housing@university.edu</li>
                        <li>(555) 123-4567</li>
                        <li>123 Campus Drive<br />University City, ST 12345</li>
                    </ul>
                </div>
            </div>

            <div className="footerBottom">
                <p>© 2025 CampusHousing. All rights reserved.</p>
            </div>
        </footer>
    );
}
