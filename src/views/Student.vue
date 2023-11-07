<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Estudiantes</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>
                    Estudiantes
                  </ion-card-title>
                  <ion-card-subtitle>
                    Listado de estudiantes
                  </ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                  <ion-list>
                    <template v-for="estudiante in respuesta" :key="estudiante.id">
                      <ion-item>
                        <ion-icon slot="start" :icon="personCircle"></ion-icon>
                        <ion-label>{{ estudiante.nombre }}</ion-label>
                        <ion-buttons slot="end">
                          <ion-button color="tertiary" @click="showStudent(estudiante.id, 1)">
                            <ion-icon slot="icon-only" :icon="eye"></ion-icon>
                          </ion-button>
                          <ion-button color="success" @click="showStudent(estudiante.id, 2)">
                            <ion-icon slot="icon-only" :icon="create"></ion-icon>
                          </ion-button>
                          <ion-button color="danger" @click="deleteStudent(estudiante.id)">
                            <ion-icon slot="icon-only" :icon="trash"></ion-icon>
                          </ion-button>
                        </ion-buttons>
                      </ion-item>
                    </template>
                
                    <!-- Mostrar un mensaje en caso de no tener estudiantes -->
                    <ion-item v-if="respuesta.length === 0">
                      <ion-icon slot="start" :icon="closeCircle"></ion-icon>
                      <ion-label>No hay registros</ion-label>
                    </ion-item>
                  </ion-list>
                </ion-card-content>
                
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <!--Modal para datos de estudiante-->
        <ion-modal :is-open="modalState" @didDismiss="modalState=false">
            <ion-header>
                <ion-toolbar>
                  <ion-title>Informaci&oacute;n del estudiante</ion-title>
                  <ion-buttons slot="end">
                    <ion-button @click="modalState=false">
                      <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
              <ion-list>
                <ion-item>
                  <ion-icon slot="start" :icon="personCircle"></ion-icon>
                  <ion-label>{{ estudiante.nombre }}</ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon slot="start" :icon="checkmark"></ion-icon>
                  <ion-label>{{estudiante.edad}}</ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon slot="start" :icon="mailOutline"></ion-icon>
                  <ion-label>{{ estudiante.correo }}</ion-label>
                </ion-item>

                <ion-item>
                  <ion-icon slot="start" :icon="call"></ion-icon>
                  <ion-label>{{ estudiante.telefono }}</ion-label>
                </ion-item>
              </ion-list>
            </ion-content>
        </ion-modal>

        <!--Modal para editar-->
        <ion-modal :is-open="modalState2" @didDismiss="modalState2=false">

          <ion-header>
            <ion-toolbar>
              <ion-title>Editar estudiante</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="modalState2=false">
                  <ion-icon slot="icon-only" :icon="closeCircle"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <br>
          <ion-content class="ion-padding">
            <ion-input
              color="warning"
              label-placement="stacked"
              label="Nombre"
              maxlength="30"
              counter
              fill="outline"
              shape="round"
              clear-input="true"
              placeholder="Nombre y Apellido"
              :value="estudiante.nombre"
              @input="estudiante.nombre = $event.target.value"
            ></ion-input>
          <br>
          <ion-input
            :value="estudiante.edad"
            @input="estudiante.edad = $event.target.value"
            color="warning"
            label-placement="stacked"
            fill="outline"
            type="number"
            shape="round"
            clear-input="true"
            placeholder="Edad"
            label="Edad" 
          ></ion-input>
          <br>
          <ion-input
          label="Correo Electronico" 
            :value="estudiante.correo"
            @input="estudiante.correo = $event.target.value"
            color="warning"
            
            label-placement="stacked"
            fill="outline"
            type="email"
            shape="round"
            clear-input="true"
            placeholder="Correo Electronico"
          ></ion-input>
          <br>
          <ion-input
            :value="estudiante.telefono"
            @input="estudiante.telefono = $event.target.value"
            color="warning"
            label-placement="stacked"
            label="Telefono"
            maxlength="11"
            counter
            fill="outline"
            type="number"
            shape="round"
            clear-input="true"
            placeholder="Numero de Telefono"
          ></ion-input>
            <br>
            <ion-button shape="round"
            color="warning" expand="block" @click="editStudent(estudiante.id)"
            >
            <ion-icon slot="start" :icon="checkmarkOutline" ></ion-icon>
            Guardar Cambios
            </ion-button>
          </ion-content>
        </ion-modal>

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
  import axios from 'axios';
  import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
    IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
    IonModal, IonButtons, IonButton, IonToast
  } from '@ionic/vue';
  import {
    personCircle, eye, create, trash, closeCircle, checkmark, call, mailOutline
    // Importa aquí los otros iconos que necesites
  } from 'ionicons/icons';
  
  export default {
    name: 'Student',
    components: {
      IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol,
      IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItemSliding,
      IonItem, IonIcon, IonItemOptions, IonItemOption, IonLabel, IonCardContent,
      IonModal, IonButtons, IonButton, IonToast
    },
    data() {
      return {
        personCircle, eye, create, trash, closeCircle,
        checkmark,  call, mailOutline,
        // Agrega aquí los otros iconos que necesites
        respuesta: [],

        //variable para manejar el modal
        modalState: false,
        modalState2: false,

        //variable u objeto para guardar un estudiante espesifico
        estudiante: {},

        //mensajes toast
        toastState: false,
        toastMessage: null,
      };
    },
    methods: {
      loadData() {
        console.log('Cargando datos...');
        axios.get('http://localhost/api_res/public/api/estudiante/select')
          .then(response => {
            console.log(response.data);
            let res = response.data;
            if (res.code == 200) {
              this.respuesta = res.data;
            }
          })
          .catch(error => console.log('Ha ocurrido un error' + error));
      },

      showStudent(id, action){
        axios.get(`http://localhost/api_res/public/api/estudiante/find/${id}`)
        .then(response => {
          let res = response.data;
          if (res.code == 200) {
            this.estudiante = res.data;
            
            // Evaluar para mostrar el modal después de cargar los datos del estudiante
            if (action === 1) {
              this.modalState = true;
            } else {
              this.modalState2 = true;
            }
          }
        })
        .catch(error=>console.log("Ha ocurrido un error: "+error))
      },
      editStudent(id) {
        // Obtener los valores de los campos del formulario
        const nombre = this.estudiante.nombre;
        const edad = this.estudiante.edad;
        const correo = this.estudiante.correo;
        const telefono = this.estudiante.telefono;

        // Asignar los valores al objeto estudiante
        this.estudiante = {
          nombre,
          edad,
          correo,
          telefono
        };

        axios.put(`http://localhost/api_res/public/api/estudiante/update/${id}`, this.estudiante)
          .then(response => {
            let res = response.data;
            if (res.code === 200) {
              this.toastState = true;
              this.toastMessage = res.data;
              // Cerrar el modal
              this.modalState2 = false;
              // Actualizar la lista de estudiantes
              this.loadData()
            }
          })
          .catch(error => console.log("Ha ocurrido un error: " + error));
      },
      deleteStudent(id){
        axios(`http://localhost/api_res/public/api/estudiante/destroy/${id}`)
        .then(response => {
          let res = response.data
          if(res.code == 200){
            this.toastState = true
            this.toastMessage = res.data
            this.loadData()
          }
        })
        .catch(error => console.log("Ha ocurrido un error: " + error));
      }

    },
    // Se ejecuta cuando el componente está a punto de mostrarse
    ionViewWillEnter() {
      this.loadData();
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  