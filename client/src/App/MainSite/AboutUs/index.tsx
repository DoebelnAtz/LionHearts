import React from 'react';
import HomeImg from '../Home/HomeImg';
import { AboutUsContainer, AboutUsDiv } from './Styles';
import Footer from '../../Footer';

const AboutUs: React.FC = () => {
	return (
		<AboutUsDiv>
			<HomeImg text={'ABOUT US'} />
			<AboutUsContainer>
				<p>
					Arising from these challenging times, inspired leaders from
					all over the globe are looking for newer, fresher
					perspectives in order to improve and pave the way for the
					generations to come. We want to answer to that call, as it
					is only by having different generations working hand in hand
					that the world can hope for a more equal, peaceful and
					sustainable tomorrow.{' '}
				</p>
				<p>
					Created by Co-Founders in 2019 under the initiative of Ia
					Adlercreutz and Max Mickelsson, Lionhearts is a bridge
					between these generations, empowering a group of young
					bright minds from multiple backgrounds to impact the
					professional environment and answer the challenges faced by
					today’s world.
				</p>
				<p>
					Contacted by different organizations, whether businesses or
					non-profit, our members will put their hearts into different
					projects that require innovative thinking, passion and
					creativity, and are open to any field, any time constraint,
					any scope of action. The aim always being to work together
					and provide feasible solutions or insights to challenges
					faced by professionals.
				</p>
				<p>
					As a reward for their hard work, our Lionhearts will enjoy
					privileged networking opportunities and work experience with
					some of the most renowned industries in the Nordic countries
					and attend exceptional event.
				</p>
				<p>
					However, for the Lionhearts this is more than just an
					organization. It is a unique platform to meet other young
					people from any background or field of expertise, from
					business students, Russian majors and political science
					graduates to software developers, artists and engineers. We
					believe that this community has value in its diversity, and
					can provide the right tools for a resilient mind to get out
					of their comfort zones and get the support from the other
					members to challenge their ideas and enrich themselves.
				</p>
				<p>
					To conclude, whether you are an organization wanting to
					collaborate with our members or a talented mind willing to
					have an impact on today’s society, you are welcome to visit
					our webpage to find out more about our activity, our
					community and contact us if you have any queries!
				</p>
			</AboutUsContainer>
			<Footer />
		</AboutUsDiv>
	);
};

export default AboutUs;
