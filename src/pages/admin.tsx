import { FC, MouseEventHandler, useState } from "react";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import PrivateRoute from "@components/Auth/PrivateRoute";
import { selectUser } from "@store/selectors";
import { useSelector } from "react-redux";

const Admin: FC = () => {
   const user = useSelector(selectUser);
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
         <Head>
            <title>Admin panel</title>
         </Head>
         <PrivateRoute>
            <main>
               {user.email === "roullois.leo@protonmail.com" ? (
                  <>
                     <h1>Admin</h1>
                     <Button onClick={handleClick}>
                        Ajouter à la base de données
                     </Button>
                  </>
               ) : (
                  <h1>You are not authorized to access this page</h1>
               )}
            </main>
         </PrivateRoute>
      </>
   );
};

export default Admin;

