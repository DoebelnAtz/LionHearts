import React from 'react';

import { TextEditorDiv } from './Styles';

import TextOutput from './TextOutput';

type TextEditWindowProps = {
	editable: boolean;
	state: string;
	onChange: (arg0: string) => void;
	error?: boolean;
};

const TextEditor: React.FC<TextEditWindowProps> = ({
	editable,
	state,
	onChange,
	error = false,
}) => {
	return (
		<TextEditorDiv error={error}>
			<TextOutput editable={editable} state={state} onChange={onChange} />
		</TextEditorDiv>
	);
};

export default TextEditor;
