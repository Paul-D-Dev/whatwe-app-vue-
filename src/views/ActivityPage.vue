<template>
  <div class="home" id="content-event">



    <div class="cards">
        <h1>{{event.name}}</h1>

        <form @submit.prevent="onSubmitCustomActivity" class="form__activity__custom">
          <input type="text" placeholder="Need more activity ?" v-model="activityName">
          <button :class="activityName !== '' ? 'active' : ''">ADD</button>
        </form>

        <ul class="cards__wrapper">
            <li class="card" 
              v-for="card in activitiesByEvent" :key="card.id" 
              v-on:click="addActivities(card)"
              v-bind:class="{active : isSelected(card)}">
                <div class="card-link">
                    <div class="img-wrapper">
                        <img :src="'http://localhost:1337' + card.image?.url" :alt="card.name">
                    </div>
                    <span class="card-name">{{card.name}}</span>
                </div>
            </li>
        </ul>
    </div>

    <div class="selection" v-show="selection.length > 0">
      
      <h2>SELECTION</h2>
      <ul class="selection__list">
        <li class="selection__item" v-for="activity in selection" :key="activity.id" >
          <div class="selection__activity-image" v-if="activity.image">
            <div class="img-wrapper">
              <img :src="'http://localhost:1337' + activity.image?.url" :alt="activity.name">
            </div>
            <span class="selection__activity-image-close" v-on:click="removeActivity(activity)"></span>
          </div>

          <div class="selection__custom" v-else>
            <span class="selection__custom-name">{{activity}}</span>
            <span class="selection__custom-close" @click="removeActivity(activity)"></span>
          </div>
        </li>
      </ul>

      <div class="selection__btn__wrapper">
        <button v-on:click="roll()" class="selection__btn btn">ROLL</button>
      </div>
    </div>

  </div>

  <div class="modal" id="modal" v-show="openModal">
    <div class="modal-content">
      <p>{{event.name}} you {{rollSelected.name}}</p>
      <div class="modal__content-imgs">
        <div class="img-wrapper modal__content__event">
          <img :src="'http://localhost:1337' + event.image?.url" :alt="event.name">
        </div>
        <div class="img-wrapper modal__content__activity" v-if="rollSelected?.image">
          <img :src="'http://localhost:1337' + rollSelected?.image.url" :alt="rollSelected?.name">
        </div>
        <div v-else>
        <span class="modal__content__custom">{{rollSelected}}</span>
        </div>
      </div>
      <button class="btn" v-on:click="closeModal()">
        <router-link to="/">Enjoy</router-link>
      </button>
    </div>
</div>
</template>

<script lang="ts">

import { Vue } from 'vue-class-component';
import { IActivity } from '@/shared/_interfaces/interface';
import axios from 'axios';

// TODO add input 
export default class ActivityPage extends Vue {

    event = {};
    activitiesByEvent = []

    selection: any[] = [];
    rollSelected: IActivity = {
      id: 0,
      name: '',
      image: '',
      eventId: 0,
    };
    openModal = false;
    activityName = '';

    mounted () {
      const idEvent = this.$route.params.idEvent;
      axios.get('http://localhost:1337/activities?_where[events]=' + idEvent).then(response => {
        this.activitiesByEvent = response.data
      })

      axios.get('http://localhost:1337/events/' + idEvent).then(res => {
        this.event = res.data
      })
    }
    
    addActivities(activity: any) {      
      if(this.selection.indexOf(activity) === -1){
        this.selection.push(activity);
      } else {
        this.removeActivity(activity.id);
      }
    }

    onSubmitCustomActivity() {
      if(this.activityName !== '') {
        this.selection.push(this.activityName);       
      }
      this.activityName = '';
    }


    removeActivity(activity: any) {    
      if (activity.id) {
        this.selection.splice(this.selection.findIndex(a => a.id === activity.id), 1);
      } else {
        this.selection.splice(this.selection.findIndex(item => item === activity), 1);
      }
    }

    roll() {
      const activity = this.selection[Math.floor(Math.random() * this.selection.length)];
      this.activeModal();
      this.rollSelected = activity;
    }

    activeModal() {
     this.openModal = true;
     const modal = document.getElementById('modal');
     if(modal) {
       modal.style.top = `${window.pageYOffset}px`;
     }
     document.body.style.overflow = 'hidden';
    }

    closeModal() {
      document.body.style.overflow = '';
    }

    /**
    * return boolean to set class active
    */
    isSelected(activity: IActivity): boolean {
      return this.selection.indexOf(activity) === -1 ? false : true;
    }

}
</script>

<style lang="scss" scoped>
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
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    overflow: hidden;
    height: 100%;
    &.blur {
      filter: blur(10px);
    }
  }

  .form__activity__custom {
    border-radius: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.01);
    padding-left: 20px;
    display: flex;
    justify-content: space-between;

    input {
      width: 200px;
      border: none;
      outline: none;
      color: #93BADC;

      &::placeholder {
        color : #707070;
      }

      // &:focus ~ button {
      //   background-color: rgba(45, 131, 245, 0.45);
      // }
    }

    button {
      border: none;
      border-radius: 50px;
      height: 35px;
      width: 70px;
      outline: none;
      color: #707070;

      &.active {
        background-color: #93BADC;
        color: #FFF;
      }
    }
  }

    ul {    
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
        list-style: none;
        margin-top: 25px;
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
    max-width: 300px;
    min-width: 300px;
    min-height: 250px;
    padding: 30px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    border-radius: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.01);
    display: flex;
    flex-direction: column;

    .selection__list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 10px;
      

      .selection__item {
        margin-top: 10px;
        margin-right: 30px;
        filter: drop-shadow(0px 3px 6px rgba(45, 131, 204, 0.302));


        &:nth-of-type(3n) {
          margin-right: 0px;
        }

        .selection__custom{
          display: flex;
          border-radius: 30px;
          box-shadow: (0px 3px 6px rgba(45, 131, 204, 0.302));

          .selection__custom-name {
            padding-left: 20px;
            padding-right: 20px;
          }
          .selection__custom-close{
            position: relative;
            border-radius: 50px;
            height: 22px;
            width: 22px;
            background: #5E9ED5;
            

          &::before, &::after {
            content: '';
            display: block;
            position: absolute;
            border: 0.5px solid #FFF;
            width: 9px;
            left: 6px;
            top: 10px;
          }

          &::before {
            transform: rotate(45deg);
          }

          &::after {
            transform: rotate(-45deg);

          }
          }
        }
      }

    }

    .img-wrapper {
      height: 60px;
      width: 60px;
    }
    .selection__activity-image-close {  
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

    .selection__btn__wrapper {
        margin-top: auto;
        margin-left: auto;
      .selection__btn {
        margin-top: 30px;
      }
    }
  }

  .modal{
      height: 100vh;
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.4);
      
      position: absolute;
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