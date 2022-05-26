import React, {useState} from "react";
import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState('')
    const onChangeHandler = e => {
        setTitle(e.target.value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:4000/posts', {
            title
        })
        setTitle('')
    }
    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label>Title </label>
                    <input value={title} onChange={e => onChangeHandler(e)} className="form-control"/>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default PostCreate