import React from 'react'
import { Link } from 'react-router-dom'
import landingImages from '../../assets/images/landing/index.js'

export const LandingScreen = () => {
    return (
        <div>
            <header className="landing__header container">
                <img src={ landingImages.headerLogo } alt="" />
                <div className="landing__header-btns">
                    <Link to="/auth/login" className="btn btn-primary">Login</Link>
                </div>
            </header>
            
            <div className="container">
                <section className="landing__section1 landing__section">

                    <h1 className="landing__title">The organizing tool your life  always needed</h1>
                    <Link to="/auth/register" className="btn btn-primary landing__title-btn">Create an account</Link>

                </section>

                <section className="landing__section2 landing__section">

                    <div>
                        <img className="landing__devices-img" src={ landingImages.devicesImage } alt="" />
                    </div>
                    <h1 className="landing__title">Wherever you need it</h1>
                    <p className="landing__text">Listastick is a multi platform tool design to help you orginize 
                        your life across multiple platforms, integrating each device in a seemless way</p>

                </section>

                <section className="landing__section3 landing__section">

                    <div>
                        <img className="landing__imgReview" src={ landingImages.review1 } alt="" />
                    </div>
                    <div>
                        <img className="landing__imgReview" src={ landingImages.review2 } alt="" />
                    </div>
                    <div>
                        <img className="landing__imgReview" src={ landingImages.review3 } alt="" />
                    </div>

                </section>

                <section className="landing__section4 landing__section">

                    <div>
                        <img className="landing__finalImage" src={ landingImages.startNowImage } alt="" />
                    </div>
                    <div>
                        <h1 className="landing__title">Start your organized journey today!</h1>
                        <Link to="/auth/register" className="btn btn-primary btn-block" style={{marginTop: 50}}>Get Started</Link>
                    </div>
                </section>
            </div>
            <footer className="landing__footer">
                <img src={ landingImages.whiteLogo } alt="" className="landing__footerLogo"/>

                <div className="landing__socialDiv">
                    <img src={ landingImages.instagram } alt="" />
                </div>
            </footer>

        </div>
    )
}
