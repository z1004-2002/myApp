import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkDoneOutline, logInOutline, personCircleOutline } from 'ionicons/icons';
import React from 'react';
import FFC from '../assets/fcc.svg'

const Register: React.FC = () => {

    const router = useIonRouter()

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log("Create Account")
        router.goBack();
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"success"}>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
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
                                    <form onSubmit={doRegister}>
                                        <IonInput label='Email' type='email' labelPlacement="floating" fill="outline" placeholder="text@gmail.com" />
                                        <IonInput className='ion-margin-top' label='Password' type='password' labelPlacement="floating" fill="outline" placeholder="********" />
                                        <IonButton color={'primary'} className='ion-margin-top' type='submit' expand='block'>
                                            Create my account
                                            <IonIcon icon={checkmarkDoneOutline} slot='end' />
                                        </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;