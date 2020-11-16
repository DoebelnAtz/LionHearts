import React, {
	ChangeEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	EventCommentActionRow,
	EventCommentContainer,
	EventCommentContent,
	EventCommentContentCol,
	EventCommentDiv,
	EventCommentInfo,
	EventCommentInfoDate,
	EventCommentInfoUsername,
	EventCommentPicCol,
	EventCommentProfilePic,
	EventCommentReplyButton,
	EventCommentSection,
	EventCommentEditor,
	EventCommentFeed,
	EventChildCommentContainer,
	EventChildCommentProfilePic,
	EventChildCommentContentCol,
	EventChildCommentPicCol,
	EventCommentTextarea,
	EventCommentChildrenCounter,
} from './Styles';
import {
	ChildComment,
	Comment,
} from '../../../../../../@types';
import {
	capitalizeFirst,
	getLocalTimeFormat,
} from '../../../../../../Utils';
import ProfilePic from '../../../../../Components/ProfilePic';

import CommentIcon from '../../../../../../assets/images/forum.svg';
import { useSpring } from 'react-spring';
import { useGet } from '../../../../../../Hooks';
import { makeRequest } from '../../../../../../Api';
import {
	CreateCommentEditor,
	SubmitCommentButton,
} from '../Styles';
import QuillEditor from '../../../../../Components/QuillEditor';

type EventCommentProps = {
	comment: Comment;
};

const EventComment: React.FC<EventCommentProps> = ({
	comment,
}) => {
	const [createComment, setCreateComment] = useState('');
	const [commentChildren, setCommentChildren] = useState(
		comment.children,
	);
	const [childComments, setChildComments] = useGet<
		ChildComment[]
	>(`/events/child_comments/${comment.c_id}`);
	const expandTarget = useRef<HTMLDivElement>(null);
	const [
		expandCommentSection,
		setExpandCommentSection,
	] = useState(false);
	const expandCommentSectionSpring = useSpring({
		maxHeight: expandCommentSection
			? 136 +
			  (expandTarget.current?.offsetHeight || 1) +
			  'px'
			: '0px',
	});

	const handleCreateCommentChange = (val: string) => {
		setCreateComment(val);
	};

	const handleCommentCreation = async () => {
		try {
			if (childComments) {
				let resp = await makeRequest(
					'/events/create_child_comment',
					'POST',
					{
						content: createComment,
						parentId: comment.c_id,
					},
				);
				resp &&
					setChildComments([
						...childComments,
						resp.data,
					]);
				setCommentChildren(commentChildren + 1);
				setCreateComment('');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const renderComments = () => {
		return (
			childComments &&
			childComments.map((comment) => {
				return (
					<EventChildCommentContainer
						key={comment.cc_id}
						className={'ql-editor'}
					>
						<EventChildCommentPicCol>
							<EventChildCommentProfilePic>
								<ProfilePic
									src={
										comment.profile_pic
									}
								/>
							</EventChildCommentProfilePic>
						</EventChildCommentPicCol>
						<EventChildCommentContentCol>
							<EventCommentInfo>
								<EventCommentInfoUsername>
									{capitalizeFirst(
										comment.username,
									)}
								</EventCommentInfoUsername>
								<EventCommentInfoDate>
									{getLocalTimeFormat(
										comment.created,
									)}
								</EventCommentInfoDate>
							</EventCommentInfo>
							<EventCommentContent
								dangerouslySetInnerHTML={{
									__html: comment.content,
								}}
							/>
						</EventChildCommentContentCol>
					</EventChildCommentContainer>
				);
			})
		);
	};

	return (
		<EventCommentDiv className={'ql-editor'}>
			<EventCommentContainer>
				<EventCommentPicCol>
					<EventCommentProfilePic>
						<ProfilePic
							src={comment.profile_pic}
						/>
					</EventCommentProfilePic>
				</EventCommentPicCol>
				<EventCommentContentCol>
					<EventCommentInfo>
						<EventCommentInfoUsername>
							{capitalizeFirst(
								comment.username,
							)}
						</EventCommentInfoUsername>
						<EventCommentInfoDate>
							{getLocalTimeFormat(
								comment.created,
							)}
						</EventCommentInfoDate>
					</EventCommentInfo>
					<EventCommentContent
						dangerouslySetInnerHTML={{
							__html: comment.content,
						}}
					/>
					<EventCommentActionRow>
						<EventCommentChildrenCounter>
							{commentChildren}
						</EventCommentChildrenCounter>
						<EventCommentReplyButton
							onClick={() =>
								setExpandCommentSection(
									!expandCommentSection,
								)
							}
							src={CommentIcon}
						/>
					</EventCommentActionRow>
				</EventCommentContentCol>
			</EventCommentContainer>
			<EventCommentSection
				style={expandCommentSectionSpring}
			>
				<EventCommentFeed ref={expandTarget}>
					{renderComments()}
				</EventCommentFeed>
				<EventCommentEditor>
					<EventCommentTextarea
						value={createComment}
						onChange={(e: ChangeEvent) => {
							let target = e.target as HTMLTextAreaElement;
							handleCreateCommentChange(
								target.value,
							);
						}}
					/>
				</EventCommentEditor>
				<SubmitCommentButton
					onClick={handleCommentCreation}
				>
					Submit
				</SubmitCommentButton>
			</EventCommentSection>
		</EventCommentDiv>
	);
};

export default EventComment;
