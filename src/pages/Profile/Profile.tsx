import './Profile.css'
import PP from '/pp.png'
import Header2 from '../../components/Header2/Header2'
import { MdOutlineNavigateNext, MdOutlinePalette, MdOutlinePrivacyTip } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { LuDownload, LuTrash } from "react-icons/lu";
import { CiChat2 } from "react-icons/ci";
import { TbLogout } from "react-icons/tb";

function Profile() {
    return(
        <div className="Profile">
            <Header2 name='Profile' />
            <div className="PersonalInfo">
                <img src={PP} alt="PP" className='ProfileIcon' />
                <h4 className='DisplayName'>Display Name</h4>
                <span className='Email'>email@example.com</span>
                <MdOutlineNavigateNext className='Back' size={24} />
            </div>
            <div className="Center">
                <div className="CenterContent">
                    <MdOutlinePalette className='PIcons'/>
                    <p className='PText'>Appearance</p>
                    <MdOutlineNavigateNext className='Back' size={24}/>
                </div>
                <div className="CenterContent">
                    <GoLock className='PIcons' strokeWidth={0.3}/>
                    <p>Security</p>
                    <MdOutlineNavigateNext className='Back' size={24} />
                </div>
                <div className="CenterContentEnd">
                    <LuDownload className='PIcons' strokeWidth={1.7}/>
                    <p>Downloads</p>
                    <MdOutlineNavigateNext className='Back' size={24} />
                </div>
            </div>
            <div className="Bottom">
                <div className="CenterContent">
                    <CiChat2 className='PIcons' strokeWidth={0.9}/>
                    <p>Feedback</p>
                    <MdOutlineNavigateNext className='Back' size={24} />
                </div>
                <div className="CenterContentEnd">
                    <MdOutlinePrivacyTip className='PIcons' />
                    <p>Privacy Police</p>
                    <MdOutlineNavigateNext className='Back' size={24} />
                </div>
            </div>
            <div className="LogOut">
                <TbLogout className='PIcons' strokeWidth={2} />
                <p>Log Out</p>
            </div>
            <div className="DeleteAccount">
                <LuTrash className='PIcons' stroke='#991B1B' />
                <p>Delete Account</p>
            </div>
        </div>
    )
}

export default Profile