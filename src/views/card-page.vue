<template>
   <div class="card-page">
     <v-row justify="space-around">
       <v-card width="400">
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

             <v-toolbar-title class="text-h6 card-title">
               LM661121071CN(капишон)
             </v-toolbar-title>

             <template v-slot:append>
               <v-btn icon="mdi-dots-vertical"></v-btn>
             </template>
           </v-toolbar>
         </v-img>

         <v-card-text>
           <v-timeline density="compact" align="start">
             <v-timeline-item
                 v-for="message in messages"
                 :key="message.time"
                 :dot-color="message.color"
                 size="x-small"
                 :icon="message.delivered ? 'mdi-check' : ''"
             >
               <div class="mb-4">
                 <div>{{ message.message }}</div>

                 <div class="font-weight-normal">
                   <strong>{{ message.from }}</strong>
                 </div>
               </div>
             </v-timeline-item>
           </v-timeline>
         </v-card-text>
       </v-card>

     </v-row>
   </div>
</template>

<script>

export default {
  components: {

  },
  data: () => ({
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

  },
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
</style>