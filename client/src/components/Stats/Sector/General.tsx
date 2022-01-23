import React from "react";
import { MathFunction } from "../../Graphs/MathFunction";
export class General extends React.Component {
    render() {
        return (
            <div>
                <h2>Statistiques générale</h2>
				<MathFunction myFunc={(x:number):number=>Math.exp(x)} myInterval={[-5,5]} name="exponentielle" legend="exp(x)" />
            </div>
        )
    }
}