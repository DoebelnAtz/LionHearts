import React, { ChangeEvent, useState } from 'react';
import { useGet, useNav } from '../../../../Hooks';
import {
	Language,
	Option,
	Profile,
	Skill,
} from '../../../../@types';
import { useHistory } from 'react-router-dom';
import {
	DragIcon,
	DragIconLine,
	ExpandFilterButtonLabel,
	ExpandFilterOptionsButton,
	ExpandFilterOptionsButtonArrowIcon,
	FilterListContainer,
	FilterListDiv,
	FilterListDragHandle,
	FilterListHandleContainer,
	FilterOptionsContainer,
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
import { useSpring, animated, config } from 'react-spring';
import ArrowRightBlue from '../../../../assets/images/arrow_right.png';
import { useDrag } from 'react-use-gesture';

const MemberList: React.FC = () => {
	useNav('Members');
	const [skillFilter, setSkillFilter] = useState({
		title: 'none',
		id: 0,
	});
	const [languageFilter, setLanguageFilter] = useState({
		title: 'none',
		id: 0,
	});
	const [expandFilter, setExpandFilter] = useState(true);
	const [search, setSearch] = useState('');
	const [members, setMembers] = useGet<Profile[]>(
		`/profiles?skill=${skillFilter.id}&language=${languageFilter.id}&search=${search}`,
	);

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

	const handleLanguageFilterChange = (
		newFilter: Option,
	) => {
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
						onClick={() =>
							handleMemberClick(member.u_id)
						}
						key={member.u_id}
					>
						<MemberCardPicDiv>
							<MemberCardPicContainer>
								<MemberCardPic>
									<ProfilePic
										src={
											member.profile_pic
										}
									/>
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
										} at ${capitalizeFirst(
											member.school,
										)}`}
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

	const closedHeight = -240;
	const openHeight = -110;
	const [{ y }, set] = useSpring(() => ({
		y: closedHeight,
	}));

	const open = ({ canceled }: any) => {
		console.log('open');
		// when cancel is true, it means that the user passed the upwards threshold
		// so we change the spring config to create a nice wobbly effect
		set({
			y: openHeight,
			immediate: false,
			config: canceled
				? { friction: 19, tension: 200 }
				: config.stiff,
		});
	};
	const close = (velocity = 0) => {
		console.log('close');
		set({
			y: closedHeight,
			immediate: false,
			config: { ...config.stiff, velocity },
		});
	};

	const bind = useDrag(
		({
			last,
			first,
			dragging,
			vxvy: [, vy],
			movement: [, my],
			cancel,
			canceled,
		}) => {
			console.log(
				`last: ${last}\n`,
				`movement-Y: ${my}\n`,
				`speed-Y: ${vy}\n`,
				`is-dragging: ${dragging}\n`,
				`exceed-limit: ${my} / ${openHeight + 30}`,
				`closing: ${
					!dragging && my === openHeight
				}`,
			);
			// if the user drags up passed a threshold, then we cancel
			// the drag so that the sheet resets to its open position
			if (my > openHeight + 30 && cancel) {
				console.log('canceled');
				cancel();
			}

			// when the user releases the sheet, we check whether it passed
			// the threshold for it to close, or if we reset it to its open positino
			if (last) {
				if (vy < -0.5) {
					close(vy);
				} else if (vy > 0.5) {
					open(false);
				} else if (my < -200) {
					close();
				} else {
					open(false);
				}
			} else if (!dragging && my === openHeight) {
				close();
			} else if (!dragging && my === closedHeight) {
				open(true);
			}
			// when the user keeps dragging, we just move the sheet according to
			// the cursor position
			else {
				set({ y: my, immediate: true });
			}
		},
		{
			initial: () => [0, y.get()],
			filterTaps: true,
			bounds: { top: -240 },
			rubberband: true,
		},
	);
	return (
		<MemberListDiv>
			<MemberListOptions>
				<FilterListContainer />
				<FilterListDiv
					style={{
						y,
					}}
				>
					<FilterOptionsContainer>
						<MemberFilterSearchDiv>
							<SearchMembersInput>
								<MemberListFilterTitle>
									Search:
								</MemberListFilterTitle>
								<MemberSearchInput
									value={search}
									onChange={
										handleSearchChange
									}
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
								setSelect={
									handleSkillFilterChange
								}
								optionList={[
									{
										option: 'none',
										id: 0,
									},
									...(skills?.map(
										(skill) => {
											return {
												option:
													skill.title,
												id:
													skill.s_id,
											};
										},
									) || []),
								]}
								width={'134px'}
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
								setSelect={
									handleLanguageFilterChange
								}
								optionList={[
									{
										option: 'none',
										id: 0,
									},
									...(languages?.map(
										(language) => {
											return {
												option:
													language.name,
												id:
													language.language_id,
											};
										},
									) || []),
								]}
								width={'134px'}
								modalOverflow
								height={'22px'}
								withFilter
							/>
						</MemberFilterLanguageDiv>
					</FilterOptionsContainer>
					<FilterListDragHandle {...bind()}>
						<FilterListHandleContainer>
							<span>filters</span>
							<DragIcon>
								<DragIconLine />
								<DragIconLine />
								<DragIconLine />
							</DragIcon>
						</FilterListHandleContainer>
					</FilterListDragHandle>
				</FilterListDiv>

				<FilterOptionsDiv>
					{/*<ExpandFilterOptionsButton*/}
					{/*	onClick={() =>*/}
					{/*		setExpandFilter(!expandFilter)*/}
					{/*	}*/}
					{/*>*/}
					{/*	<ExpandFilterButtonLabel>*/}
					{/*		Filters*/}
					{/*	</ExpandFilterButtonLabel>*/}
					{/*	<ExpandFilterOptionsButtonArrowIcon*/}
					{/*		src={ArrowRightBlue}*/}
					{/*		style={rotateArrowIcon}*/}
					{/*		alt={'expandfilter'}*/}
					{/*	/>*/}
					{/*</ExpandFilterOptionsButton>*/}
					{/*<FilterOptionsExpandable*/}
					{/*	style={expandSpring}*/}
					{/*/>*/}
				</FilterOptionsDiv>
			</MemberListOptions>
			<MemberListResultDiv>
				{renderMembers()}
			</MemberListResultDiv>
		</MemberListDiv>
	);
};

export default MemberList;
