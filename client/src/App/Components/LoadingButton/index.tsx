import React, { useState } from 'react';
import { SaveBtn } from './Styles';
import LoadingDots from '../Loading';
import { color } from '../../../Styles/';
import { useMounted } from '../../../Hooks';

type SaveButtonComponentProps = {
	onClick: (event: any) => Promise<boolean>;
	height?: string;
	width?: string;
	disabled?: boolean;
};

const LoadingButton: React.FC<SaveButtonComponentProps> = ({
	children,
	onClick,
	height,
	width,
	disabled = false,
}) => {
	const [saved, setSaved] = useState(false);
	const [error, setError] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const isMounted = useMounted();

	const handleClick = async (e: any) => {
		isMounted && setIsSaving(true);
		try {
			if (await onClick(e)) {
				if (isMounted.current) {
					setSaved(true);
					setIsSaving(false);
				}
				setTimeout(() => {
					isMounted.current && setSaved(false);
				}, 500);
			} else {
				if (isMounted.current) {
					setIsSaving(false);
					setError(true);
				}
				setTimeout(() => {
					isMounted.current && setError(false);
				}, 500);
			}
		} catch (e) {
			if (isMounted.current) {
				setIsSaving(false);
				setError(true);
			}
			setTimeout(() => {
				isMounted.current && setError(false);
			}, 500);
		}
	};

	return (
		<SaveBtn
			saved={saved}
			height={height}
			width={width}
			error={error}
			disabled={disabled}
			onClick={(e: any) => handleClick(e)}
		>
			{isSaving ? (
				<LoadingDots
					height={13}
					color={color.primary}
					cycleSpeed={200}
				/>
			) : (
				children
			)}
		</SaveBtn>
	);
};

export default LoadingButton;
