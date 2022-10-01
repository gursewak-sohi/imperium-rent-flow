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
                                <img alt="Image" src="/assets/images/aircraft/1-turbo/main.jpeg"/>
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
                                href="/imperium-rent-flow/assets/images/aircraft/1-turbo/main.jpeg"
                                data-lg-size="1200-857">
                                <img ref="gallery1" alt="" src="/assets/images/aircraft/1-turbo/main.jpeg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/1-turbo/inside1.png"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/1-turbo/inside1.png"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/1-turbo/inside2.png"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/1-turbo/inside2.png"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/1-turbo/back.jpeg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/1-turbo/back.jpeg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery1.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Turbo Prop</h4>
                        <ul>
                            <li>7 Passengers</li>
                            <li  v-if="props.distance > 1742"><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                2 Fuel stop</li>
                        </ul>
                        
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Sample Aircraft
                                <span>King Air 250, PC-12</span>
                            </li>
                             
                            <li>Max Nm Range
                                <!-- <span>{{props.distance}} miles</span> -->
                                <span>1,742 miles</span>
                            </li>
                             
                            <li>Cruising Speed
                                <span>420 km/h</span>
                            </li>
                            <li>Cruising Altitude
                                <span>9,144 miles</span>
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
                                <img alt="Image" src="/assets/images/aircraft/2-light-mid/Citation-XLS/front.jpg"/>
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
                                href="/imperium-rent-flow/assets/images/aircraft/2-light-mid/Citation-XLS/front.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery2" alt="" src="/assets/images/aircraft/2-light-mid/Citation-XLS/front.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/2-light-mid/Citation-XLS/inside1.webp"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/Citation-XLS/inside1.webp"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/2-light-mid/Citation-XLS/inside2.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/Citation-XLS/inside2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/2-light-mid/Citation-CJ2/main.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/Citation-CJ2/main.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/2-light-mid/Citation-CJ2/1.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/Citation-CJ2/1.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/2-light-mid/Citation-CJ2/2.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/Citation-CJ2/2.jpg"/>
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
                            <li  v-if="props.distance > 1350"><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                Fuel stop</li>
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Sample Aircraft
                                <span>Citation CJ2, Citation XLS</span>
                            </li>
                             
                            <li>Max Nm Range
                                <!-- <span>{{props.distance}} miles</span> -->
                                <span>1,350 miles</span>
                            </li>
                             
                            <li>Cruising Speed
                                <span>445 mph</span>
                            </li>
                            <li>Cruising Altitude
                                <span>8,500 miles</span>
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
                                <img alt="Image" src="/assets/images/aircraft/3-heavy/front.webp"/>
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
                                href="/imperium-rent-flow/assets/images/aircraft/3-heavy/front.webp"
                                data-lg-size="1200-857">
                                <img ref="gallery3" alt="" src="/assets/images/aircraft/3-heavy/front.webp"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/3-heavy/inside-1.webp"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/inside-1.webp"/>
                            </a>
                            <a
                                class="result-image"
                                href="/imperium-rent-flow/assets/images/aircraft/3-heavy/inside-2.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/inside-2.jpg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery3.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Heavy jets</h4>
                        <ul>
                            <li>9 Passengers</li>
                            <li v-if="props.distance > 3530"><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                Fuel stop</li>
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Sample Aircraft
                                <span>Hawker 1000</span>
                            </li>
                            
                            <li>Max Nm Range
                                <!-- <span>{{props.distance}} miles</span> -->
                                <span>3,530 Miles</span>
                            </li>
                            
                            <li>Cruising Speed
                                <span>517 mph</span>
                            </li>
                            <li>Cruising Altitude
                                <span>7,008 Miles</span>
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
        // window.scrollBy(0, -200);
        setTimeout(function(){

             window.scrollTo({
                top: document.getElementById('selectedJetType').scrollHeight * 1.4,
                left: 0,
                behavior: "smooth",
            });



        },200);
       
    }

    function selectType(e, value){
        let index = selectedTypes.indexOf(value);
        if(e.target.checked){
            selectedTypes.push(value);
        }else{
            selectedTypes.splice(index, 1);
        }
        selectedTypes.sort();
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