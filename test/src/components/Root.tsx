import { HTMLAttributes } from 'react';

export const Root = ({
	children,
	...passThrough
}: { children?: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			{...passThrough}
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				...passThrough.style,
			}}
		>
			{children}
		</div>
	);
};
