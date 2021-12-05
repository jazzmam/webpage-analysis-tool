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




const getLongestPath = async (urlAddress) => {
	try {
		const { data } = await axios.get(urlAddress);
		const $ = cheerio.load(data);
		var childrenAmount = 0;
		var longestPath = [];
		var paths = [];


		console.log($('body').children)

		// function findAllPaths(startNode, currentCost) {
	 //        for (var i = 0; i < startNode.children.length; i++) {
	 //            var child = startNode.children[i];
	 //            if ( child.next == null ) {
	 //                paths.push(currentCost);
	 //            } else {
	 //                findAllPaths(QATree[child.next], currentCost+1);
	 //            }
	 //        }
	 //    }
	 //    findAllPaths($('body'), 1);

		return paths;
	} catch (error) {
		throw error;
	}
};

getLongestPath(url);




// DON'T REMOVE

// const getLongestPath = async (urlAddress) => {
// 	try {
// 		const { data } = await axios.get(urlAddress);
// 		const $ = cheerio.load(data);
// 		var childrenAmount = 0;
// 		var longestPath = [];
// 		var paths = [];

// 		$('*').each((index, node) => {

// 			if (node.type === 'tag' && node.children.length !== 0) {

// 				console.log("TAG WITH CHILDREN: ", node);
// 				childrenAmount++;
// 				console.log("CHILDREN AMOUNT: ", childrenAmount);
// 				longestPath.push(node.name);
// 				console.log("FULL PATH: ", longestPath);
// 			}

// 			return index < 8;
// 		});


// 		return longestPath;
// 		return paths;
// 	} catch (error) {
// 		throw error;
// 	}
// };

// getLongestPath(url);

////

// function shortAndLong(QATree, startNode) {
//     var paths = [];
//     function findAllPaths(startNode, currentCost) {
//         for (var i = 0; i < startNode.answers.length; i++) {
//             var child = startNode.answers[i];
//             if (child.nextQuestion == null) {
//                 paths.push(currentCost);
//             }else {
//                 findAllPaths(QATree[child.nextQuestion], currentCost+1);
//             }
//         }
//     }
//     findAllPaths(startNode, 1);
//     return [Math.min.apply(Math, paths), Math.max.apply(Math, paths)]
// }
// console.debug('ans',shortAndLong(QAndAObj, QAndAObj[1]));//returns [2, 4]
// console.debug('ans',shortAndLong(QAndAObj, QAndAObj[2]));//returns [1, 3]
// console.debug('ans',shortAndLong(QAndAObj, QAndAObj[3]));//returns [1, 2]
// console.debug('ans',shortAndLong(QAndAObj, QAndAObj[4]));//returns [1, 1]

