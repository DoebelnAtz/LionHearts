import styled from 'styled-components';
import { units, font, color, components } from '../../../../../Styles';

export const FileControlDiv = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: ${units.margin} auto;
	display: flex;
	flex-direction: column;
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

export const UploadFileDiv = styled.div`
	display: flex;
`;

export const UploadFileInput = styled.input`
	${components.input};
	margin: 0 5px;
`;

export const ErrorSpan = styled.span`
	color: red;
	${font.RBold};
`;

export const UploadFileButton = styled.button`
	${components.buttonWhite};
	margin-left: ${units.margin};
`;

export const ExistingFiles = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
`;

export const CopyImageHtml = styled.button`
	${components.buttonWhite};
	margin: ${units.margin} auto 0 auto;
	width: 120px;
`;

export const ImagePreview = styled.img`
	height: 100px;
	margin: 0 auto;
`;
