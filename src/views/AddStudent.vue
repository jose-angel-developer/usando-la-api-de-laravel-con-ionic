<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Agregar Estudiantes
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>
               <ion-row>
                <ion-col>
                    <ion-input v-model="estudiante.nombre" label="Nombre" 
                    color="warning" label-placement="stacked"
                    maxlength="30" counter fill="outline"
                    shape="round" clear-input="true"
                    placeholder="Nombre y Apellido" >
                    </ion-input>
                    <br>
                    <ion-input v-model="estudiante.edad" label="Edad" 
                    color="warning" label-placement="stacked"
                    fill="outline" type="number"
                    shape="round" clear-input="true"
                    placeholder="Edad" >
                    </ion-input>
                    <br>
                    <ion-input v-model="estudiante.correo" label="Correo Electronico" 
                    color="warning" label-placement="stacked"
                    fill="outline"  type="email"
                    shape="round" clear-input="true"
                    placeholder="Correo Electronico" >
                    </ion-input>
                    <br>
                    <ion-input v-model="estudiante.telefono" label="Telefono" 
                    color="warning" label-placement="stacked"
                    maxlength="11" counter
                    fill="outline" type="number"
                    shape="round" clear-input="true"
                    placeholder="Numero de Telefono" >
                    </ion-input>
                    <br>
                    <ion-button shape="round"
                    color="warning" expand="block" @click="addStudent"
                    >
                    <ion-icon slot="start" :icon="checkmarkOutline" ></ion-icon>
                    Guardar
                    </ion-button>
                </ion-col>
               </ion-row>
            </ion-grid>
            <ion-toast :duration="2500"
            :message="toastMessage"
            :is-open="toastState"
            @didDismiss="toastState=false"
            :icon="informationCircleOutline"
            >

            </ion-toast>

        </ion-content>
    </ion-page>
</template>

<script>
    import axios from 'axios'
    import {IonPage, IonHeader,
            IonToolbar, IonTitle,
            IonContent, IonGrid,
            IonRow, IonCol,
            IonInput, IonButton,
            IonIcon, IonToast
    } from '@ionic/vue'
    import { checkmarkOutline, informationCircleOutline,} from 'ionicons/icons'
    export default{
        name:'AddStudent',
        components:{
            IonPage, IonHeader,
            IonToolbar, IonTitle,
            IonContent, IonGrid,
            IonRow, IonCol,
            IonInput, IonButton,   
            IonIcon, IonToast
        }, 
        data(){
            return{
                checkmarkOutline, informationCircleOutline,

                //variable para guardar contenido del formulario
                estudiante:{},
                //variable para controlar la visivilidad del toast
                toastState: false,
                //variable para guardar el mensaje a mostrar
                toastMessage: null
            }
        }, 
        methods:{
            addStudent(){
                console.log(this.estudiante)
                //peticion para insertar datos
                axios.post('http://localhost/api_res/public/api/estudiante/store', this.estudiante)
                .then(response=>{
                    let res = response.data
                    this.estudiante ={}
                    if(res.code==200){
                        this.toastState = true
                        this.toastMessage = res.data
                    }
                })
                .catch(error => console.log('Ha ocurrido un error' + error))
            }
        }
    }
</script>

<style scoped>

</style>