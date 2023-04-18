import * as React from "react";
import { Nullable } from "./type";

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreadProvider
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadContextValue = {
	threadIsOpen: boolean;
	setThreadIsOpen?: (open: boolean) => void;
};

const TwitzyThreadContext = React.createContext<Nullable<TwitzyThreadContextValue>>(null);

const useTwitzyThreadContext = (COMPONENT_NAME: string) => {
	const context = React.useContext(TwitzyThreadContext);
	if (!context) {
		throw new Error(`${COMPONENT_NAME} must be used within a TwitzyThread`);
	}
	return context;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyThread
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

type TwitzyThreadElement = HTMLDivElement;

const TwitzyThread = React.forwardRef<TwitzyThreadElement, TwitzyThreadProps>(
	(props, forwardedRef) => {
		const { children, open, onOpenChange, ...passThrough } = props;
		const [threadIsOpen, setThreadIsOpen] = React.useState<boolean>(false);

		const context: TwitzyThreadContextValue = React.useMemo(
			() => ({
				threadIsOpen: open ? open : threadIsOpen,
				setThreadIsOpen: (open: boolean) => {
					if (onOpenChange) {
						onOpenChange(open);
					} else {
						setThreadIsOpen(open);
					}
				},
			}),
			[threadIsOpen, onOpenChange, open]
		);

		return (
			<TwitzyThreadContext.Provider value={context}>
				<div {...passThrough} ref={forwardedRef}>
					{children}
				</div>
			</TwitzyThreadContext.Provider>
		);
	}
);

TwitzyThread.displayName = "TwitzyThread";

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreadTrigger
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadTriggerProps = React.HTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
};

type TwitzyThreadTriggerElement = HTMLButtonElement;

const TwitzyThreadTrigger = React.forwardRef<TwitzyThreadTriggerElement, TwitzyThreadTriggerProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;
		const { setThreadIsOpen, threadIsOpen } = useTwitzyThreadContext("TwitzyThreadTrigger");

		const handleClick = () => {
			if (setThreadIsOpen) {
				setThreadIsOpen(!threadIsOpen);
			}
		};

		return (
			<button {...passThrough} ref={forwardedRef} onClick={handleClick}>
				{children}
			</button>
		);
	}
);

TwitzyThreadTrigger.displayName = "TwitzyThreadTrigger";

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreadHead
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadHeadProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

type TwitzyThreadHeadElement = HTMLDivElement;

const TwitzyThreadHead = React.forwardRef<TwitzyThreadHeadElement, TwitzyThreadHeadProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;

		return (
			<div {...passThrough} ref={forwardedRef}>
				{children}
			</div>
		);
	}
);

TwitzyThreadHead.displayName = "TwitzyThreadHead";

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreadTails
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadTailsProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

type TwitzyThreadTailsElement = HTMLDivElement;

const TwitzyThreadTails = React.forwardRef<TwitzyThreadTailsElement, TwitzyThreadTailsProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;
		const threadContext = useTwitzyThreadContext("TwitzyThreadTails");

		if (!threadContext.threadIsOpen) {
			return null;
		}

		return (
			<div {...passThrough} ref={forwardedRef}>
				{children}
			</div>
		);
	}
);

TwitzyThreadTails.displayName = "TwitzyThreadTails";

const TwitzyThreadComposition = {
	Root: TwitzyThread,
	Trigger: TwitzyThreadTrigger,
	Head: TwitzyThreadHead,
	Tails: TwitzyThreadTails,
};

export { TwitzyThreadComposition as Thread };
