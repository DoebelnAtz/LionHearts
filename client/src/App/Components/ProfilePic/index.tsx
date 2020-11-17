import React from 'react';
import { ProfilePicture } from './Styles';
import { url } from '../../../config';
import ProfilePlaceHolder from '../../../assets/images/profile_placeholder.png';
const ProfilePic: React.FC<{ src: string | undefined }> = ({
	src,
}) => {
	return (
		<ProfilePicture
			src={src ? src : ProfilePlaceHolder}
			fallback={ProfilePlaceHolder}
		/>
	);
};

export default ProfilePic;
