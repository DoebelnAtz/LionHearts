import { createCtx } from '../@types';

const [ctx, Provider] = createCtx<number>(0);

export const AuthContext = ctx;
export const AuthContextProvider = Provider;
