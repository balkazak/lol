<template>
   <div class="card-page">
     <v-row class="justify-center justify-md-space-between mb-16">
       <h2>Мои товары</h2>
       <v-dialog
           v-model="dialog"
           persistent
           max-width="600px"
       >
         <template v-slot:activator="{ on, attrs }">
           <v-btn
               v-bind="attrs"
               v-on="on"
               tile
               color="blue "
               class="btn mt-5 mt-md-0"
           >
             <v-icon left>
               mdi-pencil
             </v-icon>
             Добавить товар
           </v-btn>
         </template>
         <v-card>
           <v-card-title>
             <span class="text-h5">Новый заказ</span>
           </v-card-title>
           <v-card-text>
               <v-row>
                 <v-col cols="12">
                   <v-text-field
                       label="Трек код:"
                       required
                       v-model="trackNumber"
                   ></v-text-field>
                 </v-col>
                 <v-col cols="12">
                   <v-text-field
                       label="Описание товара:"
                       required
                       v-model="description"
                   ></v-text-field>
                 </v-col>
               </v-row>
           </v-card-text>
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn
                 color="blue darken-1"
                 text
                 @click="closeModal"
             >
               Закрыть
             </v-btn>
             <v-btn
                 color="blue darken-1"
                 text
                 @click="addOrder"
             >
               Сохранить
             </v-btn>
           </v-card-actions>
         </v-card>
       </v-dialog>
     </v-row>
     <v-row  style="gap: 30px">
       <template v-for="card in orders">
         <v-card width="430">
           <v-img
               height="200"
               src="map.jpg"
               cover
               class="text-white"
           >
             <v-toolbar
                 color="rgba(0, 0, 0, 0)"
                 theme="dark"
             >
               <template v-slot:prepend>
                 <v-btn icon="$menu"></v-btn>
               </template>

               <div class="d-flex align-center justify-space-between" style="width: 100%">
                 <v-toolbar-title class="text-h6 card-title justify-space-between">
                   {{ card.title }}
                 </v-toolbar-title>

                 <h5 class="white--text">{{ card.desc }}</h5>
               </div>

               <template v-slot:append>
                 <v-btn icon="mdi-dots-vertical"></v-btn>
               </template>
             </v-toolbar>
           </v-img>

           <v-card-text>
             <v-timeline density="compact" align="start">
               <v-timeline-item
                   size="x-small"
                   :icon="card.date ? 'mdi-check' : ''"
               >
                 <div class="mb-4">
                   <div>Дата регистрации клиентом</div>
                   <div class="font-weight-normal">
                     <strong>{{ card.date | moment("DD/MM/YYYY HH:MM:SS") }}</strong>
                   </div>
                 </div>
               </v-timeline-item>
               <v-timeline-item
                   size="x-small"
                   :icon="card.recChina ? 'mdi-check' : ''"
               >
                 <div class="mb-4">
                   <div>Получено на складе Китай</div>
                   <div class="font-weight-normal">
                     <strong>{{ card.recChina  || 'Нет данных' | moment("DD/MM/YYYY HH:MM:SS") }}</strong>
                   </div>
                 </div>
               </v-timeline-item>
               <v-timeline-item
                   size="x-small"
                   :icon="card.recAlma ? 'mdi-check' : ''"
               >
                 <div class="mb-4">
                   <div>Получено на складе Алматы</div>
                   <div class="font-weight-normal">
                     <strong>{{ card.recAlma || 'Нет данных' | moment("DD/MM/YYYY HH:MM:SS") }}</strong>
                   </div>
                 </div>
               </v-timeline-item>
               <v-timeline-item
                   size="x-small"
                   :icon="card.recClient ? 'mdi-check' : ''"
               >
                 <div class="mb-4">
                   <div class="text">Получено клиентом</div>
                   <div class="font-weight-normal">
                     <strong>{{ card.recClient || 'Нет данных' | moment("DD/MM/YYYY HH:MM:SS")}}</strong>
                   </div>
                 </div>
               </v-timeline-item>
             </v-timeline>
           </v-card-text>
         </v-card>
       </template>
     </v-row>
   </div>
</template>

<script>
import { mapState } from "vuex";
import {orderPageModule} from "@/store/orders-store";
export default {
  components: {

  },
  data: () => ({
    date: new Date(),
    dialog: false,
    description: '',
    trackNumber: '',
    messages: [
      {
        from: '25.12.2023 12:30:59',
        message: `Дата регистрации клиентом`,
        delivered: true
      },
      {
        from: 'Нет данных',
        message: 'Получено на складе Китай',
        delivered: false
      },
      {
        from: 'Нет данных',
        message: 'Получено на складе Алматы',
        delivered: false
      },
      {
        from: 'Нет данных',
        message: 'Получено клиентом',
        delivered: false
      },
    ],
  }),
  computed: {
    ...mapState({
      newOrder: (state) => state.orderPageModule.newOrder,
      orders: (state) => state.orderPageModule.orders,
    }),
  },
  mounted() {
    const orders = localStorage.getItem('orders');
    if (orders) {
      console.log('item found', orders)
      this.$store.commit('orderPageModule/setFromStorage', JSON.parse(orders))
    } else {
      console.log('Item not found in localStorage');
    }
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.trackNumber = '';
      this.description = '';
    },
    addOrder() {
      this.$store.commit('orderPageModule/setOrder', {
        title: this.trackNumber,
        desc: this.description,
        date: new Date(),
        recChina: '',
        recAlma: '',
        recClient: ''
      })
      // this.$store.dispatch("orderPageModule/addOrder", {
      //   title: this.trackNumber,
      //   desc: this.description,
      // });
      this.dialog = false;
    }
  }
};
</script>


<style scoped>
  .card-page {
    padding: 100px 0;
  }
  .card-title {
    color: white;
  }
  .v-application .primary {
    background-color: red!important;
  }
  .btn {
    color: white!important;
  }
  @media (max-width: 800px) {
    .card-page {
      padding: 100px 50px;
    }
    .text {
      font-size: 10px;
    }
  }
</style>