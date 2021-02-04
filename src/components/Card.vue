<template>
    <div class="cards">
        <h1>{{title}}</h1>

        <ul>
            <li class="card" v-for="card in cards" :key="card.id">
                <a class="card-link" href="#">
                    <div class="card-img-wrapper">
                        <img :src="card.image" :alt="card.name">
                    </div>
                    <span class="card-name">{{card.name}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        title: String,
        cards: []
    }
})

export default class Card extends Vue{
    title!: string;
    cards!: [];
}
</script>

<style scoped lang="scss">

    ul {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
        list-style: none;
        .card {
            margin-bottom: 10px;
            padding: 50px;
            border-radius: 10px;
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
                color:black;

                .card-img-wrapper {
                    height: 64px;
                    width: 64px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .card-name {
                    margin-top: 5px;
                    text-transform: uppercase;
                }
            }
            
        }
    }
</style>