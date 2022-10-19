<template>
    <div class="jet-type-block">
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
                                href="/charter/assets/images/aircraft/1-turbo/main.jpeg"
                                data-lg-size="1200-857">
                                <img ref="gallery1" alt="" src="/assets/images/aircraft/1-turbo/main.jpeg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/1-turbo/inside1.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/1-turbo/inside1.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/1-turbo/inside2.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/1-turbo/inside2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/1-turbo/inside3.jpeg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/1-turbo/inside3.jpeg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery1.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Turboprop</h4>
                        <ul>
                            <li>6-8 Passengers</li>
                            <li  v-if="props.distance > allJetData['turoJet']['maxNmRange'] "><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                 {{ getFuelStop(allJetData['turoJet']['maxNmRange'] )}} Fuel stop</li>
                        </ul>
                        
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Sample Aircraft
                                <span>{{ allJetData['turoJet']['sampleAitcraft'] }}</span>
                            </li>
                            <li>Est. Flight Distance
                                <span>{{ numberWithCommas(getFlightDistance()) }} nmiles</span>
                            </li>
                            <li>Est. Flight Time
                                <span>{{ getFlightTime(allJetData['turoJet']['crusingSpeed'], allJetData['turoJet']['maxNmRange']) }}</span>
                            </li>
                             
                            <li>Max Nm Range
                                <span>{{ numberWithCommas(allJetData['turoJet']['maxNmRange']) }} nmiles</span>
                            </li>
                             
                            <li>Cruising Speed
                                <span>{{allJetData['turoJet']['crusingSpeed']}} kts</span>
                            </li>
                            <li>Cruising Altitude
                                <span>{{allJetData['turoJet']['crusingAltitude']}}</span>
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
                                <img alt="Image" src="/assets/images/aircraft/2-light-mid/front.jpg"/>
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
                                href="/charter/assets/images/aircraft/2-light-mid/front.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery2" alt="" src="/assets/images/aircraft/2-light-mid/front.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/2-light-mid/inside1.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/inside1.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/2-light-mid/inside2.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/inside2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/2-light-mid/inside3.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/inside3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/2-light-mid/inside4.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/inside4.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/2-light-mid/inside5.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/2-light-mid/inside5.jpg"/>
                            </a>
                            
                        </lightgallery>
                        <button @click="gallery2.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Light - Super-midsize jets</h4>
                        <ul>
                            <li>8-10 Passengers</li>
                            <li  v-if="props.distance > allJetData['ligtJet']['maxNmRange']"><img src="/assets/images/svg/pump.svg" alt="icon"/>
                               {{ getFuelStop(allJetData['ligtJet']['maxNmRange'])}} Fuel stop</li>
                                
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Sample Aircraft
                                <span>{{ allJetData['ligtJet']['sampleAitcraft'] }}</span>
                            </li>
                             <li>Est. Flight Distance
                                <span>{{ numberWithCommas(getFlightDistance()) }} nmiles</span>
                            </li>
                            <li>Est. Flight Time
                                <span>{{ getFlightTime(allJetData['ligtJet']['crusingSpeed'], allJetData['ligtJet']['maxNmRange']) }}</span>
                            </li>
                             
                            <li>Max Nm Range
                                <span>{{ numberWithCommas(allJetData['ligtJet']['maxNmRange']) }} nmiles</span>
                            </li>
                             
                            <li>Cruising Speed
                                <span>{{ allJetData['ligtJet']['crusingSpeed'] }} kts</span>
                            </li>
                            <li>Cruising Altitude
                                <span>{{ allJetData['ligtJet']['crusingAltitude'] }} </span>
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
                                <img alt="Image" src="/assets/images/aircraft/3-heavy/heavy/main.jpg"/>
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
                                href="/charter/assets/images/aircraft/3-heavy/heavy/main.jpg"
                                data-lg-size="1200-857">
                                <img ref="gallery3" alt="" src="/assets/images/aircraft/3-heavy/heavy/main.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/3-heavy/heavy/back.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/heavy/back.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/3-heavy/heavy/inside1.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/heavy/inside1.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/3-heavy/heavy/inside2.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/heavy/inside2.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/3-heavy/heavy/inside3.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/heavy/inside3.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/3-heavy/heavy/inside4.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/heavy/inside4.jpg"/>
                            </a>
                            <a
                                class="result-image"
                                href="/charter/assets/images/aircraft/3-heavy/heavy/inside5.jpg"
                                data-lg-size="1200-857">
                                <img alt="" src="/assets/images/aircraft/3-heavy/heavy/inside5.jpg"/>
                            </a>
                        </lightgallery>
                        <button @click="gallery3.click()" class="btn play-gallery">
                            <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                        </button>
                    </div>
                    <div class="jet-type-body">
                        <h4>Heavy jets</h4>
                        <ul>
                            <li>12-15 Passengers</li>
                            <li v-if="props.distance > allJetData['heaveJet']['maxNmRange']"><img src="/assets/images/svg/pump.svg" alt="icon"/>
                                {{ getFuelStop(allJetData['heaveJet']['maxNmRange'])}} Fuel stop</li>
                               
                        </ul>
                    </div>
                    <div class="jet-type-footer">
                        <ul class="jet-details">
                            <li>Sample Aircraft
                                <span>{{ allJetData['heaveJet']['sampleAitcraft'] }}</span>
                            </li>
                             <li>Est. Flight Distance
                                <span>{{ numberWithCommas(getFlightDistance()) }} nmiles</span>
                            </li>
                            <li>Est. Flight Time
                                <span>{{ getFlightTime(allJetData['heaveJet']['crusingSpeed'] , allJetData['heaveJet']['maxNmRange']) }}</span>
                            </li>
                            <li>Max Nm Range
                                <span>{{ numberWithCommas(allJetData['heaveJet']['maxNmRange']) }} nmiles</span>
                            </li>
                            <li>Cruising Speed
                                <span>{{ allJetData['heaveJet']['crusingSpeed'] }} kts</span>
                            </li>
                            <li>Cruising Altitude
                                <span>{{ allJetData['heaveJet']['crusingAltitude'] }}</span>
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
        <div id="chooseJetType" class="scrolled-view"></div>
    </div>
</template>

<script setup>
    import emitter from 'tiny-emitter/instance'
    import { ref } from 'vue'
    import { allJetData } from "./DefaultData"
    const gallery1 = ref(null)
    const gallery2 = ref(null)
    const gallery3 = ref(null)
    let checkedJet = ref([])
    let selectedTypes = []
   
    const props = defineProps({
            distance: String,
            tripType: String,
    })

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    function goToNext() {
        hj('event', 'success');
        emitter.emit('updateButtonType', {value :''});
        emitter.emit('updateSearch', {data : selectedTypes, path : 'selected-result', from : 'jettype'});
        // window.scrollBy(0, -200);
        setTimeout(function(){
            document.getElementById('selectedJetType').scrollIntoView({behavior: "smooth", block: "start"});
        },200);       
    }

    function getFuelStop(range){
        let distance =  props.tripType == 'round-trip' ? props.distance * 2 :  props.distance;
        return parseInt(distance / range);
    }

    function getFlightDistance(){
        let distance = props.distance ;
        // console.log(distance, 'full val');
        let ex=  distance%1  > 0 ? 1 : 0;
        // console.log(distance%1, 'rem');
        distance = parseInt(distance) + parseInt(ex);
        distance =  props.tripType == 'round-trip' ? distance * 2 : distance;
        return Math.round(distance);
    }

    function getFlightTime(speed, range){
        let distance = props.distance;
        distance = props.tripType == 'round-trip' ? props.distance * 2 :  props.distance;

        let sum = 0;
        let count = 0;
        let extraHour = 0;
        
        if(distance > range){
            let extraTimeTaken = distance / range;
            extraHour += parseInt(extraTimeTaken);
            // extraHour += extraTimeTaken%1  > 0 ? 1 : 0;
        }

        sum = parseFloat(((distance /speed) + extraHour).toFixed(2));
        
        let travelTime = sum ;
        let hour = parseInt(travelTime);
        let remining_minute = travelTime % 1;
        hour = parseInt(hour) + parseInt(remining_minute > 0 ? 1 : 0);
        travelTime =hour;
        return hour + ' hours';

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