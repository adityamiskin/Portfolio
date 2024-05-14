'use client';

import { Tweet } from 'react-tweet';
import { components } from './tweet-components';

const TwitterEmbed = ({ tweetId }) => {
	return <Tweet id={tweetId} components={components} />;
};

export default TwitterEmbed;
