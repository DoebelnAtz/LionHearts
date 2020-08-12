import React from 'react';
import { useGet, useNav } from '../../../../Hooks';
import { Application } from '../../../../Types';

const Applications: React.FC = () => {
	useNav('Applications');

	const [applications, setApplications] = useGet<Application>(
		'/applications',
	);
	return <div>{applications}</div>;
};

export default Applications;
