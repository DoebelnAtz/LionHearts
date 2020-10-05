import React, { ChangeEvent, useState } from 'react';
import {
	ButtonRow,
	DataBaseControlControls,
	DataBaseControlDiv,
	DataBaseControlOption,
	DataBaseControlOptionTitle,
	LabeledControlInput,
} from './Styles';
import LoadingButton from '../../../../Components/LoadingButton';
import { AnimatedLabeledInputDiv } from '../../../../../Styles';
import { makeRequest } from '../../../../../Api';

const DatabaseControl: React.FC = () => {
	const [location, setLocation] = useState({
		name: '',
		latitude: '',
		longitude: '',
	});

	const [school, setSchool] = useState({
		name: '',
	});

	const [skill, setSkill] = useState({
		name: '',
	});

	const [degree, setDegree] = useState({ name: '' });

	const handleLocationNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setLocation({
			...location,
			name: target.value,
		});
	};

	const handleLocationLatChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setLocation({
			...location,
			latitude: target.value,
		});
	};

	const handleLocationLongChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setLocation({
			...location,
			longitude: target.value,
		});
	};

	const handleSchoolNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setSchool({
			...school,
			name: target.value,
		});
	};

	const handleDegreeNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setDegree({
			...degree,
			name: target.value,
		});
	};

	const handleSkillNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setSkill({
			...skill,
			name: target.value,
		});
	};

	const handleLocationSubmission = async () => {
		try {
			await makeRequest('/profiles/create_location', 'POST', {
				name: location.name,
				lat: location.latitude,
				long: location.longitude,
			});
			setLocation({ ...location, name: '', latitude: '', longitude: '' });
		} catch (e) {
			return false;
		}
		return true;
	};

	const handleSchoolSubmission = async () => {
		try {
			await makeRequest('/profiles/create_school', 'POST', {
				name: school.name,
			});
			setSchool({ ...school, name: '' });
		} catch (e) {
			return false;
		}
		return true;
	};

	const handleSkillSubmission = async () => {
		try {
			await makeRequest('/skills/create_skill', 'POST', {
				title: skill.name,
			});
			setSkill({ ...skill, name: '' });
			return true;
		} catch (e) {
			return false;
		}
	};

	const handleDegreeSubmission = async () => {
		try {
			await makeRequest('/profiles/create_degree', 'POST', {
				name: degree.name,
			});
			setDegree({ ...degree, name: '' });
			return true;
		} catch (e) {
			return false;
		}
	};

	return (
		<DataBaseControlDiv>
			<DataBaseControlOption>
				<DataBaseControlOptionTitle>
					Add location
				</DataBaseControlOptionTitle>
				<DataBaseControlControls>
					<AnimatedLabeledInputDiv>
						<input
							name={'location-name'}
							autoComplete={'off'}
							value={location.name}
							onChange={handleLocationNameChange}
							type={'text'}
							required
						/>
						<label htmlFor={'location-name'}>
							<span>Name</span>
						</label>
					</AnimatedLabeledInputDiv>
					<AnimatedLabeledInputDiv>
						<input
							name={'location-lat'}
							autoComplete={'off'}
							value={location.latitude}
							onChange={handleLocationLatChange}
							type={'text'}
							required
						/>
						<label htmlFor={'location-lat'}>
							<span>Latitude</span>
						</label>
					</AnimatedLabeledInputDiv>
					<AnimatedLabeledInputDiv>
						<input
							name={'location-long'}
							autoComplete={'off'}
							value={location.longitude}
							onChange={handleLocationLongChange}
							type={'text'}
							required
						/>
						<label htmlFor={'location-long'}>
							<span>Longitude</span>
						</label>
					</AnimatedLabeledInputDiv>
				</DataBaseControlControls>
				<ButtonRow>
					<LoadingButton onClick={handleLocationSubmission}>
						Submit
					</LoadingButton>
				</ButtonRow>
			</DataBaseControlOption>
			<DataBaseControlOption>
				<DataBaseControlOptionTitle>
					Add place of study
				</DataBaseControlOptionTitle>
				<DataBaseControlControls>
					<AnimatedLabeledInputDiv>
						<input
							name={'school-name'}
							autoComplete={'off'}
							value={school.name}
							onChange={handleSchoolNameChange}
							type={'text'}
							required
						/>
						<label htmlFor={'school-name'}>
							<span>Name</span>
						</label>
					</AnimatedLabeledInputDiv>
				</DataBaseControlControls>
				<ButtonRow>
					<LoadingButton onClick={handleSchoolSubmission}>
						Submit
					</LoadingButton>
				</ButtonRow>
			</DataBaseControlOption>
			<DataBaseControlOption>
				<DataBaseControlOptionTitle>
					Add skill
				</DataBaseControlOptionTitle>
				<DataBaseControlControls>
					<AnimatedLabeledInputDiv>
						<input
							name={'skill-name'}
							autoComplete={'off'}
							value={skill.name}
							onChange={handleSkillNameChange}
							type={'text'}
							required
						/>
						<label htmlFor={'skill-name'}>
							<span>Name</span>
						</label>
					</AnimatedLabeledInputDiv>
				</DataBaseControlControls>
				<ButtonRow>
					<LoadingButton onClick={handleSkillSubmission}>
						Submit
					</LoadingButton>
				</ButtonRow>
			</DataBaseControlOption>
			<DataBaseControlOption>
				<DataBaseControlOptionTitle>
					Add degree
				</DataBaseControlOptionTitle>
				<DataBaseControlControls>
					<AnimatedLabeledInputDiv>
						<input
							name={'degree'}
							autoComplete={'off'}
							value={degree.name}
							onChange={handleDegreeNameChange}
							type={'text'}
							required
						/>
						<label htmlFor={'degree'}>
							<span>Name</span>
						</label>
					</AnimatedLabeledInputDiv>
				</DataBaseControlControls>
				<ButtonRow>
					<LoadingButton onClick={handleDegreeSubmission}>
						Submit
					</LoadingButton>
				</ButtonRow>
			</DataBaseControlOption>
		</DataBaseControlDiv>
	);
};

export default DatabaseControl;
