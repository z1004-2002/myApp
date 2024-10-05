import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter } from '@ionic/react';
import { addOutline, closeCircleOutline, time, timeOutline, trashBinOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react';

const List: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<any[]>([]);
    const [showAlert] = useIonAlert()
    const [showToast] = useIonToast()
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const cardModal = useRef<HTMLIonModalElement>(null);
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const page = useRef(null)

    const [activeSegment, setActiveSegment] = useState<any>("details");

    useEffect(() => {
        setPresentingElement(page.current)
    }, [])

    useIonViewWillEnter(async () => {
        const users = await getUsers();
        console.log("🚀 ~ useIonViewWillEnter ~ users:", users)
        setUsers(users);
        setLoading(false)
    });

    const getUsers = async () => {
        const data = await fetch('https://randomuser.me/api?results=10');
        const users = await data.json();
        return users.results
    }

    const clearList = () => {
        showAlert({
            header: 'Confirm',
            message: 'Are you sure you want to delete users ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Confirm',
                    handler: () => {
                        setUsers([])
                        showToast({
                            message: 'All Users deleted!',
                            duration: 2000,
                            position: 'bottom',
                            color: 'danger'
                        })
                    }
                }
            ]
        })
    }

    const doRefresh = async (event: any) => {
        setLoading(true)
        setUsers([])
        const users = await getUsers();
        setTimeout(() => {
            setUsers(users);
            event.target.complete();
            setLoading(false)
        }, 3000)
    }

    return (
        <IonPage ref={page}>
            <IonHeader>
                <IonToolbar color={"success"}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>List</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={clearList}>
                            <IonIcon slot="icon-only" icon={trashBinOutline} color={'light'} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar color={"success"}>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot='fixed' onIonRefresh={(ev) => doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>

                {loading && (
                    [...Array(10)].map((_, idx) => (
                        <IonCard key={idx}>
                            <IonCardContent className='ion-no-padding'>
                                <IonItem lines='none'>
                                    <IonAvatar slot='start'>
                                        <IonSkeletonText />
                                    </IonAvatar>
                                    <IonLabel>
                                        <IonSkeletonText animated style={{ width: "150px" }} />
                                        <p>
                                            <IonSkeletonText />
                                        </p>
                                    </IonLabel>
                                    <IonChip slot='end' color={"primary"}>
                                    </IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}

                {users.map((user, idx) => (
                    <IonCard key={idx} onClick={() => setSelectedUser(user)}>
                        <IonCardContent className='ion-no-padding'>
                            <IonItem lines='none'>
                                <IonAvatar slot='start'>
                                    <IonImg src={user.picture.large} />
                                </IonAvatar>
                                <IonLabel>
                                    {user.name.first} {user.name.last}
                                    <p>{user.email}</p>
                                </IonLabel>
                                <IonChip slot='end' color={"primary"}>
                                    {user.nat}
                                </IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}
                <IonModal ref={modal} isOpen={selectedUser !== null}
                    breakpoints={[0, 0.5, 0.8]} initialBreakpoint={0.5}
                    onIonModalDidDismiss={() => setSelectedUser(null)}
                >
                    <IonHeader>
                        <IonToolbar color={"light"}>
                            <IonButtons slot="end">
                                <IonButton onClick={() => modal.current?.dismiss()}>
                                    <IonIcon slot="icon-only" icon={closeCircleOutline} color={'light'} />
                                </IonButton>
                            </IonButtons>
                            <IonTitle>
                                {selectedUser?.name.first} {selectedUser?.name.last}
                            </IonTitle>
                        </IonToolbar>
                        <IonToolbar color={"light"}>
                            <IonSegment value={activeSegment} onIonChange={(ev) => setActiveSegment(ev.detail.value!)}>
                                <IonSegmentButton value='details'>Details</IonSegmentButton>
                                <IonSegmentButton value='calendar'>Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className='ion-padding'>
                        {activeSegment === 'details' && (
                            <IonCard>
                                <IonAvatar slot='start'> 
                                    <IonImg src={selectedUser?.picture.large} />
                                </IonAvatar>
                                <IonCardContent className='ion-no-padding'>
                                    <IonItem lines='none'>
                                        <IonLabel className='ion-text-wrap'>
                                            {selectedUser?.name.first} {selectedUser?.name.last}
                                            <p>
                                                {selectedUser?.email}
                                            </p>
                                        </IonLabel>
                                    </IonItem>
                                    <p>{selectedUser?.bio}</p>
                                </IonCardContent>
                            </IonCard>
                        )}

                        {activeSegment === 'calendar' && (
                            <IonDatetime/>  
                        )}
                    </IonContent>
                </IonModal>

                <IonModal
                    breakpoints={[0, 0.5, 0.8]} initialBreakpoint={0.5}
                    ref={cardModal} trigger='card-modal' presentingElement={presentingElement!}>
                    <IonHeader>
                        <IonToolbar color={"success"}>
                            <IonButtons slot="end">
                                <IonButton onClick={() => cardModal.current?.dismiss()}>
                                    <IonIcon slot="icon-only" icon={closeCircleOutline} color={'light'} />
                                </IonButton>
                            </IonButtons>
                            <IonTitle>
                                Card Modal
                            </IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <p>
                            My card modal
                        </p>
                    </IonContent>
                </IonModal>

                <IonFab className='margin-bottom' vertical='bottom' horizontal='end' slot='fixed'>
                    <IonFabButton id='card-modal'>
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default List;