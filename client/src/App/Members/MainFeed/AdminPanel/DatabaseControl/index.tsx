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

	const handleSkillNameChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setSkill({
			...skill,
			name: target.value,
		});
	};

	const handleLocationSubmission = async () => {
		return true;
	};

	const handleSchoolSubmission = async () => {
		return true;
	};

	const handleSkillSubmission = async () => {
		return true;
	};

	return (
		<DataBaseControlDiv>
			<DataBaseControlOption>
				<DataBaseControlOptionTitle>
					Add location
				</DataBaseControlOptionTitle>
				<DataBaseControlControls>
					<LabeledControlInput>
						Name:
						<input
							value={location.name}
							onChange={handleLocationNameChange}
							placeholder={'name'}
						/>
					</LabeledControlInput>
					<LabeledControlInput>
						latitude:
						<input
							value={location.latitude}
							onChange={handleLocationLatChange}
							placeholder={'latitude'}
						/>
					</LabeledControlInput>
					<LabeledControlInput>
						longitude:
						<input
							value={location.longitude}
							onChange={handleLocationLongChange}
							placeholder={'longitude'}
						/>
					</LabeledControlInput>
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
					<LabeledControlInput>
						Name:
						<input
							value={school.name}
							onChange={handleSchoolNameChange}
							placeholder={'name'}
						/>
					</LabeledControlInput>
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
					<LabeledControlInput>
						Name:
						<input
							value={skill.name}
							onChange={handleSkillNameChange}
							placeholder={'name'}
						/>
					</LabeledControlInput>
				</DataBaseControlControls>
				<ButtonRow>
					<LoadingButton onClick={handleSkillSubmission}>
						Submit
					</LoadingButton>
				</ButtonRow>
			</DataBaseControlOption>
		</DataBaseControlDiv>
	);
};

export default DatabaseControl;
