import React from 'react';

export function createCtx<A>(defaultValue: A) {
	type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
	const defaultUpdate: UpdateType = () => defaultValue;
	const ctx = React.createContext({
		state: defaultValue,
		update: defaultUpdate,
	});
	function Provider(props: React.PropsWithChildren<{}>) {
		const [state, update] = React.useState(defaultValue);
		return <ctx.Provider value={{ state, update }} {...props} />;
	}
	return [ctx, Provider] as const;
}

export interface Application {
	a_id: number;
	application_id: string;
	firstname: string;
	lastname: string;
	description: string;
	email: string;
	submitted: string;
	application_status: string;
}

export interface Option {
	option: string;
	id?: number;
}

export interface Profile {
	u_id: number;
	location: string;
	phone: string;
	firstname: string;
	lastname: string;
	email: string;
	profile_pic: string;
	bio: string;
}

export interface Skill {
	s_id: number;
	title: string;
}

export interface Article {
	article_id: number;
	title: string;
	thumbnail: string;
	isEvent: boolean;
	content: string;
	published_date: string;
}

export interface Author {
	u_id: number;
	firstname: string;
	lastname: string;
	profile_pic: string;
}

export interface AuthoredArticle {
	article: Article;
	author: Author;
}

export interface MemberEvent {
	e_id: number;
	username: string;
	firstname: string;
	lastname: string;
	title: string;
	time: string;
	status: string;
}
