import React from 'react'
import Notes from './Notes'


const Home = () => {

    return (
        <div className='my-2'>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="noteTitle" />
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="noteDescription" />
                    <label htmlFor="Tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="noteTag" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Notes />
        </div>
    )
}

export default Home