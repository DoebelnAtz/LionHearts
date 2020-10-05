import { createCtx } from '../@types';

const [ctx, Provider] = createCtx<string>('Home');

export const CurrentNavContext = ctx;
export const CurrentNavContextProvider = Provider;
