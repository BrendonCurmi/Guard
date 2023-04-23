import React from "react";

const AuthForm = () => {
    return (
        <div>
            <form onSubmit={/*todo*/}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                    />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
