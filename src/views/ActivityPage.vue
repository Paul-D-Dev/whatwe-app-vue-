<template>
  <div class="home" id="content-event">
        <div class="cards">
        <h1>{{event.name}}</h1>

        <ul>
            <li class="card" 
              v-for="card in activitiesByEvent" :key="card.id" 
              v-on:click="addActivities(card)"
              v-bind:class="{active : isSelected(card)}">
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

      <button v-on:click="roll()">ROLL</button>
    </div>

  </div>
  <div class="modal" id="modal" v-show="openModal">
    <div class="modal-content">
      <p>Phrase</p>
      <div class="modal__content-imgs">
        <div class="img-wrapper">
          <img :src="event.image" :alt="event.name">
        </div>
        <div class="img-wrapper">
          <img :src="rollSelected?.image" :alt="rollSelected?.name">
        </div>
      </div>
      <button>
        <router-link to="/">Enjoy</router-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue } from 'vue-class-component';
import { IActivity } from '@/shared/_interfaces/interface';


export default class ActivityPage extends Vue {

    event = {
      id: 2,
      name: 'ce soir',
      image: require('@/assets/night.png')
    }
    activitiesByEvent = [
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

    selection: IActivity[] = [];
    rollSelected: IActivity = {
      id: 0,
      name: '',
      image: '',
      eventId: 0,
    };
    openModal = false;
    
    addActivities(activity: IActivity) {      
      if(this.selection.indexOf(activity) === -1){
        this.selection.push(activity);
      } else {
        this.removeActivity(activity.id);
      }
    }

    removeActivity(activityId: number) {    
      this.selection.splice(this.selection.findIndex(a => a.id === activityId), 1);
    }

    roll() {
      const activity = this.selection[Math.floor(Math.random() * this.selection.length)];
      this.activeModal();
      this.rollSelected = activity;
      return activity;
    }

    activeModal() {
     this.openModal = true;
    }

    /**
    * return boolean to set class active
    */
    isSelected(activity: IActivity) {
      return this.selection.indexOf(activity) === -1 ? false : true;
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
    &.blur {
      filter: blur(10px);
    }
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
            // background-color: rgba(45, 131, 245, 0.45);
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.01);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);

            &.active {
            background-color: rgba(45, 131, 245, 0.45);
            }

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

  .modal{
      height: 100vh;
      width: 100vw;
      z-index: 10;
      position: absolute;
      top: 0;
      background-color: black;
      background-color: rgba(0, 0, 0, 0.4);
      overflow: hidden;
      // fill: rgba(36,35,35,0.565);
      .modal-content {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 30px;

        height: $size;
        width: $size;
        background-color: #FFF;

        .modal__content-imgs {
          display: flex;
          flex-direction: row;
        }
      }

  }

</style>