import React from 'react'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'
import { withRoomConsumer } from '../context'
import Loading from './Loading'

// this is HOC way of getting context
function RoomContainer({ context }) {
    const { loading, rooms, sortedRooms } = context
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    )
}


export default withRoomConsumer(RoomContainer)











// below is the first way of getting context in functional component 

// import React from 'react'
// import RoomsFilter from './RoomsFilter'
// import RoomsList from './RoomsList'
// import { RoomConsumer } from '../context'
// import Loading from './Loading'

// function RoomsContainer() {
//     <RoomConsumer>
//         {
//             value => {
//                 const { rooms, sortedRooms, loading } = value
//                 if (loading) {
//                     return <Loading />
//                 }
//                 return (
//                     <div>
//                         <RoomsFilter rooms={rooms} />
//                         <RoomsList rooms={sortedRooms} />
//                     </div>
//                 )
//             }
//         }
//     </RoomConsumer>
// }

// export default RoomsContainer
