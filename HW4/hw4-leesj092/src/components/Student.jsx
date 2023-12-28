const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p><b>{props.major}</b></p>
        <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin? "":"not"} from Wisconsin.</p>
        <p>{props.name.first} has {props.interests.length} interests including...</p>
        <ul>
            {props.interests.map(interest => <li key={interest}>{interest}</li>)}
        </ul>
    </div>
}

export default Student;