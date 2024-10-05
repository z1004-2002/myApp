import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons'
import React, { useEffect, useState } from 'react';
import FFC from '../assets/fcc.svg'
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen'

const Login: React.FC = () => {

    const router = useIonRouter()
    const [introSeen, setIntroSeen] = useState(false)
    const [present, dismiss] = useIonLoading()

    useEffect(() => {
        const checkStorage = async () => {
            const seen = await Preferences.get({ key: INTRO_KEY })
            console.log("🚀 ~ file. Login.txt:17 ~ checkStorage ~ seen:", seen)
            setIntroSeen(seen.value === 'true')
        }
        checkStorage()
    }, [])

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present("logging in...")
        setTimeout(async () => {
            dismiss()
            router.push('/app', 'root')
        }, 2000)
    }
    const seeIntroAgain = async () => {
        setIntroSeen(true)
        Preferences.remove({ key: INTRO_KEY })
    }

    const finishIntro = async () => {
        setIntroSeen(true)
        Preferences.set({ key: INTRO_KEY, value: 'true' })
    }



    return (
        <>{!introSeen ?
            (
                <Intro onFinish={finishIntro} />
            )
            : (
                <IonPage>
                    <IonHeader>
                        <IonToolbar color={"success"}>
                            <IonTitle>LOGIN</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className='ion-padding'>
                        <IonGrid fixed>
                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeXl='4'>
                                    <div className="ion-text-center ion-padding">
                                        <img src={FFC} alt="FreeCodeCamp" width={"50%"} />
                                    </div>
                                </IonCol>
                            </IonRow>

                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeXl='4'>
                                    <IonCard>
                                        <IonCardContent>
                                            <form onSubmit={doLogin}>
                                                <IonInput label='Email' type='email' labelPlacement="floating" fill="outline" placeholder="text@gmail.com" />
                                                <IonInput className='ion-margin-top' label='Password' type='password' labelPlacement="floating" fill="outline" placeholder="********" />
                                                <IonButton color={'primary'} className='ion-margin-top' type='submit' expand='block'>
                                                    Login
                                                    <IonIcon icon={logInOutline} slot='end' />
                                                </IonButton>
                                                <IonButton routerLink='/register' color={'secondary'} className='ion-margin-top' type='button' expand='block'>
                                                    Create Account
                                                    <IonIcon icon={personCircleOutline} slot='end' />
                                                </IonButton>
                                                <IonButton size='small' fill='clear' onClick={seeIntroAgain} color={'medium'} className='ion-margin-top' type="button" expand='block'>
                                                    WatchIntro
                                                    <IonIcon icon={personCircleOutline} slot='end' />
                                                </IonButton>
                                            </form>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>

                        </IonGrid>
                    </IonContent>
                </IonPage>
            ) 
        }
        </>
    );
};

export default Login; 