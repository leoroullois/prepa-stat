import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";

import Landing from "@components/Landing/Landing";
import { selectAuth } from "@store/selectors";
import store from "@store/store";

const Home: NextPage = () => {
   const router = useRouter();
   const auth = useSelector(selectAuth);
   useEffect(() => {
      if (auth.isAuthenticated) {
         router.push("/dashboard");
      }
   });
   return (
      <>
         <Head>
            <title>Accueil - PrépaStat</title>
            <meta
               name='description'
               content="PrépaStat - Construisons ensemble votre avenir, intégrez l'école d'ingénieur de vos rêves !"
            />
            <link rel='icon' href='/favicon.ico' />

            <meta
               name='viewport'
               content='width=device-width, initial-scale=1.0'
            />

            {/* <meta name='thumbnail' content='/thumbnail.jpg' /> */}

            {/* Facebook  */}
            {/* <meta property='og:title' content='The Rock' />
            <meta property='og:type' content='video.movie' />
            <meta
               property='og:url'
               content='https://www.imdb.com/title/tt0117500/'
            />
            <meta
               property='og:image'
               content='https://ia.media-imdb.com/images/rock.jpg'
            />
            <meta name='og:site_name' content='PrépaStat' />

            <meta
               name='og:description'
               content="PrépaStat - Construisons ensemble votre avenir, intégrez l'école d'ingénieur de vos rêves !"
            /> */}

            {/* Twitter */}
            {/* <meta
               name='twitter:title'
               content='European Travel Destinations '
            />
            <meta
               name='twitter:description'
               content=' Offering tour packages for individuals or groups.'
            />
            <meta
               name='twitter:image'
               content=' http://euro-travel-example.com/thumbnail.jpg'
            />
            <meta name='twitter:card' content='summary_large_image' /> */}

            <meta name='og:locality' content='France' />
         </Head>
         {auth.isAuthenticated ? <div>Loading...</div> : <Landing />}
      </>
   );
};

export default Home;

