require('dotenv').config();
const { Types } = require('mongoose');

const dbConnect = require('../db/dbConnect');
const Users = require('../db/model/users');

dbConnect();

const MAX_AMOUNT_NEW_USERS = 100;
const MAX_AMOUNT_NEW_RELATIONS = 300;

async function randomRelations() {
	const users = await Users.find({}, { _id: 1 });

	let createdRelations = 0;
	while (createdRelations < MAX_AMOUNT_NEW_RELATIONS) {
		const [firstRandomNumber, secondRandomNumber] =
			generateTwoRandomNumbers(MAX_AMOUNT_NEW_USERS);
		const firstRandomUserId = users[firstRandomNumber]._id;
		const secondRandomUserId = users[secondRandomNumber]._id;

		const [firstRandomUser, secondRandomUser] = await Promise.all([
			Users.findOne({ _id: Types.ObjectId(firstRandomUserId) }).lean(),
			Users.findOne({ _id: Types.ObjectId(secondRandomUserId) }).lean(),
		]);

		const isBothRandomUsersAreFriends =
			firstRandomUser.friends.some(
				id => secondRandomUserId.toString() === id.toString(),
			) &&
			secondRandomUser.friends.some(
				id => firstRandomUserId.toString() === id.toString(),
			);

		if (isBothRandomUsersAreFriends) {
			continue;
		}

		const isFirstRandomUserFollowedBySecond = firstRandomUser.followers.some(
			id => secondRandomUserId.toString() === id.toString(),
		);
		const isSecondRandomUserFollowedByFirst = secondRandomUser.followers.some(
			id => firstRandomUserId.toString() === id.toString(),
		);

		if (
			isFirstRandomUserFollowedBySecond &&
			isSecondRandomUserFollowedByFirst
		) {
			await Promise.all([
				Users.updateOne(
					{ _id: firstRandomUser._id },
					{
						$pull: { followers: Types.ObjectId(secondRandomUserId) },
						$push: { friends: Types.ObjectId(secondRandomUserId) },
					},
				),
				Users.updateOne(
					{ _id: secondRandomUser._id },
					{
						$pull: { followers: Types.ObjectId(firstRandomUserId) },
						$push: { friends: Types.ObjectId(firstRandomUserId) },
					},
				),
			]);

			++createdRelations;
			continue;
		}

		await Users.updateOne(
			{ _id: firstRandomUser._id },
			{ $push: { followers: Types.ObjectId(secondRandomUserId) } },
		);
		++createdRelations;
		continue;
	}
}

function generateTwoRandomNumbers(number = 0) {
	const firstNumber = randomNumber(number);
	let secondNumber = randomNumber(number);

	while (firstNumber === secondNumber) {
		secondNumber = randomNumber(number);
	}

	return [firstNumber, secondNumber];
}

function randomNumber(number) {
	return Math.floor(Math.random() * number);
}

randomRelations().then(() => process.exit(1));
