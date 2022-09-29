<template>
    <div id="chooseJetType" class="jet-type-block">
        <h4>Please choose type of aircraft (You can choose more than 1)</h4>
        <div class="jet-type-list">
            <div class="jet-type-unit">
                <input id="jetType1" value="jet1"  v-model="checkedJet" type="checkbox" v-on:click="selectType($event, 1)"/>
                <label for="jetType1" class="jet-type-content">
                    <div class="checkbox">
                        <img src="/assets/images/svg/check-sm.svg" alt="check"/>
                    </div>
                    <div class="jet-type-head light-gallery-wrapper">
                        <div class="result-gallery-top light-gallery">  
                            <div class="result-image">
                                <img alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </div>
                        </div>
                        <lightgallery
                            class="result-gallery-top light-gallery hidden"
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
                                href="/imperium-rent-flow/assets/images/home/gallery/3.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery1" alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/home/gallery/2.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 2" src="/assets/images/home/gallery/2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/home/gallery/1.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 3" src="/assets/images/home/gallery/1.jpg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery1.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Turbo Prop <span>(e.g: Turboprop)</span></h4>
                        <ul>
                            <li>8 Passengers</li>
                            <li><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                Fuel stop</li>
                        </ul>
                        
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Max Hrs Range
                                <span>332 mph</span>
                            </li>
                            <li>Max Nm Range
                                <span>{{props.distance}} miles</span>
                            </li>
                            <li>Max Speed (no seat)
                                <span>332 mph
                                </span>
                            </li>
                            <li>Cruising Speed
                                <span>332 mph</span>
                            </li>
                            <li>Cruising Altitude
                                <span>2,075 miles</span>
                            </li>
                        </ul>
                        <ul class="jet-animities">
                            <li>
                                <img src="/assets/images/svg/drinks.svg" alt="drinks"/>Included: snacks & beverages</li>
                             
                        </ul>
                    </div>
                </label>
            </div>
            <div class="jet-type-unit">
                <input id="jetType2" value="jet2" v-model="checkedJet" type="checkbox" v-on:click="selectType($event, 2)"/>
                <label for="jetType2" class="jet-type-content">
                    <div class="checkbox">
                        <img src="/assets/images/svg/check-sm.svg" alt="check"/>
                    </div>
                    <div class="jet-type-head light-gallery-wrapper">
                        <div class="result-gallery-top light-gallery">  
                            <div class="result-image">
                                <img alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </div>
                        </div>
                        <lightgallery
                            class="result-gallery-top light-gallery hidden"
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
                                href="/imperium-rent-flow/assets/images/home/gallery/3.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery2" alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/home/gallery/2.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 2" src="/assets/images/home/gallery/2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/home/gallery/1.jpg"
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
                            <li>8 Passengers</li>
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Max Hrs Range
                                <span>332 mph</span>
                            </li>
                            <li>Max Nm Range
                                <span>{{props.distance}} miles</span>
                            </li>
                            <li>Max Speed (no seat)
                                <span>332 mph
                                </span>
                            </li>
                            <li>Cruising Speed
                                <span>332 mph</span>
                            </li>
                            <li>Cruising Altitude
                                <span>2,075 miles</span>
                            </li>
                        </ul>
                        <ul class="jet-animities">
                            <li>
                                <img src="/assets/images/svg/drinks.svg" alt="drinks"/>Included: snacks & beverages</li>
                        </ul>
                    </div>
                </label>
            </div>
            <div class="jet-type-unit">
                <input id="jetType3" value="jet3" v-model="checkedJet" type="checkbox" v-on:click="selectType($event, 3)"/>
                <label for="jetType3" class="jet-type-content">
                    <div class="checkbox">
                        <img src="/assets/images/svg/check-sm.svg" alt="check"/>
                    </div>
                    <div class="jet-type-head light-gallery-wrapper">
                        <div class="result-gallery-top light-gallery">  
                            <div class="result-image">
                                <img alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </div>
                        </div>
                        <lightgallery
                            class="result-gallery-top light-gallery hidden"
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
                                href="/imperium-rent-flow/assets/images/home/gallery/3.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery3" alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/home/gallery/2.jpg"
                                data-lg-size="1200-857">
                                <img alt="Image 2" src="/assets/images/home/gallery/2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/home/gallery/1.jpg"
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
                            <li>8 Passengers</li>
                            <li><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                Fuel stop</li>
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Max Hrs Range
                                <span>332 mph</span>
                            </li>
                            <li>Max Nm Range
                                <span>{{props.distance}} miles</span>
                            </li>
                            <li>Max Speed (no seat)
                                <span>332 mph
                                </span>
                            </li>
                            <li>Cruising Speed
                                <span>332 mph</span>
                            </li>
                            <li>Cruising Altitude
                                <span>2,075 miles</span>
                            </li>
                        </ul>
                        <ul class="jet-animities">
                            <li>
                                <img src="/assets/images/svg/drinks.svg" alt="drinks"/>Included: snacks & beverages</li>
                        </ul>
                    </div>
                </label>
            </div>
        </div>
        <div class="jet-type-button">
            <button
                :disabled="checkedJet.length == 0"
                class="btn btn-primary btn-md btn-iconed-lg"
                @click="goToNext()">Next ({{ checkedJet.length }})<img src="/assets/images/svg/next.svg" alt="icon"/></button>
        </div>
    </div>
</template>

<script setup>
    import emitter from 'tiny-emitter/instance'
    import { ref } from 'vue'
    const gallery1 = ref(null)
    const gallery2 = ref(null)
    const gallery3 = ref(null)
    let checkedJet = ref([])
    let selectedTypes = []
   
const props = defineProps({
        distance: String,
        })
    function goToNext() {
        emitter.emit('updateButtonType', {value :''});
        emitter.emit('updateSearch', {data : selectedTypes, path : 'selected-result', from : 'jettype'});
        window.scrollBy(0, -500);
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
        name : 'LightGallery',
        components : {
            Lightgallery
        },
        data : () => ({
            plugins: [lgZoom, lgThumbnail]
        }),
        methods : {
            onInit: () => {}
        }
    };
</script>

<style lang="css" scoped>
    @import 'lightgallery/css/lightgallery.css';
    @import 'lightgallery/css/lg-thumbnail.css';
    @import 'lightgallery/css/lg-zoom.css';
</style>