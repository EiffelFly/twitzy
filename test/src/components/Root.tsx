export const Root = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			{children}
		</div>
	);
};
