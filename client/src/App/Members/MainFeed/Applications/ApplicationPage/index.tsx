import React from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks';
import {
	ApplicantDescription,
	ApplicantFiles,
	ApplicantInfo,
	ApplicantInfoDiv,
	ApplicantInfoLabel,
	ApplicantName,
	ApplicationPageDiv,
} from './Styles';
import { url } from '../../../../../config.json';
import { Application } from '../../../../../Types';
import { makeRequest } from '../../../../../Api';
import { getLocal } from '../../../../../Utils';

const ApplicationPage: React.FC = () => {
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

	const renderUploadedFiles = () => {
		return (
			uploadedFiles &&
			uploadedFiles.map((file) => {
				return (
					<ApplicantFiles onClick={() => handleFileDl(file.name)}>
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
				<ApplicantInfo>{`${application?.firstname} ${application?.lastname}`}</ApplicantInfo>
			</ApplicantInfoDiv>
			<ApplicantInfoDiv inline>
				<ApplicantInfoLabel>Email:</ApplicantInfoLabel>
				<ApplicantInfo>{`${application?.email}`}</ApplicantInfo>
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
		</ApplicationPageDiv>
	);
};

export default ApplicationPage;
