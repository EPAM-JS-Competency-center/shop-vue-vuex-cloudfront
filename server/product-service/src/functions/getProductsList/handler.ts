import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<
	typeof schema
> = async () => {
	const products = JSON.parse(
		`[{"count":4,"description":"Soft cat bed wooden","id":"7567ec4b-b10c-48c5-9345-fc73c48a80aa","price":25,"title":"Cat bed soft","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/Cat+bed+soft.jpeg"},{"count":6,"description":"Semi-closed cat bed","id":"7567ec4b-b10c-48c5-9345-fc73c48a80a0","price":20,"title":"Cat bed 'Mega claw'","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/Cat+bed+'Mega+claw'.webp"},{"count":7,"description":"Сozy house with 3 scratching posts","id":"7567ec4b-b10c-48c5-9345-fc73c48a80a2","price":23,"title":"Cat house 'soft paw'","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/Cat+house+'soft+paw'.jpeg"},{"count":12,"description":"cat house with scratching posts in a minimalist design","id":"7567ec4b-b10c-48c5-9345-fc73c48a80a1","price":35,"title":"Cat house '4 paw'","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/Cat+house+'4+paw'.jpeg"},{"count":7,"description":"Simple house for your kitty","id":"7567ec4b-b10c-48c5-9345-fc73c48a80a3","price":15,"title":"Cat house 'simple'","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/Cat+house+'simple'.webp"},{"count":8,"description":"Comfortable house for you cat","id":"7567ec4b-b10c-48c5-9345-fc73348a80a1","price":35,"title":"Cat house 'pipe'","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/pipe.jpg"},{"count":2,"description":"Simple soft cat house","id":"7567ec4b-b10c-48c5-9445-fc73c48a80a2","price":23,"title":"Cat house 'Mobidick'","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/Cat+house+'Mobidick'.jpeg"},{"count":3,"description":"Scratching post for your cats","id":"7567ec4b-b10c-45c5-9345-fc73c48a80a1","price":55,"title":"Trixi nipa","image":"https://rss-school-test-app.s3.eu-west-1.amazonaws.com/assets/Trixi+nipa.jpeg"}]`
	);

	return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
