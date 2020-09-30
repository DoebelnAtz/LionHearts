import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGet, useNav } from '../../../../Hooks';
import { Option, Profile, Skill } from '../../../../Types';
import {
	AddSkillButton,
	AddSkillDiv,
	AddSkillHeader,
	AddSkillInput,
	ContactInfo,
	ContactInfoDiv,
	ContactLink,
	ContactTitle,
	CreateSkillDiv,
	EditProfileButton,
	Location,
	OccupationInfoDiv,
	PlaceOfStudy,
	ProfilePageBio,
	ProfilePageBioSkillsDiv,
	ProfilePageBioTitle,
	ProfilePageContactDiv,
	ProfilePageContent,
	ProfilePageDiv,
	ProfilePageEditButtons,
	ProfilePageInfo,
	ProfilePageName,
	ProfilePageNameDiv,
	ProfilePageSkillsDiv,
	ProfilePageSkillsTitle,
	ProfilePictureDiv,
	SkillDiv,
	SkillResults,
	SkillTitle,
} from './Styles';
import CogWheel from '../../../../assets/images/cogwheel_blue.png';
import CheckMark from '../../../../assets/images/check.png';
import CloseIcon from '../../../../assets/images/close.png';
import { checkUser, getLocal } from '../../../../Utils';
import { makeRequest } from '../../../../Api';
import TextEditor from '../../../Components/TextEditor';
import ProfilePic from '../../../Components/ProfilePic';
import DropDownComponent from '../../../Components/DropDown';
import { useSpring } from 'react-spring';

const ProfilePage: React.FC = () => {
	const params = useParams<{ uid: string }>();
	useNav('profile');
	const [editing, setEditing] = useState(true);
	const [skillSearch, setSkillSearch] = useState('');
	const [profile, setProfile] = useGet<Profile>(`/profiles/${params.uid}`);
	const [locations, setLocations] = useGet<{ name: string; l_id: number }[]>(
		'/profiles/locations',
	);
	const [skillResults, setSkillResults] = useGet<Skill[]>(
		`/skills/search?q=${skillSearch.toLowerCase()}&limit=20&filter=available`,
		skillSearch !== '',
	);
	const [addingSkill, setAddingSkill] = useState(false);

	const expandAddSkill = useSpring({
		width: addingSkill ? '100px' : '0px',
		padding: addingSkill ? '4px' : '0px',
		delay: addingSkill ? 100 : 0,
	});

	const expandAddSkillButton = useSpring({
		borderRadius: addingSkill ? '4px 0px 0px 4px' : '4px 4px 4px 4px',
		delay: addingSkill ? 0 : 400,
	});

	const [skills, setSkills] = useGet<Skill[]>(`/skills/${params.uid}`);

	const handleSkillSearchChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		if (target.value === '') {
			setSkillResults([]);
		}
		setSkillSearch(target.value);
	};

	const handleSkillCreation = async () => {
		if (
			!(skillResults || []).find(
				(skill) =>
					skill.title.toLowerCase() === skillSearch.toLowerCase(),
			)
		) {
			try {
				let createdSkill = await makeRequest(
					'/skills/create_skill',
					'POST',
					{
						title: skillSearch,
					},
				);
				if (createdSkill && skills) {
					await makeRequest('/skills/add_skill', 'POST', {
						userId: getLocal('user').user.u_id,
						skillId: createdSkill.data?.s_id,
					});

					setSkills([...skills, createdSkill.data]);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleSkillAddition = async (skill: Skill) => {
		try {
			if (skills && skillResults) {
				await makeRequest('/skills/add_skill', 'POST', {
					userId: getLocal('user').user.u_id,
					skillId: skill.s_id,
				});
				setSkillResults(
					skillResults.filter((rSkill) => rSkill.s_id !== skill.s_id),
				);
				setSkills([...skills, skill]);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleEmailChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		if (profile) {
			setProfile({
				...profile,
				email: target.value,
			});
		}
	};

	const handlePhoneChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		if (profile) {
			setProfile({
				...profile,
				phone: target.value,
			});
		}
	};

	const handleBioChange = (e: string) => {
		if (profile) {
			setProfile({
				...profile,
				bio: e,
			});
		}
	};

	const handleChangeSave = async () => {
		try {
			profile &&
				(await makeRequest(`/profiles/update_profile`, 'PUT', {
					email: profile.email,
					bio: profile.bio,
					phone: profile.phone,
					location: profile.l_id,
				}));
			setEditing(false);
		} catch (e) {
			console.log(e);
		}
	};

	const handleLocationChange = (newLocation: Option) => {
		if (profile) {
			setProfile({
				...profile,
				location: newLocation.option,
				l_id: newLocation.id || 1,
			});
		}
	};

	const renderSkills = (sList: Skill[]) => {
		if (sList) {
			return sList.map((skill) => {
				return (
					<SkillDiv key={skill.s_id}>
						<SkillTitle>{skill.title}</SkillTitle>
					</SkillDiv>
				);
			});
		}
	};

	const renderSkillSearchResults = () => {
		if (skillResults) {
			return skillResults.map((skill) => {
				return (
					<CreateSkillDiv
						onClick={() => handleSkillAddition(skill)}
						key={skill.s_id}
					>
						<SkillTitle>{skill.title}</SkillTitle>
					</CreateSkillDiv>
				);
			});
		}
	};

	return (
		<ProfilePageDiv>
			<ProfilePageInfo>
				<ProfilePictureDiv>
					<ProfilePic src={profile?.profile_pic} />
				</ProfilePictureDiv>
				<ProfilePageNameDiv>
					<ProfilePageName>
						{profile && `${profile?.firstname}`}
					</ProfilePageName>
					<ProfilePageName>
						{profile && `${profile?.lastname}`}
					</ProfilePageName>
					<OccupationInfoDiv>
						<PlaceOfStudy>
							Student at
							{profile && checkUser(profile.u_id) && editing ? (
								<DropDownComponent
									state={profile.location}
									setSelect={(newLoc) =>
										handleLocationChange(newLoc)
									}
									optionList={
										locations
											? locations.map((loc) => {
													return {
														option: loc.name,
														id: loc.l_id,
													};
											  })
											: []
									}
									width={'100px'}
									height={'22px'}
								/>
							) : (
								profile?.location
							)}
						</PlaceOfStudy>
						<Location>
							Living in{' '}
							{profile && checkUser(profile.u_id) && editing ? (
								<DropDownComponent
									state={profile.location}
									setSelect={(newLoc) =>
										handleLocationChange(newLoc)
									}
									optionList={
										locations
											? locations.map((loc) => {
													return {
														option: loc.name,
														id: loc.l_id,
													};
											  })
											: []
									}
									width={'100px'}
									height={'22px'}
								/>
							) : (
								profile?.location
							)}
						</Location>
					</OccupationInfoDiv>
				</ProfilePageNameDiv>
				{profile &&
					checkUser(profile.u_id) &&
					(profile && !editing ? (
						<ProfilePageEditButtons>
							<EditProfileButton
								onClick={() => setEditing(!editing)}
								url={CogWheel}
							/>
						</ProfilePageEditButtons>
					) : (
						<ProfilePageEditButtons>
							<EditProfileButton
								onClick={() => handleChangeSave()}
								url={CheckMark}
							/>
							<EditProfileButton
								onClick={() => setEditing(false)}
								url={CloseIcon}
							/>
						</ProfilePageEditButtons>
					))}
			</ProfilePageInfo>
			<ProfilePageContent id={'profile-content'}>
				<ProfilePageContactDiv id={'contact'}>
					<ContactTitle>CONTACT</ContactTitle>
					<ContactInfoDiv>
						{!editing ? (
							<ContactLink href={`mailto:${profile?.email}`}>
								{profile?.email}
							</ContactLink>
						) : (
							<ContactInfo
								disabled={!editing}
								onChange={handleEmailChange}
								value={profile?.email || ''}
							/>
						)}
						{!editing ? (
							<ContactLink href={`tel:${profile?.phone}`}>
								{profile?.phone}
							</ContactLink>
						) : (
							<ContactInfo
								disabled={!editing}
								onChange={handlePhoneChange}
								value={profile?.phone || ''}
							/>
						)}
					</ContactInfoDiv>
				</ProfilePageContactDiv>
				<ProfilePageBioSkillsDiv id={'profile-bio'}>
					<ProfilePageBioTitle>BIO</ProfilePageBioTitle>
					<ProfilePageBio>
						{profile && (
							<TextEditor
								editable={editing}
								state={profile.bio}
								onChange={handleBioChange}
							/>
						)}
					</ProfilePageBio>
					<ProfilePageSkillsTitle>Skills</ProfilePageSkillsTitle>
					<ProfilePageSkillsDiv>
						{skills && renderSkills(skills)}
					</ProfilePageSkillsDiv>
					{editing && (
						<AddSkillDiv>
							<AddSkillButton
								style={expandAddSkillButton}
								onClick={() => setAddingSkill(!addingSkill)}
							>
								{addingSkill ? '-' : '+'}
							</AddSkillButton>
							<AddSkillInput
								value={skillSearch}
								onChange={handleSkillSearchChange}
								style={expandAddSkill}
								placeholder={addingSkill ? 'search' : ''}
							/>
						</AddSkillDiv>
					)}
					<SkillResults>
						{!!skillSearch.length && (
							<CreateSkillDiv
								disabled={(skillResults || []).find(
									(skill) =>
										skill.title.toLowerCase() ===
										skillSearch.toLowerCase(),
								)}
								onClick={handleSkillCreation}
							>
								<SkillTitle>
									Add skill: '{skillSearch}'
								</SkillTitle>
							</CreateSkillDiv>
						)}
						{renderSkillSearchResults()}
					</SkillResults>
				</ProfilePageBioSkillsDiv>
			</ProfilePageContent>
		</ProfilePageDiv>
	);
};

export default ProfilePage;
