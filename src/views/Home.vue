<template>
  <div class="home">
      <h1>{{title}}</h1>

        <ul class="cards">
            <li class="card" v-for="card in cardEvents" :key="card.id">
                <router-link class="card-link" :to="{name: 'Events', params: {idEvent : card.id}}">
                    <div class="card-img-wrapper">
                        <img :src="'https://wwd-api.herokuapp.com' + card.image?.url" :alt="card.name">
                    </div>
                    <span class="card-name">{{card.name}}</span>
                </router-link>
            </li>
        </ul>

  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from 'axios';



export default class Home extends Vue {

  title = "What do we do"
  cardEvents = [];

    mounted () {
      axios.get('https://wwd-api.herokuapp.com/events').then( r => {
        this.cardEvents = r.data;
      }).catch(e => {
        console.log(e);
      })
    }

    
}
</script>

<style lang="scss" scoped>
  .home {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    $size: 300px;

    

    .cards {
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

                .card-img-wrapper {
                    height: $size/2;
                    width: $size/2;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: $size/4;
                    }
                }
                .card-name {
                    margin-top: 10px;
                    text-transform: uppercase;
                }
            }
            
        }
    }
  }
</style>