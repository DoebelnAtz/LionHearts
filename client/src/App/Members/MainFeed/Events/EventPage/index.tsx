import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	CreateCommentButton,
	CreateCommentDiv,
	CreateCommentEditor,
	EventPageCommentFeed,
	EventPageCommentSection,
	EventPageCreator,
	EventPageDiv,
	EventPageInfoDate,
	EventPageInfoDiv,
	EventPageInfoTitle,
	SubmitCommentButton,
} from './Styles';
import { useGet } from '../../../../../Hooks';
import { MemberEvent } from '../../../../../Types';
import { capitalizeFirst, getLocalTimeFormat } from '../../../../../Utils';
import QuillEditor from '../../../../Components/QuillEditor';
import {
	EventCommentContent,
	EventCommentDiv,
	EventCommentInfo,
} from './EventComment/Styles';
import { makeRequest } from '../../../../../Api';
import EventComment from './EventComment';
import { useSpring } from 'react-spring';

const EventPage: React.FC = () => {
	const params = useParams<{ eid: string }>();
	const [createComment, setCreateComment] = useState('');
	const [expandCommentCreator, setExpandCommentCreator] = useState(false);
	const [event, setEvent] = useGet<MemberEvent>(`/events/${params.eid}`);
	const expandCreateCommentSection = useSpring({
		height: expandCommentCreator ? '250px' : '40px',
	});
	const handleCreateCommentChange = (val: string) => {
		setCreateComment(val);
	};

	const handleCommentCreation = async () => {
		try {
			if (event) {
				let resp = await makeRequest('/events/create_comment', 'POST', {
					content: createComment,
					threadId: event.t_id,
				});
				resp &&
					setEvent({
						...event,
						comments: [resp.data, ...event.comments],
					});
			}
		} catch (e) {
			console.log(e);
		}
	};

	const renderComments = () => {
		return (
			event &&
			event.comments.map((comment) => {
				return <EventComment key={comment.c_id} comment={comment} />;
			})
		);
	};

	return (
		<EventPageDiv>
			{event && (
				<EventPageInfoDiv>
					<EventPageInfoTitle>{event.title}</EventPageInfoTitle>

					<EventPageInfoDate>
						{getLocalTimeFormat(event.time)}
					</EventPageInfoDate>
					<EventPageCreator>
						Created by: {capitalizeFirst(event?.firstname)}{' '}
						{capitalizeFirst(event?.lastname)}
					</EventPageCreator>
				</EventPageInfoDiv>
			)}
			<EventPageCommentSection>
				<CreateCommentDiv style={expandCreateCommentSection}>
					<CreateCommentButton
						onClick={() =>
							setExpandCommentCreator(!expandCommentCreator)
						}
					>
						{expandCommentCreator ? 'Cancel' : 'Create comment'}
					</CreateCommentButton>
					<CreateCommentEditor>
						<QuillEditor
							onChange={handleCreateCommentChange}
							value={createComment}
							simple={true}
						/>
					</CreateCommentEditor>
					<SubmitCommentButton onClick={handleCommentCreation}>
						Submit
					</SubmitCommentButton>
				</CreateCommentDiv>
				<EventPageCommentFeed>{renderComments()}</EventPageCommentFeed>
			</EventPageCommentSection>
		</EventPageDiv>
	);
};

export default EventPage;
