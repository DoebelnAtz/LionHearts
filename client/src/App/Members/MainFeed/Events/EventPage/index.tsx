import React, { ChangeEvent, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
	CreateCommentButton,
	CreateCommentDiv,
	CreateCommentEditor,
	DeleteEventButton,
	EditButton,
	EditButtonRow,
	EventPageCommentFeed,
	EventPageCommentSection,
	EventPageCreator,
	EventPageDiv,
	EventPageInfoDate,
	EventPageInfoDiv,
	EventPageInfoParticipants,
	EventPageInfoParticipantsIcon,
	EventPageInfoTitle,
	EventPageParticipantsDiv,
	SubmitCommentButton,
} from './Styles';
import { useGet, useNav } from '../../../../../Hooks';
import { MemberEvent } from '../../../../../@types';
import {
	capitalizeFirst,
	checkUser,
	getLocalTimeFormat,
} from '../../../../../Utils';
import QuillEditor from '../../../../Components/QuillEditor';
import MemberIcon from '../../../../../assets/images/memberlist.svg';
import { makeRequest } from '../../../../../Api';
import EventComment from './EventComment';
import { useSpring } from 'react-spring';
import { SaveBtn } from '../../../../Components/LoadingButton/Styles';
import LoadingButton from '../../../../Components/LoadingButton';
import ParticipantListModal from "./ParticipantListModal";

const EventPage: React.FC = () => {
	const params = useParams<{ eid: string }>();
	const [showParticipants, setShowParticipants] = useState(false);
	const history = useHistory();
	useNav('event');
	const [createComment, setCreateComment] = useState('');
	const [
		expandCommentCreator,
		setExpandCommentCreator,
	] = useState(false);
	const [event, setEvent] = useGet<MemberEvent>(
		`/events/${params.eid}`,
	);
	const expandCreateCommentSection = useSpring({
		height: expandCommentCreator ? '250px' : '40px',
	});
	const [editing, setEditing] = useState(false);
	const handleCreateCommentChange = (val: string) => {
		setCreateComment(val);
	};

	const handleEventTitleChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		event &&
			setEvent({ ...event, title: target.value });
	};

	const handleCommentCreation = async () => {
		try {
			if (event) {
				let resp = await makeRequest(
					'/events/create_comment',
					'POST',
					{
						content: createComment,
						eventId: event.e_id,
					},
				);
				resp &&
					setEvent({
						...event,
						comments: [
							resp.data,
							...event.comments,
						],
					});
				setCreateComment('');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleEventUpdate = async () => {
		try {
			if (event) {
				let resp = await makeRequest(
					'/events/update_event',
					'PUT',
					{
						title: event.title,
						eventId: event.e_id,
					},
				);
			}
			setEditing(false);
			return true;
		} catch (e) {
			console.log(e);
			setEditing(false);
			return false;
		}
	};

	const handleEventDeletion = async () => {
		if (
			event &&
			window.confirm(
				'Are you sure you want to delete this event?',
			)
		) {
			try {
				let resp = await makeRequest(
					'/events/delete_event',
					'DELETE',
					{
						eventId: event.e_id,
					},
				);
				history.push('/members/list');
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		}
	};

	const renderComments = () => {
		return (
			event &&
			event.comments.map((comment) => {
				return (
					<EventComment
						key={comment.c_id}
						comment={comment}
					/>
				);
			})
		);
	};

	return (
		<EventPageDiv>
			{showParticipants && event && <ParticipantListModal event={event} setEvent={setEvent} setShowParticipants={setShowParticipants}/>}
			{event && (
				<>
					<EventPageInfoDiv>
						<EditButtonRow>
							<EventPageInfoTitle
								disabled={!editing}
								value={event.title}
								onChange={
									handleEventTitleChange
								}
							/>
							{editing &&
								checkUser(event.u_id) && (
									<DeleteEventButton
										onClick={
											handleEventDeletion
										}
									>
										delete
									</DeleteEventButton>
								)}
							{checkUser(event.u_id) &&
								(editing ? (
									<LoadingButton
										onClick={
											handleEventUpdate
										}
										height={'30px'}
									>
										save
									</LoadingButton>
								) : (
									<EditButton
										onClick={() =>
											setEditing(
												!editing,
											)
										}
									>
										edit
									</EditButton>
								))}
						</EditButtonRow>

						<EventPageInfoDate>
							{getLocalTimeFormat(event.time)}
						</EventPageInfoDate>
						<EventPageCreator>
							Created by:{' '}
							{capitalizeFirst(
								event?.firstname,
							)}{' '}
							{capitalizeFirst(
								event?.lastname,
							)}
						</EventPageCreator>
						<EventPageParticipantsDiv onClick={() => setShowParticipants(true)}>
							<EventPageInfoParticipantsIcon
								src={MemberIcon}
								alt={'participants'}
							/>
							<EventPageInfoParticipants>
								{event?.participants.length}
							</EventPageInfoParticipants>
						</EventPageParticipantsDiv>
					</EventPageInfoDiv>
				</>
			)}
			<EventPageCommentSection>
				<CreateCommentDiv
					style={expandCreateCommentSection}
				>
					<CreateCommentButton
						onClick={() =>
							setExpandCommentCreator(
								!expandCommentCreator,
							)
						}
					>
						{expandCommentCreator
							? 'Cancel'
							: 'Create comment'}
					</CreateCommentButton>
					<CreateCommentEditor>
						<QuillEditor
							onChange={
								handleCreateCommentChange
							}
							value={createComment}
							simple={true}
						/>
					</CreateCommentEditor>
					<SubmitCommentButton
						onClick={handleCommentCreation}
					>
						Submit
					</SubmitCommentButton>
				</CreateCommentDiv>
				<EventPageCommentFeed>
					{renderComments()}
				</EventPageCommentFeed>
			</EventPageCommentSection>
		</EventPageDiv>
	);
};

export default EventPage;
