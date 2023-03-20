import { TwitzyTimeStamp } from 'twitzy';
import { Root } from '../components/Root';

const TimeStampPage = () => {
	return (
		<Root>
			<TwitzyTimeStamp
				time="2023-03-20T02:46:14Z"
				style={{
					font: 'bold 32px Arial',
				}}
			/>
		</Root>
	);
};

export default TimeStampPage;
