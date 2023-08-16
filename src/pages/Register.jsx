import React from "react";


function Register() {
    return (
    <div className="register-container">
    <div className="register-wrapper">
      <h1 className="register-title">CREATE AN ACCOUNT</h1>
      <form className="register-form">
      <input className="register-input" placeholder="name"/>
      <input className="register-input" placeholder="last name"/>
      <input className="register-input" placeholder="username"/>
      <input className="register-input" placeholder="email"/>
      <input className="register-input" placeholder="password"/>
      <input className="register-input" placeholder="confirm password"/>
      <span className="agreement">
   By creating an account, i consent to the process of my personal data in accordance with <b>PRIVACY POLICY</b>
      </span>
      <button className="register-button">CREATE</button>
      </form>
    </div>
    </div>
    )
}

export default Register;