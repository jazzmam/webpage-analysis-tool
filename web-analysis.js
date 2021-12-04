const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.npmtrends.com';

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

const getLongestPath = async (urlAddress) => {
	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);
		const longestPath = [];

		$('*').each((index, node) => {

			if (node.type == 'tag') {

				console.log("TAG: ", node)
			} else {
				console.log("NOT TAG: ", node)
			}
		});

		return longestPath;
	} catch (error) {
		throw error;
	}
};

getLongestPath(url)
	.then(
		(longestPath) => 
			console.log("The longest path: " + JSON.stringify(longestPath))
	);

	// TO SOLVE:
	// 1) <script> is shown as not a tag
	// 2) are async scripts in the list?

	// const buildPath = (node) => {
	// 	console.log(node);
	// 	if(node.tagName !== "HTML") {
	// 	  path.unshift(node.tagName.toLowerCase())
	// 	  buildPath(node.parentNode)
	// 	}
	//   };
	//   const path = [];
	//   builtPath(<start node>);
	//   document.querySelector(path.join(" "))


				//const buildPath = (node) => {
	// 			//console.log(node);
	// 			if (node.name !== 'html') {
	// 				console.log(node)
	// 				// if(node.children !== null) {
	// 				// 	console.log("CHILD TAG " + children)
	// 				// 	buildPath(node.parentNode)
	// 				// }
	// 			} else {
	// 				console.log(" HTML")
	// 				// if(node.children !== null) {
	// 				// 	console.log("CHILD TAG " + children)
	// 				// 	//path.unshift(node.tagName.toLowerCase())
	// 				// 	buildPath(node.parentNode)
	// 				// }
	// 			}

	// 		  //};
	// 	});

	// 	return longestPath;
	// } catch (error) {
	// 	throw error;
	// }