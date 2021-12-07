import ResultComponent from "./ResultComponent";

export default function SearchResults({ results }) {
    const resultsList = results.map(result => <ResultComponent result={result}/>)

    console.log("results ", resultsList);
    return (
        <div>
            {resultsList}
        </div>
    );
}
