import { join } from "path";
import { readFileSync, writeFile, mkdir } from "fs";
import * as d3 from "d3";
import fetch from "node-fetch";
// const { join } = require("path");
// const { readFileSync, writeFile, mkdir } = require("fs");
// const d3 = require("d3");
// import path from "path";
// import fetch from "node-fetch";

/**
 * Parse a file
 * @param fileName name of the file
 * @param inputPath input path
 * @returns a parsed file
 */
export const parseFile = (fileName: string, inputPath: string) => {
   const splitedName = fileName.split("_");
   const year = splitedName[0];
   const cpge = splitedName[1];
   const input = readFileSync(
      join(inputPath, "../", year, fileName + ".tsv"),
      "utf8"
   )
      .toString()
      .trim();
   //   .split("")
   //   .map((elt) => elt.replace(" ", "_"))
   //   .join("");

   const file = d3.tsvParse(input);
   // const file = d3.tsv.parse(input);
   for (const data of file) {
      data.annee = year;
      data.filiere = cpge;
      for (const property in data) {
         data[property] = data[property];
         if (!data[property]) {
            delete data[property];
         }
      }
   }
   return file;
};
/**
 * Parse the files contained in the given array of names
 * @param fileNames array of file names
 * @param inputPath input path
 * @returns array of parsed files
 */
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

/**
 * Exports the parsed file to a json file
 * @param file Parsed file
 * @param fileName File name
 * @param outputPath output path
 */
const exportFile = (
   file: d3.DSVRowArray<string>,
   fileName: string,
   outputPath: string
): string => {
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
   return myFile;
};

/**
 * Exports parsed files to json files at the outputh directory
 * @param files array of parsed files
 * @param fileNames array of files names
 * @param outputPath output path for final json
 */
const exportAllFiles = (
   files: d3.DSVRowArray<string>[],
   fileNames: string[],
   outputPath: string
): string => {
   const n = files.length;
   const m = fileNames.length;
   for (let k = 0; k < n; k++) {
      exportFile(files[k], fileNames[k], outputPath);
   }
   return JSON.stringify(files);
};
export const generateYear = async (year: number) => {
   // const filieres = ["bcpst", "mp", "pc", "psi", "pt", "tb", "tpc", "tsi"];
   const filieres = ["mp", "pc", "psi", "pt"];
   const inputPath =
      "/media/leyo/DATA/Dev/Web/prepa-stat/lib/scei/" + year + "/";
   const outputPath =
      "/media/leyo/DATA/Dev/Web/prepa-stat/lib/scei/json/" + year + "/";
   mkdir(outputPath, (e) => {
      if (e) {
         console.error(e);
      } else {
         console.log("Directory created succesfully");
      }
   });
   const fileNames = filieres.map((elt) => year + "_" + elt);
   const parsedFiles = parseAllFiles(fileNames, inputPath);

   return parsedFiles;
   //    const files = JSON.parse(exportAllFiles(parsedFiles, fileNames, outputPath));
   //    return files;
};
const init = async () => {
   for (let i = 2019; i <= 2021; i++) {
      await generateYear(i);
   }
};

init();

