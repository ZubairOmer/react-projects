import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext()

class RoomProvider extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rooms: [],
            sortedRooms: [],
            featuredRooms: [],
            laoding: true,
            //
            type: "all",
            capacity: 1,
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
            breakfast: false,
            pets: false
        }
    }

    componentDidMount() {
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price))
        let maxSize = Math.max(...rooms.map(item => item.size))

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            laoding: false,// rooms === rooms : rooms
            price: maxPrice,
            maxSize,
            maxPrice
        })
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, images, id }

            return room;
        })
        return tempItems;
    }

    getRoom = slug => {
        let tempRoom = [...this.state.rooms]
        const room = tempRoom.find(room => room.slug === slug)
        return room
    }

    handleChange = e => {
        const target = e.target
        const value = e.type === 'checkbox' ? target.chicked : target.value
        const name = e.target.name

        this.setState({
            [name]: value
        }, this.filterRooms)
    }

    filterRooms = () => {
        let { rooms, type, capacity, price, maxSize, minSize, breakfast, pets } = this.state

        let tempRoom = [...rooms]
        capacity = parseInt(capacity)
        price = parseInt(price)

        // filter by types
        if (type !== 'all') {
            tempRoom = tempRoom.filter(room => room.type === type)
        }
        // filter by capacity
        if (capacity !== 1) {
            tempRoom = tempRoom.filter(room => room.capacity >= capacity)
        }
        // filter by price
        tempRoom = tempRoom.filter(room => room.price <= price)
        // filter by size
        tempRoom = tempRoom.filter(room => room.size >= minSize && room.size <= maxSize)
        // filter by breakfast
        if (breakfast) {
            tempRoom = tempRoom.filter(room => room.breakfast === true)
        }
        // filter by pets
        if (pets) {
            tempRoom = tempRoom.filter(room => room.pets === true)
        }

        // cahnge state
        this.setState({
            sortedRooms: tempRoom
        })

    }
    render() {
        return (
            <RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}

export { RoomProvider, RoomContext, RoomConsumer }
