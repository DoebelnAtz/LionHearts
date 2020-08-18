import React, { ChangeEvent, useState } from 'react';
import {
	CreateEventButton,
	CreateEventDiv,
	DateResult,
	EventCreationDiv,
	EventCreationForm,
	SelectedDateDiv,
	SelectedDateInfo,
	SelectedDateLabel,
	SelectedTimeDiv,
	SelectedTimeInfo,
	SelectedTimeLabel,
	SelectedTitleDiv,
	SelectedTitleInfo,
	SelectedTitleLabel,
	SelectTimeInput,
	SubmitButton,
} from './Styles';
import { useSpring } from 'react-spring';
import { makeRequest } from '../../../../Api';

type CreateEventProps = {
	selectedDay: Date | null;
};

const CreateEvent: React.FC<CreateEventProps> = ({ selectedDay }) => {
	const [expanded, setExpanded] = useState(true);
	const [hour, setHour] = useState<string>('12');
	const [minute, setMinute] = useState<string>('00');
	const [title, setTitle] = useState<string>('');
	const expandDiv = useSpring({ height: expanded ? '230px' : '0px' });

	const handleHourChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setHour(target.value);
	};

	const handleMinuteChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setMinute(target.value);
	};
	const handleTitleChange = (e: ChangeEvent) => {
		let target = e.target as HTMLInputElement;
		setTitle(target.value);
	};

	const createDate = () => {
		if (!selectedDay) {
			return false;
		} else {
			let result = new Date(
				selectedDay.getFullYear(),
				selectedDay.getUTCMonth(),
				selectedDay.getDate(),
				Number(hour),
				Number(minute),
			);
			if (
				isNaN(result.getTime()) ||
				Number(hour) < 0 ||
				Number(hour) + Math.min(Number(minute), 1) > 24 ||
				Number(minute) < 0 ||
				Number(minute) > 59
			) {
				return false;
			} else {
				return result;
			}
		}
	};

	const getDateResult = () => {
		if (!selectedDay) {
			return 'Select a date';
		} else {
			let result = createDate();
			if (result) {
				return `${result.toDateString()} at ${result.toLocaleTimeString(
					[],
					{ hour: '2-digit', minute: '2-digit' },
				)}`;
			} else {
				return 'Invalid time';
			}
		}
	};

	const handleEventCreation = async () => {
		try {
			let resp = await makeRequest('/events/create_event', 'POST', {
				title: title,
				time: createDate(),
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<CreateEventDiv>
			<EventCreationDiv style={expandDiv}>
				<EventCreationForm>
					<SelectedDateDiv>
						<SelectedDateLabel>Date:</SelectedDateLabel>
						<SelectedDateInfo>
							{selectedDay
								? selectedDay.toDateString()
								: 'Select a date'}
						</SelectedDateInfo>
					</SelectedDateDiv>
					<SelectedTimeDiv>
						<SelectedTimeLabel>Time:</SelectedTimeLabel>
						<SelectedTimeInfo>
							<SelectTimeInput
								value={hour}
								onChange={handleHourChange}
								placeholder={'hh'}
							/>
							:
							<SelectTimeInput
								value={minute}
								onChange={handleMinuteChange}
								placeholder={'mm'}
							/>
						</SelectedTimeInfo>
					</SelectedTimeDiv>
					<SelectedTitleDiv>
						<SelectedTitleLabel>Title:</SelectedTitleLabel>
						<SelectedTitleInfo
							value={title}
							onChange={handleTitleChange}
							placeholder={'title'}
						/>
					</SelectedTitleDiv>
					<DateResult>{getDateResult()}</DateResult>
					<SubmitButton
						onClick={handleEventCreation}
						disabled={!createDate() || !title.length}
					>
						Submit
					</SubmitButton>
				</EventCreationForm>
			</EventCreationDiv>
			<CreateEventButton onClick={() => setExpanded(!expanded)}>
				{expanded ? 'Close' : 'New Event'}
			</CreateEventButton>
		</CreateEventDiv>
	);
};

export default CreateEvent;
