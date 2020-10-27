import React from 'react';
import axios from 'axios';

import { useParams, useHistory } from 'react-router-dom';
import { useGet } from '../../../../../Hooks';
import {
	ApplicantDescription,
	ApplicantFiles,
	ApplicantInfo,
	ApplicantInfoDiv,
	ApplicantInfoLabel,
	ApplicationAcceptButton,
	ApplicationDecisionButtonRow,
	ApplicationPageDiv,
	ApplicationRejectButton,
} from './Styles';
import { url } from '../../../../../config';
import { Application } from '../../../../../@types';
import { makeRequest } from '../../../../../Api';
import { getLocal } from '../../../../../Utils';

const ApplicationPage: React.FC = () => {
	const history = useHistory();
	const params = useParams<{ aid: string }>();
	const [application, setApplication] = useGet<Application>(
		`/applications/${params.aid}`,
	);
	const [uploadedFiles, setUploadedFiles] = useGet<File[]>(
		`/files/${application?.application_id || '1'}`,
		!!application,
	);
	const handleFileDl = async (fileName: string) => {
		if (application) {
			axios({
				url: `${url}/api/applications/files?application=${application.application_id}&file=${fileName}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						(localStorage.getItem('user')
							? getLocal('user').token
							: ''),
					'x-refresh-token': localStorage.getItem('user')
						? getLocal('user').refreshToken
						: '',
				},
				responseType: 'blob',
			}).then((response) => {
				const url = window.URL.createObjectURL(
					new Blob([response.data]),
				);
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', fileName);
				document.body.appendChild(link);
				link.click();
			});
		}
	};

	const handleApplicationApproval = async () => {
		if (
			application &&
			window.confirm('Are you sure you want to ACCEPT this applicant?')
		) {
			try {
				await makeRequest(`/applications/${application.a_id}`, 'PUT');
			} catch (e) {
				console.log(e);
			}
		}
	};

	const handleApplicationRejection = async () => {
		if (
			application &&
			window.confirm('Are you sure you want to reject this application?')
		) {
			try {
				await makeRequest(
					'/applications/delete_application',
					'DELETE',
					{
						applicationId: application.application_id,
					},
				);
				history.push('/members/applications');
			} catch (e) {
				console.log(e);
			}
		}
	};

	const renderUploadedFiles = () => {
		return (
			uploadedFiles &&
			uploadedFiles.map((file) => {
				return (
					<ApplicantFiles
						key={file.name}
						onClick={() => handleFileDl(file.name)}
					>
						{file.name}
					</ApplicantFiles>
				);
			})
		);
	};

	return (
		<ApplicationPageDiv>
			<ApplicantInfoDiv inline>
				<ApplicantInfoLabel>Name:</ApplicantInfoLabel>
				<ApplicantInfo>
					{application &&
						`${application?.firstname} ${application?.lastname}`}
				</ApplicantInfo>
			</ApplicantInfoDiv>
			<ApplicantInfoDiv inline>
				<ApplicantInfoLabel>Email:</ApplicantInfoLabel>
				<ApplicantInfo>
					{application && application.email}
				</ApplicantInfo>
			</ApplicantInfoDiv>
			<ApplicantInfoDiv inline>
				<ApplicantInfoLabel>Submitted:</ApplicantInfoLabel>
				<ApplicantInfo>
					{application &&
						new Date(application.submitted).toLocaleString(
							'en-GB',
							{
								timeZone: 'UTC',
							},
						)}
				</ApplicantInfo>
			</ApplicantInfoDiv>
			<ApplicantInfoDiv inline>
				<ApplicantInfoLabel>Status:</ApplicantInfoLabel>
				<ApplicantInfo>
					{application && application.application_status}
				</ApplicantInfo>
			</ApplicantInfoDiv>

			<ApplicantInfoDiv inline>
				<ApplicantInfoLabel>Applications ID:</ApplicantInfoLabel>
				<ApplicantInfo>
					{application && application.application_id}
				</ApplicantInfo>
			</ApplicantInfoDiv>
			<ApplicantInfoDiv>
				<ApplicantInfoLabel>Description:</ApplicantInfoLabel>
				<ApplicantDescription>
					{application && application.description}
				</ApplicantDescription>
			</ApplicantInfoDiv>
			<ApplicantInfoDiv>
				<ApplicantInfoLabel>Files:</ApplicantInfoLabel>
				{renderUploadedFiles()}
			</ApplicantInfoDiv>
			{application?.application_status === 'pending' && (
				<ApplicationDecisionButtonRow>
					<ApplicationAcceptButton
						onClick={handleApplicationApproval}
					>
						Accept
					</ApplicationAcceptButton>
					<ApplicationRejectButton
						onClick={handleApplicationRejection}
					>
						Reject
					</ApplicationRejectButton>
				</ApplicationDecisionButtonRow>
			)}
		</ApplicationPageDiv>
	);
};

export default ApplicationPage;
