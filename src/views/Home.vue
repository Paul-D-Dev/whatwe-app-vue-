<template>
  <div class="home">
    <Card title="Qu'est-ce qu'on fait" :cards="cardEvents" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Card from '@/components/Card.vue'; // @ is an alias to /src
import EventService from '@/shared/_services/event.service';
import axios from 'axios';

  const eventService = new EventService();
  eventService.fetch('/events');

@Options({
  components: {
    Card
  },
})

export default class Home extends Vue {

  cardEvents = [];

    mounted () {
      axios.get('http://localhost:1337/events').then( r => {
        console.log(r.data);
        this.cardEvents = r.data;
      }).catch(e => {
        console.log(e);
        
      })
    }

    
}
</script>

<style lang="scss">
  .home {
    padding-left: 30px;
    padding-right: 30px;
  }
</style>