import css from "./SearchBox.module.css"
import { useState } from "react";

export default function SearchBox({ onSearch })
{
    const [error, setError] = useState(false);
    const handleSearch = event => {
        event.preventDefault();
        const query = event.target.elements.query.value.trim();
        if (query !== "")
        {
            onSearch(query);
            event.target.reset();
        }

        setError(!(query !== ""));
    };

    return (
        <form onSubmit={handleSearch} className={css.form}>
            <label className={css.label}>
                Search movie
                <input className={css.input} type="text" name="query" placeholder="Movie title..." />
                {error && <p className={css.error}>This field is required!</p>}
            </label>
            <button className={css.button} type="submit">Search</button>
        </form>
    )
}