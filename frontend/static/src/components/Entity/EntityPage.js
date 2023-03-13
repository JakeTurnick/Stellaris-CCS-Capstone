import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthContextProvider";
import Cookies from "js-cookie";
import StarList from "./StarList";
import StarItem from "./StarItem";
import "./entity-page.css"

const INITIAL_SEARCH = {
    searchType: 'star',
    searchBy: 'name',
    searchText: '',
}


function EntityPage(props) {
    // state for stars to display on page
    const [search, setSearch] = useState(INITIAL_SEARCH)

    // Form to get entities in data base
        // [Stars, Constellations, Meteor Showers, Comments, Planets, Human Craft]
    // Display entities as:
        // <"Search the sky:"/> Name, (related constellation if any), Location, Photo, Fun facts?
        // <"When can I see this?"/> Select entity to view if it's visible at (location, time/date)
        // <"Track this entity"/>

    // Use effect to grab users.trackedEntities & display them on load
        // A list of 'pre-searched' entities - click to view like <"when can I see this?"/>

    const searchInput = (e) => {
        const {name, value} = e.target;
        setSearch(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const searchEntity = async (e) => {
        e.preventDefault();
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
            },
        }
        console.log(search.searchType)

        let response
        if (!search.searchText) {
            console.log(`api_v1/entities/${search.searchType}`)
            response = await fetch(`api_v1/heavens/entities/${search.searchType}`)
        } else {
            console.log(`api_v1/entity/name/${search.searchText}`)
            response = await fetch(`api_v1/heavens/entity/name/${search.searchText}`)
        }

        if (!response.ok) {
            throw new Error("could not fetch entities")
        }
        
        const data = await response.json()
        console.log("entity search data", data)


    }
    // useEffect(() => (console.log(search)), [search])

    const test = (e) => {
        console.log(e.target.name)
    }

    return (
        <div>
            <h1>I am the Entity Page</h1>
            <section className="entity-search">
                <form onSubmit={searchEntity} >
                    <h3>Search By:</h3>
                    <section id="search-type">
                        <div className="radio-option">
                            <label htmlFor="stars">Stars</label>
                            <input type="radio" id="stars" name="searchType" onClick={searchInput} value={"star"} /><br/>
                        </div>
                        <div className="radio-option">
                            <label htmlFor="const">Constellations</label>
                            <input type="radio" id="const" name="searchType" onClick={searchInput} value={"const"} /><br/>
                        </div>
                        <div className="radio-option">
                            <label htmlFor="mtshr">Meteor Showers</label>
                            <input type="radio" id="mtshr" name="searchType" onClick={searchInput} value={"mtshr"} /><br/>
                        </div>
                        <div className="radio-option">
                            <label htmlFor="comet">Commets</label>
                            <input type="radio" id="comet" name="searchType" onClick={searchInput} value={"comet"} /><br/>
                        </div>
                        <div className="radio-option">
                            <label htmlFor="plnt">Planets</label>
                            <input type="radio" id="plnt" name="searchType" onClick={searchInput} value={"plnt"} /><br/>
                        </div>
                        <div className="radio-option">
                            <label htmlFor="plnt">Human Craft</label>
                            <input type="radio" id="hcrft" name="searchType" onClick={searchInput} value={"hcrft"} /><br/>
                        </div>
                    </section>
                    <section id="search-by">
                        <h3>Name or Date:</h3>
                        <div className="radio-option">
                            <label htmlFor="name">Search by Name</label>
                            <input type="radio" id="name" name="searchBy" onClick={searchInput} value={"name"} />
                        </div>
                        <div className="radio-option">
                            <label htmlFor="date">Search by Date (WIP)</label>
                            <input type="radio" id="date" name="searchBy" onClick={searchInput} value={"date"} disabled />    
                        </div>
                    </section>
                    <section id="search-text">
                        <label htmlFor=""></label>
                        <input type="text" id="searchText" name="searchText" onChange={searchInput} value={search.searchText} placeholder={`Leave blank for all available`} />
                    </section>
                    <button type="submit">Search!</button>
                    
                </form>
            </section>
        </div>
    )
}

export default EntityPage