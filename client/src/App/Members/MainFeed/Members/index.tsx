import React from 'react';
import { useNav } from '../../../../Hooks';

const MemberList: React.FC = () => {
	useNav('Members');
	return <div>Members</div>;
};

export default MemberList;
