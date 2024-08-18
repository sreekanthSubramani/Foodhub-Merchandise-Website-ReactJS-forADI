import { assets } from '../../assets/assets' 
import './AppDownload.css'

export default function AppDownload(){
    return(

            <div className="app-download" id="app-download">
                <h2> For better experience download the <br /> Foodhub Merchandise App</h2>

                <div className="app-download-logos">
                    <img src={assets.appstoreBadge} alt="appstore" className='appstore'/>
                    <img src={assets.googlePlayBadge}alt="playstore" className='playstore'/>
                </div>
            </div>

    )
}