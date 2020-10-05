import React, { ChangeEvent, useState } from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { Option, Profile, Skill } from '../../../../@types';
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
	SearchMembersInput,
} from './Styles';
import ProfilePic from '../../../Components/ProfilePic';
import DropDownComponent from '../../../Components/DropDown';

const MemberList: React.FC = () => {
	useNav('Members');
	const [skillFilter, setSkillFilter] = useState(0);
	const [search, setSearch] = useState('');
	const [members, setMembers] = useGet<Profile[]>(
		`/profiles?skillFilter=${skillFilter}&search=${search}`,
	);
	const [skills, setSkills] = useGet<Skill[]>(`/skills`);

	const history = useHistory();

	const handleMemberClick = (uid: number) => {
		history.push(`/members/profile/${uid}`);
	};

	const handleSearchChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setSearch(target.value);
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

	const handleFilterChange = (newFilter: Option) => {
		if (skills) {
			if (
				newFilter.option === findCorrespondingFilterTitle(skillFilter)
			) {
				setSkillFilter(0);
			} else {
				let correspondingFilterId = skills.find(
					(skill) => skill.title === newFilter.option,
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
						{ option: 'none' },
						...(skills?.map((skill) => {
							return { option: skill.title };
						}) || []),
					]}
					width={'140px'}
					height={'22px'}
					withFilter
				/>
				<SearchMembersInput>
					<MemberListFilterTitle>Search:</MemberListFilterTitle>
					<input
						value={search}
						onChange={handleSearchChange}
						placeholder={'search'}
					/>
				</SearchMembersInput>
			</MemberListOptions>
			<MemberListResultDiv>{renderMembers()}</MemberListResultDiv>
		</MemberListDiv>
	);
};

export default MemberList;
