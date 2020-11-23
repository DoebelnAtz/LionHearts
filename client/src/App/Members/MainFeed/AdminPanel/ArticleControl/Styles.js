import styled from 'styled-components';
import {
	color,
	components,
	cursor,
	font,
	units,
} from '../../../../../Styles';
import { animated } from 'react-spring';

export const ArticleControlDiv = styled.div`
	width: 100%;
`;

export const NewArticleButton = styled.div`
	width: calc(100% - ${units.margin} * 2);
	background-color: ${color.BG1};
	margin: ${units.margin} auto;
	${font.DCBold};
	color: ${color.primary};
	height: 30px;
	font-size: 20px;
	line-height: 36px;
	text-align: center;
	${cursor.clickable};
	&:hover {
		background-color: ${color.BG2};
		transition: background-color 0.1s;
	}
`;

export const AddArticleDiv = styled(animated.div)`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 ${units.margin};
	height: 0px;
	display: flex;
	flex-shrink: 0;
	flex-direction: column;
	overflow-y: hidden;
`;

export const ArticleListDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 ${units.margin};
`;

export const AddArticleContainer = styled.div`
	width: calc(100% - ${units.margin} * 2);
`;

export const AddArticleInfo = styled.div`
	display: flex;
	width: 100%;
	flex-shrink: 0;

	margin: ${units.margin} auto;
`;

export const ArticleThumbnailBorder = styled.div`
	width: 80px;
	height: 80px;
	position: relative;
	z-index: 14;
	background-color: #ffffff00;
	border: 10px solid ${color.primary};
`;

export const ArticleThumbnailInput = styled.input`
	${components.input};
	max-width: calc(100% - 140px);
	flex-shrink: 0;
`;

export const ArticleOptionRow = styled.div`
	display: flex;
	width: 100%;
	flex-shrink: 0;
`;

export const ArticleEventTitle = styled.span`
	${font.DCBold};
	font-size: 20px;
	margin: auto ${units.margin} auto auto;
	color: ${color.primary};
`;

export const AddArticleThumbnail = styled.div`
	width: 100px;
	height: 100px;
	position: relative;
	z-index: 12;
`;

export const AddArticleTitleAuthor = styled.div`
	display: flex;
	width: calc(100% - 100px);
	margin: 0 auto auto auto;
	@media (max-width: ${units.mobile}) {
		flex-direction: column;
	}
`;

export const AddArticleAuthorTitle = styled.span`
	${font.DCBold};
	color: ${color.primary};
	font-size: 20px;
`;

export const PreviewDiv = styled.div`
    width: 100%;
    height: calc(100% - 24px);
        display: ${props => props.show ? 'inline' : 'none'};

`;

export const ParagraphListDiv = styled.div`
    display: ${props => props.show ? 'inline' : 'none'};
`;

export const AddParagraphButton = styled.button`
    ${components.buttonWhite};
    margin-bottom: ${units.margin};
`;

export const AddArticleAuthor = styled.div`
	display: flex;
	flex-direction: column;
	margin: ${units.margin} ${units.margin} auto auto;
	@media (max-width: ${units.mobile}) {
		flex-direction: row;
		margin-top: 20px;
		width: 100%;
		& ${AddArticleAuthorTitle} {
			margin-right: auto;
			margin-left: ${units.margin};
		}
	}
`;

export const AddArticleTitle = styled.label`
	${components.labeledInput};
	margin-top: ${units.margin};
	margin-left: ${units.margin};
	margin-right: ${units.margin};
	min-width: 140px;
	@media (max-width: ${units.mobile}) {
		flex-direction: row;
		line-height: 30px;
		margin: auto 0 auto ${units.margin};
		& input {
			margin-left: auto;
		}
	}
	& input {
		height: 26px;
		max-width: 140px;
	}
`;

export const AddArticleContentTitle = styled.span`
	${font.DCBold};
	margin-top: ${units.margin};
	color: ${color.primary};
	font-size: 20px;
`;

export const SubmitButton = styled.button`
	margin-top: ${units.margin};
	${components.buttonWhite};
`;

export const ArticleContentOptionsDiv = styled.div`
    width: 100%;
    margin-top: ${units.margin};
    margin-bottom: ${units.margin};
`;
export const AddArticleContentDiv = styled.div`
	width: 100%;
	height: calc(100%);
	overflow-y: auto;
	margin: 0 0 ${units.margin} 0;
`;
