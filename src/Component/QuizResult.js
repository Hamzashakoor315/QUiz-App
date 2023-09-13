import React from "react"

export default function QuizResult(props){
    return(
        <>
        <div className="show-score">
            your Score : {props.score}<br/>
            Total score: {props.totalscore}
        </div> 
        <button id="next-play" onClick={props.tryagain}>Do you want to play again</button>
        </>
    )

}