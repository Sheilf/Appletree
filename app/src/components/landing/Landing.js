
import React, {Component} from 'react';
import '../../styles/flex-border.css';
import '../../styles/bootstrap.css'
import './Landing.css';

import HeaderWithSearch from '../common/headers/HeaderWithSearch';
import RowOfImages from '../common/images/RowOfImages';
import BigButton from '../common/buttons/BigButton';



/*
    The landing component is called 3 times.
    The render is pretty straightforward.
    We're using a conditional operator instead of If/Else

    It calls 3 sections with different purposes:
    section 1: Big landing header with a search bar to navigate into the app.
    section 2: A row of images with a header
    section 3: Buttons that help you navigate into the ap

    This component is a little redundant with the App component that calls this. I wanted to be explicit.
    The only thing to watch out for is the BigButtons component. It's a little sloppy.
    We're better off with an array of maps.
*/


//PROPS: section
const Landing = ({section}) =>{
    return(
        <section className = "landing-section flex-border-column-centered">
            {
                section === 1 ? <HeaderWithSearch /> 

                :

                section === 2 ?
                    <RowOfImages images={[
                        "https://res.cloudinary.com/eduprojectsil/image/upload/v1533686008/LogoMakr_36o4hK_m9lezq.png",
                        "https://res.cloudinary.com/eduprojectsil/image/upload/v1533686008/LogoMakr_8loMHG_tyozcy.png",
                        "https://res.cloudinary.com/eduprojectsil/image/upload/v1533605757/generic-upload_uszlus.png",
                
                        ]} 
                    
                        captions={[
                        "Submit resources",
                        "Get feedback",
                        "Get posted to library"
                        ]}
                    /> 

                :

                section === 3 ? (
                    <div className="temp-container flex-border-column-centered">
                        <h2 className='head'> Let's get started </h2>
                        <BigButton buttons={[
                                {
                                    label: "Find Resources",
                                    route: "/library" 
                                },
                                {
                                    label: "Upload Content",
                                    route: "/upload"
                                }
                            ]} 
                        /> 
                    </div>
                )
                :
                null //return nothing if props is incorrectly inputted.
            }
        </section>
    )

}

  
export default Landing;

