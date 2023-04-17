import * as React from "react";
import color from "tinycolor2";
import { Nullable } from "./type";

/* ------------------------------------------------------------------------------------------------
 * TwitzyProvider
 * ----------------------------------------------------------------------------------------------*/

type TwitzyContextValue = {
	isOpen: boolean;
	setIsOpen?: (open: boolean) => void;
};

const TwitzyContext = React.createContext<TwitzyContextValue>({
	isOpen: false,
});

const useTwitzyContext = () => {
	const context = React.useContext(TwitzyContext);
	if (context === undefined) {
		throw new Error("useTwitzy must be used within a TwitzyProvider");
	}
	return context;
};

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
 * TwitzyTweetProvider
 * ----------------------------------------------------------------------------------------------*/

export type TweetData = {
	id: string;
	author: string;
	authorUrl: string;
	content: string;
	createdAt: string;
	avatarSrc: string;
};

type TwitzyTweetContextValue = {
	tweet: Nullable<TweetData>;
	setTweet?: (tweet: Nullable<TweetData>) => void;
};

const TwitzyTweetContext = React.createContext<TwitzyTweetContextValue>({
	tweet: null,
});

function useTwitzyTweetContext() {
	const context = React.useContext(TwitzyTweetContext);
	if (context === undefined) {
		throw new Error(
			"useTwitzyTweetContext must be used within a TwitzyTweetProvider, you may forget to wrap your component with TwitzyTweet"
		);
	}
	return context;
}

const TwitzyTweetProvider = ({
	children,
	initialTweet,
}: {
	children: React.ReactNode;
	initialTweet: Nullable<TweetData>;
}) => {
	const [tweet, setTweet] = React.useState<Nullable<TweetData>>(initialTweet);

	const context: TwitzyTweetContextValue = React.useMemo(
		() => ({
			tweet,
			setTweet: (tweet: Nullable<TweetData>) => {
				setTweet(tweet);
			},
		}),
		[tweet]
	);

	return <TwitzyTweetContext.Provider value={context}>{children}</TwitzyTweetContext.Provider>;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweet
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTweetProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	tweet: Nullable<TweetData>;
};

type TwitzyTweetElement = HTMLDivElement;

const TwitzyTweet = React.forwardRef<TwitzyTweetElement, TwitzyTweetProps>(
	(props, forwardedRef) => {
		const { tweet, children, ...passThrough } = props;
		return (
			<TwitzyTweetProvider initialTweet={tweet}>
				<div ref={forwardedRef} {...passThrough}>
					{children}
				</div>
			</TwitzyTweetProvider>
		);
	}
);

TwitzyTweet.displayName = "TwitzyTweet";

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatarProvider
 * ----------------------------------------------------------------------------------------------*/

type AvatarLoadingStatus = "idle" | "loading" | "loaded" | "error";

type TwitzyAvatarContextValue = {
	avatarLoadingStatus: AvatarLoadingStatus;
	onAvatarLoadingStatusChange?: (status: AvatarLoadingStatus) => void;
};

const TwitzyAvatarContext = React.createContext<TwitzyAvatarContextValue>({
	avatarLoadingStatus: "idle",
});

const useTwitzyAvatarContext = () => {
	const context = React.useContext(TwitzyAvatarContext);
	if (context === undefined) {
		throw new Error("useTwitzy must be used within a TwitzyProvider");
	}
	return context;
};

const TwitzyAvatarProvider = ({ children }: { children: React.ReactNode }) => {
	const [avatarLoadingStatus, setAvatarLoadingStatus] = React.useState<AvatarLoadingStatus>("idle");

	const context: TwitzyAvatarContextValue = React.useMemo(
		() => ({
			avatarLoadingStatus,
			onAvatarLoadingStatusChange: (status: AvatarLoadingStatus) => {
				setAvatarLoadingStatus(status);
			},
		}),
		[avatarLoadingStatus]
	);

	return <TwitzyAvatarContext.Provider value={context}>{children}</TwitzyAvatarContext.Provider>;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatar
 * ----------------------------------------------------------------------------------------------*/

type TwitzyAvatar = {
	children?: React.ReactNode;
};

const TwitzyAvatar = (props: TwitzyAvatar) => {
	const { children } = props;
	return <TwitzyAvatarProvider>{children}</TwitzyAvatarProvider>;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatarImage
 * ----------------------------------------------------------------------------------------------*/

type TwitzyAvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

type TwitzyAvatarImageElement = HTMLImageElement;

const TwitzyAvatarImage = React.forwardRef<TwitzyAvatarImageElement, TwitzyAvatarImageProps>(
	(props, forwardedRef) => {
		const avatarContext = useTwitzyAvatarContext();
		const tweetContext = useTwitzyTweetContext();
		const avatarLoadingStatus = useAvatarLoadingStatus(tweetContext.tweet?.avatarSrc);

		React.useEffect(() => {
			if (avatarContext.onAvatarLoadingStatusChange) {
				avatarContext.onAvatarLoadingStatusChange(avatarLoadingStatus);
			}
		}, [avatarLoadingStatus, avatarContext]);

		return avatarLoadingStatus === "loaded" ? (
			<img
				{...props}
				src={tweetContext.tweet?.avatarSrc}
				alt={`${tweetContext.tweet?.id}-avatar`}
				ref={forwardedRef}
			/>
		) : null;
	}
);

TwitzyAvatarImage.displayName = "TwitzyAvatarImage";

/* ------------------------------------------------------------------------------------------------
 * useAvatarLoadingStatus
 * ----------------------------------------------------------------------------------------------*/

function useAvatarLoadingStatus(src?: string) {
	const [loadingStatus, setLoadingStatus] = React.useState<AvatarLoadingStatus>("idle");

	React.useEffect(() => {
		if (!src) {
			setLoadingStatus("error");
			return;
		}

		let isMounted = true;
		const image = new window.Image();

		const updateStatus = (status: AvatarLoadingStatus) => () => {
			if (!isMounted) return;
			setLoadingStatus(status);
		};

		setLoadingStatus("loading");
		image.onload = updateStatus("loaded");
		image.onerror = updateStatus("error");
		image.src = src;

		return () => {
			isMounted = false;
		};
	}, [src]);

	return loadingStatus;
}

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatarGradientFallback
 * ----------------------------------------------------------------------------------------------*/

/* Credit: https://github.com/vercel/avatar */

function djb2(str: string) {
	let hash = 5381;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) + hash + str.charCodeAt(i);
	}
	return hash;
}

function generateGradient(username?: string) {
	let string = username ? username : (Math.random() + 1).toString(36).substring(7);

	const c1 = color({ h: djb2(string) % 360, s: 0.95, l: 0.5 });
	const second = c1.triad()[1].toHexString();

	return {
		fromColor: c1.toHexString(),
		toColor: second,
	};
}

type TwitzyAvatarGradientFallbackProps = React.ImgHTMLAttributes<SVGSVGElement> & {
	size: number;
};

type TwitzyAvatarGradientFallbackElement = SVGSVGElement;

const TwitzyAvatarGradientFallback = React.forwardRef<
	TwitzyAvatarGradientFallbackElement,
	TwitzyAvatarGradientFallbackProps
>((props, forwardedRef) => {
	const { size, ...passThrough } = props;

	const avatarContext = useTwitzyAvatarContext();
	const tweetContext = useTwitzyTweetContext();
	const gradientColor = generateGradient(tweetContext.tweet?.author);

	const gradientId = `${tweetContext.tweet?.id}-${tweetContext.tweet?.author}-avatar`;

	return avatarContext.avatarLoadingStatus !== "loaded" ? (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			ref={forwardedRef}
			{...passThrough}
		>
			<g>
				<defs>
					<linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor={gradientColor.fromColor} />
						<stop offset="100%" stopColor={gradientColor.toColor} />
					</linearGradient>
				</defs>
				<rect fill={`url(#${gradientId})`} x="0" y="0" width={size} height={size} />
			</g>
		</svg>
	) : null;
});

TwitzyAvatarGradientFallback.displayName = "TwitzyAvatarGradientFallback";

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatarFallback
 * ----------------------------------------------------------------------------------------------*/

type TwitzyAvatarFallbackProps = React.ImgHTMLAttributes<HTMLDivElement> & {
	children?: React.ReactNode;
};

type TwitzyAvatarFallbackElement = HTMLDivElement;

const TwitzyAvatarFallback = React.forwardRef<
	TwitzyAvatarFallbackElement,
	TwitzyAvatarFallbackProps
>((props, forwardedRef) => {
	const { children, ...passThrough } = props;

	const context = useTwitzyAvatarContext();

	return context.avatarLoadingStatus !== "loaded" ? (
		<div ref={forwardedRef} {...passThrough}>
			{children}
		</div>
	) : null;
});

TwitzyAvatarFallback.displayName = "TwitzyAvatarFallback";

/* ------------------------------------------------------------------------------------------------
 * TwitzyToolBar
 * ----------------------------------------------------------------------------------------------*/

type TwitzyToolbarProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

type TwitzyToolbarElement = HTMLDivElement;

const TwitzyToolbar = React.forwardRef<TwitzyToolbarElement, TwitzyToolbarProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;

		return (
			<div {...passThrough} ref={forwardedRef}>
				{children}
			</div>
		);
	}
);
/* ------------------------------------------------------------------------------------------------
 * TwitzyLike
 * ----------------------------------------------------------------------------------------------*/

type TwitzyLikeProps = React.HTMLAttributes<HTMLAnchorElement> & {
	children: React.ReactNode;
};

type TwitzyLikeElement = HTMLAnchorElement;

const TwitzyLike = React.forwardRef<TwitzyLikeElement, TwitzyLikeProps>((props, forwardedRef) => {
	const { children, ...passThrough } = props;
	const context = useTwitzyTweetContext();
	const likeUrl = `https://twitter.com/intent/like?tweet_id=${context.tweet?.id}`;

	return (
		<a
			twitzy-like=""
			{...passThrough}
			href={likeUrl}
			ref={forwardedRef}
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	);
});

/* ------------------------------------------------------------------------------------------------
 * TwitzyReply
 * ----------------------------------------------------------------------------------------------*/

type TwitzyReplyProps = React.HTMLAttributes<HTMLAnchorElement> & {
	children: React.ReactNode;
};

type TwitzyReplyElement = HTMLAnchorElement;

const TwitzyReply = React.forwardRef<TwitzyReplyElement, TwitzyReplyProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;
		const context = useTwitzyTweetContext();
		const replyUrl = `https://twitter.com/intent/tweet?in_reply_to=${context.tweet?.id}`;

		return (
			<a
				twitzy-reply=""
				{...passThrough}
				href={replyUrl}
				ref={forwardedRef}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}
);

/* ------------------------------------------------------------------------------------------------
 * TwitzyRetweet
 * ----------------------------------------------------------------------------------------------*/

type TwitzyRetweetProps = React.HTMLAttributes<HTMLAnchorElement> & {
	children: React.ReactNode;
};

type TwitzyRetweetElement = HTMLAnchorElement;

const TwitzyRetweet = React.forwardRef<TwitzyRetweetElement, TwitzyRetweetProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;
		const context = useTwitzyTweetContext();
		const retweetUrl = `https://twitter.com/intent/retweet?tweet_id=${context.tweet?.id}`;

		return (
			<a
				twitzy-retweet=""
				{...passThrough}
				href={retweetUrl}
				ref={forwardedRef}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		);
	}
);

/* ------------------------------------------------------------------------------------------------
 * TwitzyCopyLink
 * ----------------------------------------------------------------------------------------------*/

type TwitzyCopyLinkProps = React.HTMLAttributes<HTMLButtonElement> & {
	render: (copied: boolean) => React.ReactNode;
};

type TwitzyCopyLinkElement = HTMLButtonElement;

const TwitzyCopyLink = React.forwardRef<TwitzyCopyLinkElement, TwitzyCopyLinkProps>(
	(props, forwardedRef) => {
		const { render, ...passThrough } = props;
		const [copied, setCopied] = React.useState(false);
		const context = useTwitzyTweetContext();
		const tweetUrl = `https://twitter.com/${context.tweet?.author}/status/${context.tweet?.id}`;

		return (
			<button
				twitzy-copy-link=""
				{...passThrough}
				ref={forwardedRef}
				onClick={(event) => {
					navigator.clipboard.writeText(tweetUrl);
					setCopied(true);
					setTimeout(() => setCopied(false), 5000);
					if (passThrough.onClick) passThrough.onClick(event);
				}}
			>
				{render(copied)}
			</button>
		);
	}
);

/* ------------------------------------------------------------------------------------------------
 * TwitzyContent
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTweetContentProps = React.HTMLAttributes<HTMLDivElement>;

type TwitzyTweetContentElement = HTMLDivElement;

const TwitzyTweetContent = React.forwardRef<TwitzyTweetContentElement, TwitzyTweetContentProps>(
	(props, forwardedRef) => {
		const context = useTwitzyTweetContext();

		const regexToMatchURL =
			/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

		const formattedContent = context.tweet?.content
			// Format all hyperlinks
			.replace(
				regexToMatchURL,
				(match) => `<a href="${match}" target="_blank">${match.replace(/^http(s?):\/\//i, "")}</a>`
			)
			// Format all @ mentions
			.replace(
				/\B\@([\w\-]+)/gim,
				(match) =>
					`<a href="https://twitter.com/${match.replace("@", "")}" target="_blank">${match}</a>`
			)
			// Format all # hashtags
			.replace(
				/(#+[a-zA-Z0-9(_)]{1,})/g,
				(match) =>
					`<a href="https://twitter.com/hashtag/${match.replace(
						"#",
						""
					)}" target="_blank">${match}</a>`
			);

		return (
			<div
				ref={forwardedRef}
				{...props}
				dangerouslySetInnerHTML={{ __html: formattedContent ? formattedContent : "" }}
			/>
		);
	}
);

TwitzyTweetContent.displayName = "TwitzyTweetContent";

/* ------------------------------------------------------------------------------------------------
 * TwitzyTimeStamp
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTimeStampProps = React.HTMLAttributes<HTMLDivElement>;

type TwitzyTimeStampElement = HTMLDivElement;

const transferMonthNumToName = (month: number) => {
	switch (month) {
		case 0:
			return "Jan";
		case 1:
			return "Feb";
		case 2:
			return "Mar";
		case 3:
			return "Apr";
		case 4:
			return "May";
		case 5:
			return "Jun";
		case 6:
			return "Jul";
		case 7:
			return "Aug";
		case 8:
			return "Sep";
		case 9:
			return "Oct";
		case 10:
			return "Nov";
		case 11:
			return "Dec";
		default:
			throw new Error("Month doesn't exist!");
	}
};

const TwitzyTimeStamp = React.forwardRef<TwitzyTimeStampElement, TwitzyTimeStampProps>(
	(props, forwardedRef) => {
		const context = useTwitzyTweetContext();

		if (!context.tweet?.createdAt) {
			return (
				<div {...props} ref={forwardedRef}>
					{`--:-- - -- --, --`}
				</div>
			);
		}

		const Time = new Date(context.tweet?.createdAt);

		return (
			<div {...props} ref={forwardedRef}>
				{`${Time.getHours()}:${Time.getMinutes()} - ${transferMonthNumToName(
					Time.getMonth()
				)} ${Time.getDate()}, ${Time.getFullYear()}`}
			</div>
		);
	}
);

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweetAuthor
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTweetAuthorProps = React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode };

type TwitzyTweetAuthorElement = HTMLDivElement;

const TwitzyTweetAuthor = React.forwardRef<TwitzyTweetAuthorElement, TwitzyTweetAuthorProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;
		return (
			<div {...passThrough} ref={forwardedRef}>
				{children}
			</div>
		);
	}
);

TwitzyTweetAuthor.displayName = "TwitzyTweetAuthor";

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweetAuthorName
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTweetAuthorNameProps = React.HTMLAttributes<HTMLParagraphElement>;

type TwitzyTweetAuthorNameElement = HTMLParagraphElement;

const TwitzyTweetAuthorName = React.forwardRef<
	TwitzyTweetAuthorNameElement,
	TwitzyTweetAuthorNameProps
>((props, forwardedRef) => {
	const context = useTwitzyTweetContext();

	return (
		<p {...props} ref={forwardedRef}>
			{context.tweet?.author}
		</p>
	);
});

TwitzyTweetAuthorName.displayName = "TwitzyTweetAuthorName";

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweetAuthorProfileLink
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTweetAuthorProfileLinkProps = React.HTMLAttributes<HTMLAnchorElement>;

type TwitzyTweetAuthorProfileLinkElement = HTMLAnchorElement;

const TwitzyTweetAuthorProfileLink = React.forwardRef<
	TwitzyTweetAuthorProfileLinkElement,
	TwitzyTweetAuthorProfileLinkProps
>((props, forwardedRef) => {
	const context = useTwitzyTweetContext();

	return (
		<a
			{...props}
			href={context.tweet?.authorUrl}
			ref={forwardedRef}
			target="_blank"
			rel="noopener noreferrer"
		>
			{`@${context.tweet?.author}`}
		</a>
	);
});

TwitzyTweetAuthorProfileLink.displayName = "TwitzyTweetAuthorProfileLink";

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweetOverview
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTweetOverviewProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

type TwitzyTweetOverviewElement = HTMLDivElement;

const TwitzyTweetOverview = React.forwardRef<TwitzyTweetOverviewElement, TwitzyTweetOverviewProps>(
	(props, forwardedRef) => {
		const { children, ...passThrough } = props;

		return (
			<div {...passThrough} ref={forwardedRef}>
				{children}
			</div>
		);
	}
);

TwitzyTweetOverview.displayName = "TwitzyTweetOverview";

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweetOverviewCard
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTweetOverviewCardProps = React.HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
};

type TwitzyTweetOverviewCardElement = HTMLDivElement;

const TwitzyTweetOverviewCard = React.forwardRef<
	TwitzyTweetOverviewCardElement,
	TwitzyTweetOverviewCardProps
>((props, forwardedRef) => {
	const { children, ...passThrough } = props;

	return (
		<div {...passThrough} ref={forwardedRef}>
			{children}
		</div>
	);
});

TwitzyTweetOverviewCard.displayName = "TwitzyTweetOverviewCard";

const TwitzyOverviewComposition = {
	Root: TwitzyTweetOverview,
	Card: TwitzyTweetOverviewCard,
};

const TwitzyTweetComposition = {
	Root: TwitzyTweet,
	Avatar: TwitzyAvatar,
	AvatarImage: TwitzyAvatarImage,
	AvatarFallback: TwitzyAvatarFallback,
	AvatarGradientFallback: TwitzyAvatarGradientFallback,
	TimeStamp: TwitzyTimeStamp,
	Toolbar: TwitzyToolbar,
	Like: TwitzyLike,
	Reply: TwitzyReply,
	Retweet: TwitzyRetweet,
	CopyLink: TwitzyCopyLink,
	Content: TwitzyTweetContent,
	Author: TwitzyTweetAuthor,
	AuthorName: TwitzyTweetAuthorName,
	AuthorProfileLink: TwitzyTweetAuthorProfileLink,
};

export { TwitzyTweetComposition as Tweet, TwitzyOverviewComposition as Overview };
