import { Root } from "../components/Root";
import { TweetBase } from "../components/Tweet";

const TweetPage = () => {
	return (
		<Root
			style={{
				backgroundColor: "#191C1D",
			}}
		>
			<TweetBase
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
