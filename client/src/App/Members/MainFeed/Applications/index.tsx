import React from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { Application } from '../../../../Types';
import {
	ApplicantName,
	ApplicantStatus,
	ApplicationDiv,
	ApplicationInfoLabel,
	ApplicationInfoName,
	ApplicationInfoStatus,
	ApplicationInfoSubmitted,
} from './Styles';
import { calculateTimeSince } from '../../../../Utils';

const Applications: React.FC = () => {
	useNav('Applications');

	const [applications, setApplications] = useGet<Application[]>(
		'/applications',
	);

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
					<ApplicationDiv key={application.a_id}>
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
					</ApplicationDiv>
				);
			})
		);
	};

	return <div>{renderApplications()}</div>;
};

export default Applications;
