import { useState } from "react";
import { workingMemoryThread } from "../../data/tweets";
import { Root } from "../components/Root";
import styles from "./dialog.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Thread } from "twitzy";
import { TweetBase } from "../components/Tweet";

const ThreadDialogPage = () => {
	const [tweetHead, ...tweetTails] = workingMemoryThread;
	const [threadIsOpen, setThreadIsOpen] = useState(false);

	return (
		<Root className={styles.Root}>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<button className={styles.DialogTrigger}>Edit profile</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className={styles.DialogOverlay}>
						<Dialog.Content className={styles.DialogContent}>
							<Thread.Root
								className={styles.Thread}
								open={threadIsOpen}
								onOpenChange={setThreadIsOpen}
							>
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
						</Dialog.Content>
					</Dialog.Overlay>
				</Dialog.Portal>
			</Dialog.Root>
		</Root>
	);
};

export default ThreadDialogPage;
