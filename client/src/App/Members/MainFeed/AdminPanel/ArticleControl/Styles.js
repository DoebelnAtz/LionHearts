import styled from 'styled-components';
import { color, components, cursor, font, units } from '../../../../../Styles';
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
	margin: ${units.margin};
	height: 0px;
	overflow-y: hidden;
`;

export const ArticleListDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 ${units.margin};
`;

export const AddArticleTitleAuthor = styled.div`
	display: flex;
	width: 100%;
	margin: auto;
`;

export const AddArticleAuthor = styled.div`
	display: flex;
	margin: ${units.margin};
	flex-direction: column;
`;

export const AddArticleTitle = styled.label`
	${components.labeledInput};
	width: 50%;
	min-width: 140px;
`;

export const AddArticleContentTitle = styled.span`
	${font.DCBold};
	color: ${color.primary};
	font-size: 20px;
`;

export const SubmitButton = styled.button`
	margin-top: ${units.margin};
	${components.buttonWhite};
`;

export const AddArticleContentDiv = styled.div`
	width: 100%;
	height: 600px;
	overflow-y: auto;
	margin: 0 0 ${units.margin} 0;
`;
