import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useGet } from '../../../../Hooks';
import { Article, AuthoredArticle } from '../../../../@types';
import HomeImg from '../../Home/HomeImg';
import Footer from '../../../Footer';
import {
	ArticleContainer,
	ArticleContent,
	ArticleContentContainer,
	ArticleHeader,
	ArticleInfo,
	ArticleInfoCreator,
	ArticleInfoDate,
	BackToEventsButton,
	ButtonDiv,
	EventsDiv,
} from './Styles';
import { capitalizeFirst } from '../../../../Utils';
import arrowLeft from '../../../../assets/images/arrow_left.png';

const ArticlePage: React.FC = () => {
	const params = useParams<{ aid: string }>();
	const history = useHistory();
	const [article, setArticle] = useGet<AuthoredArticle>(
		`/articles-no-token/${params.aid}`,
	);

	return (
		<EventsDiv>
			<HomeImg text={'NEWS'} />
			<ArticleContainer>
				<ButtonDiv>
					<BackToEventsButton onClick={() => history.push('/news')}>
						<img src={arrowLeft} />
						<span>news</span>
					</BackToEventsButton>
				</ButtonDiv>
				<ArticleHeader>{article?.article.title}</ArticleHeader>
				<ArticleContentContainer>
					<ArticleInfo>
						<ArticleInfoDate>
							{article &&
								`${new Date(
									article?.article.published_date,
								).toDateString()} by `}
						</ArticleInfoDate>
						<ArticleInfoCreator>
							{article &&
								`${capitalizeFirst(
									article.author.firstname,
								)} ${capitalizeFirst(article.author.lastname)}`}
						</ArticleInfoCreator>
					</ArticleInfo>
					<ArticleContent
						dangerouslySetInnerHTML={{
							__html: article?.article.content,
						}}
					/>
				</ArticleContentContainer>
			</ArticleContainer>
			<Footer />
		</EventsDiv>
	);
};

export default ArticlePage;
