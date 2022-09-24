<template>
    <div id="chooseJetType" class="jet-type-block">
        <h4>Please choose type of jet (You can choose more than 1)
        </h4>
        <div class="jet-type-list">
            <div class="jet-type-unit">
                <input id="jetType1" type="checkbox" v-on:click="selectType($event, 1)"/>
                <label for="jetType1" class="jet-type-content">
                    <div class="checkbox">
                        <img src="/assets/images/svg/check-sm.svg" alt="check"/>
                    </div>
                    <div class="jet-type-head light-gallery-wrapper">
                        <lightgallery
                            class="result-gallery-top light-gallery"
                            :settings="{
                          speed: 500,
                          download: false,
                          zoom: false,
                          mobileSettings: {
                              controls: true,
                              showCloseIcon: true,
                          },
                          plugins: plugins }"
                            :onInit="onInit">
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/3.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery1" alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/2.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 2" src="/assets/images/home/gallery/2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/1.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 3" src="/assets/images/home/gallery/1.jpg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery1.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Turbo Prop</h4>
                        <ul>
                            <li>8 Passengers max</li>
                            <li><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                Fuel stop</li>
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Hours Range
                                <span>332 mph</span>
                            </li>
                            <li>Nautical miles
                                <span>2,075 miles</span>
                            </li>
                            <li>Max seats
                                <span>332 mph
                                </span>
                            </li>
                            <li>Cruising speed
                                <span>332 mph</span>
                            </li>
                            <li>Altitude
                                <span>2,075 miles</span>
                            </li>
                        </ul>
                        <ul class="jet-animities">
                            <li>
                                <img src="/assets/images/svg/drinks.svg" alt="drinks"/>Drinks</li>
                            <li>
                                <img src="/assets/images/svg/snaks.svg" alt="drinks"/>Snacks</li>
                        </ul>
                    </div>
                </label>
            </div>
            <div class="jet-type-unit">
                <input id="jetType2" type="checkbox" v-on:click="selectType($event, 2)"/>
                <label for="jetType2" class="jet-type-content">
                    <div class="checkbox">
                        <img src="/assets/images/svg/check-sm.svg" alt="check"/>
                    </div>
                    <div class="jet-type-head light-gallery-wrapper">
                        <lightgallery
                            class="result-gallery-top light-gallery"
                            :settings="{
                          speed: 500,
                          download: false,
                          zoom: false,
                          mobileSettings: {
                              controls: true,
                              showCloseIcon: true,
                          },
                          plugins: plugins }"
                            :onInit="onInit">
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/3.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery2" alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/2.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 2" src="/assets/images/home/gallery/2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/1.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 3" src="/assets/images/home/gallery/1.jpg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery2.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Light - Super-midsize jets</h4>
                        <ul>
                            <li>8 Passengers max</li>
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Hours Range
                                <span>332 mph</span>
                            </li>
                            <li>Nautical miles
                                <span>2,075 miles</span>
                            </li>
                            <li>Max seats
                                <span>332 mph
                                </span>
                            </li>
                            <li>Cruising speed
                                <span>332 mph</span>
                            </li>
                            <li>Altitude
                                <span>2,075 miles</span>
                            </li>
                        </ul>
                        <ul class="jet-animities">
                            <li>
                                <img src="/assets/images/svg/drinks.svg" alt="drinks"/>Drinks</li>
                            <li>
                                <img src="/assets/images/svg/snaks.svg" alt="drinks"/>Snacks</li>
                        </ul>
                    </div>
                </label>
            </div>
            <div class="jet-type-unit">
                <input id="jetType3" type="checkbox" v-on:click="selectType($event, 3)"/>
                <label for="jetType3" class="jet-type-content">
                    <div class="checkbox">
                        <img src="/assets/images/svg/check-sm.svg" alt="check"/>
                    </div>
                    <div class="jet-type-head light-gallery-wrapper">
                        <lightgallery
                            class="result-gallery-top light-gallery"
                            :settings="{
                            speed: 500,
                            download: false,
                            zoom: false,
                            mobileSettings: {
                                controls: true,
                                showCloseIcon: true,
                            },
                          plugins: plugins }"
                            :onInit="onInit">
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/3.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery3" alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/2.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 2" src="/assets/images/home/gallery/2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/assets/images/home/gallery/1.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 3" src="/assets/images/home/gallery/1.jpg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery3.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Heavy jets</h4>
                        <ul>
                            <li>8 Passengers max</li>
                            <li><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                Fuel stop</li>
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Hours Range
                                <span>332 mph</span>
                            </li>
                            <li>Nautical miles
                                <span>2,075 miles</span>
                            </li>
                            <li>Max seats
                                <span>332 mph
                                </span>
                            </li>
                            <li>Cruising speed
                                <span>332 mph</span>
                            </li>
                            <li>Altitude
                                <span>2,075 miles</span>
                            </li>
                        </ul>
                        <ul class="jet-animities">
                            <li>
                                <img src="/assets/images/svg/drinks.svg" alt="drinks"/>Drinks</li>
                            <li>
                                <img src="/assets/images/svg/snaks.svg" alt="drinks"/>Snacks</li>
                        </ul>
                    </div>
                </label>
            </div>
        </div>
        <div class="jet-type-button">
            <button
                class="btn btn-primary btn-md btn-iconed-lg"
                @click="goToNext()">
                Next (2)
                <img src="/assets/images/svg/next.svg" alt="icon"/></button>
        </div>
    </div>
</template>

<script setup>
    import emitter from 'tiny-emitter/instance'
    import { ref } from 'vue'
    const gallery1 = ref(null)
    const gallery2 = ref(null)
    const gallery3 = ref(null)
    let selectedTypes = [];

    function goToNext() {
        emitter.emit('updateButtonType');
        emitter.emit('updateSearch', {data : selectedTypes, path : 'selected-result', from : 'jettype'});
    }

    function selectType(e, value){
        let index = selectedTypes.indexOf(value);
        if(e.target.checked){
            selectedTypes.push(value);
        }else{
            selectedTypes.splice(index, 1);
        }
    }
</script>

<script>
    import Lightgallery from 'lightgallery/vue';
    import lgThumbnail from 'lightgallery/plugins/thumbnail';
    import lgZoom from 'lightgallery/plugins/zoom';

    export default {
        name : 'App',
        components : {
            Lightgallery
        },
        data : () => ({
            plugins: [lgZoom, lgThumbnail]
        }),
        methods : {
            onInit: () => {
                console.log('lightGallery has been initialized');
            }
        }
    };
</script>

<style lang="css" scoped>
    @import 'lightgallery/css/lightgallery.css';
    @import 'lightgallery/css/lg-thumbnail.css';
    @import 'lightgallery/css/lg-zoom.css';
</style>