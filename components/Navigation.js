import React from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0';

const Navigation = () => {
    const { user, error, isLoading } = useUser();

    return (
        <div className="nav">
            <div className="navbar">
                <Link href="/">
                    <div className="logoContainer cursor-pointer">

                    </div>
                </Link>
                <nav className="menu">
                    <ul>
                        <li className="menuItem"><Link href="/">Home</Link></li>
                        <li className="menuItem">{user ? <span>Welcome {user.name} <a href="/api/auth/logout">Logout</a></span> : <a href="/api/auth/login">Login</a>}</li>
                        <li className="menuItem">{user ? <a href="/addProject">Add Project</a> : <></>}</li>
                    </ul>
                </nav>
            </div>
        </div>

    )
}

export default Navigation