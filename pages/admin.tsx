import { FC, MouseEventHandler, useState } from "react";
import { Button } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import json from "@lib/scei/json/2021/2021_mp.json";

const Admin: FC<{ files: string }> = ({ files }) => {
   const [state, setState] = useState("");
   const handleClick: MouseEventHandler = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
         console.log("ADDING TO DATABASE...");
         for (let year = 2019; year <= 2021; year++) {
            const filieres = ["mp", "pc", "psi", "pt"];
            for (const filiere of filieres) {
               const schools = await import(
                  `@lib/scei/json/${year}/${year}_${filiere}.json`
               );
               for (const school of schools.default) {
                  const postedSchool = await fetch("/api/schools/add", {
                     method: "POST",
                     body: JSON.stringify(school),
                  }).then((res) => res.json());
                  console.log(postedSchool);
               }
            }
         }
         console.log("DONE");
      } catch (err) {
         console.log("ERROR : ", err);
         throw new Error("Error while posting schools to database.");
      }
   };
   return (
      <>
         <h1>Admin</h1>
         <p>{files}</p>
         <Button onClick={handleClick}>Ajouter à la base de données</Button>
      </>
   );
};

export default Admin;

