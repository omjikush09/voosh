
export const responseMessage = (
	status: number,
	message: string,
	data=null as any,
	error=null as any,
) => {
	return {
		status,
		data,
		message,
		error,
	};
};