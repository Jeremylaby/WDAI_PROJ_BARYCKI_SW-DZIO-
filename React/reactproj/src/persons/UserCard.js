import photo from ".//images/photo.png"
import "./persons.css"
function UserCard({user,addAdmin}){
    return<>
        <div className={"users-card"}>
            <img className={"users-photo"}  src={photo} alt={"unknown-person"}/>
            <span>Username: {user.username}</span>
            <div className={"user-button"} onClick={()=>{addAdmin(user)}}>Dodaj Admina</div>
        </div>
    </>
}export default UserCard;