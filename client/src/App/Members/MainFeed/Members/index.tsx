import React, { ChangeEvent, useState } from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { Language, Option, Profile, Skill } from '../../../../@types';
import { useHistory } from 'react-router-dom';
import {
	ExpandFilterButtonLabel,
	ExpandFilterOptionsButton,
	ExpandFilterOptionsButtonArrowIcon,
	FilterOptionsDiv,
	FilterOptionsExpandable,
	MemberCardContent,
	MemberCardInfo,
	MemberCardLocation,
	MemberCardName,
	MemberCardPic,
	MemberCardPicContainer,
	MemberCardPicDiv,
	MemberCardStudy,
	MemberFilterLanguageDiv,
	MemberFilterSearchDiv,
	MemberFilterSkillsDiv,
	MemberListCard,
	MemberListDiv,
	MemberListFilterTitle,
	MemberListOptions,
	MemberListResultDiv,
	MemberSearchInput,
	SearchMembersInput,
} from './Styles';
import ProfilePic from '../../../Components/ProfilePic';
import DropDownComponent from '../../../Components/DropDown';
import { capitalizeFirst } from '../../../../Utils';
import { useSpring } from 'react-spring';
import ArrowRightBlue from '../../../../assets/images/arrow_right.png';

const MemberList: React.FC = () => {
	useNav('Members');
	const [skillFilter, setSkillFilter] = useState({ title: 'none', id: 0 });
	const [languageFilter, setLanguageFilter] = useState({
		title: 'none',
		id: 0,
	});
	const [expandFilter, setExpandFilter] = useState(true);
	const [search, setSearch] = useState('');
	const [members, setMembers] = useGet<Profile[]>(
		`/profiles?skill=${skillFilter.id}&language=${languageFilter.id}&search=${search}`,
	);

	const rotateArrowIcon = useSpring({
		config: { mass: 1, velocity: 10 },
		transform: expandFilter ? 'rotate(90deg)' : 'rotate(0deg)',
	});

	const expandSpring = useSpring({
		maxHeight: expandFilter ? '110px' : '0px',
	});

	const [skills, setSkills] = useGet<Skill[]>(`/skills`);

	const [languages, setLanguages] = useGet<Language[]>(
		'/profiles/languages?limit=100',
	);

	const history = useHistory();

	const handleMemberClick = (uid: number) => {
		history.push(`/members/profile/${uid}`);
	};

	const handleSearchChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;

		setSearch(target.value);
	};

	const handleSkillFilterChange = (newFilter: Option) => {
		console.log(newFilter);
		if (skills) {
			if (newFilter.option === skillFilter.title) {
				setSkillFilter({ title: 'none', id: 0 });
			} else {
				setSkillFilter({
					title: newFilter.option,
					id: newFilter.id || 0,
				});
			}
		}
	};

	const handleLanguageFilterChange = (newFilter: Option) => {
		if (skills) {
			if (newFilter.option === languageFilter.title) {
				setLanguageFilter({ title: 'none', id: 0 });
			} else {
				setLanguageFilter({
					title: newFilter.option,
					id: newFilter.id || 0,
				});
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
						<MemberCardPicDiv>
							<MemberCardPicContainer>
								<MemberCardPic>
									<ProfilePic src={member.profile_pic} />
								</MemberCardPic>
							</MemberCardPicContainer>
						</MemberCardPicDiv>
						<MemberCardContent>
							<MemberCardName>{`${member.firstname} ${member.lastname}`}</MemberCardName>
							<MemberCardInfo>
								<MemberCardStudy>
									{member.degree &&
										member.school &&
										`Studying ${
											member.degree
										} at ${capitalizeFirst(member.school)}`}
								</MemberCardStudy>
								<MemberCardLocation>{`Currently in ${capitalizeFirst(
									member.location,
								)}`}</MemberCardLocation>
							</MemberCardInfo>
						</MemberCardContent>
					</MemberListCard>
				);
			})
		);
	};

	return (
		<MemberListDiv>
			<MemberListOptions>
				<FilterOptionsDiv>
					<ExpandFilterOptionsButton
						onClick={() => setExpandFilter(!expandFilter)}
					>
						<ExpandFilterButtonLabel>
							Filters
						</ExpandFilterButtonLabel>
						<ExpandFilterOptionsButtonArrowIcon
							src={ArrowRightBlue}
							style={rotateArrowIcon}
							alt={'expandfilter'}
						/>
					</ExpandFilterOptionsButton>
					<FilterOptionsExpandable style={expandSpring}>
						<MemberFilterSearchDiv>
							<SearchMembersInput>
								<MemberListFilterTitle>
									Search:
								</MemberListFilterTitle>
								<MemberSearchInput
									value={search}
									onChange={handleSearchChange}
									placeholder={'search'}
								/>
							</SearchMembersInput>
						</MemberFilterSearchDiv>
						<MemberFilterSkillsDiv>
							<MemberListFilterTitle>
								Skills:{' '}
							</MemberListFilterTitle>
							<DropDownComponent
								state={skillFilter.title}
								setSelect={handleSkillFilterChange}
								optionList={[
									{ option: 'none', id: 0 },
									...(skills?.map((skill) => {
										return {
											option: skill.title,
											id: skill.s_id,
										};
									}) || []),
								]}
								width={'130px'}
								modalOverflow
								height={'22px'}
								withFilter
							/>
						</MemberFilterSkillsDiv>
						<MemberFilterLanguageDiv>
							<MemberListFilterTitle>
								Languages:{' '}
							</MemberListFilterTitle>
							<DropDownComponent
								state={languageFilter.title}
								setSelect={handleLanguageFilterChange}
								optionList={[
									{ option: 'none', id: 0 },
									...(languages?.map((language) => {
										return {
											option: language.name,
											id: language.language_id,
										};
									}) || []),
								]}
								width={'97px'}
								modalOverflow
								height={'22px'}
								withFilter
							/>
						</MemberFilterLanguageDiv>
					</FilterOptionsExpandable>
				</FilterOptionsDiv>
			</MemberListOptions>
			<MemberListResultDiv>{renderMembers()}</MemberListResultDiv>
		</MemberListDiv>
	);
};

export default MemberList;
