import { FC } from "react";
interface IProps {
    concours:string;
}
export const StatsSection:FC<IProps> = ({concours}) => {
    return (
        <section>
            <h2>{concours}</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptatibus minus assumenda consectetur, sequi maxime ratione nostrum iusto in aut vero neque aliquid, corporis animi omnis saepe? Architecto, nesciunt expedita.
            </p>
        </section>
    )
}