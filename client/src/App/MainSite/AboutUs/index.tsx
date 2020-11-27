import React, { useEffect, useRef, useState } from 'react';
import HomeImg from '../Home/HomeImg';
import {
	AboutUsContainer,
	AboutUsDiv,
	AboutUsParagraph,
	AboutUsVideo,
	AboutUsVideoSection,
	ParagraphHeader,
	SectionContainer,
	VideoPlayerControlsRow,
} from './Styles';
import Footer from '../../Footer';
import { Paragraph, Header2 } from '../../../Styles';
import AboutUsLHVideo from '../../../assets/videos/Lionhearts.m4v';
import useVisibility, { useWidth } from '../../../Hooks';
import ToggleMuteButton from '../../Components/ToggleMuteButton';

let AboutUs: React.FC;
AboutUs = () => {
	const [isVisible, ref] = useVisibility();
	const [isMobile] = useWidth();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [muted, setMuted] = useState(true);
	useEffect(() => {
		if (isVisible && videoRef.current && !isMobile) {
			videoRef.current.play();
			videoRef.current.volume = 0.5;
		} else if (!isVisible && videoRef.current) {
			videoRef.current.pause();
		}
	}, [isVisible]);

	const handleMuteToggle = () => {
		setMuted(!muted);
	};

	return (
		<AboutUsDiv>
			<HomeImg
				BGsrc={'lh_presentation.jpg'}
				text={'ABOUT US'}
				hash={
					'VlJuAYIARhR*WF~qWBIUf5kDofj[WBayWBRjjtflj]ae'
				}
			/>
			<AboutUsContainer>
				<SectionContainer>
					<Header2>Why do we exist?</Header2>
					<Paragraph>
						In these challenging times, inspired
						leaders from all over the globe are
						looking for newer, fresher
						perspectives in order to improve and
						pave the way for the generations to
						come. We want to answer that call,
						as it is only by having different
						generations working hand in hand
						that the world can hope for a more
						equal, peaceful and sustainable
						tomorrow.
					</Paragraph>
				</SectionContainer>
				<SectionContainer>
					<Header2>How do we work?</Header2>

					<Paragraph>
						Lionhearts was created by the
						strategy consultancy Co-Founders in
						2019 and its partners Ia Adlercreutz
						and Max Mickelsson. Co-founders is
						committed to supporting our
						community by offering a platform for
						us to bring our best ideas to life.
						Empowering young bright minds,
						Co-founders also facilitates the
						collaborative work between
						Lionhearts and different
						organizations and professionals
						across multiple sectors.
					</Paragraph>
				</SectionContainer>
				<SectionContainer>
					<Header2>What do we do?</Header2>
					<Paragraph>
						We put our hearts into different
						projects, both business and
						non-profit, that require innovative
						ideas, fresh thinking and passionate
						creativity. We are open to any
						field, any time frame, and nearly
						any scope of action. Well-managed
						projects are always guided by the
						collaborative principle and the aim
						to provide new insights or feasible
						solutions to the challenges seasoned
						professionals face. Some projects
						will be done pro-bono, others will
						be performed in exchange for
						compensation. A part of the
						compensation will be channeled to
						Co-founders while the majority will
						go back to the Lionhearts Community.
					</Paragraph>
				</SectionContainer>
				<AboutUsVideoSection ref={ref}>
					<AboutUsVideo
						controls
						muted={muted}
						ref={videoRef}
					>
						<source src={AboutUsLHVideo} />
					</AboutUsVideo>
					<VideoPlayerControlsRow>
						<ToggleMuteButton
							muted={muted}
							onClick={handleMuteToggle}
						/>
					</VideoPlayerControlsRow>
				</AboutUsVideoSection>
				<SectionContainer>
					<Header2>
						What makes us special?
					</Header2>
					<Paragraph>
						At Lionhearts, we get to enjoy
						exclusive networking opportunities
						and gain valuable experience when
						working together with some of the
						most renowned professionals and
						frontrunner industries in the
						Nordics. In addition, we get to
						attend exceptional events and get
						our tickets covered. For our
						members, this is a unique platform
						to meet other young people from any
						background or field of expertise,
						from business students, Russian
						majors and political science
						graduates to software developers,
						artists and engineers. We believe
						that this community has value in its
						diversity, and that it can provide
						the right tools for resilient minds
						to get out of their comfort zones
						and get the support from other
						members to challenge their ideas and
						further enrich themselves.
					</Paragraph>
				</SectionContainer>
				<SectionContainer>
					<Header2>
						Excited to have you here!
					</Header2>

					<Paragraph>
						Whether you are an organization
						wanting to collaborate with us or a
						talented mind willing to have an
						impact on Society and beyond, we are
						happy that you are visiting our
						website. Delve deeper into our
						activities, events, and articles,
						and contact us if you have any
						queries. We look forward to hearing
						from you!
					</Paragraph>
				</SectionContainer>
			</AboutUsContainer>
			<Footer />
		</AboutUsDiv>
	);
};

export default AboutUs;
