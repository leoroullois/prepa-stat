import { FC } from "react";
interface IProps {
    classement:string;
}
export const LeaderboardSection:FC<IProps> = ({classement}) => {
    return (
        <section>
            <h2>{classement}</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptatibus minus assumenda consectetur, sequi maxime ratione nostrum iusto in aut vero neque aliquid, corporis animi omnis saepe? Architecto, nesciunt expedita.
            </p>
        </section>
    )
}