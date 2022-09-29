<template>
    <div id="selectedJetType" class="selected-jet-wrapper">
        <div class="selected-jet-block">
            <div class="selected-jet-image light-gallery-wrapper">
                <swiper
                    class="result-gallery-top light-gallery"
                    :slides-per-view="1"
                    :space-between="0"
                    :modules="[Pagination]"
                    @slideChange="onSlideChange"
                    :pagination="props.data.aircraft.indexOf(',') != -1 ?true:false">
                    <SwiperSlide v-if="props.data.aircraft.indexOf(1) != -1" data-no="1">
                        <div class="result-image">
                            <img alt="Image" src="/assets/images/aircraft/1-turbo/main.jpeg"/>
                        </div>
                        <div class="gallery-text">
                            <h5>King Air 250</h5>
                            <p>7 Passengers
                                <span>&bull;</span>
                                Turbo Prop</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide v-if="props.data.aircraft.indexOf(2) != -1" data-no="2">
                        <div class="result-image">
                            <img alt="Image" src="/assets/images/aircraft/2-light-mid/Citation-XLS/front.jpg"/>
                        </div>
                        <div class="gallery-text">
                            <h5>Citation XLS</h5>
                            <p>8 Passengers
                                <span>&bull;</span>
                                Light - Super-midsize jets</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide v-if="props.data.aircraft.indexOf(3) != -1" data-no="3">
                        <div class="result-image">
                            <img alt="Image" src="/assets/images/aircraft/3-heavy/front.webp"/>
                        </div>
                        <div class="gallery-text">
                            <h5>Hawker 1000</h5>
                            <p>9 Passengers
                                <span>&bull;</span>
                                Heavy jets</p>
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
                            <h6>{{  getAircraftType(props.data.aircraft) }}
                            </h6>
                        </li>
                        <li>
                            <h5>Est Flight time</h5>
                            <h6>{{getAircraftSpeed(props.data.aircraft) }} hrs</h6>
                        </li>
                    </ul>
                </div>
                <div class="selected-jet-timing">
                    <div class="form-group">
                        <label>Departure Time</label>
                        <div class="select-unit">
                             <select name="" id="" required="" v-model="origin_time" @change="updateTime('origin')">
                                <option value="" disabled="" selected="" hidden="">12:00 AM</option>
                                <option :value="index" v-for="index in timeArray" :key="index" >{{index}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Arrival Time</label>
                        <div class="select-unit">
                             <select name="" id="" required="" v-model="departure_time"  @change="updateTime('destination')">
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
        distance:String
        })
    let flight_type = ref(0);
    let net_speed = ref(0);
    
    let s = props.data.origin_details.hours_diff;
    let d = props.data.destination_details.hours_diff;
    let hourDiff = getHourDiference(s, d);

    let isQuoteModelActive = ref(false);

    var x = 60; 
    var times = [];
    var tt = 0;
    var ap = [' AM', ' PM'];
    let aircraft = ['Turbo','Light','Heavy'];
    let speed = [420,445,517];
    let travelTime = 0;

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
        // return aircraft[val-1];
        let all = val.split(',');
        let empty = [];
        for(const key in all){
            empty.push(aircraft[(all[key] - 1)]);
        }
        return empty.join(', ');
    }

    function getAircraftSpeed(val){
        
        let all = val.split(',');
        console.log(all, props.distance, 'distance')
        let sum = 0;
        let count = 0;
        for(const key in all){
            sum += parseFloat((props.distance /speed[all[key] - 1]).toFixed(2));
            console.log(sum)
            count++;

        }
        travelTime = parseInt(sum / count);
        // console.log(sum, count, 'count');
        return travelTime;
    }


    const onSlideChange = (s) =>{
        let all = props.data.aircraft.split(',');
        flight_type.value = aircraft[all[s.activeIndex]-1];
        net_speed.value = (props.distance / speed[all[s.activeIndex]-1]).toFixed(2);
        
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

    function getTime(){
        
    }

     function updateTime(type){

      

        if(type === 'origin'){

            let time = origin_time.value;
            time = time.split(':');
            let type = time[1].indexOf('AM') == -1? 'PM':'AM';
            time = time[0];
            let orgTime = time;
            time = parseInt(time) + parseInt((type == 'AM' ? 0 : 12));

            console.log(time,'24format');
            let travellingTime = parseInt(time) + parseInt(travelTime) + hourDiff;
            console.log(travellingTime,'travellingTime');
            let newtime = parseInt(travellingTime);
            newtime = parseInt(newtime%24);
            console.log(newtime,'newtime');
            let newampm = newtime < 12 ?  'AM' : 'PM' ;
            newtime = newtime > 12 ? newtime - 12 : newtime;
            newtime = newtime == 0 ? 12 : newtime;
            let tt =("0" + (newtime)).slice(-2) + ':00 '+newampm ;
            console.log(tt,'tt');
            departure_time.value = tt;
            // let time = hourDiff + travelTime;

        }

        if(type === 'destination'){
            // let time = hourDiff + travelTime;

            let time = departure_time.value;
            time = time.split(':');
            let type = time[1].indexOf('AM') == -1? 'PM':'AM';
            time = time[0];
            let orgTime = time;
            time = parseInt(time) + parseInt((type == 'AM' ? 0 : 12));

            console.log(time,'24format');
            let travellingTime = parseInt(time) - parseInt(travelTime) - hourDiff;
            console.log(travellingTime,'travellingTime');
            let newtime = parseInt(travellingTime);
            newtime = parseInt(newtime%24);
            console.log(newtime,'newtime');
            let newampm = newtime < 12 ?  'AM' : 'PM' ;
            newtime = newtime > 12 ? newtime - 12 : newtime;
            newtime = newtime == 0 ? 12 : newtime;
            let tt =("0" + (newtime)).slice(-2) + ':00 '+newampm ;
            console.log(tt,'tt');
            origin_time.value = tt;

        }
    }

    function getHourDiference(s, d){

        let td = 0;
        
        // case 1 both are
        if(s > 0 && d > 0){
            if(s > d)
                td = (d-s);
            else if( d > s)
                td = (d-s);
        } else if (s <= 0 && d >= 0){
            td = Math.abs(s) + Math.abs(d);
        }else if(s > 0 && d <= 0){
            td = -1 * (Math.abs(s) + Math.abs(d));
        }else if(s <= 0 && d <= 0){
            if(Math.abs(s) > Math.abs(d))
                td = (Math.abs(s) - Math.abs(d));
            else if(Math.abs(s) < Math.abs(d))
                td = -1 * (Math.abs(d) - Math.abs(s));
        }
        return td;
    }

    

   
</script>

 
 