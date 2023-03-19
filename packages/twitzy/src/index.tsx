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
	<TwitzyAvatarProvider>{children}</TwitzyAvatarProvider>;
};

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatarImage
 * ----------------------------------------------------------------------------------------------*/

type TwitzyAvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

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
 * TwitzyAvatarFallback
 * ----------------------------------------------------------------------------------------------*/

/* Credit: https://github.com/vercel/avatar */

function generateGradient(username: string) {
	function djb2(str: string) {
		let hash = 5381;
		for (let i = 0; i < str.length; i++) {
			hash = (hash << 5) + hash + str.charCodeAt(i);
		}
		return hash;
	}

	const c1 = color({ h: djb2(username) % 360, s: 0.95, l: 0.5 });
	const second = c1.triad()[1].toHexString();

	return {
		fromColor: c1.toHexString(),
		toColor: second,
	};
}

type TwitzyAvatarFallbackProps = {
	size: number;
	author: string;
};

type TwitzyAvatarFallbackElement = SVGSVGElement;

const TwitzyAvatarFallback = React.forwardRef<
	TwitzyAvatarFallbackElement,
	TwitzyAvatarFallbackProps
>((props, forwardedRef) => {
	const { size, author } = props;

	const context = useTwitzyAvatarContext();
	const gradient = generateGradient(author);

	return context.avatarLoadingStatus !== 'loaded' ? (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			ref={forwardedRef}
		>
			<g>
				<defs>
					<linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0%" stopColor={gradient.fromColor} />
						<stop offset="100%" stopColor={gradient.toColor} />
					</linearGradient>
				</defs>
				<circle fill="url(#gradient)" x="0" y="0" width={size} height={size} />
			</g>
		</svg>
	) : null;
});

TwitzyAvatarFallback.displayName = 'TwitzyAvatarFallback';

/* ------------------------------------------------------------------------------------------------
 * TwitzyAvatarTimeStamp
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyTimeStamp
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyLove
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyReply
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyRetweet
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyCopyLink
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyCopyLink
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyProfileLink
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyContent
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyTweet
 * ----------------------------------------------------------------------------------------------*/

/* ------------------------------------------------------------------------------------------------
 * TwitzyAuthor
 * ----------------------------------------------------------------------------------------------*/

export { Twitzy, TwitzyAvatar, TwitzyAvatarImage, TwitzyAvatarFallback };
