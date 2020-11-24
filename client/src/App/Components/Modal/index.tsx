import React, {
	RefObject,
	SyntheticEvent,
	useEffect,
} from 'react';
import {
	OutsideDiv,
	InsideDiv,
	ModalContent,
	ModalButtonsRow,
	CloseButton,
} from './Styles';
import { useWidth } from '../../../Hooks';

type ModalProps = {
	inside: RefObject<HTMLDivElement>;
	close: () => void;
};

const Modal: React.FC<ModalProps> = ({
	children,
	inside,
	close,
}) => {
	const [, isMobile] = useWidth();

	return (
		<OutsideDiv>
			<InsideDiv
				id={'modal-inside'}
				isMobile={isMobile}
				ref={inside}
			>
				<ModalButtonsRow>
					<CloseButton onClick={close}>
						<span>✕</span>
					</CloseButton>
				</ModalButtonsRow>
				<ModalContent id={'modal-content'}>
					{children}
				</ModalContent>
			</InsideDiv>
		</OutsideDiv>
	);
};

export default Modal;
