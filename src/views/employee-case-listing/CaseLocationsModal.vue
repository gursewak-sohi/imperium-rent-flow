<template>
   <div class="modal  show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLongTitle">Agent Locations</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="closeModal">
               <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <gmap-map
                    :center="center"
                    :zoom="10"
                    :streetViewControl="true"
                    style="width:100%;  height: 555px;">
                    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
      </gmap-info-window>
                    <gmap-marker
                        :key="index"
                        v-for="(gmp, index) in location"
                        :position="gmp"
                        @click="toggleInfoWindow(gmp,index)"
                    >
                    
                    </gmap-marker>
                </gmap-map>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="closeModal">Cancel</button>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator;   
   export default {
       data () {
          return {
             comment:'',
             center: { 
                lat: 39.7837304, 
                lng: -100.4458825 
            },
            locations: [],
            infoWindowPos: null,
            currentLocation: null,
            infoWinOpen: false,
            currentMidx: null,
            infoOptions: {
        	content: '',
            //optional: offset infowindow so it visually sits nicely on top of our marker
            pixelOffset: {
              width: 0,
              height: -35
            }
          },
              
          }
       },
       props:{
           location:{
               type: Array
           }
       },
       mounted() {
            this.setLocationLatLng();
        },
       validators: {
         comment: function(value) {
            return Validator.value(value).required('This field is required.');
         }
      },
       methods:{
           toggleInfoWindow: function(marker, idx) {
            this.infoWindowPos = {'lat':marker.lat,'lng':marker.lng};
            this.infoOptions.content = marker.label;

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = idx;

            }
          },
           closeModal(){
               this.$emit('closeModal', 'Value if required')
           },
           setPlace(loc) {
            this.currentLocation = loc;
            },
            setLocationLatLng: function() {

                console.log(this.location, 'My Locations');   
                navigator.geolocation.getCurrentPosition(geolocation => {
                    this.center = {
                        lat: geolocation.coords.latitude,
                        lng: geolocation.coords.longitude
                    };
                  });
            
                    
            }
       }
   
   }
</script>