import {
	TwitzyAvatar,
	TwitzyAvatarFallback,
	TwitzyAvatarGradientFallback,
	TwitzyAvatarImage,
} from 'twitzy';

export const TwitzyAvatarPage = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '16px',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<TwitzyAvatar>
				<TwitzyAvatarImage
					src="https://pbs.twimg.com/profile_images/1261849800627982338/dmunkKd4_400x400.jpg"
					alt="twitter-profile"
					style={{
						width: 100,
						borderRadius: '9999px',
					}}
				/>
				<TwitzyAvatarGradientFallback authorName="EiffelFly" size={100} />
			</TwitzyAvatar>
			<TwitzyAvatar>
				<TwitzyAvatarImage
					src="https://pbs.twimg.com/profile_iages/1261849800627982338/dmunkKd4_400x400.jpg"
					alt="twitter-profile"
					style={{
						width: 100,
						borderRadius: '9999px',
					}}
				/>
				<TwitzyAvatarGradientFallback
					authorName="EiffelFly"
					size={100}
					style={{
						borderRadius: '9999px',
					}}
				/>
			</TwitzyAvatar>
			{/* <TwitzyAvatar>
				<TwitzyAvatarImage
					src="https://pbs.twimg.com/profile_images/1261849800627982338/dmunkKd4_400x400.jpg"
					alt="twitter-profile"
					style={{
						width: 100,
					}}
				/>
				<TwitzyAvatarGradientFallback authorName="EiffelFly" size={100} />
			</TwitzyAvatar>
			<TwitzyAvatar>
				<TwitzyAvatarImage
					src="https://pbs.twimg.com/profile_iages/1261849800627982338/dmunkKd4_400x400.jpg"
					alt="twitter-profile"
					style={{
						width: 100,
					}}
				/>
				<TwitzyAvatarGradientFallback authorName="Jimmy" size={100} />
			</TwitzyAvatar>
			<TwitzyAvatar>
				<TwitzyAvatarImage
					src="https://pbs.twimg.com/profile_images/1261849800627982338/dmunkKd4_400x400.jpg"
					alt="twitter-profile"
					style={{
						width: 100,
					}}
				/>
				<TwitzyAvatarFallback>EF</TwitzyAvatarFallback>
			</TwitzyAvatar>
			<TwitzyAvatar>
				<TwitzyAvatarImage
					src="https://pbs.twimg.com/profile_iages/1261849800627982338/dmunkKd4_400x400.jpg"
					alt="twitter-profile"
					style={{
						width: 100,
					}}
				/>
				<TwitzyAvatarFallback
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex',
						width: 100,
						height: 100,
						border: '1px solid #000',
						font: 'bold 16px Arial',
					}}
				>
					EF
				</TwitzyAvatarFallback>
			</TwitzyAvatar> */}
		</div>
	);
};

export default TwitzyAvatarPage;
