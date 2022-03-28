import React, {useState} from "react";
import "../css/Login.css"

function Form ({ option }) {
	return (
		<form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
			<div className={'account-form-fields ' + (option === 1 ? 'sign-in' :  'sign-up') }>
				<input id='email' name ='email' type='email' placeholder='E-mail' required />
				<input id='password' name='password' type='password' placeholder='Password' required/>
			</div>
			<button className='btn-submit-form' type='submit'>
			Sign in
			</button>
		</form>
	)
}

function Create ({ option }) {
	return (
		<form className='account-form' onSubmit={(evt) => evt.preventDefault()}>
			<div className={'account-form-fields ' + (option === 1 ? 'sign-in' :  'sign-up') }>
				<input id='firstName' name='firstName' type='firstName' placeholder='First Name' required/>
				<input id='lastName' name='lastName' type='lastName' placeholder='Last Name' required/>
				<input id='email' name='email' type='email' placeholder='E-mail' required />
				<input id='password' name='password' type='password' placeholder='Password' required/>
				<input id='phoneNumber' name='phoneNumber' type='phoneNumber' placeholder='Phone Number' required/>
			</div>
			<button className='btn-submit-form' type='submit'>
				Sign up
			</button>
		</form>
		
	)
}

export default function LogIn () {
	const [option, setOption] = React.useState(1)

	return (
		<div className='container'>
			<header>
				<div className={'header-headings ' + (option === 1 ? 'sign-in' : 'sign-up') }>
					<span>Sign in to your account</span>
					<span>Create an account</span>
				</div>
			</header>
			<ul className='options'>
				<li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>• Sign in</li>
				<li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>• Sign up</li>
			</ul>
			{option === 1 ? Form(option): Create(option)}
		</div>
	)
}