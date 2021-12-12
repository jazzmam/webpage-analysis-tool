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

// DON'T REMOVE
// getUniqueTagsAndTheirAmount(url)
// 	.then(
// 		(uniqueTags) => 
// 			console.log("Unique tags: " + JSON.stringify(uniqueTags.map(tag => tag.tag).join(', '))
// 	));

// getUniqueTagsAndTheirAmount(url)
// 	.then(uniqueTags => 
// 		console.log( "Most commonly used tag: " +
// 			uniqueTags.reduce(function(prev, current) {
// 				     return (prev.amount > current.amount) ? prev : current
// 				 }).tag
// 	));


// TODO RETURN A STRING WITH THE LONGEST PATH TAGS HERE
const getLongestPath = async (urlAddress) => {

	let highestAmount = 0;

	longestPath = [];
	currentPath = [];

	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);

		function findAllPaths(startNode, currentAmount) {
	        for (var i = 0; i < startNode.children.length; i++) {
	            var child = startNode.children[i];

				if ( child.type === 'tag' ) {
					currentAmount = currentAmount+1;

					console.log("LAST TAG ", child.name, " CURRENT AMOUNT ", currentAmount);

					findAllPaths(startNode.children[i], currentAmount);
				} 

				console.log("HIGHEST AMOUNT BEFORE ", highestAmount);
				if (currentAmount > highestAmount) {
					highestAmount = currentAmount;
					console.log("HIGHEST AMOUNT AFTER ", highestAmount);
				}
				currentAmount = 0;
	        }
	    }

	    findAllPaths($('body')['0'], 1);

		//maxTagsAmount = Math.max(...currentAmount);

		return highestAmount;
	} catch (error) {
		throw error;
	}
};

//DON'T REMOVE
getLongestPath(url)
.then( maxTagsAmount => console.log("LONGEST PATH =", maxTagsAmount));


// TODO - creae another function here