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
	CookieLabel,
	CookieOptionMandatory,
	CookieOptionOptional,
} from './Styles';

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
	const [
		statisticsBoxValue,
		setStatisticsBoxValue,
	] = useState(true);

	console.log(document);
	const handleCookieClick = () => {
		setStatisticsBoxValue(!statisticsBoxValue);
	};

	const setCookieConsent = () => {
		document.cookie = cookie.serialize(
			'cookieCompliance',
			statisticsBoxValue ? 'true' : 'false',
			{
				maxAge: 60 * 60 * 24 * 7 * 52,
			},
		);
		console.log(document.cookie);
		console.log(cookie.parse(document.cookie));
	};

	return (
		<Modal inside={inside} close={close}>
			<CookieConsentContainer>
				<CookieConsentContent>
					<CookieConsentExplanationDiv>
						When you visit any website, it may
						store or retrieve information about
						your use of this site. This
						information is anonymous. However,
						because we respect your right to
						privacy, you can choose not to allow
						some types of cookies. By continuing
						to use this site you consent to the
						use of the selected cookies below.
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
						<CookieLabel>
							Statistics Cookies
							<CookieOptionOptional
								checked={statisticsBoxValue}
								type={'checkBox'}
								onChange={handleCookieClick}
							/>
						</CookieLabel>
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
