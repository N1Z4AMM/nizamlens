import { Link } from 'react-router-dom'
import { MdPerson } from 'react-icons/md'
import './Header.css'
import Search from '../Search/Search'
import { useAuth } from '../../../context/auth'

const logo = `${import.meta.env.BASE_URL}favicon.svg`

function Header() {
    const { user, loading } = useAuth()
    const profile = user
        ? {
              username: user.user_metadata?.username ?? user.id,
              displayName: user.user_metadata?.full_name ?? user.email ?? 'User',
              avatarUrl: user.user_metadata?.avatar_url ?? null,
          }
        : null

    return (
        <header className="Header">
            <div className="HeaderR">
                <Link to="/" aria-label="NizamLens home">
                    <img src={logo} alt="NizamLens" className="Logo" width={32} />
                </Link>
            </div>
            <div className="HeaderC">
                <Search />
            </div>
            <div className="HeaderL">
                {loading ? (
                    <span className="LoginBtn" style={{ visibility: 'hidden' }}>
                        Login
                    </span>
                ) : profile ? (
                    <Link
                        to={`/${profile.username}`}
                        className="Avatar"
                        aria-label={`${profile.displayName}'s profile`}
                        title={profile.displayName}
                    >
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="" referrerPolicy="no-referrer" />
                        ) : (
                            <MdPerson />
                        )}
                    </Link>
                ) : (
                    <Link to="/login" className="LoginBtn">Login</Link>
                )}
            </div>
        </header>
    )
}

export default Header