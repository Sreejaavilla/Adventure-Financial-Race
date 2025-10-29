import React, { useState } from 'react';
import { LogoIcon } from '../constants';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && password) {
            onLogin();
        } else {
            alert('Please enter username and password.');
        }
    };
    
    return (
        <div className="flex flex-col items-center justify-center animate-fade-in">
            <div className="w-full max-w-md p-8 space-y-8 card-base">
                <div className="text-center">
                    <LogoIcon className="w-20 h-20 mx-auto text-cyan-400" />
                    <h1 className="mt-4 text-4xl font-bold tracking-tighter text-white">Welcome Portal</h1>
                    <p className="mt-2 text-lg text-slate-400">Enter the Realm</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-slate-600 bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:z-10 sm:text-sm focus:border-cyan-500 focus-ring-cyan"
                            placeholder="Username"
                        />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-slate-600 bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:z-10 sm:text-sm focus:border-cyan-500 focus-ring-cyan"
                            placeholder="Password"
                        />
                    </div>

                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm rounded-md btn-primary">
                            Enter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;