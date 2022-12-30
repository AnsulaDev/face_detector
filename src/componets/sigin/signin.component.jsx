

const Sigin = ({onRouteChange})=>{
    return(
        <article className="br3 ba b--white mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white">
                <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-white   w-100" type="email" name="email-address"  id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-white  w-100" type="password" name="password"  id="password"/>
                    </div>
        
                    </fieldset>
                    <div>
                    <input onClick={() => onRouteChange('home')}
                        className="b ph3 pv2 input-reset ba b--black bg-white grow pointer f6 dib" 
                        type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p  onClick={() => onRouteChange('register')} className="f6 link pointer dim white db">Register</p>
                
                    </div>
                </div>
            </main>
        </article>

    );
}

export default Sigin;