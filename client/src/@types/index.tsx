import React from 'react';

export function createCtx<A>(defaultValue: A) {
	type UpdateType = React.Dispatch<
		React.SetStateAction<typeof defaultValue>
	>;
	const defaultUpdate: UpdateType = () => defaultValue;
	const ctx = React.createContext({
		state: defaultValue,
		update: defaultUpdate,
	});
	function Provider(props: React.PropsWithChildren<{}>) {
		const [state, update] = React.useState(
			defaultValue,
		);
		return (
			<ctx.Provider
				value={{ state, update }}
				{...props}
			/>
		);
	}
	return [ctx, Provider] as const;
}

export interface Application {
	a_id: number;
	username: string;
	application_id: string;
	firstname: string;
	lastname: string;
	description: string;
	email: string;
	submitted: string;
	application_status: string;
}

export interface QueryOptions {
	cachePolicy?: string;
}

export interface Option {
	option: string;
	id?: number;
}

export interface Degree {
	d_id: number;
	name: string;
	completed: boolean;
}

export interface School {
	s_id: number;
	name: string;
}

export interface Language {
	language_id: number;
	name: string;
}

export interface EventParticipant {
	u_id: number;
	username: string;
	firstname: string;
	lastname: string;
	profile_pic: string;
	status: 'going' | 'maybe' | 'not going' | null;
}

export interface Profile {
	u_id: number;
	location: string;
	l_id: number;
	d_id: number;
	school: string;
	s_id: number;
	degrees: Degree[];
	studying: Degree[];
	schools: School[];
	instagram: string;
	linkedin: string;
	twitter: string;
	phone: string;
	languages: Language[];
	firstname: string;
	lastname: string;
	email: string;
	profile_pic: string;
	bio: string;
}

export interface MemberCard {
	u_id: number;
	degrees: string[];
	studying: string[];
	schools: string[];
	languages: string[];
	skills: string[];
	location: string;
	firstname: string;
	lastname: string;
	profile_pic: string;
}

export interface Skill {
	s_id: number;
	title: string;
}

export interface Article {
	article_id: number;
	title: string;
	thumbnail: string;
	isevent: boolean;
	content: string;
	published_date: string;
}

export interface Author {
	u_id: number;
	firstname: string;
	lastname: string;
	profile_pic: string;
}

export interface Comment {
	c_id: number;
	e_id: number;
	content: string;
	created: string;
	username: string;
	children: number;
	creator: number;
	profile_pic: string;
}

export interface ChildComment {
	cc_id: number;
	parent: number;
	content: string;
	created: string;
	username: string;
	creator: number;
	profile_pic: string;
}

export interface Summary {
	languages: string[];
	degrees: string[];
	schools: string[];
}

export interface AuthoredArticle {
	article: Article;
	author: Author;
}

export interface MemberEvent {
	e_id: number;
	u_id: number;
	username: string;
	firstname: string;
	lastname: string;
	title: string;
	t_id: number;
	time: string;
	status: string;
	participants: Profile[];
	comments: Comment[];
}
