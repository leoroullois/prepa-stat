import { NextPage } from "next";
import Head from "next/head";
import { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@store/selectors";
import { logout } from "@store/slices/auth";
import PrivateRoute from "@components/Auth/PrivateRoute";
import scss from "@scss/dashboard.module.scss";

const Dashboard: NextPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  const handleLogout: MouseEventHandler = () => {
    dispatch(logout());
  };
  // fusion sort
  const fusionSort = (arr: number[]) => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };
  console.log(fusionSort([5, 3, 6, 2, 10, 1]));
  return (
    <>
      <Head>
        <title>Dashboard - PrépaStat</title>
      </Head>
      <PrivateRoute>
        <main className={scss["dashboard"]}>
          <h1>Dashboard</h1>
          <h2>Welcome back {JSON.stringify(auth.user)}</h2>
          {/* <h3>Token {JSON.stringify(token)}</h3> */}
          <button onClick={handleLogout}>Se déconnecter</button>
        </main>
      </PrivateRoute>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
// 	return {
// 		props: {
// 			name: localStorage.getItem("jwtToken"),
// 		},
// 	};
// };

export default Dashboard;
