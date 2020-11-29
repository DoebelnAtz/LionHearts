import React, {
	Component,
	PropsWithChildren,
	SetStateAction,
} from 'react';
import ReactQuill from 'react-quill';
import { QuillEditorDiv } from './Styles';

type QuillEditorProps = {
	onChange: (newState: string) => void;
	value: string;
	simple?: boolean;
};

class QuillEditor extends Component<QuillEditorProps> {
	private quillRef: ReactQuill | null | undefined;
	constructor(
		props: PropsWithChildren<
			Readonly<QuillEditorProps>
		>,
	) {
		super(props);
		this.state = { editorHtml: '', theme: 'snow' };
	}

	handleChange = (e: string) => {
		this.props.onChange(e);
	};

	imageHandler = (image: any, callback: any) => {
		if (this.quillRef) {
			let range = this.quillRef
				.getEditor()
				.getSelection();
			let value = prompt('What is the image URL');
			if (range)
				if (value) {
					this.quillRef
						.getEditor()
						.insertEmbed(
							range.index,
							'image',
							value,
							'user',
						);
				}
		}
	};

	render() {
		return (
			<QuillEditorDiv>
				<ReactQuill
					theme={'snow'}
					ref={(el) => (this.quillRef = el)}
					onChange={this.handleChange}
					value={this.props.value}
					formats={
						this.props.simple
							? [
									'font',
									'size',
									'bold',
									'italic',
									'underline',
									'strike',
									'blockquote',
									'list',
									'bullet',
									'indent',
									'link',
							  ]
							: [
									'header',
									'font',
									'size',
									'bold',
									'italic',
									'underline',
									'strike',
									'blockquote',
									'list',
									'bullet',
									'indent',
									'link',
									'image',
									'video',
							  ]
					}
					modules={{
						toolbar: {
							container: !this.props.simple
								? [
										[
											{ font: [] },
											{
												size: [
													'small',
													'normal',
													'large',
												],
											},
										],
										[
											'bold',
											'italic',

											'underline',
											'strike',
											'blockquote',
										],
										[
											{
												list:
													'ordered',
											},
											{
												list:
													'bullet',
											},
										],
										['link'],
								  ]
								: [
										[
											'link',
											'bold',
											'italic',
										],
										[
											{
												list:
													'ordered',
											},
											{
												list:
													'bullet',
											},
										],
								  ],
							handlers: {
								image: this.imageHandler,
							},
						},
					}}
				/>
			</QuillEditorDiv>
		);
	}
}

export default QuillEditor;
