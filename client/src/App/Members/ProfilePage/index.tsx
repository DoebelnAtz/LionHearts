import React from 'react';
import { useParams } from 'react-router-dom';
import { useGet } from '../../../Hooks';
import { Profile } from '../../../Types';
import {
	ContactInfo,
	ContactInfoDiv,
	ContactTitle,
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

const ProfilePage: React.FC = () => {
	const params = useParams<{ uid: string }>();

	const [profile, setProfile] = useGet<Profile>(`/profile/${params.uid}`);

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
			</ProfilePageInfo>
			<ProfilePageContent>
				<ProfilePageContactDiv>
					<ContactTitle>CONTACT</ContactTitle>
					<ContactInfoDiv>
						<ContactInfo>{profile && profile.email}</ContactInfo>
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
