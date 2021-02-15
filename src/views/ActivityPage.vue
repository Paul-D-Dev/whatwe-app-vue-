<template>
  <div class="home" id="content-event">
    <div class="cards">
        <h1>{{event.name}}</h1>

        <ul class="cards__wrapper">
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

    <div class="selection" v-show="selection.length > 0">
      
      <h2>SELECTION</h2>
      <ul class="selection__list__images">
        <li v-for="activity in selection" :key="activity.id" >
            <div class="img-wrapper">
              <img :src="activity.image" :alt="activity.name">
            </div>
            <span v-on:click="removeActivity(activity.id)"></span>
        </li>
      </ul>

      <button v-on:click="roll()" class="btn">ROLL</button>
    </div>

  </div>


  <div class="modal" id="modal" v-show="openModal">
    <div class="modal-content">
      <p>{{event.name}} you {{rollSelected.name}}</p>
      <div class="modal__content-imgs">
        <div class="img-wrapper">
          <img :src="event.image" :alt="event.name">
        </div>
        <div class="img-wrapper">
          <img :src="rollSelected?.image" :alt="rollSelected?.name">
        </div>
      </div>
      <button class="btn">
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

.btn {
  border: none;
  background-color: #93BADC;
  border-radius: 30px;
  height: 35px;
  width: 145px;
  color: #FFF !important;
  text-decoration: none;
  text-transform: uppercase;
}


  .home {
    padding-left: 30px;
    padding-right: 30px;
    overflow: hidden;
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
            height: $size / 2;
            width: 160px;
            margin-bottom: 25px;
            border-radius: 30px;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.01);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
            &:not(:first-of-type()) {
              margin-left: 30px ;
            }

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

                .img-wrapper {
                  height: 100px;
                  width: 100px;
                }

                .card-name {
                    margin-top: 10px;
                    font-size: 10px;
                    text-transform: uppercase;
                }
            }
            
        }
    }

  .selection {
    // position: absolute;
    // bottom: 0;
    min-width: 300px;
    min-height: 250px;
    padding: 30px;
    border-radius: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.01);
    display: flex;
    flex-direction: column;

    .selection__list__images {
      flex-wrap: wrap;
      margin-top: 10px;

      li {
        margin-right: 30px;

        &:nth-of-type(3n) {
          margin-right: 0px;
        }
      }

    }

    .img-wrapper {
      height: 60px;
      width: 60px;
      filter: drop-shadow(0px 3px 6px rgba(45, 131, 204, 0.302));
    }
    span {  
      display: block;
      height: 12px;
      width: 12px;
      position: relative;
      top: -60px;
      left: 55px;
      border-radius: 50px;
      background-color: #5E9ED5;
      &::before, &::after {
        content: '';
        display: block;
        position: absolute;
        border: 0.5px solid #FFF;
        // height: 1px;
        // background: #FFF;
        width: 6px;
        left: 2px;
        top: 5px;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);

      }

    }
      .btn {
        margin-top: auto;
        margin-left: auto;
      }
  }

  .modal{
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.4);
      
      position: absolute;
      top: 0;
      overflow: hidden;
      z-index: 10;

      .modal-content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        height: $size - 25px;
        width: $size - 25px;
        padding: 25px;
        background-color: #EDEDED;

        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 30px;

        .modal__content-imgs {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-around;

          .img-wrapper {
            height: 112px;
            width: 112px;
          }
        }

      }

  }

</style>