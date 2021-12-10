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
	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);
		var longestPath = [];
		var amount = [];

		function findAllPaths(startNode, currentAmount) {
	        for (var i = 0; i < startNode.children.length; i++) {
	            var child = startNode.children[i];
	            if ( child.next == null ) {
					if ( child.type != 'tag' ) {
						console.log(child.name, " IS NOT A TAG");
					} else {
						amount.push(currentAmount);
						console.log(child.name, " IS A TAG, THE LAST ONE FROM SIBLINGS. CURRENT AMOUNT = ", currentAmount)
					}
	            }
				else {
					console.log("NAME", startNode.children[i].name);
	            	console.log("TYPE", startNode.children[i].type);
					// when node is not a tag, currentAmount is already increased here 
					console.log("CURRENT AMOUNT = ", currentAmount);

	            	if ( startNode.children[i].type == 'tag' ) {
						findAllPaths(startNode.children[i], currentAmount+1);
	            	} 
					//  TypeError: Cannot read property 'length' of undefined (kuomet textas paduodamas kaip node)
					// else {
					// 	findAllPaths(startNode.children[i], currentAmount);
					// }
	            }
	        }
	    }

	    findAllPaths($('body')['0'], 1);

		return paths;
	} catch (error) {
		throw error;
	}
};

getLongestPath(url);

