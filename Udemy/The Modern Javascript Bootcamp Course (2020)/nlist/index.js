#!/usr/bin/env node
const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) throw new Error(err);

  try {
    const statPromises = filenames.map((filename) =>
      lstat(path.join(targetDir, filename))
    );
    const allStats = await Promise.all(statPromises);
    allStats.forEach((stats, index) => {
      console.log(
        stats.isFile()
          ? chalk.bgYellowBright.black.bold(filenames[index])
          : chalk.bgCyanBright.red(filenames[index])
      );
    });
  } catch (err) {
    console.log(err);
  }
});

/*
const fs = require('fs');

// // Method #2
// const util = require('util');
// const lstat = util.promisify(fs.lstat);



// // Method #3
// const { lstat } = fs.promises;


fs.readdir(process.cwd(), async (err, filenames) => {
	if (err) throw new Error(err);

	for(let filename of filenames) {
		try {
			const stats = await lstat(filename);

			console.log(filename, stats.isFile())
		} catch (err) {
			console.log(err);
		}
	}
});


// // Method #1
// const lstat = filename => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(filename, (err, stats) => {
// 			if (err) reject(err);

// 			resolve(stats);
// 		});
// 	});
// }
*/

/*
const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {
	if (err) throw new Error(err);

	const allStats = Array(filenames.length).fill(null);

	filenames.forEach((filename, index) => {
		fs.lstat(filename, (err, stats) => {
			if (err) throw new Error(err);
			allStats[index] = stats;

			const ready = allStats.every(stat => stat !== null);

			if (ready) {
				allStats.forEach((stats, index) => {
					console.log(filenames[index], stats.isFile());
				});
			}
		});
	});

	console.log(filenames);
});
*/
