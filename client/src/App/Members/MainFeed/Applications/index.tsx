import React from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { useHistory } from 'react-router-dom';
import { Application } from '../../../../@types';
import {
	ApplicantName,
	ApplicantStatus,
	ApplicationCard,
	ApplicationDiv,
	ApplicationInfoLabel,
	ApplicationInfoName,
	ApplicationInfoStatus,
	ApplicationInfoSubmitted,
	ApplicationResults,
	ApplicationTitleRow,
} from './Styles';
import { calculateTimeSince } from '../../../../Utils';
import { ApplicantInfoLabel } from './ApplicationPage/Styles';

const Applications: React.FC = () => {
	useNav('Applications');
	const history = useHistory();
	const [applications, setApplications] = useGet<Application[]>(
		'/applications',
	);

	const handleApplicationClick = (aid: number) => {
		history.push(`/members/applications/${aid}`);
	};

	const getApplicationStatusColor = (applicationStatus: string) => {
		switch (applicationStatus) {
			case 'rejected':
				return '#FF684F';
			case 'pending':
				return '#FFA54A';
			default:
				return '#0064FF';
		}
	};

	const renderApplications = () => {
		return (
			applications &&
			applications.map((application) => {
				return (
					<ApplicationCard
						key={application.a_id}
						onClick={() => handleApplicationClick(application.a_id)}
					>
						<ApplicationInfoName>
							<ApplicantName>
								{`${application.firstname} ${application.lastname}`}
							</ApplicantName>
						</ApplicationInfoName>
						<ApplicationInfoSubmitted>
							<ApplicantName title={application.submitted}>
								{`${calculateTimeSince(application.submitted)}`}
							</ApplicantName>
						</ApplicationInfoSubmitted>
						<ApplicationInfoStatus>
							<ApplicantStatus
								color={getApplicationStatusColor(
									application.application_status,
								)}
							>
								{`${application.application_status}`}
							</ApplicantStatus>
						</ApplicationInfoStatus>
					</ApplicationCard>
				);
			})
		);
	};

	return (
		<ApplicationDiv>
			<ApplicationTitleRow>
				<ApplicationInfoName>
					<ApplicationInfoLabel>Name</ApplicationInfoLabel>
				</ApplicationInfoName>
				<ApplicationInfoSubmitted>
					<ApplicationInfoLabel>Submitted</ApplicationInfoLabel>
				</ApplicationInfoSubmitted>
				<ApplicationInfoStatus>
					<ApplicationInfoLabel>Status</ApplicationInfoLabel>
				</ApplicationInfoStatus>
			</ApplicationTitleRow>
			<ApplicationResults>{renderApplications()}</ApplicationResults>
		</ApplicationDiv>
	);
};

export default Applications;
