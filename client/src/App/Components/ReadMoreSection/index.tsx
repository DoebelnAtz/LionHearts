import React, { useEffect, useRef, useState } from 'react';
import {
	ReadMoreContentContainer,
	ReadMoreSectionDiv,
	ReadMoreSpan,
} from './Styles';
import { useSpring } from 'react-spring';

type ReadMoreSectionProps = {
	previewHeight?: number;
};

const ReadMoreSection: React.FC<ReadMoreSectionProps> = ({
	previewHeight = 40,
	children,
}) => {
	const expandTarget = useRef<HTMLDivElement>(null);
	const [expand, setExpand] = useState(false);
	const [needsExpansion, setNeedsExpansion] = useState(
		true,
	);

	const expandSection = useSpring({
		maxHeight: expand
			? (expandTarget.current?.offsetHeight || 0) +
			  'px'
			: `${previewHeight}px`,
	});

	useEffect(() => {
		if (expandTarget.current) {
			if (
				previewHeight >
				expandTarget.current.offsetHeight
			) {
				setNeedsExpansion(false);
			} else {
				setNeedsExpansion(true);
			}
		}
	}, [expandTarget.current?.offsetHeight, previewHeight]);

	return (
		<>
			<ReadMoreSectionDiv
				id={'read-more'}
				expanded={expand || !needsExpansion}
				style={expandSection}
			>
				<ReadMoreContentContainer
					ref={expandTarget}
				>
					{children}
				</ReadMoreContentContainer>
			</ReadMoreSectionDiv>
			{needsExpansion && (
				<ReadMoreSpan
					onClick={() => setExpand(!expand)}
				>
					{`Read ${expand ? 'less' : 'more'}`}
				</ReadMoreSpan>
			)}
		</>
	);
};

export default ReadMoreSection;
