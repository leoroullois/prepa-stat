// import path from "path";
// import fs from "fs";
// import * as d3 from "d3";

import { join } from "path";
import { readFileSync, writeFile, mkdir } from "fs";
import { tsvParse } from "d3";

const parseFile = (fileName, inputPath) => {
	const input = readFileSync(join(inputPath, fileName + ".tsv"), "utf8")
		.toString()
		.trim()
		.split("")
		.map((elt) => elt.replace(" ", "_"))
		.join("");
	return tsvParse(input);
};

const parseAllFiles = (fileNames, outputPath) => {
	const parsedFiles = [];
	for (const name of fileNames) {
		try {
			parsedFiles.push(parseFile(name, outputPath));
		} catch (e) {
			console.error(e);
		}
	}
	return parsedFiles;
};

const exportFile = (file, fileName, outputPath) => {
	const filiere = fileName.toLowerCase().slice(5, 7);
	const year = fileName.slice(0, 4);
	for (const data of file) {
		data.annee = year;
		data.filiere = filiere;
	}
	const myFile = JSON.stringify(file);
	writeFile(join(outputPath, fileName + ".json"), myFile, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("File written successfully\n");
		}
	});
};
const exportAllFiles = (files, fileNames, outputPath) => {
	const n = files.length;
	const m = fileNames.length;
	for (let k = 0; k < n; k++) {
		exportFile(files[k], fileNames[k], outputPath);
	}
};
const generateYear = (year) => {
	// const filieres = ["bcpst", "mp", "pc", "psi", "pt", "tb", "tpc", "tsi"];
	const filieres = ["mp", "pc", "psi", "pt"];
	const inputPath = "/media/leyo/DATA/Dev/Web/prepa-stat/lib/" + year + "/";
	const outputPath = "/media/leyo/DATA/Dev/Web/prepa-stat/lib/" + year + "/";
	mkdir(outputPath, (e) => {
		if (e) {
			console.error(e);
		} else {
			console.log("Directory created succesfully");
		}
	});
	const fileNames = filieres.map((elt) => year + "_" + elt);
	const parsedFiles = parseAllFiles(fileNames, inputPath);
	exportAllFiles(parsedFiles, fileNames, outputPath);
};
const init = () => {
	for (let i = 2019; i <= 2021; i++) {
		generateYear(i.toString());
	}
};
init();
