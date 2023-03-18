import * as React from 'react';

type TwitzyContextValue = {
	isOpen: boolean;
	setIsOpen?: (open: boolean) => void;
};

const TwitzyContext = React.createContext<TwitzyContextValue>({
	isOpen: false,
});

/* ------------------------------------------------------------------------------------------------
 * useTwitzy
 * ----------------------------------------------------------------------------------------------*/

const useTwitzy = () => {
	const context = React.useContext(TwitzyContext);
	if (context === undefined) {
		throw new Error('useTwitzy must be used within a TwitzyProvider');
	}
	return context;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyProvider
 * ----------------------------------------------------------------------------------------------*/

const TwitzyProvider = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const context: TwitzyContextValue = React.useMemo(
		() => ({
			isOpen,
			setIsOpen: (open: boolean) => {
				setIsOpen(open);
			},
		}),
		[isOpen]
	);

	return <TwitzyContext.Provider value={context}>{children}</TwitzyContext.Provider>;
};

/* ------------------------------------------------------------------------------------------------
 * Twitzy
 * ----------------------------------------------------------------------------------------------*/

const Twitzy = () => {
	return (
		<TwitzyProvider>
			<div></div>
		</TwitzyProvider>
	);
};
