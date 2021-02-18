<template>
    <div class="cards">
        <h1>{{title}}</h1>

        <ul>
            <li class="card" v-for="card in cards" :key="card.id">
                <a class="card-link" href="1">
                    <div class="card-img-wrapper">
                        <img :src="'http://localhost:1337' + card.image?.url" :alt="card.name">
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
    $size: 300px;

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
</style>