<template>
   
         <div class="modal-content">
         
            <div class="">
               <table width="100%" border="0" cellspacing="0" cellpadding="0" class="FormTable">
                  <tbody>
                     <tr>
                        <td class="label">Bank :
                        </td>
                        <td class="value">
                           <select id="bank" class="form-control" v-model="bank">
                              <option value="0" > Select Bank </option>
                              <option :value="row.id" v-for="(row, index) in this.bankList" :key="index"> {{ row.name}} </option>
                           </select>
                        </td>
                     </tr>
                     <tr>
                        <td class="label">From :
                        </td>
                        <td class="value">
                           <div role="group" class="form-group">
                              <label for="conf_pass" > Start Date <span class="required">*</span></label>
                                 <!-- <input id="conf_pass" type="text" v-model="start_date" placeholder="Enter Confirm Password..."  required="required" class="form-control"> -->
                                 <datepicker v-model="start_date" name="uniquename" input-class="form-control"></datepicker>
                                
                                 
                           </div>
                        </td>
                     </tr>
                     <tr>
                        <td class="label">To :
                        </td>
                        <td class="value">
                           <div role="group" class="form-group">
                              <label for="conf_pass" class=""> End Date <span class="required">*</span></label>
                                 <!-- <input id="conf_pass" type="text" v-model="end_date" placeholder="Enter Confirm Password..."  required="required" class="form-control"> -->
                                 <datepicker v-model="end_date" name="uniquename" class="form-control" ></datepicker>
                                 
                           </div>
                        </td>
                     </tr>
                     
                  </tbody>
               </table>
                 

              
            </div>
            <div class="modal-footer">
               
               <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="fetchData1">Download Report</button>
            </div>
            <ReportListing @closeModal="closeChildModel" v-if="showListing" :json_data="json_data"/>
         </div>
      
</template>
<script>

   import axios from 'axios';
   import Datepicker from 'vuejs-datepicker';
   import ReportListing from './ReportListing.vue';
   export default {
      data () {
         return {  
            showListing:false,
            bank:'0',  
            product:'0',
            bankList:[],
            productList:[],
            start_date:new Date(),
            end_date:new Date(),
            show_download:false,
            json_data:[],
           json_fields: {
                     "Bank Name" : 'bank_name',
                     "Product Name" : 'product_name',
                     "Channel" : 'channel' ,
                     "Reference Number" : 'reference_number' ,
                     "Name" : 'applicant_name' ,
                     "Rectdt" : 'created_at' , 
                     "CPV Type" : 'file_type' ,
                     "Address Resi" : 'resi_address' ,
                     "City Resi" : 'residence_city' ,
                     "Address Office" : 'business_resi',
                     " City Office" : 'business_city',
                     "RV Agent" : 'rv_agent_name',
                     "BV Agent" : 'bv_agent_name',
                     "Milage" : 'mileage',
                     "Geo Limit" : 'geo_limit',
                     "Status RV" : 'status_rv',
                     "Status BV" : 'status_bv',
                     "Rate" : 'rate' ,
                     "Loan Amount" : 'loan_amount',
                     "Name Of Vehicle" : 'vehicle',
                     "Negative RV Status" : 'negative_rv_status' ,
                     "Negative BV Status" : 'negative_bv_status' ,
                     "Resi Visit Remark" : 'resi_visit_remark' ,
                     "Biz isit Remark" : 'Biz_Visit_remark' ,
                     "RV Image Avaiable" : 'rv_image_available',
                     "BV Image Available" : 'bv_image_available' ,
                     "RV Final Status" : 'rv_final_status' ,
                     "RV Final Comment" : 'rv_final_comment' ,
                     "BV Final Status" : 'bv_final_status',
                     "BV Final Comment" : 'bv_final_comment' ,
                     "Distance From Office" : 'distance_from_office',
                     "Pin Code As Per Agent Location" : 'pin_code_as_per_agent_location'
                },
                json_data: [
                   
                ],
                
         }
     },
     components: {
        ReportListing,
   Datepicker
   },
      created(){    
          axios.get("https://severify.com/api/bank/list-all")
           .then(response => {this.bankList = response.data.data;});       
      },
      methods:{
         async fetchData(){
            const response = await axios.get('https://holidayapi.com/v1/holidays?key=a4b2083b-1577-4acd-9408-6e529996b129&country=US&year=2017&month=09');
            console.log(response);
            return response.data.holidays;
         },
         startDownload(){
            alert('show loading');
         },
         finishDownload(){
            alert('hide loading');
         },
         closeChildModel(){
            this.showListing = false;
        },
         
        fetchData1(){
            this.show_download = false;
            this.$loading.show({delay:0}) 

            let startDate = new Date(this.start_date);
           let smonth = startDate.getMonth() + 1;
           let syear = startDate.getFullYear();
           let sday = startDate.getDate();
           let sd = syear+'-'+(smonth <= 9 ? '0'+smonth:smonth)+'-'+(sday <= 9 ? '0'+sday:sday);
           let vm  = this;

           let endDate = new Date(this.end_date);
           let emonth = endDate.getMonth() + 1;
           let eyear = endDate.getFullYear();
           let eday = endDate.getDate();
           let ed = eyear+'-'+(emonth <= 9 ? '0'+emonth:emonth)+'-'+(eday <= 9 ? '0'+eday:eday);
           console.log(sd, ed);

            let formData = new FormData();
            formData.append('product', this.bank);
            formData.append('from', sd+ ' 00:00:00');
            formData.append('to', ed+ ' 23:59:00');
            formData.append('type', 'pending');
            axios.post( 'https://severify.com/api/cases/report',
                formData
                ).then(function(data){
                  vm.$loading.hide();
                  vm.json_data = data.data.data;
                  if(vm.json_data.length > 0){
                     vm.showListing = true;
                  }else{
                      vm.$toast.open({                  
                     message:'No result found',
                     type:'error',
                     position:'top-right',
                     duration:3000,
                     dismissible:true
                  });
                  }
                })
                .catch(function(){
                console.log('FAILURE!!');
                });
        }
      }   
   }
</script>