import React from 'react';
import { useNav } from '../../../../Hooks';
import ArticleControl from './ArticleControl';

const AdminPanel: React.FC = () => {
	useNav('admin');
	return (
		<div>
			<ArticleControl />
		</div>
	);
};

export default AdminPanel;
