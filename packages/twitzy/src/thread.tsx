import * as React from "react";
import { Nullable } from "./type";

/* ------------------------------------------------------------------------------------------------
 * TwitzyThreadsProvider
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadsContextValue = {
	openedThreads: string[];
	setOpenedThreads?: (threadsId: string[]) => void;
};

const TwitzyThreadsContext = React.createContext<TwitzyThreadsContextValue>({
	openedThreads: [],
});

const useTwitzyThreadsContext = () => {
	const context = React.useContext(TwitzyThreadsContext);
	if (context === undefined) {
		throw new Error("useTwitzy must be used within a TwitzyProvider");
	}
	return context;
};

const TwitzyThreadsProvider = ({ children }: { children: React.ReactNode }) => {
	const [openedThreads, setOpenThreads] = React.useState<string[]>([]);

	const context: TwitzyThreadsContextValue = React.useMemo(
		() => ({
			openedThreads,
			setOpenThreads: (threads: string[]) => {
				setOpenThreads(threads);
			},
		}),
		[openedThreads]
	);

	return <TwitzyThreadsContext.Provider value={context}>{children}</TwitzyThreadsContext.Provider>;
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

		return (
			<TwitzyThreadsProvider>
				<div {...passThrough} ref={forwardedRef}>
					{children}
				</div>
			</TwitzyThreadsProvider>
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

const TwitzyThreadContext = React.createContext<TwitzyThreadContextValue>({
	threadId: null,
});

const useTwitzyThreadContext = () => {
	const context = React.useContext(TwitzyThreadContext);
	if (context === undefined) {
		throw new Error("useTwitzy must be used within a TwitzyProvider");
	}
	return context;
};

const TwitzyThreadProvider = ({ children }: { children: React.ReactNode }) => {
	const [threadId, setThreadId] = React.useState<Nullable<string>>(null);

	const context: TwitzyThreadContextValue = React.useMemo(
		() => ({
			threadId,
			setThreadId: (id: Nullable<string>) => {
				setThreadId(id);
			},
		}),
		[threadId]
	);

	return <TwitzyThreadContext.Provider value={context}>{children}</TwitzyThreadContext.Provider>;
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
		const threadsContext = useTwitzyThreadsContext();
		const threadContext = useTwitzyThreadContext();

		React.useEffect(() => {
			if (threadContext.setThreadId) {
				threadContext.setThreadId(id);
			}
		});

		if (!threadsContext.openedThreads.includes(id)) {
			return null;
		}

		return (
			<TwitzyThreadProvider>
				<div {...passThrough} ref={forwardedRef}>
					{children}
				</div>
			</TwitzyThreadProvider>
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
		const threadsContext = useTwitzyThreadsContext();
		const threadContext = useTwitzyThreadContext();

		const handleClick = () => {
			if (threadsContext.setOpenedThreads && threadContext.threadId) {
				if (threadsContext.openedThreads.includes(threadContext.threadId)) {
					threadsContext.setOpenedThreads(
						threadsContext.openedThreads.filter((threadId) => threadId !== threadContext.threadId)
					);
				} else {
					threadsContext.setOpenedThreads([
						...threadsContext.openedThreads,
						threadContext.threadId,
					]);
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
 * TwitzyThreadFront
 * ----------------------------------------------------------------------------------------------*/

type TwitzyThreadFrontProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

type TwitzyThreadFrontElement = HTMLDivElement;

const TwitzyThreadFront = React.forwardRef<TwitzyThreadFrontElement, TwitzyThreadFrontProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;

		return (
			<TwitzyThreadProvider>
				<div {...passThrough} ref={forwardedRef}>
					{children}
				</div>
			</TwitzyThreadProvider>
		);
	}
);

TwitzyThreadFront.displayName = "TwitzyThreadFront";

export { TwitzyThreads, TwitzyThread, TwitzyThreadTrigger, TwitzyThreadFront };
