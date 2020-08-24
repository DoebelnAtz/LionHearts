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
	ProfilePageInfo,
	ProfilePageName,
	ProfilePageNameDiv,
	ProfilePicture,
	ProfilePictureDiv,
} from './Styles';
import CogWheel from '../../../assets/images/cogwheel_blue.png';
import { checkUser } from '../../../Utils';

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
				{profile && checkUser(profile?.u_id) && (
					<EditProfileButton
						onClick={() => setEditing(!editing)}
						url={CogWheel}
					/>
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
					<ProfilePageBio>{profile && profile.bio}</ProfilePageBio>
				</ProfilePageBioDiv>
			</ProfilePageContent>
		</ProfilePageDiv>
	);
};

export default ProfilePage;
