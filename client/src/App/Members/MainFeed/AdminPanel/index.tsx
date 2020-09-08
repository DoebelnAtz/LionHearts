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

const AdminPanel: React.FC = () => {
	useNav('admin');
	const [currentTab, setCurrentTab] = useState('articles');

	const renderCurrentTab = () => {
		switch (currentTab) {
			case 'articles':
				return <ArticleControl />;
			case 'files':
				return <FileControl />;
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
			</AdminPanelNavTabs>
			<AdminPanelFeed>{renderCurrentTab()}</AdminPanelFeed>
		</AdminPanelDiv>
	);
};

export default AdminPanel;
