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
	firstname: string;
	lastname: string;
	submitted: string;
	application_status: string;
}

export interface MemberEvent {
	e_id: number;
	title: string;
	time: Date;
	status: string;
}
