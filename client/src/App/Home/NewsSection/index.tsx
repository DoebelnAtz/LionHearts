import React from 'react';
import { NewsHeader, NewsListDiv, NewsSectionDiv } from './Styles';

const NewsSection: React.FC = () => {
	return (
		<NewsSectionDiv>
			<NewsListDiv>
				<NewsHeader>NEWS!</NewsHeader>
			</NewsListDiv>
		</NewsSectionDiv>
	);
};

export default NewsSection;
