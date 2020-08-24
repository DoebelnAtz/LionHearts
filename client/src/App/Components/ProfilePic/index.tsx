import React from 'react';
import { ProfilePicture } from './Styles';

const ProfilePic: React.FC<{ src: string }> = ({ src }) => {
	return (
		<ProfilePicture
			src={`http://localhost:5000/api/files/profile_picture?fileName=${src}`}
		/>
	);
};

export default ProfilePic;
