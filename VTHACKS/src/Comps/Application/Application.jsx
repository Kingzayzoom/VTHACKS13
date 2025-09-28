import { useState } from "react";
import "./Application.css";
import VTLOGO from "../../assets/Vtech.png";
import {useNavigate} from "react-router-dom";

export default function Application() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        studentId: "",
        classYear: "",
        housingPref: "",
        roommatePref: "",
        accessibility: "",
        mealPlan: "Standard",
        moveIn: "",
        notes: "",
        agree: false,
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function update(key, val) {
        setForm((f) => ({ ...f, [key]: val }));
    }

    function validate() {
        const e = {};
        if (!form.firstName.trim()) e.firstName = "Required";
        if (!form.lastName.trim()) e.lastName = "Required";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
        if (!/^\d{6,}$/.test(form.studentId)) e.studentId = "Min 6 digits";
        if (!form.classYear) e.classYear = "Select class year";
        if (!form.housingPref) e.housingPref = "Select a hall";
        if (!form.moveIn) e.moveIn = "Pick a date";
        if (!form.agree) e.agree = "Please accept the housing policies";
        return e;
    }

    function onSubmit(e) {
        e.preventDefault();
        const eMap = validate();
        setErrors(eMap);
        if (Object.keys(eMap).length === 0) {
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    return (<>

        <nav className="main-nav">
            <div className="main-nav-inner">
                <div className="brand" onClick={() => navigate("/")}>
                    <img src={VTLOGO} alt="Virginia Tech" />
                    <span>Residents</span>
                </div>
                <ul className="linksContainer">
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/residents")}>Residents</li>
                    <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                </ul>
            </div>
        </nav>
            <section className="app-wrap">

                {submitted && (
                    <div className="app-toast" role="status" aria-live="polite">
                        Application submitted! We’ll email a confirmation to <strong>{form.email}</strong>.
                    </div>
                )}


                <header className="app-header">
                    <h1>On-Campus Housing Application</h1>
                    <p>Fill this out to apply for a space in VT on-campus housing.</p>
                </header>

                <form className="app-form" onSubmit={onSubmit} noValidate>
                    <div className="grid two">
                        <Field
                            label="First Name"
                            id="firstName"
                            value={form.firstName}
                            onChange={(v) => update("firstName", v)}
                            error={errors.firstName}
                        />
                        <Field
                            label="Last Name"
                            id="lastName"
                            value={form.lastName}
                            onChange={(v) => update("lastName", v)}
                            error={errors.lastName}
                        />
                    </div>

                    <div className="grid two">
                        <Field
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="you@vt.edu"
                            value={form.email}
                            onChange={(v) => update("email", v)}
                            error={errors.email}
                        />
                        <Field
                            label="Student ID"
                            id="studentId"
                            placeholder="e.g. 903123456"
                            value={form.studentId}
                            onChange={(v) => update("studentId", v.replace(/\D/g, ""))}
                            error={errors.studentId}
                        />
                    </div>

                    <div className="grid two">
                        <Select
                            label="Class Year"
                            id="classYear"
                            value={form.classYear}
                            onChange={(v) => update("classYear", v)}
                            error={errors.classYear}
                            options={["2026", "2027", "2028", "2029", "Graduate"]}
                            placeholder="Select year"
                        />
                        <Select
                            label="Preferred Residence Hall"
                            id="housingPref"
                            value={form.housingPref}
                            onChange={(v) => update("housingPref", v)}
                            error={errors.housingPref}
                            options={[
                                "Ambler Johnston",
                                "Pritchard",
                                "O'Shaughnessy",
                                "Lee Hall",
                                "Pearson Hall",
                                "New Residence Hall East",
                            ]}
                            placeholder="Choose hall"
                        />
                    </div>

                    <div className="grid two">
                        <Select
                            label="Meal Plan"
                            id="mealPlan"
                            value={form.mealPlan}
                            onChange={(v) => update("mealPlan", v)}
                            options={["Standard", "Premium", "Flex 10", "Commuter"]}
                        />
                        <Field
                            label="Desired Move-in Date"
                            id="moveIn"
                            type="date"
                            value={form.moveIn}
                            onChange={(v) => update("moveIn", v)}
                            error={errors.moveIn}
                        />
                    </div>

                    <Field
                        label="Roommate Preferences"
                        id="roommatePref"
                        placeholder="Names, quiet hours, study habits, etc."
                        value={form.roommatePref}
                        onChange={(v) => update("roommatePref", v)}
                        textarea
                    />

                    <Field
                        label="Accessibility / Accommodation Needs"
                        id="accessibility"
                        placeholder="e.g., elevator access, ground floor, service animal, etc."
                        value={form.accessibility}
                        onChange={(v) => update("accessibility", v)}
                        textarea
                    />

                    <Field
                        label="Additional Notes"
                        id="notes"
                        placeholder="Anything else you'd like housing to know."
                        value={form.notes}
                        onChange={(v) => update("notes", v)}
                        textarea
                    />

                    <div className="agreeRow">
                        <label className={`chk ${errors.agree ? "has-error" : ""}`}>
                            <input
                                type="checkbox"
                                checked={form.agree}
                                onChange={(e) => update("agree", e.target.checked)}
                            />
                            <span>
              I agree to the on-campus housing policies and acknowledge financial obligations.
            </span>
                        </label>
                        {errors.agree && <div className="err">{errors.agree}</div>}
                    </div>

                    <div className="actions">
                        <button type="submit" className="btn-primary">Submit Application</button>
                        <button
                            type="button"
                            className="btn-ghost"
                            onClick={() => {
                                setForm({
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    studentId: "",
                                    classYear: "",
                                    housingPref: "",
                                    roommatePref: "",
                                    accessibility: "",
                                    mealPlan: "Standard",
                                    moveIn: "",
                                    notes: "",
                                    agree: false,
                                });
                                setErrors({});
                                setSubmitted(false);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </section>
    </>



    );
}

function Field({
                   label,
                   id,
                   type = "text",
                   placeholder = "",
                   value,
                   onChange,
                   error,
                   textarea = false,
               }) {
    return (
        <label className={`field ${error ? "has-error" : ""}`} htmlFor={id}>
            <span className="field-label">{label}</span>
            {textarea ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            {error && <span className="err">{error}</span>}
        </label>
    );
}

function Select({
                    label,
                    id,
                    value,
                    onChange,
                    options = [],
                    placeholder = "Select…",
                    error,
                }) {
    return (
        <label className={`field ${error ? "has-error" : ""}`} htmlFor={id}>
            <span className="field-label">{label}</span>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {error && <span className="err">{error}</span>}
        </label>
    );
}

