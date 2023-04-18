import { Thread, Threads } from "twitzy";
import { Root } from "../components/Root";
import { TweetBase } from "../components/Tweet";
import styles from "./threads.module.css";

const ThreadsPage = () => {
	const tweets = [
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639857928508145665",
			content: `Just like you have roughly four sections of working memory. The space for you to bring up creativity and create something new is limited. \n\nIn my observation, I roughly have three slots for me to fully use my creativity and it will change depend on the condition of my mental`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639858506718416896",
			content: `The first one is the creation of my new novel "An egg for breakfast". Talking about a breakfast restaurant chief, embarking a journey to find the serial cat killer, in order to bring the balance back, to reduce the outrage of rats.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639859330915905536",
			content: `The second one is the creation of open-source tools. Mostly centers around Curioucity, a knowledge management tool built for community builders.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639859514320257024",
			content: `But I switch the focus to a smaller tool recently: Twitzy" An unstyled react compound component library for building Twitch thread on your owned page. Because I can't sustain the creativity that Curioucity ask for when writing "An egg for breakfast"`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639860500640182272",
			content: `The third one is my daily job, building the user-interface of Instill-AI. This drains a lot of my creativity too, but not on "Create new stuffs" but on "How to coordinate different component together". At the same time, image what is the interface that can help us work with AI.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639861010407497729",
			content: `I conduct lots of experimentation to find the best balance on these different creativity slots. Here are some of my findings 👇`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639861833413836800",
			content: `1. Persistent is the key to cultivate your creativity. I remember Raymond Chandler once said, even you can't write anything meaningful that day, you still need to seat in front of the desk, do your best to think and imagine.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639862699030085632",
			content: `2. Mind frame: Creativity Slot. \n\nJust like I said, your creativity is not an unlimited resource. You can't jump between different ideas and dream about coming up with meaningful theory/action that is remarkable. Find your maximum creativity slots and arrange them carefully`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639863733907521537",
			content: `2.5 How to identify your creativity slots: \n\nIt's hard to give a detailed guideline besides experimenting with yourself. But I can confidently say, the process is a game about subtraction.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639864465314426936",
			content: `2.75 \n\nFirst, fill yourself with all the possibilities and then remove the stuff that you feel less passionate about. Put ideas on the libra, and test their weights and potential. Remove them to a point that you could confidently handle them in your daily workflow`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639865146662346754",
			content: `3. Bring the creation process to the public \n\nDon't blindly create something in the dark, suddenly show it to the public and desire it will have the spotlight that it deserved. This is not a fairytale. \n\nShow what you built, what problems you had encountered from the day one.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639865526901161984",
			content: `3.5 \n\nThen you will be less lonely and much more motivated when you find someone is really looking forward to your creation. Believe me, that is one of the most fruitful feeling you can taste.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
		{
			author: "EiffelFly",
			authorUrl: "https://twitter.com/EiffelFly",
			avatarSrc: "",
			id: "1639865913334984704",
			content: `In short: \n\n1. Persistent is the key \n2. Find your optimized creativity slots \n3. Build and share with others from the ground zero \n\nThat is it, the key ingredient of my creating process.`,
			createdAt: "2023-03-20T02:46:14Z",
		},
	];

	const [tweetHead, ...tweetTails] = tweets;

	return (
		<Root className={styles.Root}>
			<Threads className={styles.Threads}>
				<Thread.Root className={styles.Thread} id="1637037962084122627">
					<Thread.Trigger>Open thread</Thread.Trigger>
					<Thread.Head>
						<TweetBase tweet={tweetHead} />
					</Thread.Head>
					<Thread.Tails className={styles.ThreadTails}>
						{tweetTails.map((tweet) => (
							<TweetBase key={tweet.id} tweet={tweet} />
						))}
					</Thread.Tails>
				</Thread.Root>
			</Threads>
		</Root>
	);
};

export default ThreadsPage;
