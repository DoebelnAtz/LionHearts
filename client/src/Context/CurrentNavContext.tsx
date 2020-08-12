import { createCtx } from '../Types';

const [ctx, Provider] = createCtx<string>('Home');

export const CurrentNavContext = ctx;
export const CurrentNavContextProvider = Provider;
