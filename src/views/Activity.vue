<template>
  <div class="home">
        <div class="cards">
        <h1>{{eventName}}</h1>

        <ul>
            <li class="card" v-for="card in activitiesByEvent" :key="card.id" v-on:click="addActivities(card)">
                <div class="card-link">
                    <div class="img-wrapper">
                        <img :src="card.image" :alt="card.name">
                    </div>
                    <span class="card-name">{{card.name}}</span>
                </div>
            </li>
        </ul>
    </div>

    <div class="selection">
      <ul>
        <li v-for="activity in selection" :key="activity.id">
            <div class="img-wrapper">
              <img :src="activity.image" :alt="activity.name">
            </div>
            <span v-on:click="removeActivity(activity.id)">X</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import EventService from '@/_services/event.service';
import { Vue } from 'vue-class-component';

  const eventService = new EventService();
  eventService.fetch('/events')



interface Activity {
  id: number,
  name: string,
  image: string,
  eventId: number
}
export default class Home extends Vue {

    eventName = "Ce soir";
    activitiesByEvent: Activity[] = [
        {
            id: 1,
            name: 'sortie entre amis',
            image: require('@/assets/friends.png'),
            eventId : 1
        },
        {
            id: 2,
            name: 'tv / series',
            image: require('@/assets/tv.png'),
            eventId : 1
        },
        {
            id: 3,
            name: "restaurant",
            image: require('@/assets/dinner_restaurant.png'),
            eventId : 1
        },
        {
            id: 4,
            name: "console",
            image: require('@/assets/console.png'),
            eventId : 1
        },
    ]

    selection: Activity[] = [];

    addActivities(activity: Activity) {      
      this.selection.push(activity);
    }

    removeActivity(activityId: number) {    
      this.selection.splice(this.selection.findIndex(a => a.id === activityId), 1);
    }
}
</script>

<style lang="scss">
    $size: 300px;

    .img-wrapper {
    height: $size/2;
    width: $size/2;

    img {
        width: 100%;
        height: 100%;
        border-radius: $size/4;
    }
}

  .home {
    padding-left: 30px;
    padding-right: 30px;
  }

    ul {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
        list-style: none;
        .card {
            display: flex;
            flex-direction: column;
            place-content: center;
            height: $size;
            width: $size;
            margin-bottom: 25px;
            border-radius: 30px;
            background-color: rgba(45, 131, 245, 0.45);
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.01);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);

            &:hover {
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.10), 0 0px 0px rgba(0, 0, 0, 0.1);
            }

            .card-link{
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                color:#707070;

                .card-name {
                    margin-top: 10px;
                    text-transform: uppercase;
                }
            }
            
        }
    }

  .selection {

    .img-wrapper {
      filter: drop-shadow(0px 3px 6px rgba(45, 131, 204, 0.302));
    }
  }

</style>