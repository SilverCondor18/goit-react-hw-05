import css from "./NotFoundPage.module.css"
import { Link } from "react-router-dom"
export default function NotFoundPage()
{
    return (
        <div className={css.error}>
            <h1 className={css.header}>404</h1>
            <p className={css.message}>This page does not exist</p>
            <Link to="/">Back to home</Link>
        </div>
    )
}