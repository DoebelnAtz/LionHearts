import { catchErrors } from '../errors/catchErrors';

export const respondTest = catchErrors(async (req, res) => {
	res.json({message: 'test'})
},'Failed to test');