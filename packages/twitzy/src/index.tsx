import * as React from 'react';
import color from 'tinycolor2';

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
		throw new Error('useTwitzy must be used within a TwitzyProvider');
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
 * Twitzy
 * ----------------------------------------------------------------------------------------------*/

const Twitzy = (props: { children: React.ReactNode }) => {
	const { children } = props;
	return <TwitzyProvider>{children}</TwitzyProvider>;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatarProvider
 * ----------------------------------------------------------------------------------------------*/

type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

type TwitzyAvatarContextValue = {
	avatarLoadingStatus: AvatarLoadingStatus;
	onAvatarLoadingStatusChange?: (status: AvatarLoadingStatus) => void;
};

const TwitzyAvatarContext = React.createContext<TwitzyAvatarContextValue>({
	avatarLoadingStatus: 'idle',
});

const useTwitzyAvatarContext = () => {
	const context = React.useContext(TwitzyAvatarContext);
	if (context === undefined) {
		throw new Error('useTwitzy must be used within a TwitzyProvider');
	}
	return context;
};

const TwitzyAvatarProvider = ({ children }: { children: React.ReactNode }) => {
	const [avatarLoadingStatus, setAvatarLoadingStatus] = React.useState<AvatarLoadingStatus>('idle');

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
 * TwitzyAvatarP
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

type TwitzyAvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	src: string;
	alt: string;
};

type TwitzyAvatarImageElement = HTMLImageElement;

const TwitzyAvatarImage = React.forwardRef<TwitzyAvatarImageElement, TwitzyAvatarImageProps>(
	(props, forwardedRef) => {
		const { src, alt, ...passThrough } = props;

		const context = useTwitzyAvatarContext();
		const avatarLoadingStatus = useAvatarLoadingStatus(src);

		React.useEffect(() => {
			if (context.onAvatarLoadingStatusChange) {
				context.onAvatarLoadingStatusChange(avatarLoadingStatus);
			}
		}, [avatarLoadingStatus, context]);

		return avatarLoadingStatus === 'loaded' ? (
			<img src={src} alt={alt} ref={forwardedRef} {...passThrough} />
		) : null;
	}
);

TwitzyAvatarImage.displayName = 'TwitzyAvatarImage';

/* ------------------------------------------------------------------------------------------------
 * useAvatarLoadingStatus
 * ----------------------------------------------------------------------------------------------*/

function useAvatarLoadingStatus(src?: string) {
	const [loadingStatus, setLoadingStatus] = React.useState<AvatarLoadingStatus>('idle');

	React.useEffect(() => {
		if (!src) {
			setLoadingStatus('error');
			return;
		}

		let isMounted = true;
		const image = new window.Image();

		const updateStatus = (status: AvatarLoadingStatus) => () => {
			if (!isMounted) return;
			setLoadingStatus(status);
		};

		setLoadingStatus('loading');
		image.onload = updateStatus('loaded');
		image.onerror = updateStatus('error');
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

function generateGradient(username: string) {
	const c1 = color({ h: djb2(username) % 360, s: 0.95, l: 0.5 });
	const second = c1.triad()[1].toHexString();

	return {
		fromColor: c1.toHexString(),
		toColor: second,
	};
}

type TwitzyAvatarGradientFallbackProps = React.ImgHTMLAttributes<SVGSVGElement> & {
	size: number;
	authorName: string;
};

type TwitzyAvatarGradientFallbackElement = SVGSVGElement;

const TwitzyAvatarGradientFallback = React.forwardRef<
	TwitzyAvatarGradientFallbackElement,
	TwitzyAvatarGradientFallbackProps
>((props, forwardedRef) => {
	const { size, authorName, ...passThrough } = props;

	const context = useTwitzyAvatarContext();
	const gradientColor = generateGradient(authorName);

	return context.avatarLoadingStatus !== 'loaded' ? (
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
					<linearGradient id={`${authorName}`} x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor={gradientColor.fromColor} />
						<stop offset="100%" stopColor={gradientColor.toColor} />
					</linearGradient>
				</defs>
				<rect fill={`url(#${authorName})`} x="0" y="0" width={size} height={size} />
			</g>
		</svg>
	) : null;
});

TwitzyAvatarGradientFallback.displayName = 'TwitzyAvatarGradientFallback';

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

	return context.avatarLoadingStatus !== 'loaded' ? (
		<div ref={forwardedRef} {...passThrough}>
			{children}
		</div>
	) : null;
});

TwitzyAvatarFallback.displayName = 'TwitzyAvatarFallback';

/* ------------------------------------------------------------------------------------------------
 * TwitzyTimeStamp
 * ----------------------------------------------------------------------------------------------*/

type TwitzyTimeStampProps = React.TimeHTMLAttributes<HTMLTimeElement> & {
	time: string;
};

type TwitzyTimeStampElement = HTMLTimeElement;

const transferMonthNumToName = (month: number) => {
	switch (month) {
		case 0:
			return 'Jan';
		case 1:
			return 'Feb';
		case 2:
			return 'Mar';
		case 3:
			return 'Apr';
		case 4:
			return 'May';
		case 5:
			return 'Jun';
		case 6:
			return 'Jul';
		case 7:
			return 'Aug';
		case 8:
			return 'Sep';
		case 9:
			return 'Oct';
		case 10:
			return 'Nov';
		case 11:
			return 'Dec';
		default:
			throw new Error("Month doesn't exist!");
	}
};

const TwitzyTimeStamp = React.forwardRef<TwitzyTimeStampElement, TwitzyTimeStampProps>(
	(props, forwardedRef) => {
		const { time, ...passThrough } = props;
		const Time = new Date(time);

		const [month, day, year] = [Time.getMonth(), Time.getDate(), Time.getFullYear()];
		const [hour, minute] = [Time.getHours(), Time.getMinutes()];

		return (
			<time
				{...passThrough}
				ref={forwardedRef}
				title={`Time Posted: ${Time.toUTCString()}`}
				dateTime={Time.toISOString()}
			>
				{`${hour}:${minute} - ${transferMonthNumToName(month)} ${day}, ${year}`}
			</time>
		);
	}
);

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
	tweetId: string;
};

type TwitzyLikeElement = HTMLAnchorElement;

const TwitzyLike = React.forwardRef<TwitzyLikeElement, TwitzyLikeProps>((props, forwardedRef) => {
	const { children, tweetId, ...passThrough } = props;

	const likeUrl = `https://twitter.com/intent/like?tweet_id=${tweetId}`;

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
	tweetId: string;
};

type TwitzyReplyElement = HTMLAnchorElement;

const TwitzyReply = React.forwardRef<TwitzyReplyElement, TwitzyReplyProps>(
	(props, forwardedRef) => {
		const { children, tweetId, ...passThrough } = props;

		const replyUrl = `https://twitter.com/intent/tweet?in_reply_to=${tweetId}`;

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
	tweetId: string;
};

type TwitzyRetweetElement = HTMLAnchorElement;

const TwitzyRetweet = React.forwardRef<TwitzyRetweetElement, TwitzyRetweetProps>(
	(props, forwardedRef) => {
		const { children, tweetId, ...passThrough } = props;

		const retweetUrl = `https://twitter.com/intent/retweet?tweet_id=${tweetId}`;

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
	author: string;
	tweetId: string;
};

type TwitzyCopyLinkElement = HTMLButtonElement;

const TwitzyCopyLink = React.forwardRef<TwitzyCopyLinkElement, TwitzyCopyLinkProps>(
	(props, forwardedRef) => {
		const { render, author, tweetId, ...passThrough } = props;
		const [copied, setCopied] = React.useState(false);

		const tweetUrl = `https://twitter.com/${author}/status/${tweetId}`;

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

type TwitzyContentProps = React.HTMLAttributes<HTMLDivElement> & {
	content: string;
};

type TwitzyContentElement = HTMLDivElement;

const TwitzyContent = React.forwardRef<TwitzyContentElement, TwitzyContentProps>(
	(props, forwardedRef) => {
		const { content, ...passThrough } = props;

		const regexToMatchURL =
			/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

		const formattedContent = content
			// Format all hyperlinks
			.replace(
				regexToMatchURL,
				(match) => `<a href="${match}" target="_blank">${match.replace(/^http(s?):\/\//i, '')}</a>`
			)
			// Format all @ mentions
			.replace(
				/\B\@([\w\-]+)/gim,
				(match) =>
					`<a href="https://twitter.com/${match.replace('@', '')}" target="_blank">${match}</a>`
			)
			// Format all # hashtags
			.replace(
				/(#+[a-zA-Z0-9(_)]{1,})/g,
				(match) =>
					`<a href="https://twitter.com/hashtag/${match.replace(
						'#',
						''
					)}" target="_blank">${match}</a>`
			);

		return (
			<div
				ref={forwardedRef}
				{...passThrough}
				dangerouslySetInnerHTML={{ __html: formattedContent }}
			/>
		);
	}
);

TwitzyContent.displayName = 'TwitzyContent';

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweet
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyAuthor
 * ----------------------------------------------------------------------------------------------*/

export {
	Twitzy,
	TwitzyAvatar,
	TwitzyAvatarImage,
	TwitzyAvatarFallback,
	TwitzyAvatarGradientFallback,
	TwitzyTimeStamp,
	TwitzyToolbar,
	TwitzyLike,
	TwitzyReply,
	TwitzyRetweet,
	TwitzyCopyLink,
};
