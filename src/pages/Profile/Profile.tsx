import './Profile.css'
import AvatarIcon from '/profile.png'

function Profile() {
    return(
        <div className="Profile">
            <div className="ProfileTop">
                <div className="ProfileTopL">
                    <img src={AvatarIcon} alt="Avatar" className='ProfileIcon' />
                </div>
                <div className="ProfileTopR">
                    <h3>Nizam</h3>
                    <span>@n1z4amm</span>
                </div>
            </div>
            <div className="ProfileCenter">
                <div className="ProfileContent">
        
                </div>
            </div>
            <div className="ProfileCenter">
                <div className="ProfileContent">

                </div>
            </div>
            <div className="ProfileCenter">
                <div className="ProfileContent">

                </div>
            </div>
        </div>
    )
}

export default Profile