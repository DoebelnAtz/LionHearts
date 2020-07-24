import React, { ChangeEvent, useState } from 'react';
import { SignupDiv, SignupForm } from './Styles';
import Input from '../Components/Input';
import { makeRequest } from '../../Api';

const Signup: React.FC = () => {
	const [input, setInput] = useState({
		email: '',
		firstname: '',
		lastname: '',
		password: '',
	});

	const handleFNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			firstname: target.value,
		});
	};

	const handlePasswordChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			password: target.value,
		});
	};

	const handleLNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			lastname: target.value,
		});
	};

	const handleEmailChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setInput({
			...input,
			email: target.value,
		});
	};

	const handleSignup = async () => {
		if (
			!!input.lastname.length &&
			!!input.firstname.length &&
			!!input.email.length &&
			!!input.password.length
		) {
			try {
				await makeRequest('/auth/signup', 'POST', {
					fistname: input.firstname,
					lastname: input.lastname,
					email: input.email,
					password: input.password,
				});
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<SignupDiv>
			<SignupForm>
				<form>
					<input
						autoComplete={'no'}
						type={'text'}
						placeholder={'firsname'}
						value={input.firstname}
						onChange={handleFNameChange}
					/>
					<input
						type={'text'}
						placeholder={'lastname'}
						value={input.lastname}
						onChange={handleLNameChange}
					/>
					<input
						autoComplete={'false'}
						type={'email'}
						placeholder={'email'}
						value={input.email}
						onChange={handleEmailChange}
					/>
					<input
						autoComplete={'new-password'}
						type={'password'}
						value={input.password}
						onChange={handlePasswordChange}
					/>
					<button onClick={handleSignup}>Signup</button>
				</form>
			</SignupForm>
		</SignupDiv>
	);
};

export default Signup;
