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

// // DON'T REMOVE
// getUniqueTagsAndTheirAmount(url)
// 	.then(uniqueTags => 
// 		console.log( "Most commonly used tag: " +
// 			uniqueTags.reduce(function(prev, current) {
// 				     return (prev.amount > current.amount) ? prev : current
// 				 }).tag
// 	));

// TODO - reuse the code of fetching data - create a helper function

const getLongestPath = async (urlAddress) => {
	var amount = [];
	var longestPath = [];

	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);

		function findAllPaths(startNode, currentAmount) {
	        for (var i = 0; i < startNode.children.length; i++) {
	            var child = startNode.children[i];
	            if ( child.next === null ) {
					if ( child.type === 'tag' ) {
						console.log(child.name, "  TAG, THE LAST from siblings. TYPE = ", startNode.children[i].type)
						console.log(" AMOUNT = ", currentAmount+1);

						amount.push(currentAmount+1);
						findAllPaths(startNode.children[i], currentAmount+1);
					} else {
						console.log(child.name, " NOT TAG, THE LAST from siblings. TYPE = ", startNode.children[i].type)
						console.log("AMOUNT = ", currentAmount);

						amount.push(currentAmount);
					}
	            }
				else {
	            	if ( startNode.children[i].type === 'tag' ) {
						console.log("TAG = ", startNode.children[i].name, " TYPE = ", startNode.children[i].type)
						console.log( " AMOUNT = ", currentAmount+1);

						amount.push(currentAmount+1);
						findAllPaths(startNode.children[i], currentAmount+1);
	            	} 
					else {
						console.log("NOT TAG = ", startNode.children[i].name, " TYPE = ", startNode.children[i].type)
						console.log(" AMOUNT = ", currentAmount);

						amount.push(currentAmount);
					}
	            }
	        }
	    }

	    findAllPaths($('body')['0'], 1);


		let maxAmount = Math.max(...amount);

		return maxAmount;
	} catch (error) {
		throw error;
	}
};

getLongestPath(url)
.then( maxAmount => console.log("MAX AMOUNT:::: ", maxAmount));

