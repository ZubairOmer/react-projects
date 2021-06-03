import React from 'react'
import { useContext } from 'react'
import { RoomContext } from '../context'
import Title from './Title'

// get unique values function
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

function RoomsFilter({ rooms }) {
    const { handleChange, type, capacity, price, minPrice,
        maxPrice, minSize, maxSize, breakfast, pets } = useContext(RoomContext)
    // get unique types
    let types = getUnique(rooms, 'type')
    // get all
    types = ['all', ...types]
    // map through types
    types = types.map((item, index) => (
        <option key={index} value={item}>{item}</option>
    ))

    let people = getUnique(rooms, 'capacity')
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })
    return (
        <section className="filter-container">
            <Title title='search rooms' />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select
                        name="type"
                        id="type"
                        value={type}
                        className='form-control'
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
                {/* end of select type */}
                {/* guest */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        value={capacity}
                        className='form-control'
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* end of guest */}
                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range" name="price" id="price"
                        min={minPrice} max={maxPrice} value={price} onChange={handleChange} className='form-control'
                    />
                </div>
                {/* end of room price */}
                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size"
                            value={minSize} onChange={handleChange} className='size-input '
                        />
                        <input type="number" name="maxSize" id="size"
                            value={maxSize} onChange={handleChange} className='size-input '
                        />
                    </div>
                </div>
                {/* end of size */}
                {/* extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast"
                            checked={breakfast} onChange={handleChange}
                        />
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets " id="pets "
                            checked={pets} onChange={handleChange}
                        />
                        <label htmlFor="pets ">pets </label>
                    </div>
                </div>
                {/* end of extras */}
            </form>
        </section>
    )
}

export default RoomsFilter
