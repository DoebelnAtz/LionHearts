import styled from 'styled-components';
import { units, font, color, components } from '../../../../../Styles';

export const FileControlDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
`;

export const ImagePreviewCard = styled.div`
	margin: 5px;
	display: flex;
	background-color: ${color.BG2};
	padding: ${units.margin};
	flex-direction: column;
`;

export const ImagePreviewCardName = styled.div`
	${font.RBold};
	font-size: 16px;
	margin: ${units.margin} auto 0 auto;
`;

export const CopyImageHtml = styled.button`
	${components.buttonWhite};
	margin: ${units.margin} auto 0 auto;
	width: 100px;
`;

export const ImagePreview = styled.img`
	height: 100px;
	margin: 0 auto;
`;
