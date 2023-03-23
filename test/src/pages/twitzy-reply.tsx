import { TwitzyLike, TwitzyReply } from 'twitzy';
import { Root } from '../components/Root';

export const TwitzyLikePage = () => {
	return (
		<Root
			style={{
				backgroundColor: 'black',
			}}
		>
			<TwitzyReply
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '0px 12px',
					textDecoration: 'none',
				}}
				tweetId="1637037962084122627"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="currentColor"
					viewBox="0 0 16 16"
					style={{
						fill: '#43B6EB',
						margin: 'auto 0',
					}}
				>
					<path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
				</svg>
				<p
					style={{
						font: 'bold 20px Arial',
						color: 'lightgray',
						margin: 'auto 0',
					}}
				>
					203
				</p>
			</TwitzyReply>
		</Root>
	);
};

export default TwitzyLikePage;
