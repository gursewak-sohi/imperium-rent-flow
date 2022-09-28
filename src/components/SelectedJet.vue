<template>
    <div id="selectedJetType" class="selected-jet-wrapper">
        <div class="selected-jet-block">
            <div class="selected-jet-image light-gallery-wrapper">
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
                        <div class="gallery-text">
                            <h5>PILATUS PC-12/45</h5>
                            <p>8 Passengers
                                <span>&bull;</span>
                                Light</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="result-image">
                            <img alt="Image 1" src="/assets/images/home/gallery/2.jpg"/>
                        </div>
                        <div class="gallery-text">
                            <h5>PILATUS PC-12/45</h5>
                            <p>8 Passengers
                                <span>&bull;</span>
                                Light</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div class="result-image">
                            <img alt="Image 1" src="/assets/images/home/gallery/1.jpg"/>
                        </div>
                        <div class="gallery-text">
                            <h5>PILATUS PC-12/45</h5>
                            <p>8 Passengers
                                <span>&bull;</span>
                                Light</p>
                        </div>
                    </SwiperSlide>
                </swiper>
                
            </div>
            <div class="selected-jet-content">
                <div class="selected-jet-description">
                    <ul>
                        <li>
                            <h5>Departure Airport</h5>
                            <h6>{{ props.data.origin}}
                            </h6>
                        </li>
                        <li>
                            <h5>Arrival Airport</h5>
                            <h6>{{ props.data.dest }}
                            </h6>
                        </li>
                        <li>
                            <h5>Passangers</h5>
                            <h6>{{ props.data.pax}}
                            </h6>
                        </li>
                        <li>
                            <h5>{{props.data.aircraft.indexOf(',') != -1 ? 'Aircraft Types' : 'Aircraft Type'}}</h5>
                            <h6>{{ getAircraftType(props.data.aircraft)}}
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
                                <option value="" disabled="" selected="" hidden="">12:00 AM</option>
                                <option :value="index" v-for="index in timeArray" :key="index" >{{index}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Arrival Time</label>
                        <div class="select-unit">
                             <select name="" id="" required="" v-model="departure_time">
                                <option value="" disabled="" selected="" hidden="">12:00 AM</option>
                                <option :value="index" v-for="index in timeArray" :key="index" >{{index}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="timing-buttons">
                        <button
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
    let origin_time = ref('');
    let departure_time = ref('');

    const props = defineProps({
        data: Object,
        })

    let isQuoteModelActive = ref(false);

    var x = 60; 
    var times = [];
    var tt = 0;
    var ap = [' AM', ' PM'];
    let aircraft = ['Turbo','Light','Heavy'];

    for (var i=0;tt<24*60; i++) {
        var hh = Math.floor(tt/60); 
        var mm = (tt%60);
        let hour = hh % 12;
        times[i] = ("0" + ((hour == 0 ? 12 : hour))).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)]; 
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

    function getAircraftType(val){
        let all = val.split(',');
        let empty = [];
        for(const key in all){
            empty.push(aircraft[(all[key] - 1)]);
        }
        return empty.join(', ');
    }

    function goToPre(){

         emitter.emit('updateButtonType', {value :'change'});
         emitter.emit('updateSearch', {
            data: {},
            path: 'filter-result', 
            from : 'selected-jet'
        });
    }

    function getQuote(){
        emitter.emit('updateSearch', {
            data: {at : origin_time.value, dt : departure_time.value},
            path: '',
            from : 'selected-jet-data'
        });
        emitter.emit('openQuoteMOdel', true);
    }

    function updateTime(){
        // alert('32');
    }
</script>

 
 