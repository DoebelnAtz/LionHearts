import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGet } from '../../../Hooks';
import { Profile } from '../../../Types';
import {
	ContactInfo,
	ContactInfoDiv,
	ContactTitle,
	EditProfileButton,
	Location,
	OccupationInfoDiv,
	PlaceOfStudy,
	ProfilePageBio,
	ProfilePageBioDiv,
	ProfilePageBioTitle,
	ProfilePageContactDiv,
	ProfilePageContent,
	ProfilePageDiv,
	ProfilePageEditButtons,
	ProfilePageInfo,
	ProfilePageName,
	ProfilePageNameDiv,
	ProfilePicture,
	ProfilePictureDiv,
} from './Styles';
import CogWheel from '../../../assets/images/cogwheel_blue.png';
import CheckMark from '../../../assets/images/check.png';
import CloseIcon from '../../../assets/images/close.png';
import { checkUser } from '../../../Utils';
import { makeRequest } from '../../../Api';
import TextEditor from '../../Components/TextEditor';

const ProfilePage: React.FC = () => {
	const params = useParams<{ uid: string }>();
	const [editing, setEditing] = useState(false);
	const [profile, setProfile] = useGet<Profile>(`/profiles/${params.uid}`);

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

	return (
		<ProfilePageDiv>
			<ProfilePageInfo>
				<ProfilePictureDiv>
					<ProfilePicture
						url={`http://localhost:5000/api/files/profile_picture?fileName=${profile?.profile_pic}`}
					/>
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
						<Location>Living in Helsinki</Location>
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
				<ProfilePageBioDiv>
					<ProfilePageBioTitle>BIO</ProfilePageBioTitle>
					{profile && (
						<TextEditor
							editable={editing}
							state={profile.bio}
							onChange={handleBioChange}
						/>
					)}
				</ProfilePageBioDiv>
			</ProfilePageContent>
		</ProfilePageDiv>
	);
};

export default ProfilePage;
