import styled from 'styled-components';
import { color } from '../../../../Styles';

export const SummarySectionDiv = styled.div`
	width: 100%;
	min-height: 500px;
	background-color: white;
	display: flex;
	border-top: 10px solid ${color.secondary};
`;

export const SummaryColumns = styled.div`
	max-width: 1600px;
	width: 90%;
	margin: auto auto;
	display: flex;
	flex-direction: ${(props) => (props.isMobile ? 'column' : 'row')};
	padding: 20px;
	& div {
		margin: 0 auto;
	}
`;
