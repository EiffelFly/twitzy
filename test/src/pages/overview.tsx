import { TwitzyOverview } from "twitzy";
import { Root } from "../components/Root";
import styles from "./overview.module.css";

const Overview = () => {
	const tweets = [
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1637037962084122627",
			content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. 

    The first step is building an unstyled twitter thread component.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
	];

	return (
		<Root className={styles.Root}>
			<TwitzyOverview.Root>
				{tweets.map((tweet) => (
					<TwitzyOverview.Card>{tweet.author}</TwitzyOverview.Card>
				))}
			</TwitzyOverview.Root>
		</Root>
	);
};

export default Overview;
