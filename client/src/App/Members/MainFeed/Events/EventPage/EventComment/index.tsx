import React, { useEffect, useState } from 'react';
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
} from './Styles';
import { Comment } from '../../../../../../Types';
import { capitalizeFirst, getLocalTimeFormat } from '../../../../../../Utils';
import ProfilePic from '../../../../../Components/ProfilePic';

import CommentIcon from '../../../../../../assets/images/forum.svg';
import { useSpring } from 'react-spring';
import { useGet } from '../../../../../../Hooks';
import { makeRequest } from '../../../../../../Api';
import { CreateCommentEditor, SubmitCommentButton } from '../Styles';
import QuillEditor from '../../../../../Components/QuillEditor';

type EventCommentProps = {
	comment: Comment;
};

const EventComment: React.FC<EventCommentProps> = ({ comment }) => {
	const [createComment, setCreateComment] = useState('');
	const [childComments, setChildComments] = useGet<Comment[]>(
		`/events/comments/${comment.t_id}`,
	);
	const [expandLength, setExpandLength] = useState('160px');
	const [expandCommentSection, setExpandCommentSection] = useState(false);
	const expandCommentSectionSpring = useSpring({
		height: expandCommentSection ? expandLength : '0px',
	});

	useEffect(() => {
		if (childComments && childComments.length > 0) {
			setExpandLength(`${160 + childComments.length * 60}px`);
		}
	}, [childComments]);

	const handleCreateCommentChange = (val: string) => {
		setCreateComment(val);
	};

	const handleCommentCreation = async () => {
		try {
			if (childComments) {
				let resp = await makeRequest('/events/create_comment', 'POST', {
					content: createComment,
					threadId: comment.t_id,
				});
				resp && setChildComments([...childComments, resp.data]);
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
						key={comment.c_id}
						className={'ql-editor'}
					>
						<EventChildCommentPicCol>
							<EventChildCommentProfilePic>
								<ProfilePic src={comment.profile_pic} />
							</EventChildCommentProfilePic>
						</EventChildCommentPicCol>
						<EventChildCommentContentCol>
							<EventCommentInfo>
								<EventCommentInfoUsername>
									{capitalizeFirst(comment.username)}
								</EventCommentInfoUsername>
								<EventCommentInfoDate>
									{getLocalTimeFormat(comment.created)}
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
						<ProfilePic src={comment.profile_pic} />
					</EventCommentProfilePic>
				</EventCommentPicCol>
				<EventCommentContentCol>
					<EventCommentInfo>
						<EventCommentInfoUsername>
							{capitalizeFirst(comment.username)}
						</EventCommentInfoUsername>
						<EventCommentInfoDate>
							{getLocalTimeFormat(comment.created)}
						</EventCommentInfoDate>
					</EventCommentInfo>
					<EventCommentContent
						dangerouslySetInnerHTML={{ __html: comment.content }}
					/>
					<EventCommentActionRow>
						<EventCommentReplyButton
							onClick={() =>
								setExpandCommentSection(!expandCommentSection)
							}
							src={CommentIcon}
						/>
					</EventCommentActionRow>
				</EventCommentContentCol>
			</EventCommentContainer>
			<EventCommentSection style={expandCommentSectionSpring}>
				<EventCommentEditor>
					<QuillEditor
						onChange={handleCreateCommentChange}
						value={createComment}
						simple={true}
					/>
				</EventCommentEditor>
				<SubmitCommentButton onClick={handleCommentCreation}>
					Submit
				</SubmitCommentButton>
				<EventCommentFeed
					height={`${(childComments?.length || 0) * 60}px`}
				>
					{renderComments()}
				</EventCommentFeed>
			</EventCommentSection>
		</EventCommentDiv>
	);
};

export default EventComment;
