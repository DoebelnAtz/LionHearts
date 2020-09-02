import React from 'react';
import { useNav } from '../../../../Hooks';

const AdminPanel: React.FC = () => {
	useNav('admin');
	return <div>admin</div>;
};

export default AdminPanel;
