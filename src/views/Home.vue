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
            image: require('@/assets/cook.png')
        },
        {
            id: 2,
            name: 'ce soir',
            image: require('@/assets/night.png')
        },
        {
            id: 3,
            name: "aujourd'hui",
            image: require('@/assets/day.png')
        },
    ]
}
</script>

<style lang="scss">
  .home {
    padding-left: 30px;
    padding-right: 30px;
  }
</style>