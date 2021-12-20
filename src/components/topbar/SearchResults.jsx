import ResultComponent from "./ResultComponent";

export default function SearchResults({ results, getPosts }) {
    const resultsList = results.map(result => <ResultComponent key={result._id} getPosts={getPosts} result={result}/>)

    return (
        <div>
            {resultsList}
        </div>
    );
}
