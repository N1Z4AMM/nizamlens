import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'
import { supabase } from '../../lib/supabase'
import './Login.css'
import { IoIosArrowBack } from "react-icons/io";

type Mode = 'login' | 'signup'

const providers = [
    { id: 'github', label: 'GitHub', Icon: FaGithub },
] as const

function Login() {
    const navigate = useNavigate()
    const [mode, setMode] = useState<Mode>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [info, setInfo] = useState<string | null>(null)

    const isLogin = mode === 'login'

    function switchMode() {
        setMode(isLogin ? 'signup' : 'login')
        setError(null)
        setInfo(null)
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (loading) return

        setError(null)
        setInfo(null)
        setLoading(true)

        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            })

            setLoading(false)

            if (error) {
                setError('Incorrect email or password.')
                return
            }

            navigate('/')
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email: email.trim(),
            password,
        })

        setLoading(false)

        if (error) {
            setError(error.message)
            return
        }

        if (data.session) {
            navigate('/')
            return
        }

        setInfo('Check your email to confirm your account.')
    }

    async function handleOAuth(provider: 'github') {
        setError(null)

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin + import.meta.env.BASE_URL,
            },
        })

        if (error) {
            console.error(error)
            setError('Could not continue. Please try again.')
        }
    }

    return (
        <main className="Login">
            <IoIosArrowBack className="LoginBackButton"  />
            <div className="LoginContainer">

                <h1 className="LoginTitle">
                    {isLogin ? 'Login' : 'Create account'}
                </h1>

                <form className="LoginForm" onSubmit={handleSubmit}>

                    <div className="LoginField">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="LoginField">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            minLength={isLogin ? undefined : 6}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="LoginMessage LoginError" role="alert">{error}</p>}
                    {info && <p className="LoginMessage" role="status">{info}</p>}

                    <button className="LoginSubmit" type="submit" disabled={loading}>
                        {loading ? 'Please wait…' : isLogin ? 'Login' : 'Sign up'}
                    </button>

                </form>

                <div className="LoginDivider">
                    <span></span>
                    <p>or</p>
                    <span></span>
                </div>

                <div className="LoginSocial">
                    {providers.map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            type="button"
                            className="LoginSocialBtn"
                            onClick={() => handleOAuth(id)}
                        >
                            <Icon />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>

                <p className="LoginSwitch">
                    {isLogin ? 'No account yet?' : 'Already have an account?'}{' '}
                    <button type="button" onClick={switchMode}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </p>

            </div>
        </main>
    )
}

export default Login