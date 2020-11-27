import React from 'react';
import {
	ProfilePicture,
	ProfilePictureContainer,
	ProfilePictureLabelContainer,
	ProfilePictureLabelIcon,
	ProfilePictureLabelSpan,
} from './Styles';
import { url } from '../../../config';
import ProfilePlaceHolder from '../../../assets/images/profile_placeholder.png';
import StarIcon from '../../../assets/images/star.svg';
import MemberIcon from '../../../assets/images/profile_icon.png';

const ProfilePic: React.FC<{
	src: string | undefined;
	mentor?: boolean;
}> = ({ src, mentor }) => {
	return (
		<ProfilePictureContainer>
			<ProfilePicture
				src={src ? src : ProfilePlaceHolder}
				fallback={ProfilePlaceHolder}
			/>
			{mentor && (
				<ProfilePictureLabelContainer>
					<ProfilePictureLabelSpan>
						{'mentor'}
					</ProfilePictureLabelSpan>
				</ProfilePictureLabelContainer>
			)}
		</ProfilePictureContainer>
	);
};

export default ProfilePic;
