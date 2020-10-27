import styled from 'styled-components';
import { animated } from 'react-spring';
import { color, components, font, units } from '../../../../../Styles';

export const CreateEventDiv = styled.div`
	width: 100%;
	display: flex;

	flex-direction: column;
	${font.DCBold};
`;

export const EventCreationDiv = styled(animated.div)`
	width: 100%;
	display: flex;
	background-color: inherit;
	flex-direction: column;
	overflow-y: hidden;
`;

export const SelectedDateDiv = styled.div`
	width: 100%;
	height: 26px;
	display: flex;
`;

export const SelectedDateLabel = styled.span`
	margin: auto auto auto 0;
	${font.RReg};
	line-height: 14px;
	font-size: 14px;
`;

export const SelectedDateInfo = styled.span`
	${font.DCBold};
	margin: auto 0;
	color: ${color.primary};
`;

export const SelectedTimeDiv = styled.div`
	width: 100%;
	display: flex;
	height: 26px;
`;

export const SelectedTimeLabel = styled.span`
	margin: auto auto auto 0;
	${font.RReg};
	font-size: 14px;
`;

export const SelectedTimeInfo = styled.div``;

export const SelectTimeInput = styled.input`
	${components.input};
	width: 16px;
	height: 12px;
`;

export const SelectedTitleDiv = styled.div`
	width: 100%;
	display: flex;
	height: 26px;
`;

export const SelectedTitleLabel = styled.span`
	margin: auto auto auto 0;
	${font.RReg};
	font-size: 14px;
`;

export const SelectedTitleInfo = styled.input`
	${components.input};
	height: 14px;
`;

export const EventCreationForm = styled.div`
	width: calc(100% - ${units.margin} * 2);
	margin: 0 auto;
	background-color: #ffffff00;
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow-y: hidden;
	& > div {
		margin: 5px 0;
	}
`;

export const DateResult = styled.div`
	width: calc(100% - ${units.margin} * 2);
	font-size: 18px;
	margin: 0 auto;
	color: ${color.primary};
`;

export const TitleResult = styled.div`
	margin: auto auto 5px auto !important;
	padding: 10px 0 0 ${units.margin};
	width: calc(100% - ${units.margin});
	font-size: 18px;

	border-top: 1px solid ${color.BG2};
	color: ${color.primary};
`;

export const SubmitButton = styled.button`
	${components.buttonWhite};
	width: calc(100%);
	margin: 5px auto;
`;

export const CreateEventButton = styled.button`
	${components.buttonWhite};
	width: calc(100%);
	margin: auto;
`;
