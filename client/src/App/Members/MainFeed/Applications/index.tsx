import React from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { useHistory } from 'react-router-dom';
import { Application } from '../../../../Types';
import {
	ApplicantName,
	ApplicantStatus,
	ApplicationCard,
	ApplicationDiv,
	ApplicationInfoLabel,
	ApplicationInfoName,
	ApplicationInfoStatus,
	ApplicationInfoSubmitted,
} from './Styles';
import { calculateTimeSince } from '../../../../Utils';

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
							<ApplicationInfoLabel>Name:</ApplicationInfoLabel>
							<ApplicantName>
								{`${application.firstname} ${application.lastname}`}
							</ApplicantName>
						</ApplicationInfoName>
						<ApplicationInfoSubmitted>
							<ApplicationInfoLabel>
								Submitted:
							</ApplicationInfoLabel>
							<ApplicantName title={application.submitted}>
								{`${calculateTimeSince(application.submitted)}`}
							</ApplicantName>
						</ApplicationInfoSubmitted>
						<ApplicationInfoStatus>
							<ApplicationInfoLabel>Status:</ApplicationInfoLabel>
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

	return <ApplicationDiv>{renderApplications()}</ApplicationDiv>;
};

export default Applications;
