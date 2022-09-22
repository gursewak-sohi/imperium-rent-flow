<template>
    <div id="selectedJetType" class="selected-jet-wrapper">
        <div class="selected-jet-block">
            <div class="selected-jet-image light-gallery-wrapper">
                <lightgallery
                    class="hidden"
                    :settings="{
                        speed: 500,
                        download: false,
                        zoom: false,
                        mobileSettings: {
                            controls: true,
                            showCloseIcon: true,
                        },
                        plugins: plugins }"
                    :onInit="onInit"
                    :onBeforeSlide="onBeforeSlide">
                    <a
                        class="result-image"
                        href="/assets/images/home/gallery/3.jpg"
                        data-lg-size="1200-857">
                        <img ref="gallery4" alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
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
                <swiper
                    class="result-gallery-top light-gallery"
                    :slides-per-view="1"
                    :space-between="0"
                    :modules="[Pagination]"
                    :pagination="true">
                    <SwiperSlide>
                        <div class="result-image">
                            <img alt="Image 1" src="/assets/images/home/gallery/3.jpg"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="result-image">
                            <img alt="Image 1" src="/assets/images/home/gallery/2.jpg"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="result-image">
                            <img alt="Image 1" src="/assets/images/home/gallery/1.jpg"/>
                        </div>
                    </SwiperSlide>
                </swiper>
                <button @click="gallery4.click()" class="btn play-gallery">
                    <img src="/assets/images/svg/gallery-btn.svg" alt="icon"/>
                </button>
                <div class="gallery-text">
                    <h5>PILATUS PC-12/45</h5>
                    <p>8 Passengers
                        <span>&bull;</span>
                        Light</p>
                </div>
            </div>
            <div class="selected-jet-content">
                <div class="selected-jet-description">
                    <ul>
                        <li>
                            <h5>Departure Airport</h5>
                            <h6>Ben Gurion Intl (TLV)
                            </h6>
                        </li>
                        <li>
                            <h5>Arrival Airport</h5>
                            <h6>Ben Gurion Intl (TLV)
                            </h6>
                        </li>
                        <li>
                            <h5>Passangers</h5>
                            <h6>4
                            </h6>
                        </li>
                        <li>
                            <h5>Aircraft Type</h5>
                            <h6>Light, Heavy
                            </h6>
                        </li>
                        <li>
                            <h5>Est Flight time</h5>
                            <h6>4:00 hrs</h6>
                        </li>
                    </ul>
                </div>
                <div class="selected-jet-timing">
                    <div class="form-group">
                        <label>Departure Time</label>
                        <div class="select-unit">
                             <select name="" id="" required="" v-model="origin_time">
                                <option value="" disabled="" selected="" hidden="">00:00 AM</option>
                                <option value="index + ' PM'" v-for="index in timeArray" :key="index" >{{index}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Arrival Time</label>
                        <div class="select-unit">
                             <select name="" id="" required="" v-model="departure_time">
                                <option value="" disabled="" selected="" hidden="">00:00 AM</option>
                                <option value="index + ' PM'" v-for="index in timeArray" :key="index" >{{index}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="timing-buttons">
                        <button
                            id="selectedJetBackBtn"
                            type="button"
                            class="btn btn-dark-outline btn-md"
                            @click="goToPre()">Back</button>
                        <button
                            @click="getQuote()"
                            id="getQouteBtn"
                            type="button"
                            class="btn btn-primary btn-iconed-lg btn-md">Get Quote
                            <img src="/assets/images/svg/next.svg" alt="icon"/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

    import QuoteModel from './QuoteModel.vue'
    import ConfirmModel from './ConfirmModel.vue'
    import emitter from 'tiny-emitter/instance'
    import { Pagination } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import {ref, reactive} from 'vue'
    import 'swiper/css';

    import 'swiper/css';
    const gallery4 = ref(null);
    let origin_time = ref('');
    let departure_time = ref('');

    let isQuoteModelActive = ref(false);

    var x = 60; 
    var times = [];
    var tt = 0;
    var ap = [' AM', ' PM'];

    for (var i=0;tt<24*60; i++) {
        var hh = Math.floor(tt/60); 
        var mm = (tt%60);
        times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; 
        tt = tt + x;
    }

    const timeArray = ref(times);
    function goToNext() {
        emitter.emit('updateSearch', {
            data: {},
            path: 'selected-result',
            from : 'selected-jet'
        });
    }

    function goToPre(){
         emitter.emit('updateSearch', {
            data: {},
            path: 'filter-result', 
            from : 'selected-jet'
        });
    }

    function getQuote(){
        emitter.emit('openQuoteMOdel', true);
    }

    function updateTime(){
        // alert('32');
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
            },
            onBeforeSlide: () => {
                console.log('calling before slide');
            }
        }
    };
</script>

<style lang="css" scoped>
    @import 'lightgallery/css/lightgallery.css';
    @import 'lightgallery/css/lg-thumbnail.css';
    @import 'lightgallery/css/lg-zoom.css';
</style>