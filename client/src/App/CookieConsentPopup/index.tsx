import React, {
	Dispatch,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import cookie from 'cookie';
import Modal from '../Components/Modal';
import {
	CookieConsentAgreeButton,
	CookieConsentContainer,
	CookieConsentContent,
	CookieConsentExplanationDiv,
	CookieConsentList,
	CookieConsentOptionRow,
	CookieExplanationTableDiv,
	CookieLabel,
	CookieOptionMandatory,
	CookieOptionOptional,
	ReadMoreCookiesSpan,
} from './Styles';
import ExpandableDiv from '../Components/ExpandableDiv';
import {
	Header2,
	Table,
	TableCell,
	TableHead,
	TableRow,
} from '../../Styles';
import ReadMoreSection from '../Components/ReadMoreSection';

type CookieConsentPopupProps = {
	setShowCookieModal: Dispatch<SetStateAction<boolean>>;
};

const CookieConsentPopup: React.FC<CookieConsentPopupProps> = ({
	setShowCookieModal,
}) => {
	const inside = useRef<HTMLDivElement>(null);
	const close = () => {
		setCookieConsent();
		setShowCookieModal(false);
	};
	const [showOptional, setShowOptional] = useState(false);
	const [showNecessary, setShowNecessary] = useState(
		false,
	);

	const [
		statisticsBoxValue,
		setStatisticsBoxValue,
	] = useState(true);

	const handleCookieClick = () => {
		setStatisticsBoxValue(!statisticsBoxValue);
	};

	const handleExpandOptionalToggle = () => {
		setShowOptional(!showOptional);
	};

	const handleExpandNecessaryToggle = () => {
		setShowNecessary(!showNecessary);
	};

	const setCookieConsent = () => {
		document.cookie = cookie.serialize(
			'cookieCompliance',
			statisticsBoxValue ? 'true' : 'false',
			{
				maxAge: 60 * 60 * 24 * 365,
			},
		);
		console.log(document.cookie);
		console.log(cookie.parse(document.cookie));
	};

	return (
		<Modal inside={inside} close={close}>
			<CookieConsentContainer>
				<CookieConsentContent>
					<Header2>Cookies</Header2>
					<CookieConsentExplanationDiv
						id={'cookie-info'}
					>
						<ReadMoreSection previewHeight={70}>
							When you visit any website, it
							may store or retrieve
							information about your use of
							this site. This information is
							anonymous. However, because we
							respect your right to privacy,
							you can choose not to allow some
							types of cookies. By continuing
							to use this site you consent to
							the use of the selected cookies
							below.
						</ReadMoreSection>
					</CookieConsentExplanationDiv>
					<CookieConsentList>
						<CookieLabel>
							Strictly Necessary Cookies
							<CookieOptionMandatory
								checked={true}
								disabled
								type={'checkBox'}
							/>
						</CookieLabel>
						<ReadMoreCookiesSpan
							onClick={
								handleExpandNecessaryToggle
							}
						>
							Read more
						</ReadMoreCookiesSpan>
						<ExpandableDiv open={showNecessary}>
							<CookieExplanationTableDiv>
								<Table>
									<tbody>
										<TableRow>
											<TableHead>
												Domain
											</TableHead>
											<TableHead>
												Cookies
											</TableHead>
											<TableHead>
												Cookies used
											</TableHead>
											<TableHead>
												Lifespan
											</TableHead>
										</TableRow>
										<TableRow>
											<TableCell>
												lionhearts.com
											</TableCell>
											<TableCell>
												cookieCompliance
											</TableCell>
											<TableCell>
												First party
											</TableCell>
											<TableCell>
												365 days
											</TableCell>
										</TableRow>
									</tbody>
								</Table>
							</CookieExplanationTableDiv>
						</ExpandableDiv>
						<CookieLabel>
							Statistics Cookies
							<CookieOptionOptional
								checked={statisticsBoxValue}
								type={'checkBox'}
								onChange={handleCookieClick}
							/>
						</CookieLabel>
						<ReadMoreCookiesSpan
							onClick={
								handleExpandOptionalToggle
							}
						>
							Read more
						</ReadMoreCookiesSpan>
						<ExpandableDiv open={showOptional}>
							<CookieExplanationTableDiv>
								<Table>
									<tbody>
										<TableRow>
											<TableHead>
												Domain
											</TableHead>
											<TableHead>
												Cookies
											</TableHead>
											<TableHead>
												Cookies used
											</TableHead>
											<TableHead>
												Lifespan
											</TableHead>
										</TableRow>
										<TableRow>
											<TableCell>
												lionhearts.com
											</TableCell>
											<TableCell>
												_gat, _gid,
												_ga
											</TableCell>
											<TableCell>
												First party
											</TableCell>
											<TableCell>
												0 days, 1
												day, 730
												days
											</TableCell>
										</TableRow>
									</tbody>
								</Table>
							</CookieExplanationTableDiv>
						</ExpandableDiv>
					</CookieConsentList>
					<CookieConsentOptionRow>
						<CookieConsentAgreeButton
							onClick={close}
						>
							okay
						</CookieConsentAgreeButton>
					</CookieConsentOptionRow>
				</CookieConsentContent>
			</CookieConsentContainer>
		</Modal>
	);
};

export default CookieConsentPopup;
