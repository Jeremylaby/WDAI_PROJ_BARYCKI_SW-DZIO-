import photo from ".//images/photo.png"
import "./persons.css"
function AdminCard({admin,removeAdmin}){
    return<>
        <div className={"users-card"}>
            <img className={"users-photo"}  src={photo} alt={"unknown-person"}/>
            <span>Username: {admin.username}</span>
            <div className={"user-button"} onClick={()=>{removeAdmin(admin)}}>Usuń Admina</div>
        </div>
    </>
}export default AdminCard;