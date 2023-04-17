import { Overview } from "twitzy";
import { Root } from "../components/Root";
import styles from "./overview.module.css";

const OverviewPage = () => {
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
			<Overview.Root>
				{tweets.map((tweet) => (
					<Overview.Card>{tweet.author}</Overview.Card>
				))}
			</Overview.Root>
		</Root>
	);
};

export default OverviewPage;
