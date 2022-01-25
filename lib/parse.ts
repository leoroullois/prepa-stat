import { join } from "path";
import { readFileSync, writeFile, mkdir } from "fs";
const path = require("path");
const d3 = require("d3");
const fetch = require("node-fetch");
const parseFile = (fileName: string, inputPath: string) => {
	const input = readFileSync(join(inputPath, fileName + ".tsv"), "utf8")
		.toString()
		.trim()
		.split("")
		.map((elt) => elt.replace(" ", "_"))
		.join("");
	return d3.tsv.parse(input);
};

export const parseAllFiles = (fileNames: string[], inputPath: string) => {
	const parsedFiles = [];
	for (const name of fileNames) {
		try {
			parsedFiles.push(parseFile(name, inputPath));
		} catch (e) {
			console.error(e);
		}
	}
	return parsedFiles;
};

// const params = parseAllFiles(
// 	["2021_mp", "2021_pc", "2021_psi", "2021_pt"],
// 	path.join(__dirname, "./2021")
// )[0][0];
// const response = fetch("localhost:5000/api/schools", {
// 	method: 'post',
// 	body: JSON.stringify(params),
// 	headers: {'Content-Type': 'application/json'}
// });
// const data = response.json();
// const exportFile = (
// 	file: DSVRowArray<string>,
// 	fileName: string,
// 	outputPath: string
// ) => {
// 	const filiere = fileName.toLowerCase().slice(5, 7);
// 	const year = fileName.slice(0, 4);
// 	for (const data of file) {
// 		data.annee = year;
// 		data.filiere = filiere;
// 	}
// 	const myFile = JSON.stringify(file);
// 	writeFile(join(outputPath, fileName + ".json"), myFile, (err) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log("File written successfully\n");
// 		}
// 	});
// };
// const exportAllFiles = (
// 	files: DSVRowArray<string>[],
// 	fileNames: string[],
// 	outputPath: string
// ) => {
// 	const n = files.length;
// 	const m = fileNames.length;
// 	for (let k = 0; k < n; k++) {
// 		exportFile(files[k], fileNames[k], outputPath);
// 	}
// };
// const generateYear = (year: number) => {
// 	// const filieres = ["bcpst", "mp", "pc", "psi", "pt", "tb", "tpc", "tsi"];
// 	const filieres = ["mp", "pc", "psi", "pt"];
// 	const inputPath = "/media/leyo/DATA/Dev/Web/prepa-stat/lib/" + year + "/";
// 	const outputPath = "/media/leyo/DATA/Dev/Web/prepa-stat/lib/" + year + "/";
// 	mkdir(outputPath, (e) => {
// 		if (e) {
// 			console.error(e);
// 		} else {
// 			console.log("Directory created succesfully");
// 		}
// 	});
// 	const fileNames = filieres.map((elt) => year + "_" + elt);
// 	const parsedFiles = parseAllFiles(fileNames, inputPath);
// 	exportAllFiles(parsedFiles, fileNames, outputPath);
// };
// const init = () => {
// 	for (let i = 2019; i <= 2021; i++) {
// 		generateYear(i);
// 	}
// };
// init();
