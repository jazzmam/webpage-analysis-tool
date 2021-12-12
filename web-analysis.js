const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://mochajs.org/';


const getUniqueTagsAndTheirAmount = async (urlAddress) => {
	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);
		const uniqueTags = [];

		$('*').each((index, el) => {
			const tagInTree = $(el)[0].name;

			const isTagRecorded = uniqueTags.some(el => el.tag === tagInTree);
			if (!isTagRecorded) {
				uniqueTags.push(
					{
						tag: tagInTree,
						amount: 1
					});
			} else {
				const tagToUpdate = uniqueTags.find(
					tagName => {
						return tagName.tag === tagInTree;
					}
				)

				tagToUpdate.amount +=1;
			}
		});

		return uniqueTags;
	} catch (error) {
		throw error;
	}
};

const getLongestPath = async (urlAddress) => {

	let highestAmount = 0;
	startNodesTag = 'body';
	let longestPath = [];
	let currentPath = [startNodesTag];

	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);

		function findPath(startNode, currentAmount) {
	        for (var i = 0; i < startNode.children.length; i++) {
	            var child = startNode.children[i];

				if ( child.type === 'tag' ) {
					currentAmount = currentAmount+1;
					currentPath.push(child.name);
					
					findPath(startNode.children[i], currentAmount);
				}

				if (currentAmount > highestAmount) {
					highestAmount = currentAmount;
					longestPath = currentPath;
				}
				currentAmount = 0;
				currentPath = [startNodesTag];
	        }
	    }

	    findPath($(startNodesTag)['0'], 1);

		return longestPath;
	} catch (error) {
		throw error;
	}
};

//DON'T REMOVE
// getUniqueTagsAndTheirAmount(url)
// 	.then(
// 		(uniqueTags) => 
// 			console.log("Unique tags: " + JSON.stringify(uniqueTags.map(tag => tag.tag).join(', '))
// 	));

// DON'T REMOVE
// var mostCommonTag = getUniqueTagsAndTheirAmount(url)
// 	.then(uniqueTags => 
// 		console.log( "Most commonly used tag: " +
// 			uniqueTags.reduce(function(prev, current) {
// 				     return (prev.amount > current.amount) ? prev : current
// 				 }).tag
// 	));

const getLongestPathWithMostPopularTag = async (urlAddress) => {

	let highestAmountOfMostPopularTagUse = 0;
	let startNodesTag = 'body';
	let mostCommonTag = 'span';
	let longestPathWithMostPopularTag = [];
	let currentPath = [startNodesTag];

	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);

		function findPathWhereMostlyUsed(startNode, currentAmount) {
			for (var i = 0; i < startNode.children.length; i++) {
				var child = startNode.children[i];

				if ( child.type === 'tag' ) {
					currentPath.push(child.name);

					if ( child.name === mostCommonTag ) {
						currentAmount = currentAmount+1;
					}

					findPathWhereMostlyUsed(startNode.children[i], currentAmount);
				}

				if (currentAmount > highestAmountOfMostPopularTagUse) {
					highestAmountOfMostPopularTagUse = currentAmount;
					longestPathWithMostPopularTag = currentPath;
				}
				currentAmount = 0;
				currentPath = [startNodesTag];
			}
		}

		findPathWhereMostlyUsed($(startNodesTag)['0'], 0);

		return longestPathWithMostPopularTag;
	} catch (error) {
		throw error;
	}
};

getLongestPathWithMostPopularTag(url)
	.then(longestPathWithMostPopularTag => 
		console.log("longestPathWithMostPopularTag ", longestPathWithMostPopularTag)
);