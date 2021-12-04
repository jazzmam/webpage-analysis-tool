const axios = require('axios');
const cheerio = require('cheerio');
//const url = 'https://www.npmtrends.com';
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

const getLongestPath = async (urlAddress) => {
	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);
		var childrenAmount = 0;
		const longestPath = [];

		$('*').each((index, node) => {

			if (node.type === 'tag' && node.children.length !== 0) {

				console.log("TAG WITH CHILDREN: ", node);
				childrenAmount++;
				console.log("CHILDREN AMOUNT: ", childrenAmount);
				longestPath.push(node.name);
				console.log("FULL PATH: ", longestPath);
			}

			return index < 8;
		});

		return longestPath;
	} catch (error) {
		throw error;
	}
};


getLongestPath(url);



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