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
	            if ( child.next === null ) {
					if ( child.type === 'tag' ) {
						// call itself adding 1 to the amount
						//currentAmount = currentAmount+1;

						console.log(child.name, "  TAG, THE LAST. TYPE = ", startNode.children[i].type)
						console.log(" AMOUNT = ", currentAmount+1);
						amount.push(currentAmount+1);
						findAllPaths(startNode.children[i], currentAmount+1);
					} else {
						// call itself adding 0 to the amount
						//currentAmount = currentAmount-1;

						console.log(child.name, " NOT TAG, THE LAST. TYPE = ", startNode.children[i].type)
						console.log("AMOUNT = ", currentAmount);
						amount.push(currentAmount);

						//findAllPaths(startNode.children[i], currentAmount);
					}
	            }
				else {
	            	if ( startNode.children[i].type === 'tag' ) {
						// call itself adding 1 to amount
						//currentAmount = currentAmount+1;

						console.log("TAG = ", startNode.children[i].name, " TYPE = ", startNode.children[i].type)
						console.log( " AMOUNT = ", currentAmount+1);
						amount.push(currentAmount+1);

						findAllPaths(startNode.children[i], currentAmount+1);
	            	} 
					else {
						// call itself adding 0 to amount
						//currentAmount = currentAmount-1;

						console.log("NOT TAG = ", startNode.children[i].name, " TYPE = ", startNode.children[i].type)
						console.log(" AMOUNT = ", currentAmount);
						amount.push(currentAmount);

						//findAllPaths(startNode.children[i], currentAmount);

						//  TypeError: Cannot read property 'length' of undefined (kuomet textas paduodamas kaip node)
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

