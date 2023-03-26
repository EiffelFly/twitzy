import { GetStaticProps } from 'next';
import { TwitzyTweet } from 'twitzy';

// export const getStaticProps: GetStaticProps = async () => {
// 	const expansionsParams =
// 		'expansions=author_id,attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id,attachments.poll_ids';
// 	const tweetFieldsParams =
// 		'&attachments,author_id,public_metrics,created_at,id,in_reply_to_user_id,referenced_tweets,text,entities';
// 	const userFieldsParams =
// 		'&user.fields=created_at,description,entities,id,name,profile_image_url,protected,public_metrics,url,username,verified,withheld';
// 	const mediaFieldsParams =
// 		'&media.fields=duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics';
// 	const pollFieldsParam = '&poll.fields=duration_minutes,end_datetime,id,options,voting_status';
// 	const queryString =
// 		expansionsParams + tweetFieldsParams + userFieldsParams + mediaFieldsParams + pollFieldsParam;

// 	const tweetId = '1637037962084122627';

// 	const response = await fetch(`https://api.twitter.com/2/tweets/${tweetId}?${queryString}`, {
// 		headers: {
// 			Authorization: `Bearer ${process.env.TWITTER_AUTH_TOKEN}`,
// 		},
// 	});

// 	const tweet = await response.json();

// 	return {
// 		props: {
// 			// props for your component
// 		},
// 	};
// };

const TweetPage = () => {
	return <TwitzyTweet></TwitzyTweet>;
};

export default TweetPage;
