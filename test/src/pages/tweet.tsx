import {
	TwitzyAuthor,
	TwitzyAvatar,
	TwitzyAvatarFallback,
	TwitzyAvatarGradientFallback,
	TwitzyCopyLink,
	TwitzyLike,
	TwitzyReply,
	TwitzyRetweet,
	TwitzyTimeStamp,
	TwitzyToolbar,
	TwitzyTweet,
	TwitzyTweetContent,
} from "twitzy";
import { Root } from "../components/Root";
import styles from "./tweet.module.css";

const Toolbar = () => {
	return (
		<Root className={styles.Root}>
			<TwitzyTweet
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. 

The first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
				className={styles.twitzyTweet}
			>
				<div className={styles.profile}>
					<TwitzyAvatar>
						<TwitzyAvatarGradientFallback className={styles.avatar} size={45} />
					</TwitzyAvatar>
					<TwitzyAuthor.Root className={styles.authorContainer}>
						<TwitzyAuthor.Name className={styles.authorName} />
						<TwitzyAuthor.ProfileLink className={styles.profileLink} />
					</TwitzyAuthor.Root>
				</div>
				<TwitzyTweetContent className={styles.twitzyTweetContent} />
				<TwitzyTimeStamp className={styles.twitzyTimeStamp} />
				<div className={styles.horizontalLine}></div>
				<TwitzyToolbar className={styles.twitzyToolbar}>
					<TwitzyLike className={styles.twitzyLike}>
						<svg
							className={styles.twitzyLikeIcon}
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 16 16"
						>
							<path
								fillRule="evenodd"
								d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
							/>
						</svg>
						<p className={styles.twitzyLikeCount}>203</p>
					</TwitzyLike>
					<TwitzyReply className={styles.twitzyReply}>
						<svg
							className={styles.twitzyReplyIcon}
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							viewBox="0 0 16 16"
						>
							<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
						</svg>
						<p className={styles.twitzyReplyWord}>Reply</p>
					</TwitzyReply>
					<TwitzyRetweet className={styles.twitzyRetweet}>
						<svg
							className={styles.twitzyRetweetIcon}
							width="26"
							height="26"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 75 72"
						>
							<path d="M70.676 36.644C70.166 35.636 69.13 35 68 35h-7V19c0-2.21-1.79-4-4-4H34c-2.21 0-4 1.79-4 4s1.79 4 4 4h18c.552 0 .998.446 1 .998V35h-7c-1.13 0-2.165.636-2.676 1.644-.51 1.01-.412 2.22.257 3.13l11 15C55.148 55.545 56.046 56 57 56s1.855-.455 2.42-1.226l11-15c.668-.912.767-2.122.256-3.13zM40 48H22c-.54 0-.97-.427-.992-.96L21 36h7c1.13 0 2.166-.636 2.677-1.644.51-1.01.412-2.22-.257-3.13l-11-15C18.854 15.455 17.956 15 17 15s-1.854.455-2.42 1.226l-11 15c-.667.912-.767 2.122-.255 3.13C3.835 35.365 4.87 36 6 36h7l.012 16.003c.002 2.208 1.792 3.997 4 3.997h22.99c2.208 0 4-1.79 4-4s-1.792-4-4-4z" />
						</svg>
						<p className={styles.twitzyReplyWord}>Retweet</p>
					</TwitzyRetweet>
					<TwitzyCopyLink
						className={styles.twitzyCopyLink}
						render={(copied) => {
							return (
								<>
									{copied ? (
										<svg
											className={styles.twitzyCopyLinkIcon}
											xmlns="http://www.w3.org/2000/svg"
											width="26"
											height="26"
											viewBox="0 0 16 16"
										>
											<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
										</svg>
									) : (
										<svg
											className={styles.twitzyCopyLinkIcon}
											xmlns="http://www.w3.org/2000/svg"
											width="26"
											height="26"
											viewBox="0 0 16 16"
										>
											<path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
											<path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
										</svg>
									)}
									<p className={styles.twitzyCopyLinkWord}>{copied ? "copied" : "Copy Link"}</p>
								</>
							);
						}}
					/>
				</TwitzyToolbar>
			</TwitzyTweet>
		</Root>
	);
};

export default Toolbar;
