import React, {
	Dispatch,
	SetStateAction,
	useRef,
} from 'react';
import Modal from '../Components/Modal';
import {
	CookieConsentAgreeButton,
	CookieConsentContainer,
	CookieConsentContent,
	CookieConsentExplanationDiv,
	CookieConsentList,
	CookieConsentOptionRow,
	CookieConsentRejectButton,
	CookieOption,
} from './Styles';

type CookieConsentPopupProps = {
	setShowCookieModal: Dispatch<SetStateAction<boolean>>;
};

const CookieConsentPopup: React.FC<CookieConsentPopupProps> = ({
	setShowCookieModal,
}) => {
	const inside = useRef<HTMLDivElement>(null);
	const close = () => {
		setShowCookieModal(false);
	};
	return (
		<Modal inside={inside} close={close}>
			<CookieConsentContainer>
				<CookieConsentContent>
					<CookieConsentExplanationDiv>
						Cookies
					</CookieConsentExplanationDiv>
					<CookieConsentList>
						<CookieOption
							checked={true}
							type={'checkBox'}
						/>
					</CookieConsentList>
					<CookieConsentOptionRow>
						<CookieConsentRejectButton>
							Reject all
						</CookieConsentRejectButton>
						<CookieConsentAgreeButton>
							Agree
						</CookieConsentAgreeButton>
					</CookieConsentOptionRow>
				</CookieConsentContent>
			</CookieConsentContainer>
		</Modal>
	);
};

export default CookieConsentPopup;
