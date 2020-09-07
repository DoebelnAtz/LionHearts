import styled from 'styled-components';
import { color, components, font, units } from '../../../../../Styles';

export const ArticleControlDiv = styled.div`
	width: 100%;
`;

export const NewArticleButton = styled.div`
	width: 100%;
	background-color: gray;
`;

export const AddArticleDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: ${units.margin};
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
`;
