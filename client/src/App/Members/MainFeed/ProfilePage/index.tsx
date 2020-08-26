import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGet } from '../../../../Hooks';
import { Profile, Skill } from '../../../../Types';
import {
	AddSkillButton,
	AddSkillDiv,
	AddSkillInput,
	ContactInfo,
	ContactInfoDiv,
	ContactTitle,
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
	SkillTitle,
} from './Styles';
import CogWheel from '../../../../assets/images/cogwheel_blue.png';
import CheckMark from '../../../../assets/images/check.png';
import CloseIcon from '../../../../assets/images/close.png';
import { checkUser } from '../../../../Utils';
import { makeRequest } from '../../../../Api';
import TextEditor from '../../../Components/TextEditor';
import ProfilePic from '../../../Components/ProfilePic';
import DropDownComponent from '../../../Components/DropDown';
import { useSpring } from 'react-spring';

const ProfilePage: React.FC = () => {
	const params = useParams<{ uid: string }>();
	const [editing, setEditing] = useState(true);
	const [profile, setProfile] = useGet<Profile>(`/profiles/${params.uid}`);
	const [locations, setLocations] = useGet<{ name: string; l_id: number }[]>(
		'/profiles/locations',
	);
	const [addingSkill, setAddingSkill] = useState(true);

	const expandAddSkill = useSpring({
		width: addingSkill ? '100px' : '0',
		padding: addingSkill ? '4px' : '0',
		delay: addingSkill ? 100 : 0,
	});

	const expandAddSkillButton = useSpring({
		borderRadius: addingSkill ? '4px 0px 0px 4px' : '4px 4px 4px 4px',
		delay: addingSkill ? 0 : 400,
	});

	const [skills, setSkills] = useGet<Skill[]>(`/skills/${params.uid}`);

	const [searchSkills, setSearchSkills] = useGet<Skill[]>(
		`/skills?filter=${params.uid}`,
		editing,
	);

	console.log(skills);

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
				}));
			setEditing(false);
		} catch (e) {
			console.log(e);
		}
	};

	const handleLocationChange = (newLocation: string) => {
		if (profile) {
			setProfile({
				...profile,
				location: newLocation,
			});
		}
	};

	const renderSkills = () => {
		if (skills) {
			return skills.map((skill) => {
				return (
					<SkillDiv key={skill.s_id}>
						<SkillTitle>{skill.title}</SkillTitle>
					</SkillDiv>
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
						<PlaceOfStudy>Student at Hive Helsinki</PlaceOfStudy>
						<Location>
							Living in{' '}
							{profile && editing ? (
								<DropDownComponent
									state={profile.location}
									setSelect={(newLoc) =>
										handleLocationChange(newLoc)
									}
									optionList={
										locations
											? locations.map((loc) => loc.name)
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
				{profile && checkUser(profile?.u_id) && !editing ? (
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
				)}
			</ProfilePageInfo>
			<ProfilePageContent>
				<ProfilePageContactDiv>
					<ContactTitle>CONTACT</ContactTitle>
					<ContactInfoDiv>
						<ContactInfo
							disabled={!editing}
							onChange={handleEmailChange}
							value={profile?.email || ''}
						/>
						<ContactInfo
							disabled={!editing}
							onChange={handlePhoneChange}
							value={profile?.phone || ''}
						/>
					</ContactInfoDiv>
				</ProfilePageContactDiv>
				<ProfilePageBioSkillsDiv>
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
						{renderSkills()}
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
								style={expandAddSkill}
								placeholder={'search'}
							/>
						</AddSkillDiv>
					)}
				</ProfilePageBioSkillsDiv>
			</ProfilePageContent>
		</ProfilePageDiv>
	);
};

export default ProfilePage;
