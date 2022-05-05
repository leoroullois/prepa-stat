import {
   Box,
   Button,
   Center,
   Divider,
   Flex,
   Heading,
   HStack,
   Stat,
   StatArrow,
   StatGroup,
   StatHelpText,
   StatLabel,
   StatNumber,
   Text,
} from "@chakra-ui/react";

import scss from "./schoolcard.module.scss";

import { FC, MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "@store/selectors";
import { addToFavorites } from "@store/slices/favorites";
import { AppDispatch } from "@store/store";

const SchoolCardContent: FC<ISchoolCardProps> = ({ data, maxPlace }) => {
   const dispatch = useDispatch<AppDispatch>();
   const user = useSelector(selectUser);

   const handleFavorite: MouseEventHandler = async (e) => {
      try {
         await dispatch(
            addToFavorites({
               userId: user._id,
               schoolId: data._id,
            })
         ).unwrap();
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <>
         {/* BANDEROLLE */}
         <Heading as='h2' size='md' className={scss.title}>
            {data.ecole}
         </Heading>
         <Heading as='h3' size='md'>
            ✨ Statistiques d&apos;intégration {data.annee}
         </Heading>
         <Divider marginY={3} />
         <Flex width='100%' flexDirection='column'>
            <StatGroup>
               <Flex width='100%'>
                  <Stat
                     width={15}
                     height='100%'
                     display='flex'
                     flexDirection='column'
                     justifyContent='center'
                  >
                     <StatLabel>Places</StatLabel>
                     <StatNumber>{data.places}</StatNumber>
                     <StatHelpText>
                        <StatArrow type='increase' />
                        {data.places}
                     </StatHelpText>
                  </Stat>
                  <Stat
                     height='100%'
                     display='flex'
                     flexDirection='column'
                     justifyContent='center'
                  >
                     <StatLabel>Rang médian</StatLabel>
                     <StatNumber>{data.integres_rg_median}</StatNumber>
                     <StatHelpText>
                        <StatArrow type='decrease' />
                        {data.integres_rg_median}
                     </StatHelpText>
                  </Stat>
                  <Stat
                     height='100%'
                     display='flex'
                     flexDirection='column'
                     justifyContent='center'
                  >
                     <StatLabel>Rang moyen</StatLabel>
                     <StatNumber>{data.integres_rg_moyen}</StatNumber>
                     <StatHelpText>
                        <StatArrow type='increase' />
                        {data.integres_rg_moyen}
                     </StatHelpText>
                  </Stat>
               </Flex>
            </StatGroup>
            <Divider marginY={3} />
            <StatGroup>
               <Flex width='100%'>
                  <Stat
                     height='100%'
                     display='flex'
                     flexDirection='column'
                     justifyContent='center'
                  >
                     <StatLabel>Cinq demis</StatLabel>
                     <StatNumber>{data.integres_cinq_demi}%</StatNumber>
                     <StatHelpText>
                        <StatArrow type='decrease' />
                        {data.integres_cinq_demi}
                     </StatHelpText>
                  </Stat>
                  <Stat
                     height='100%'
                     display='flex'
                     flexDirection='column'
                     justifyContent='center'
                  >
                     <StatLabel>Filles</StatLabel>
                     <StatNumber>{data.integres_filles}%</StatNumber>
                     <StatHelpText>
                        <StatArrow type='increase' />
                        {data.integres_filles}
                     </StatHelpText>
                  </Stat>
               </Flex>
            </StatGroup>
         </Flex>
         <Divider marginY={3} />
         <HStack columnGap={5} className={scss["card-leaderboard"]}>
            <Heading as='h3' size='md'>
               🏅 Classement
            </Heading>
            <Divider orientation='vertical' height='60px' />
            <Text className={scss["card-leaderboard-content"]}>
               <Box as='span'></Box>
               {data.classement.toString().padStart(3, "0")}
               <Box as='span'>/{maxPlace}</Box>
            </Text>
         </HStack>
         <Center width='100%' marginTop={5}>
            <Button onClick={handleFavorite}>🚀 Ajouter aux favoris</Button>
         </Center>
      </>
   );
};

export default SchoolCardContent;

