class CustomError extends Error {
	constructor(
		public response: string = 'Internal server error',
		public status: number = 500,
		public description: string = '',
	) {
		super();
	}
}

export default CustomError;
