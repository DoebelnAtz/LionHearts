import React, { useState } from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { Profile, Skill } from '../../../../Types';
import { useHistory } from 'react-router-dom';
import {
	MemberCardContent,
	MemberCardName,
	MemberCardPic,
	MemberListCard,
	MemberListDiv,
	MemberListFilterTitle,
	MemberListOptions,
	MemberListResultDiv,
} from './Styles';
import ProfilePic from '../../../Components/ProfilePic';
import DropDownComponent from '../../../Components/DropDown';

const MemberList: React.FC = () => {
	useNav('Members');
	const [skillFilter, setSkillFilter] = useState(0);
	const [members, setMembers] = useGet<Profile[]>(
		`/profiles?skillFilter=${skillFilter}`,
	);
	const [skills, setSkills] = useGet<Skill[]>(`/skills`);

	const history = useHistory();

	const handleMemberClick = (uid: number) => {
		history.push(`/members/profile/${uid}`);
	};

	const findCorrespondingFilterTitle = (filterId: number) => {
		if (skills) {
			let correspondingFilterId = skills.find(
				(skill) => skill.s_id === filterId,
			);
			return correspondingFilterId?.title || 'none';
		}
		return 'none';
	};

	const handleFilterChange = (newFilter: string) => {
		if (skills) {
			if (newFilter === findCorrespondingFilterTitle(skillFilter)) {
				setSkillFilter(0);
			} else {
				let correspondingFilterId = skills.find(
					(skill) => skill.title === newFilter,
				);
				setSkillFilter(correspondingFilterId?.s_id || 0);
			}
		}
	};

	const renderMembers = () => {
		return (
			members &&
			members.map((member) => {
				return (
					<MemberListCard
						onClick={() => handleMemberClick(member.u_id)}
						key={member.u_id}
					>
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
			<MemberListOptions>
				<MemberListFilterTitle>Filter skills: </MemberListFilterTitle>
				<DropDownComponent
					state={findCorrespondingFilterTitle(skillFilter)}
					setSelect={handleFilterChange}
					optionList={[
						'none',
						...(skills?.map((skill) => skill.title) || []),
					]}
					width={'140px'}
					height={'22px'}
					withFilter
				/>
			</MemberListOptions>
			<MemberListResultDiv>{renderMembers()}</MemberListResultDiv>
		</MemberListDiv>
	);
};

export default MemberList;
