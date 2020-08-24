import React from 'react';
import { ProfilePicture } from './Styles';
import { url } from '../../../config.json';
import ProfilePlaceHolder from '../../../assets/images/profile_placeholder.png';
const ProfilePic: React.FC<{ src: string | undefined }> = ({ src }) => {
	return (
		<ProfilePicture
			src={
				src
					? `${url}/api/files/profile_picture?fileName=${src}`
					: ProfilePlaceHolder
			}
		/>
	);
};

export default ProfilePic;
