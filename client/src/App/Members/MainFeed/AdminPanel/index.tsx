import React, { useState } from 'react';
import { useNav } from '../../../../Hooks';
import ArticleControl from './ArticleControl';
import {
	AdminPanelDiv,
	AdminPanelFeed,
	AdminPanelNavTabs,
	AdminPanelTab,
} from './Styles';
import FileControl from './FileControl';
import DatabaseControl from './DatabaseControl';

const AdminPanel: React.FC = () => {
	useNav('admin');
	const [currentTab, setCurrentTab] = useState('database');

	const renderCurrentTab = () => {
		switch (currentTab) {
			case 'articles':
				return <ArticleControl />;
			case 'files':
				return <FileControl />;
			case 'database':
				return <DatabaseControl />;
			default:
				break;
		}
	};

	return (
		<AdminPanelDiv>
			<AdminPanelNavTabs>
				<AdminPanelTab
					highlighted={currentTab === 'articles'}
					onClick={() => setCurrentTab('articles')}
				>
					articles
				</AdminPanelTab>
				<AdminPanelTab
					highlighted={currentTab === 'files'}
					onClick={() => setCurrentTab('files')}
				>
					files
				</AdminPanelTab>
				<AdminPanelTab
					highlighted={currentTab === 'database'}
					onClick={() => setCurrentTab('database')}
				>
					database
				</AdminPanelTab>
			</AdminPanelNavTabs>
			<AdminPanelFeed>{renderCurrentTab()}</AdminPanelFeed>
		</AdminPanelDiv>
	);
};

export default AdminPanel;
