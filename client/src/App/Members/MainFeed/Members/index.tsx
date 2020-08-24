import React from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { Profile } from '../../../../Types';
import {
	MemberCardContent,
	MemberCardName,
	MemberCardPic,
	MemberListCard,
	MemberListDiv,
	MemberListOptions,
	MemberListResultDiv,
} from './Styles';
import ProfilePic from '../../../Components/ProfilePic';

const MemberList: React.FC = () => {
	useNav('Members');
	const [members, setMembers] = useGet<Profile[]>('/profiles/');

	const renderMembers = () => {
		return (
			members &&
			members.map((member) => {
				return (
					<MemberListCard>
						<MemberCardPic>
							<ProfilePic src={member.profile_pic} />
						</MemberCardPic>
						<MemberCardContent>
							<MemberCardName>{`${member.firstname} ${member.lastname}`}</MemberCardName>
						</MemberCardContent>
					</MemberListCard>
				);
			})
		);
	};

	return (
		<MemberListDiv>
			<MemberListOptions></MemberListOptions>
			<MemberListResultDiv>{renderMembers()}</MemberListResultDiv>
		</MemberListDiv>
	);
};

export default MemberList;
