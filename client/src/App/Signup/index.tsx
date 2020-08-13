import React, {ChangeEvent, useEffect, useState} from 'react';
import { SignupDiv, SignupForm } from './Styles';
import Input from '../Components/Input';
import { makeRequest } from '../../Api';
import queryString from "query-string";
import {makeId} from "../../Utils";
import {useHistory, useLocation} from "react-router";
import {log} from "util";

const Signup: React.FC = () => {


	const history = useHistory();
	const location = useLocation();

	const applicationId: any =
		queryString.parse(location.search)?.application;


	const validateApplicationId = async () => {
		try {

			let resp = await makeRequest(`/applications/${applicationId}`, 'GET')
			console.log(resp, applicationId);
		} catch (e) {
			console.log(e);

		}
	};

	useEffect(() => {
		validateApplicationId();
	}, [applicationId]);

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

	const handleSignup = async (e: any) => {
		e.preventDefault();
		if (
			!!input.lastname.length &&
			!!input.firstname.length &&
			!!input.email.length &&
			!!input.password.length
		) {
			console.log(input);

			try {
				await makeRequest('/auth/signup', 'POST', {
					firstname: input.firstname,
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
						placeholder={'firstname'}
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
