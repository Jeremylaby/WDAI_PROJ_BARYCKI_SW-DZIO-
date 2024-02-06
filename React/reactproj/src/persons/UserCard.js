import photo from ".//images/photo.png"
import "./persons.css"
function UserCard({user}){
    function addAdmin(){

    }
    return<>
        <div className={"users-card"}>
            <img className={"users-photo"}  src={photo} alt={"unknown-person"}/>
            <span>Username: {user.username}</span>
            <div className={"user-button"} onClick={addAdmin}>Dodaj Admina</div>
        </div>
    </>
}export default UserCard;