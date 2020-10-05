import { createCtx } from '../@types';

const [ctx, Provider] = createCtx<number>(window.innerWidth);

export const WidthContext = ctx;
export const WidthContextProvider = Provider;