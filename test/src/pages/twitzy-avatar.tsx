import { Tweet } from "twitzy";
import { Root } from "../components/Root";

export const TwitzyAvatarPage = () => {
	return (
		<Root>
			<Tweet.Root
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. \n\nThe first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
			>
				<Tweet.Avatar>
					<Tweet.AvatarImage
						src="https://pbs.twimg.com/profile_images/1261849800627982338/dmunkKd4_400x400.jpg"
						alt="twitter-profile"
						style={{
							width: 100,
							borderRadius: "9999px",
						}}
					/>
					<Tweet.AvatarGradientFallback size={100} />
				</Tweet.Avatar>
			</Tweet.Root>

			<Tweet.Root
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. \n\nThe first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
			>
				<Tweet.Avatar>
					<Tweet.AvatarImage
						src="https://pbs.twimg.com/profile_iages/1261849800627982338/dmunkKd4_400x400.jpg"
						alt="twitter-profile"
						style={{
							width: 100,
							borderRadius: "9999px",
						}}
					/>
					<Tweet.AvatarGradientFallback
						size={100}
						style={{
							borderRadius: "9999px",
						}}
					/>
				</Tweet.Avatar>
			</Tweet.Root>

			<Tweet.Root
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. \n\nThe first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
			>
				<Tweet.Avatar>
					<Tweet.AvatarImage
						src="https://pbs.twimg.com/profile_images/1261849800627982338/dmunkKd4_400x400.jpg"
						alt="twitter-profile"
						style={{
							width: 100,
						}}
					/>
					<Tweet.AvatarGradientFallback size={100} />
				</Tweet.Avatar>
			</Tweet.Root>

			<Tweet.Root
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. \n\nThe first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
			>
				<Tweet.Avatar>
					<Tweet.AvatarImage
						src="https://pbs.twimg.com/profile_iages/1261849800627982338/dmunkKd4_400x400.jpg"
						alt="twitter-profile"
						style={{
							width: 100,
						}}
					/>
					<Tweet.AvatarGradientFallback size={100} />
				</Tweet.Avatar>
			</Tweet.Root>

			<Tweet.Root
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. \n\nThe first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
			>
				<Tweet.Avatar>
					<Tweet.AvatarImage
						src="https://pbs.twimg.com/profile_images/1261849800627982338/dmunkKd4_400x400.jpg"
						alt="twitter-profile"
						style={{
							width: 100,
						}}
					/>
					<Tweet.AvatarFallback>EF</Tweet.AvatarFallback>
				</Tweet.Avatar>
			</Tweet.Root>

			<Tweet.Root
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. \n\nThe first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
			>
				<Tweet.Avatar>
					<Tweet.AvatarImage
						src="https://pbs.twimg.com/profile_iages/1261849800627982338/dmunkKd4_400x400.jpg"
						alt="twitter-profile"
						style={{
							width: 100,
						}}
					/>
					<Tweet.AvatarFallback
						style={{
							alignItems: "center",
							justifyContent: "center",
							display: "flex",
							width: 100,
							height: 100,
							border: "1px solid #000",
							font: "bold 16px Arial",
						}}
					>
						EF
					</Tweet.AvatarFallback>
				</Tweet.Avatar>
			</Tweet.Root>
		</Root>
	);
};

export default TwitzyAvatarPage;
