import { HTMLAttributes } from "react";

export const Root = ({
	children,
	...passThrough
}: { children?: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			{...passThrough}
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				...passThrough.style,
			}}
		>
			{children}
		</div>
	);
};
