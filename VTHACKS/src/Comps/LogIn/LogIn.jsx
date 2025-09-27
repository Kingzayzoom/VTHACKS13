import './LogIn.css';

export default function LogIn() {
    return (
        <section className="content">
            <div className="logContainer">
                <h2 className="loginTitle">Sign In</h2>
                <form className="loginForm">
                    <div className="formGroup">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>

                    <button type="submit" className="loginButton">Sign In</button>

                    <p className="altText">
                        Don’t have an account? <a href="/register">Register</a>
                    </p>
                </form>
            </div>
        </section>
    );
}
