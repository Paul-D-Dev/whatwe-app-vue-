<template>
  <div class="home">
    <Card title="Qu'est-ce qu'on fait" :cards="cardEvents" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Card from '@/components/Card.vue'; // @ is an alias to /src
import EventService from '@/_services/event.service';

  const eventService = new EventService();
  eventService.fetch('/events')

@Options({
  components: {
    HelloWorld,
    Card
  },
})

export default class Home extends Vue {

  cardEvents = [
        {
            id: 1,
            name: 'a manger',
            image: require('@/assets/icons/eating.svg')
        },
        {
            id: 2,
            name: 'ce soir',
            image: require('@/assets/icons/night.svg')
        },
        {
            id: 3,
            name: "aujourd'hui",
            image: require('@/assets/icons/today.png')
        },
    ]
}
</script>
