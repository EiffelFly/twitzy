import { TwitzyLike } from 'twitzy';
import { Root } from '../components/Root';

export const TwitzyLikePage = () => {
	return (
		<Root>
			<TwitzyLike
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '0px 12px',
					textDecoration: 'none',
				}}
				tweetId="1637037962084122627"
			>
				<svg
					style={{
						fill: 'red',
						margin: 'auto 0',
					}}
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
				>
					<path
						fillRule="evenodd"
						d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
					/>
				</svg>
				<p
					style={{
						font: 'bold 16px Arial',
						color: 'lightgray',
					}}
				>
					203
				</p>
			</TwitzyLike>
		</Root>
	);
};

export default TwitzyLikePage;
