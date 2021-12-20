import ResultComponent from "./ResultComponent";

export default function SearchResults({ results }) {
    const resultsList = results.map(result => <ResultComponent result={result}/>)

    return (
        <div>
            {resultsList}
        </div>
    );
}
