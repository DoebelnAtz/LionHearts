import React, { ChangeEvent, useState } from 'react';
import {
	Link,
	useParams,
	useHistory,
} from 'react-router-dom';
import { useGet, useNav } from '../../../../Hooks';
import { url } from '../../../../config';
import {
	Degree,
	Language,
	Option,
	Profile,
	School,
	Skill,
} from '../../../../@types';
import {
	AddSkillButton,
	AddSkillDiv,
	AddSkillInput,
	ContactInfo,
	ContactInfoDiv,
	ContactLink,
	ContactTitle,
	CreateSkillDiv,
	DegreeList,
	TagItem,
	TagItemIcon,
	TagItemName,
	EditProfileButton,
	EditSocialMediaInput,
	LanguageCard,
	LanguageIcon,
	LanguageList,
	LanguageTitle,
	Location,
	LocationDiv,
	LogoutButton,
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
	ProfilePageLanguageDiv,
	ProfilePageLanguageTitle,
	ProfilePageName,
	ProfilePageNameDiv,
	ProfilePageSkillsDiv,
	ProfilePageSkillsTitle,
	ProfilePictureDiv,
	RemoveLangSpan,
	SkillDiv,
	SkillResults,
	SkillTitle,
	SocialMediaDiv,
	SocialMediaIcon,
	SocialMediaLink,
	StudySpan,
	AddDegreeDiv,
	AddDegreeInput,
	DegreeResultList,
	ProfilePageInfoDiv,
	ProfilePageTagDiv,
	ProfilePageInfoEditButtons,
	AddTagItem,
	TagItemList,
} from './Styles';
import CogWheel from '../../../../assets/images/cogwheel_blue.png';
import { checkUser, getLocal } from '../../../../Utils';
import { makeRequest } from '../../../../Api';
import TextEditor from '../../../Components/TextEditor';
import ProfilePic from '../../../Components/ProfilePic';
import DropDownComponent from '../../../Components/DropDown';
import { useSpring } from 'react-spring';
import LoadingButton from '../../../Components/LoadingButton';
import TwitterIcon from '../../../../assets/images/twitter_icon.png';
import InstagramIcon from '../../../../assets/images/ig_icon.png';
import LinkedinIcon from '../../../../assets/images/linkedin_icon.png';
import degreeIcon from '../../../../assets/images/degree.svg';
import studyIcon from '../../../../assets/images/studying.svg';
import locationIcon from '../../../../assets/images/location.svg';
import schoolIcon from '../../../../assets/images/school.svg';
import ExpandableInput from '../../../Components/ExpandableInput';
import AddDegreeButton from './AddDegreeButton';
import { color } from '../../../../Styles';

const ProfilePage: React.FC = () => {
	const params = useParams<{ uid: string }>();
	const history = useHistory();
	useNav('profile');
	const [editing, setEditing] = useState(false);
	const [degrees, setDegrees] = useGet<Degree[]>(
		'/profiles/degrees',
	);

	const [filteredDegrees, setFilteredDegrees] = useState(
		degrees,
	);
	const [schools, setSchools] = useGet<School[]>(
		'/profiles/schools',
	);

	const [filteredSchools, setFilteredSchools] = useState(
		schools,
	);

	const [degreeInput, setDegreeInput] = useState('');
	const [schoolInput, setSchoolInput] = useState('');

	const [languageSearch, setLanguageSearch] = useState(
		'',
	);
	const [languageResults, setLanguageResults] = useGet<
		Language[]
	>(
		`/profiles/languages?limit=20&filter=available&q=${languageSearch}`,
		languageSearch !== '',
	);

	const [skillSearch, setSkillSearch] = useState('');
	const [profile, setProfile] = useGet<Profile>(
		`/profiles/${params.uid}`,
	);
	const [locations, setLocations] = useGet<
		{ name: string; l_id: number }[]
	>('/profiles/locations');
	const [skillResults, setSkillResults] = useGet<Skill[]>(
		`/skills/search?q=${skillSearch.toLowerCase()}&limit=20&filter=available`,
		skillSearch !== '',
	);

	const [skills, setSkills] = useGet<Skill[]>(
		`/skills/${params.uid}`,
	);

	const handleDegreeInputChange = (newValue: string) => {
		console.log(degrees);
		console.log(filteredDegrees);
		if (newValue === '') {
			setFilteredDegrees([]);
		} else {
			setFilteredDegrees(
				degrees?.filter((degree) => {
					return (
						degree.name
							.toLowerCase()
							.includes(
								newValue.toLowerCase(),
							) &&
						!profile?.degrees.find(
							(d) => d.d_id === degree.d_id,
						)
					);
				}),
			);
		}
		setDegreeInput(newValue);
	};

	const handleSchoolInputChange = (newValue: string) => {
		console.log(schools);
		console.log(filteredSchools);
		if (newValue === '') {
			setFilteredSchools([]);
		} else {
			setFilteredSchools(
				schools?.filter((school) => {
					return (
						school.name
							.toLowerCase()
							.includes(
								newValue.toLowerCase(),
							) &&
						!profile?.schools.find(
							(s) => s.s_id === school.s_id,
						)
					);
				}),
			);
		}
		setSchoolInput(newValue);
	};

	const handleSkillSearchChange = (e: string) => {
		if (e === '') {
			setSkillResults([]);
		}
		setSkillSearch(e);
	};

	const handleSkillCreation = async () => {
		if (
			!(skillResults || []).find(
				(skill) =>
					skill.title.toLowerCase() ===
					skillSearch.toLowerCase(),
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
					await makeRequest(
						'/skills/add_skill',
						'POST',
						{
							userId: getLocal('user').user
								.u_id,
							skillId:
								createdSkill.data?.s_id,
						},
					);

					setSkills([
						...skills,
						createdSkill.data,
					]);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleSkillAddition = async (skill: Skill) => {
		try {
			if (skills && skillResults) {
				await makeRequest(
					'/skills/add_skill',
					'POST',
					{
						userId: getLocal('user').user.u_id,
						skillId: skill.s_id,
					},
				);
				setSkillResults(
					skillResults.filter(
						(rSkill) =>
							rSkill.s_id !== skill.s_id,
					),
				);
				setSkills([...skills, skill]);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleLanguageCreation = async () => {
		if (
			!(languageResults || []).find(
				(language) =>
					language.name.toLowerCase() ===
					skillSearch.toLowerCase(),
			)
		) {
			try {
				let createdLanguage = await makeRequest(
					'/profiles/create_language',
					'POST',
					{
						name: languageSearch,
					},
				);
				if (createdLanguage && skills) {
					await makeRequest(
						'/profiles/add_language',
						'POST',
						{
							userId: getLocal('user').user
								.u_id,
							languageId:
								createdLanguage.data
									?.language_id,
						},
					);
					profile &&
						setProfile({
							...profile,
							languages: [
								...profile?.languages,
								createdLanguage.data,
							],
						});
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleLanguageAddition = async (
		language: Language,
	) => {
		try {
			if (profile?.languages && languageResults) {
				await makeRequest(
					'/profiles/add_language',
					'POST',
					{
						userId: getLocal('user').user.u_id,
						languageId: language.language_id,
					},
				);
				setLanguageResults(
					languageResults.filter(
						(lang) =>
							lang.language_id !==
							language.language_id,
					),
				);
				setProfile({
					...profile,
					languages: [
						...profile.languages,
						language,
					],
				});
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

	const handleTwitterChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		if (profile) {
			setProfile({
				...profile,
				twitter: target.value,
			});
		}
	};

	const handleInstagramChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		if (profile) {
			setProfile({
				...profile,
				instagram: target.value,
			});
		}
	};

	const handleLinkedinChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		if (profile) {
			setProfile({
				...profile,
				linkedin: target.value,
			});
		}
	};

	const handleChangeSave = async () => {
		try {
			profile &&
				(await makeRequest(
					`/profiles/update_profile`,
					'PUT',
					{
						email: profile.email,
						bio: profile.bio,
						phone: profile.phone,
						location: profile.l_id,
						degree: profile.d_id,
						school: profile.s_id,
						twitter: profile.twitter,
						linkedin: profile.linkedin,
						instagram: profile.instagram,
					},
				));
			setEditing(false);
			return true;
		} catch (e) {
			console.log(e);
			return false;
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		history.push('/');
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

	const handleSchoolChange = (newSchool: Option) => {
		if (profile) {
			setProfile({
				...profile,
				school: newSchool.option,
				s_id: newSchool.id || 1,
			});
		}
	};

	const handleLanguageSearchChange = (e: string) => {
		if (e === '') {
			setLanguageResults([]);
		}
		setLanguageSearch(e);
	};

	const handleSkillRemoval = async (skillId: number) => {
		if (
			profile &&
			editing &&
			checkUser(profile?.u_id)
		) {
			try {
				await makeRequest(
					'/skills/remove_skill',
					'DELETE',
					{
						skillId: skillId,
					},
				);
				setSkills(
					skills?.filter(
						(skill) => skill.s_id !== skillId,
					),
				);
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleLanguageRemoval = async (
		languageId: number,
	) => {
		try {
			await makeRequest(
				'/profiles/remove_language',
				'DELETE',
				{
					languageId: languageId,
				},
			);
			profile &&
				setProfile({
					...profile,
					languages: profile?.languages.filter(
						(language) =>
							language.language_id !==
							languageId,
					),
				});
		} catch (e) {
			console.log(e);
		}
	};

	const handleDegreeRemoval = async (
		degreeId: number,
	) => {
		if (editing) {
			try {
				await makeRequest(
					'/profiles/remove_degree',
					'DELETE',
					{
						degreeId,
					},
				);
				profile &&
					setProfile({
						...profile,
						degrees: profile.degrees.filter(
							(degree) =>
								degree.d_id !== degreeId,
						),
					});
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleSchoolRemoval = async (
		schoolId: number,
	) => {
		if (editing) {
			try {
				await makeRequest(
					'/profiles/remove_school',
					'DELETE',
					{
						schoolId,
					},
				);
				profile &&
					setProfile({
						...profile,
						schools: profile.schools.filter(
							(school) =>
								school.s_id !== schoolId,
						),
					});
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleAddSchool = async (
		schoolId: number,
		name: string,
	) => {
		try {
			const addedSchool = await makeRequest(
				'/profiles/add_school',
				'POST',
				{
					schoolId,
				},
			);
			if (addedSchool?.data && profile) {
				setProfile({
					...profile,
					schools: [
						...profile.schools,
						{
							name,
							s_id: schoolId,
						},
					],
				});
				setEditing(false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleDegreeCreation = async () => {
		try {
			let createdDegree = await makeRequest(
				'/profiles/create_degree',
				'POST',
				{
					name: degreeInput,
				},
			);
			if (createdDegree?.data && filteredDegrees) {
				setFilteredDegrees([
					...filteredDegrees,
					createdDegree.data,
				]);
			}
		} catch (e) {}
	};

	const handleSchoolCreation = async () => {
		try {
			let createdSchool = await makeRequest(
				'/profiles/create_school',
				'POST',
				{
					name: schoolInput,
				},
			);
			if (createdSchool?.data && filteredSchools) {
				setFilteredSchools([
					...filteredSchools,
					createdSchool.data,
				]);
			}
		} catch (e) {}
	};

	const renderDegrees = () => {
		if (profile?.degrees) {
			return profile.degrees.map((degree) => (
				<TagItem
					key={degree.d_id}
					removable={editing}
					onClick={() =>
						handleDegreeRemoval(degree.d_id)
					}
				>
					<TagItemIcon
						src={
							degree.completed
								? degreeIcon
								: studyIcon
						}
					/>
					<TagItemName>{degree.name}</TagItemName>
				</TagItem>
			));
		}
	};

	const renderDegreeResults = () => {
		if (filteredDegrees && profile) {
			return filteredDegrees.map((degree) => (
				<AddDegreeButton
					name={degree.name}
					degreeId={degree.d_id}
					key={degree.d_id}
					profile={profile}
					setEditing={setEditing}
					setProfile={setProfile}
				/>
			));
		}
	};

	const renderSchools = () => {
		if (profile?.schools) {
			return profile.schools.map((school) => (
				<TagItem
					key={school.s_id}
					removable={editing}
					onClick={() =>
						handleSchoolRemoval(school.s_id)
					}
				>
					<TagItemIcon src={schoolIcon} />
					<TagItemName>{school.name}</TagItemName>
				</TagItem>
			));
		}
	};

	const renderSchoolResults = () => {
		if (filteredSchools && profile) {
			return filteredSchools.map((school) => (
				<AddTagItem
					onClick={() =>
						handleAddSchool(
							school.s_id,
							school.name,
						)
					}
				>
					<TagItemName>{school.name}</TagItemName>
				</AddTagItem>
			));
		}
	};

	const renderSkills = (sList: Skill[]) => {
		if (sList) {
			return sList.map((skill) => {
				return (
					<SkillDiv
						removable={
							profile &&
							editing &&
							checkUser(profile?.u_id)
						}
						onClick={() =>
							handleSkillRemoval(skill.s_id)
						}
						key={skill.s_id}
					>
						<SkillTitle>
							{skill.title}
						</SkillTitle>
					</SkillDiv>
				);
			});
		}
	};

	const renderLanguages = () => {
		return (
			profile &&
			profile.languages.map((language) => {
				return (
					<LanguageCard
						key={language.language_id}
					>
						<LanguageIcon
							url={`${url}/api/languages/${language.name}.png`}
						/>
						<LanguageTitle>
							{language.name}
						</LanguageTitle>
						{editing &&
							checkUser(profile?.u_id) && (
								<RemoveLangSpan
									onClick={() =>
										handleLanguageRemoval(
											language.language_id,
										)
									}
								>
									remove
								</RemoveLangSpan>
							)}
					</LanguageCard>
				);
			})
		);
	};

	const renderLanguageSearchResults = () => {
		if (languageResults) {
			return languageResults.map((language) => {
				return (
					<CreateSkillDiv
						onClick={() =>
							handleLanguageAddition(language)
						}
						key={language.language_id}
					>
						<SkillTitle>
							{language.name}
						</SkillTitle>
					</CreateSkillDiv>
				);
			});
		}
	};

	const renderSkillSearchResults = () => {
		if (skillResults) {
			return skillResults.map((skill) => {
				return (
					<CreateSkillDiv
						onClick={() =>
							handleSkillAddition(skill)
						}
						key={skill.s_id}
					>
						<SkillTitle>
							{skill.title}
						</SkillTitle>
					</CreateSkillDiv>
				);
			});
		}
	};

	return (
		<ProfilePageDiv>
			<ProfilePageInfo>
				<ProfilePageInfoDiv>
					{!editing && profile && (
						<ProfilePictureDiv>
							<ProfilePic
								mentor={profile.mentor}
								src={profile.profile_pic}
							/>
						</ProfilePictureDiv>
					)}
					<ProfilePageNameDiv>
						<ProfilePageName>
							{profile &&
								`${profile?.firstname}`}
						</ProfilePageName>
						<ProfilePageName>
							{profile &&
								`${profile?.lastname}`}
						</ProfilePageName>
					</ProfilePageNameDiv>
					<ProfilePageInfoEditButtons>
						{profile &&
							checkUser(profile.u_id) &&
							(profile && !editing ? (
								<ProfilePageEditButtons>
									<EditProfileButton
										onClick={() =>
											setEditing(
												!editing,
											)
										}
										url={CogWheel}
									/>
								</ProfilePageEditButtons>
							) : (
								<ProfilePageEditButtons>
									<LogoutButton
										onClick={
											handleLogout
										}
									>
										Log out
									</LogoutButton>
									<LoadingButton
										width={'66px'}
										height={'30px'}
										onClick={
											handleChangeSave
										}
									>
										<span>Save</span>
									</LoadingButton>
								</ProfilePageEditButtons>
							))}
					</ProfilePageInfoEditButtons>
				</ProfilePageInfoDiv>
				<ProfilePageTagDiv>
					<OccupationInfoDiv>
						<TagItemList>
							<DegreeList>
								{renderDegrees()}
								{profile &&
									checkUser(
										profile.u_id,
									) &&
									editing && (
										<ExpandableInput
											onChange={
												handleDegreeInputChange
											}
											value={
												degreeInput
											}
											height={'26px'}
										/>
									)}
							</DegreeList>
						</TagItemList>
						{editing && (
							<DegreeResultList>
								{!!degreeInput.length && (
									<AddTagItem
										onClick={
											handleDegreeCreation
										}
									>
										<TagItemName>{`Create degree "${degreeInput}"`}</TagItemName>
									</AddTagItem>
								)}
								{renderDegreeResults()}
							</DegreeResultList>
						)}
						<Location>
							{profile &&
							checkUser(profile.u_id) &&
							editing ? (
								<DropDownComponent
									state={profile.location}
									setSelect={(newLoc) =>
										handleLocationChange(
											newLoc,
										)
									}
									optionList={
										locations
											? locations.map(
													(
														loc,
													) => {
														return {
															option:
																loc.name,
															id:
																loc.l_id,
														};
													},
											  )
											: []
									}
									width={'200px'}
									height={'22px'}
								/>
							) : (
								<TagItemList>
									<LocationDiv>
										<TagItem>
											<TagItemIcon
												src={
													locationIcon
												}
											/>
											<TagItemName>
												{profile?.location.toLowerCase()}
											</TagItemName>
										</TagItem>
									</LocationDiv>
								</TagItemList>
							)}
						</Location>
						<TagItemList>
							<DegreeList>
								{renderSchools()}
								{profile &&
									checkUser(
										profile.u_id,
									) &&
									editing && (
										<ExpandableInput
											onChange={
												handleSchoolInputChange
											}
											value={
												schoolInput
											}
											height={'26px'}
										/>
									)}
							</DegreeList>
						</TagItemList>
						{editing && (
							<DegreeResultList>
								{!!schoolInput.length && (
									<AddTagItem
										onClick={
											handleSchoolCreation
										}
									>
										<TagItemName>{`Create school "${schoolInput}"`}</TagItemName>
									</AddTagItem>
								)}
								{renderSchoolResults()}
							</DegreeResultList>
						)}
					</OccupationInfoDiv>
					{/*{profile &&*/}
					{/*checkUser(profile.u_id) &&*/}
					{/*editing ? (*/}
					{/*	<OccupationInfoDiv>*/}
					{/*		<PlaceOfStudy editing={editing}>*/}
					{/*			/!*{!editing && (*!/*/}
					{/*			/!*	<StudySpan>*!/*/}
					{/*			/!*		{profile?.school &&*!/*/}
					{/*			/!*			`Studying at ${profile?.school}`}*!/*/}
					{/*			/!*	</StudySpan>*!/*/}
					{/*			/!*)}*!/*/}

					{/*			<DropDownComponent*/}
					{/*				state={*/}
					{/*					profile?.school ||*/}
					{/*					'Select school'*/}
					{/*				}*/}
					{/*				setSelect={(*/}
					{/*					newSchool,*/}
					{/*				) =>*/}
					{/*					handleSchoolChange(*/}
					{/*						newSchool,*/}
					{/*					)*/}
					{/*				}*/}
					{/*				optionList={*/}
					{/*					schools*/}
					{/*						? schools.map(*/}
					{/*								(*/}
					{/*									school,*/}
					{/*								) => {*/}
					{/*									return {*/}
					{/*										option:*/}
					{/*											school.name,*/}
					{/*										id:*/}
					{/*											school.s_id,*/}
					{/*									};*/}
					{/*								},*/}
					{/*						  )*/}
					{/*						: []*/}
					{/*				}*/}
					{/*				width={'200px'}*/}
					{/*				height={'22px'}*/}
					{/*			/>*/}
					{/*		</PlaceOfStudy>*/}
					{/*	</OccupationInfoDiv>*/}
					{/*) : null}*/}
				</ProfilePageTagDiv>
			</ProfilePageInfo>
			<ProfilePageContent id={'profile-content'}>
				<ProfilePageContactDiv id={'contact'}>
					<ContactTitle>CONTACT</ContactTitle>
					<ContactInfoDiv>
						{!editing ? (
							<ContactLink
								href={`mailto:${profile?.email}`}
							>
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
							<ContactLink
								href={`tel:${profile?.phone}`}
							>
								{profile?.phone}
							</ContactLink>
						) : (
							<ContactInfo
								disabled={!editing}
								onChange={handlePhoneChange}
								value={profile?.phone || ''}
							/>
						)}
						{(profile?.instagram ||
							editing) && (
							<SocialMediaDiv>
								<SocialMediaIcon
									onClick={() =>
										window.open(
											`https://instagram.com/${profile?.instagram}`,
											'_blank',
										)
									}
									src={InstagramIcon}
									alt={'instagram'}
								/>
								{editing ? (
									<EditSocialMediaInput
										value={
											profile?.instagram
										}
										onChange={
											handleInstagramChange
										}
									/>
								) : (
									<SocialMediaLink
										target={'_blank'}
										href={`https://instagram.com/${profile?.instagram}`}
									>
										{profile?.instagram}
									</SocialMediaLink>
								)}
							</SocialMediaDiv>
						)}
						{(profile?.twitter || editing) && (
							<SocialMediaDiv>
								<SocialMediaIcon
									onClick={() =>
										window.open(
											`https://twitter.com/${profile?.twitter}`,
											'_blank',
										)
									}
									src={TwitterIcon}
									alt={'twitter'}
								/>
								{editing ? (
									<EditSocialMediaInput
										value={
											profile?.twitter
										}
										onChange={
											handleTwitterChange
										}
									/>
								) : (
									<SocialMediaLink
										target={'_blank'}
										href={`https://twitter.com/${profile?.twitter}`}
									>
										{profile?.twitter}
									</SocialMediaLink>
								)}
							</SocialMediaDiv>
						)}
						{(profile?.linkedin || editing) && (
							<SocialMediaDiv>
								<SocialMediaIcon
									src={LinkedinIcon}
									alt={'linkedin'}
									onClick={() =>
										window.open(
											`https://www.linkedin.com/in/${profile?.linkedin}`,
											'_blank',
										)
									}
								/>
								{editing ? (
									<EditSocialMediaInput
										value={
											profile?.linkedin
										}
										onChange={
											handleLinkedinChange
										}
									/>
								) : (
									<SocialMediaLink
										target={'_blank'}
										href={`https://www.linkedin.com/in/${profile?.linkedin}`}
									>
										{profile?.linkedin}
									</SocialMediaLink>
								)}
							</SocialMediaDiv>
						)}
					</ContactInfoDiv>
				</ProfilePageContactDiv>
				<ProfilePageBioSkillsDiv id={'profile-bio'}>
					<ProfilePageBioTitle>
						BIO
					</ProfilePageBioTitle>
					<ProfilePageBio>
						{profile && (
							<TextEditor
								editable={editing}
								state={profile.bio}
								onChange={handleBioChange}
							/>
						)}
					</ProfilePageBio>
					<ProfilePageLanguageDiv>
						<ProfilePageLanguageTitle>
							Languages
						</ProfilePageLanguageTitle>
						<LanguageList>
							{renderLanguages()}
						</LanguageList>
						{editing && (
							<ExpandableInput
								height={'26px'}
								onChange={
									handleLanguageSearchChange
								}
								value={languageSearch}
							/>
						)}
						<SkillResults>
							{editing &&
								!!languageSearch.length && (
									<CreateSkillDiv
										disabled={(
											languageResults ||
											[]
										).find(
											(language) =>
												language.name.toLowerCase() ===
												languageSearch.toLowerCase(),
										)}
										onClick={
											handleLanguageCreation
										}
									>
										<SkillTitle>
											Add language: '
											{languageSearch}
											'
										</SkillTitle>
									</CreateSkillDiv>
								)}
							{editing &&
								renderLanguageSearchResults()}
						</SkillResults>
					</ProfilePageLanguageDiv>

					<ProfilePageSkillsTitle>
						Skills
					</ProfilePageSkillsTitle>
					<ProfilePageSkillsDiv>
						{skills && renderSkills(skills)}
					</ProfilePageSkillsDiv>
					{editing && (
						<ExpandableInput
							height={'26px'}
							onChange={
								handleSkillSearchChange
							}
							value={skillSearch}
						/>
					)}
					<SkillResults>
						{editing && !!skillSearch.length && (
							<CreateSkillDiv
								disabled={(
									skillResults || []
								).find(
									(skill) =>
										skill.title.toLowerCase() ===
										skillSearch.toLowerCase(),
								)}
								onClick={
									handleSkillCreation
								}
							>
								<SkillTitle>
									Add skill: '
									{skillSearch}'
								</SkillTitle>
							</CreateSkillDiv>
						)}
						{editing &&
							renderSkillSearchResults()}
					</SkillResults>
				</ProfilePageBioSkillsDiv>
			</ProfilePageContent>
		</ProfilePageDiv>
	);
};

export default ProfilePage;
