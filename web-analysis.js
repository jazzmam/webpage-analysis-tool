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

		// when should this array be used?
		var amount = [];

		function findAllPaths(startNode, currentAmount) {
	        for (var i = 0; i < startNode.children.length; i++) {
	            var child = startNode.children[i];
	            if ( child.next == null ) {
					if ( child.type != 'tag' ) {
						currentAmount = currentAmount-1;
						amount.push(currentAmount);
						console.log(child.name, " IS NOT A TAG. CURRENT AMOUNT = ", currentAmount);
						// kviesti save rekursiskai nepridedant +1
					} else {
						console.log(child.name, " IS A TAG, THE LAST ONE FROM SIBLINGS. CURRENT AMOUNT = ", currentAmount);
						// kviesti save rekursiskai pridedant +1
					}
	            }
				else {
	            	if ( startNode.children[i].type == 'tag' ) {

						console.log("TAG NAME = ", startNode.children[i].name);
						console.log("TYPE =", startNode.children[i].type);
						console.log("CURRENT AMOUNT = ", currentAmount);

						findAllPaths(startNode.children[i], currentAmount);
	            	} 
					else {
						console.log("NOT THE LEST CHILD, NOT A TAG = ", startNode.children[i].name);
						// change current amount
						currentAmount = currentAmount-1;
						amount.push(currentAmount);
						console.log("CURRENT AMOUNT = ", currentAmount);
						// kviesti save rekursiskai nepridedant +1
						//  TypeError: Cannot read property 'length' of undefined (kuomet textas paduodamas kaip node)
						//findAllPaths(startNode.children[i], currentAmount);
					}
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

