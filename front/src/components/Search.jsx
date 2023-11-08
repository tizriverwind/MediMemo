import PropTypes from "prop-types";
export default function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search Patients by Name"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
