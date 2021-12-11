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

// TODO =  assign value of async function to a variable
// const mostCommonlyUsedTag = 

getUniqueTagsAndTheirAmount(url)
	.then(uniqueTags => 
		console.log( "Most commonly used tag: " +
			uniqueTags.reduce(function(prev, current) {
				     return (prev.amount > current.amount) ? prev : current
				 }).tag
	));

console.log("MOST COMMON ", mostCommonlyUsedTag)


// TODO RETURN A STRING WITH THE LONGEST PATH TAGS HERE
const getLongestPath = async (urlAddress) => {
	let amount = [];
	let maxTagsAmount = 0;

	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);

		function findAllPaths(startNode, currentTagsAmount) {
	        for (var i = 0; i < startNode.children.length; i++) {
	            var child = startNode.children[i];
	            if ( child.next === null ) {
					if ( child.type === 'tag' ) {
						amount.push(currentTagsAmount+1);
						findAllPaths(startNode.children[i], currentTagsAmount+1);
					} else {
						amount.push(currentTagsAmount);
					}
	            }
				else {
	            	if ( startNode.children[i].type === 'tag' ) {
						amount.push(currentTagsAmount+1);
						findAllPaths(startNode.children[i], currentTagsAmount+1);
	            	} 
					else {
						amount.push(currentTagsAmount);
					}
	            }
	        }
	    }

	    findAllPaths($('body')['0'], 1);

		maxTagsAmount = Math.max(...amount);

		return maxTagsAmount;
	} catch (error) {
		throw error;
	}
};

// DON'T REMOVE
// getLongestPath(url)
// .then( maxTagsAmount => console.log("LONGEST PATH =", maxTagsAmount));