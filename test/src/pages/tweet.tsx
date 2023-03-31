import { Root } from "../components/Root";
import { Tweet } from "../components/Tweet";
import styles from "./tweet.module.css";

const TweetPage = () => {
	return (
		<Root
			style={{
				backgroundColor: "#191C1D",
			}}
		>
			<Tweet
				tweet={{
					author: "EiffelFly",
					authorUrl: "https://twitter.com/EiffelFly",
					avatarSrc: "",
					id: "1637037962084122627",
					content: `I am going to to learn new mind-frame: "Compound Components" by building stuff. \n\nThe first step is building an unstyled twitter thread component.`,
					createdAt: "2023-03-20T02:46:14Z",
				}}
			/>
		</Root>
	);
};

export default TweetPage;
