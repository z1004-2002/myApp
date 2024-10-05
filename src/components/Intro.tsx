import { IonButton, IonText } from '@ionic/react';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import './Intro.css';

import Intro1Svg from '../assets/intro/1.svg';
import Intro2Svg from '../assets/intro/2.svg';
import Intro3Svg from '../assets/intro/3.svg';


interface ContainerProps {
    onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper()
    return (
        <IonButton onClick={() => swiper.slideNext()} expand="block" color="primary">
            {children}
        </IonButton>
    )
}

const Intro: React.FC<ContainerProps> = ({onFinish}) => {

    function finishIntro(): void {
        throw new Error('Function not implemented.');
    }

    return (
        <Swiper>
            <SwiperSlide className='ion-padding'>
                <img src={Intro1Svg} alt="Intro 1"/>
                <IonText>
                    <h3>
                        Build awesome apps with Ionic UI components!
                    </h3>
                </IonText>
                <SwiperButtonNext>
                    Next
                </SwiperButtonNext>
                
            </SwiperSlide>

            <SwiperSlide className='ion-padding'>
                <img src={Intro2Svg} alt="Intro 2" />
                <IonText>
                    <h3>
                        Create powerful native apps with Capacitor.
                    </h3>
                </IonText>
                <SwiperButtonNext>
                    Next
                </SwiperButtonNext>
                
            </SwiperSlide>

            <SwiperSlide className='ion-padding'>
                <img src={Intro3Svg} alt="Intro 3" />
                <IonText>
                    <h3>
                        Enjoying learning to code ! 
                    </h3>
                </IonText>
                <IonButton onClick={()=>onFinish()}>
                    Finish
                </IonButton>
                
            </SwiperSlide>
        </Swiper>
    );
};

export default Intro; 