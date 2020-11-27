import React from 'react';
import { url } from '../../../config';
import HomeImg from '../Home/HomeImg';
import {
	CommunityContainer,
	CommunityDiv,
	LanguageIcon,
	LanguageList,
	SchoolItem,
} from './Styles';

import {
	Paragraph,
	UnorderedList,
	ListItem,
	Header2,
	Header3,
} from '../../../Styles';
import Footer from '../../Footer';
import { useGet } from '../../../Hooks';
import { Summary } from '../../../@types';

const Community: React.FC = () => {
	const [summary] = useGet<Summary>('/summary');

	const renderLanguages = () => {
		if (summary) {
			return summary.languages.map(
				(language, index) => {
					return (
						<LanguageIcon
							key={index}
							url={`${url}/api/languages/${language}.png`}
						/>
					);
				},
			);
		}
	};

	const renderSchools = () => {
		if (summary) {
			return summary.schools.map((school, index) => {
				return (
					<SchoolItem key={index}>
						{school}
					</SchoolItem>
				);
			});
		}
	};

	const renderFieldsOfStudy = () => {
		if (summary) {
			return summary.degrees.map((degree, index) => {
				return (
					<SchoolItem key={index}>
						{degree}
					</SchoolItem>
				);
			});
		}
	};

	return (
		<CommunityDiv>
			<HomeImg
				BGsrc={'qvidja_group.jpeg'}
				hash={
					'yWIEz[9Gt6spM{xua}.9V[IUIoNFNGR*~qWAM|RjM|WAWB_3NGs;oJWBj?js%MWBWARjWVM|ax%MjuR%Rkt6WCWBt7oLRja}j[ayWB'
				}
				text={'COMMUNITY'}
			/>
			<CommunityContainer>
				<Paragraph>
					We are a group of young, talented bright
					minds between the age of 18 to 28
					looking for different, even unexpected
					ways to implement our ideas and have an
					impact on the surrounding world
				</Paragraph>
				<Header2>A truly diverse group</Header2>
				<Header3>Languages Spoken:</Header3>
				<LanguageList>
					{renderLanguages()}
				</LanguageList>
				<Header3>Fields of study:</Header3>
				<UnorderedList>
					{renderFieldsOfStudy()}
				</UnorderedList>
				<Header3>Studying at:</Header3>
				<UnorderedList>
					{renderSchools()}
				</UnorderedList>
				<Header3>
					A lot of fascinating projects
				</Header3>
				<Paragraph>
					We undertake these throughout the year,
					where we can apply our skills and
					knowledge, while gaining insight into
					the professional world. We do so
					collectively, and within a wide range of
					topics:
				</Paragraph>
				<UnorderedList>
					<ListItem>
						An NGO wants to reach out to more
						young people and needs advice on a
						social media campaign{' '}
					</ListItem>
					<ListItem>
						A company would like to come up with
						new, more sustainable ways of
						production and needs help in their
						R/D department{' '}
					</ListItem>
					<ListItem>
						A clothing brand would like to make
						a focus group to get feedback on a
						new product before its launch{' '}
					</ListItem>
					<ListItem>
						A school wants our opinion on how to
						improve mental health in youth
						during the Covid 19 situation{' '}
					</ListItem>
				</UnorderedList>
				<Paragraph>
					At Lionhearts, we are never afraid of a
					challenge, and would form an awesome
					group to provide an answer to these
					issues TOGETHER{' '}
				</Paragraph>

				<Header3>Central social aspect</Header3>
				<Paragraph>
					We like to think as a group, but also to
					have fun as a group! The organization
					revolves around different events either
					in person or online, and completely free
					for our members. We also make sure to
					follow a precise schedule to comply with
					our members’ busy lives.
				</Paragraph>
				<Paragraph>Example of events</Paragraph>
				<UnorderedList>
					<ListItem>
						Visit to an organization’s premises
					</ListItem>
					<ListItem>
						Dinners, lunches, afternoon
						gatherings and picnics
					</ListItem>
					<ListItem>
						Meeting CEOs and other fascinating
						speakers
					</ListItem>
					<ListItem>
						Debates with current leaders and
						other online meetings
					</ListItem>
					<ListItem>
						Getting to know each other’s hobbies
						(cooking lessons, dance classes, art
						museum visits, piano concerts...)
					</ListItem>
				</UnorderedList>
				<Paragraph>
					All of the above are a great way to get
					to know the other members, create a wide
					network, and enrich yourself with new
					experiences!
				</Paragraph>
				<Header3>An academic aspect too!</Header3>
				<Paragraph>
					We like to promote in-depth reflection
					and encourage our members to share their
					ideas. Lionhearts is a platform for
					constructive criticism from other truly
					bright students, but also to publish
					your work to a much wider audience if
					you like! Therefore, we have an
					“articles” section where members can
					publish their writings on whichever
					topic they choose, including essays and
					other academic papers.
				</Paragraph>
			</CommunityContainer>
			<Footer />
		</CommunityDiv>
	);
};

export default Community;
