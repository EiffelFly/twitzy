import * as React from "react";
import { Nullable } from "./type";

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreadsProvider
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadsContextValue = {
	openedThreads: string[];
	setOpenedThreads?: (threadsId: string[]) => void;
};

const TwitzyThreadsContext = React.createContext<Nullable<TwitzyThreadsContextValue>>(null);

const useTwitzyThreadsContext = (COMPONENT_NAME: string) => {
	const context = React.useContext(TwitzyThreadsContext);
	if (!context) {
		throw new Error(`${COMPONENT_NAME} must be used within a TwitzyThreads`);
	}
	return context;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreads
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadsProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

type TwitzyThreadsElement = HTMLDivElement;

const TwitzyThreads = React.forwardRef<TwitzyThreadsElement, TwitzyThreadsProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;

		const [openedThreads, setOpenedThreads] = React.useState<string[]>([]);

		const context: TwitzyThreadsContextValue = React.useMemo(
			() => ({
				openedThreads,
				setOpenedThreads: (threads: string[]) => {
					setOpenedThreads(threads);
				},
			}),
			[openedThreads]
		);

		return (
			<TwitzyThreadsContext.Provider value={context}>
				<div {...passThrough} ref={forwardedRef}>
					{children}
				</div>
			</TwitzyThreadsContext.Provider>
		);
	}
);

TwitzyThreads.displayName = "TwitzyThreads";

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreadProvider
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadContextValue = {
	threadId: Nullable<string>;
	setThreadId?: (threadId: Nullable<string>) => void;
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
	id: string;
};

type TwitzyThreadElement = HTMLDivElement;

const TwitzyThread = React.forwardRef<TwitzyThreadElement, TwitzyThreadProps>(
	(props, forwardedRef) => {
		const { children, id, ...passThrough } = props;
		const [threadId, setThreadId] = React.useState<Nullable<string>>(id);

		const context: TwitzyThreadContextValue = React.useMemo(
			() => ({
				threadId,
				setThreadId: (id: Nullable<string>) => {
					setThreadId(id);
				},
			}),
			[threadId]
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
		const { openedThreads, setOpenedThreads } = useTwitzyThreadsContext("TwitzyThreadTrigger");
		const { threadId, setThreadId } = useTwitzyThreadContext();

		const handleClick = () => {
			console.log(threadId, setOpenedThreads, setThreadId);
			if (setOpenedThreads && threadId) {
				console.log(setOpenedThreads);
				if (openedThreads.includes(threadId)) {
					setOpenedThreads(openedThreads.filter((id) => id !== threadId));
				} else {
					setOpenedThreads([...openedThreads, threadId]);
				}
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
		const threadsContext = useTwitzyThreadsContext("TwitzyThreadTails");
		const threadContext = useTwitzyThreadContext("TwitzyThreadTails");

		if (!threadsContext.openedThreads.includes(threadContext.threadId || "")) {
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

export { TwitzyThreads, TwitzyThread, TwitzyThreadTrigger, TwitzyThreadHead, TwitzyThreadTails };
