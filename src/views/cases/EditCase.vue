<template>
<div class="overlay">
   <div class="modal  show bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display:block">
      <div class="modal-dialog modal-lg" role="document">
         <div class="modal-content">
           
            <div class="modal-body col-md-12">
               <div class="box_viewcase">
                  <h3 id="H1">
                     <span id="lblHeaderShowProfile">ViewCase : {{ case_data.reference_number}}</span>
                  </h3>
                  <table width="100%" border="0" cellspacing="0" cellpadding="3" class="FormTable">
                     <tbody>
                        <tr>
                           <td width="15%" align="left" style="font-weight: bold">
                              Application Number:
                           </td>
                           <td width="20%" style="background-color: White">
                              <span id="lblApplicationNo" >{{ case_data.reference_number}}</span>
                           </td>
                          
                        </tr>
                        <tr>
                           <td width="15%" align="left" style="font-weight: bold">
                              Organization :
                           </td>
                           <td width="20%" style="background-color: White">
                              <span id="lblCaseOrganization">{{case_data.company ? case_data.company.name : ''}}</span>
                           </td>
                           <td width="15%" align="left" style="font-weight: bold">
                              Assign To :
                           </td>
                           <td width="20%" style="background-color: White">
                              <span id="lblAssignTo">{{ agent_display_name  }}</span>
                           </td>
                        </tr>
                        <!-- <tr>
                           <td align="left" style="font-weight: bold">
                              Address  :
                           </td>
                           <td style="background-color: White">
                              <textarea class="form-control" name="txtAddress" rows="2" cols="20" id="txtAddress" v-model="residence_house_no">
                                 </textarea>
                           </td>
                           <td align="left" style="font-weight: bold">
                              City :
                           </td>
                           <td style="background-color: White">
                              <input class="form-control" name="txtCity" type="text" maxlength="250" v-model="residence_city">
                           </td>
                        </tr> -->
                        <!-- <tr>
                           <td align="left" style="font-weight: bold">
                              PinCode:
                           </td>
                           <td style="background-color: White">
                              <input class="form-control" name="txtBilZip" type="text" maxlength="250" v-model="res_pincode">
                           </td>
                           <td align="left" style="font-weight: bold">
                              Company Name :
                           </td>
                           <td style="background-color: White">
                              <input class="form-control" name="txtCompanyName" type="text" maxlength="250" id="txtCompanyName">
                           </td>
                        </tr> -->
                        <tr>
                           <td width="15%" align="left" style="font-weight: bold">
                              Status :
                           </td>
                           <td width="20%" style="background-color: White">
                              <span id="lblCaseStatus">{{ case_data.fb_status ? case_data.fb_status  : 'N/A'}}</span>
                           </td>
                           <td width="15%" align="left" style="font-weight: bold">
                              Sub Status :
                           </td>
                           <td width="25%" style="background-color: White">
                              <span id="lblCaseSubStatus">{{ case_data.fb_sub_status ? case_data.fb_sub_status:'N/A' }}</span>
                           </td>
                        </tr>
                        <tr>
                           <td width="15%" align="left" style="font-weight: bold">
                              Created Date :
                           </td>
                           <td width="20%" style="background-color: White">
                              <span id="lblCreatedDate">{{ case_data.created_at | moment( "dddd, MMMM Do YYYY, h:mm:ss a")}}</span>
                           </td>
                           <td width="15%" align="left" style="font-weight: bold">
                              Type of FI :
                           </td>
                           <td width="25%" style="background-color: White">
                              <span id="lblTypeOfFI">N/A</span>
                           </td>
                        </tr>
                        <tr>
                           <td colspan="4">
                              <div>
                                  <CCardBody>
                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('case_type')}">
                              <label for="bank" > Type <span class="required">*</span></label>
                              
                                 <select id="bank" class="form-control" v-model="case_type">
                                    <option value="0" > Select Type </option>
                                    <option value="bank" > Bank</option>
                                    <option value="miscellaneous" > Common </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('case_type') }}</small>
                              
                           </div>
                        </CCol>
                        <!-- misc_cat_list -->
                        <CCol :col="6" v-if="case_type == 'miscellaneous'">
                           <div role="group"  :class="{error: validation.hasError('selected_category')}">
                              <label for="bank" > Product <span class="required">*</span></label>
                              
                                 <select id="bank" class="form-control" v-model="selected_category" >
                                    <option value="0" > Select Product </option>
                                    <option :value="row.id" v-for="(row, index) in this.misc_cat_list" :key="index" v-html="row.name"> </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('selected_category') }}</small>
                              
                           </div>
                        </CCol>
                        
                     </CRow>

                     <CRow class="form-group" v-if="case_type == 'bank'">
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('bank')}">
                              <label for="bank" > Bank <span class="required">*</span></label>
                              
                                 <select id="bank" class="form-control" v-model="bank" @change="updateChildRoles($event)">
                                    <option value="0" > Select Bank </option>
                                    <option :value="row.id" v-for="(row, index) in this.bankList" :key="index"> {{ row.name}} </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('bank') }}</small>
                              
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('product')}">
                              <label for="product" > Product <span class="required">*</span></label>
                              
                                 <select id="product" class="form-control" v-model="product" >
                                    <option value="0" > Select Product </option>
                                    <option :value="row.id" v-for="(row, index) in this.productList" :key="index"> {{ row.name}} </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('bank') }}</small>
                              
                           </div>
                        </CCol>
                     </CRow>

                     <CRow class="form-group">
                        <CCol :col="6">
                           <!-- <div role="group">
                        <label > FL Type </label>
                       
                           <div role="group" class="form-check form-check-inline">
                              <input id="uid-7shkf4cf8hd" v-model="rv" type="checkbox" name="Option 1" class="form-check-input" value="1" @change="checkVal($event, 'rv')"/>RV
                           </div>
                           <div role="group" class="form-check form-check-inline">
                              <input id="uid-7shkf4cf8hd" v-model="bv" type="checkbox" name="Option 1" class="form-check-input" value="1" @change="checkVal($event, 'bv')" />BV
                           </div>
                        
                     </div> -->
                      <div role="group"  :class="{error: validation.hasError('product')}">
                              <label for="product" > FL Type <span class="required">*</span></label>
                              
                                 <select id="product" class="form-control" @change="changeCaseType" v-model="bv_or_rv" >
                                    <option value="0" > Select Type </option>
                                    <option value="rv"> RV</option>
                                    <option value="bv"> BV</option>
                                 </select>
                                 <!-- <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('product') }}</small> -->
                              
                           </div>
                          
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('reference_number')}">
                        <label for="f_n" > Reference Number <span class="required">*</span></label>
                        
                           <input id="reference_number" type="text" v-model="reference_number" placeholder="Enter Reference Number..."   class="form-control">
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('reference_number') }}</small>
                        
                     </div>
                           
                        </CCol>
                     </CRow>

                     

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('applicant_name')}">
                              <label for="f_n" >Applicant Name<span class="required">*</span></label>                              
                                 <input id="applicant_name" type="text" v-model="applicant_name" placeholder="Enter Applicant Name..."   class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('applicant_name') }}</small>                              
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" >
                              <label for="f_n" >DOB</label>                              
                              <input id="dob" type="text" v-model="dob" placeholder="Enter DOB..."   class="form-control">                              
                           </div>
                        </CCol>
                     </CRow>

                     

                     
                     <!-- ------ -->

                     <CRow class="form-group" v-if="this.rv">
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('residence_house_no')}" >
                              <label for="f_n" > Residence House No <span class="required">*</span></label>
                              <input id="residence_house_no" type="text" v-model="residence_house_no" placeholder="Residence House No..."   class="form-control">
                              <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('residence_house_no') }}</small>
                           </div>
                          
                        </CCol>
                        <CCol :col="6">
                            <div role="group"  :class="{error: validation.hasError('residence_colony_details')}" >
                              <label for="f_n" > Residence Colony Details<span class="required">*</span></label>                              
                                 <input id="residence_colony_details" type="text" v-model="residence_colony_details" placeholder="Enter Residence Colony Details..."   class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('residence_colony_details') }}</small>                           
                           </div>
                           
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('residence_city')}" >
                              <label for="f_n" > Residence City<span class="required">*</span></label>                              
                                 <input id="residence_city" type="text" v-model="residence_city" placeholder="Enter Residence City..."   class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('residence_city') }}</small>                              
                           </div>
                           
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  >
                              <label for="f_n" > Residence Phone Number</label>                              
                                 <input id="residence_phone_number" type="text" v-model="residence_phone_number" placeholder="Enter Residence Phone Number..."   class="form-control">                           
                           </div>
                           
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  >
                              <label for="f_n" > Residence LandMark</label>                              
                                 <input id="residence_landmark" type="text" v-model="residence_landmark" placeholder="Enter Residence LandMark..."   class="form-control">                           
                           </div>
                           
                        </CCol>
                     </CRow>
                     
                     
                     
                     <!-- Rv ends Here -->

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" :class="{error: validation.hasError('business_house_number')}" v-if="this.bv">
                              <label for="f_n" > Business House No<span class="required">*</span></label>                        
                              <input id="business_house_number" type="text" v-model="business_house_number" placeholder="Enter Business House No..."   class="form-control">
                              <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('business_house_number') }}</small>
                           </div>                          
                        </CCol>
                        <CCol :col="6">
                           <div role="group" :class="{error: validation.hasError('business_colony_details')}"  v-if="this.bv">
                              <label for="f_n" > Business Colony Details<span class="required">*</span></label>                        
                              <input id="business_colony_details" type="text" v-model="business_colony_details" placeholder="Enter Business Colony Details..."   class="form-control">
                              <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('business_colony_details') }}</small>
                           </div>                           
                        </CCol>
                        <CCol :col="6">
                           <div role="group" :class="{error: validation.hasError('business_city')}" v-if="this.bv">
                              <label for="f_n" > Business City<span class="required">*</span></label>
                              <input id="business_city" type="text" v-model="business_city" placeholder="Enter Business City..."   class="form-control">
                              <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('business_city') }}</small>
                           </div>                           
                        </CCol>
                        <CCol :col="6">
                           <div role="group" v-if="this.bv" >
                              <label for="f_n" > Business Phone Number</label>
                              <input id="business_phone_number" type="text" v-model="business_phone_number" placeholder="Enter Business Phone Number..."   class="form-control">                        
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  v-if="this.bv">
                              <label for="f_n" >Business LandMark</label>                        
                              <input id="business_landmark" type="text" v-model="business_landmark" placeholder="Enter Business LandMark..."   class="form-control">
                           </div>                            
                        </CCol>
                     </CRow>
                     
                     <!-- ---- -->

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group"  >
                              <label for="f_n" >Amount</label>
                                 <input id="amount" type="text" v-model="amount" placeholder="Enter Amount..."   class="form-control">
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  >
                              <label for="f_n" >Vehicle</label>
                                 <input id="vehicle" type="text" v-model="vehicle" placeholder="Enter Vehicle..."   class="form-control">
                           </div>
                        </CCol>
                     </CRow>
                     
                     

                     

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" >
                        <label for="f_n" >Co-Applicant Name<span class="required">*</span></label>
                           <input id="co_applicant_name" type="text" v-model="co_applicant_name" placeholder="Enter Co-Applicant Name..."   class="form-control">
                     </div>
                          
                        </CCol>
                        <CCol :col="6">
                           <div role="group" >
                        <label for="f_n" >Guarantee Name<span class="required">*</span></label>
                           <input id="guarantee_name" type="text" v-model="guarantee_name" placeholder="Enter Guarantee Name..."   class="form-control">
                     </div>
                           
                        </CCol>
                     </CRow>
                     
                     
                     
                     

                     <CRow class="form-group">
                        <CCol :col="6">
                           <!-- <div >
                              <label class="col-form-label col-sm-5"> Single Agent </label>
                                 <div role="group" class="form-check form-check-inline">
                                    <input id="uid-7shkf4cf8hd" v-model="single_agent" type="checkbox" name="Option 1" class="form-check-input" value=""/>
                              </div>
                           </div> -->
                           <div role="group" >
                              <label for="rv_agent" > Single Agent  <span class="required">*</span></label>
                                 <select id="rv_agent" class="form-control" v-model="single_agent" >
                                    <option :value="false" > No</option>
                                    <option :value="true" selected> Yes</option>
                                 </select>
                                 
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('agent')}" v-if="this.single_agent">
                              <label for="agent" > Agent <span class="required">*</span></label>
                                 <select id="agent" class="form-control" v-model="agent" >
                                    <option value="0" > Select agent </option>
                                    <option :value="row.id"  v-for="(row, index) in agent_list" :key="index"> {{row.first_name+' '+row.last_name}} </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('agent') }}</small>
                           </div>
                        </CCol>
                     </CRow>
                     

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('rv_agent')}"  v-if="!this.single_agent && this.rv">
                              <label for="rv_agent" > RV Agent  <span class="required">*</span></label>
                                 <select id="rv_agent" class="form-control" v-model="rv_agent" >
                                    <option value="0" > Select RV Agent </option>
                                    <option :value="row.id"  v-for="(row, index) in agent_list" :key="index"> {{row.first_name+' '+row.last_name}} </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('rv_agent') }}</small>
                           </div>
                          
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('bv_agent')}"  v-if="!this.single_agent && this.bv">
                              <label for="bv_agent" > BV Agent <span class="required">*</span></label>
                                 <select id="bv_agent" class="form-control" v-model="bv_agent" >
                                    <option value="0" > Select BV Agent </option>
                                    <option :value="row.id"  v-for="(row, index) in agent_list" :key="index"> {{row.first_name+' '+row.last_name}} </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('bv_agent') }}</small>
                           </div>
                        </CCol>
                     </CRow>
                     
                     
                     

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('geo_limit')}">
                              <label for="geo_limit" > Geo Limit<span class="required">*</span></label>
                                 <select id="geo_limit" class="form-control" v-model="geo_limit" >
                                    <option value="0" > Select Geo Limit </option>
                                    <option value="local" >Local</option> 
                                    <option value="outstation" > Outstation</option>                              
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('geo_limit') }}</small>
                           </div>
                          
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  >
                              <label for="tat_time" > TAT Time <span class="required">*</span></label>
                                 <select id="tat_time" class="form-control" v-model="tat_time" >
                                    <option value="0" > Select Time </option>
                                    <option :value="row" v-for="(row, index) in this.tat_time_list" :key="index">{{row}} </option>
                                 </select>
                           </div>
                        </CCol>
                     </CRow>
                     
                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group">
                              <label for="f_n" >Remarks<span class="required">*</span></label>
                                 <input id="remark" type="text" v-model="remark" placeholder="Enter Reference Number..."   class="form-control">
                           </div>
                        </CCol>
                        <CCol :col="6">

                           <div role="group"  >
                              <label for="tat_time" > Status <span class="required"></span></label>
                                 <select  class="form-control" v-model="status">
                                 <option value="0" > Select Type </option>
                                 
                                 <option value="requested"> Requested</option>
                                 <option value="accepted"> Accepted </option>
                                 <option value="in-progress"> In-Progress </option>
                                 <option value="submited"> Submited </option>
                                 <option value="completed"> Completed </option>
                              </select>
                           </div>

                           
                        </CCol>
                     </CRow>
                    
                  </CCardBody>
                              </div>
                           </td>
                        </tr>
                        
                     </tbody>
                  </table>
               </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="checkValidation">Update</button>
               <button type="button" class="btn btn-danger" data-dismiss="modal" v-on:click="closeModal">Close</button>
            </div>
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
            user_id:0,
            case_data:[],
            allRoles:[],
            agent_display_name:'',
            res_pincode:'',


         bank:'',
         product:'',
         rv:'',
         bv:'',
         reference_number:'',
         applicant_name:'',
         dob:'',
         residence_house_no:'',
         residence_colony_details:'',
         residence_city:'',
         residence_phone_number:'',
         residence_landmark:'',
         business_house_number:'',
         business_colony_details:'',
         business_city:'',
         business_phone_number:'',
         business_landmark:'',
         amount:'',
         vehicle:'',
         co_applicant_name:'',
         guarantee_name:'',
         single_agent:true,
         agent:'',
         rv_agent:'',
         bv_agent:'',
         geo_limit:'',
         tat_time:'',
         remark:'',
         case_type:'',
         status:'accepted',
         
         role_id_list:[],
         company_list:[],
         request_in_progress:0,
         alertMsgShow:false,
         alertMsg:'',
         responseStatus:1,
         bankList:[],
         productList:[],
         misc_cat_list:[],
         tat_time_list:[],
         agent_list:[],
         selected_category:'',
         case_id:0,

         all_agents:[],
         selected_organisation:'-1',
         selected_case_type:'-1',
         employee_case_list: [],
         all_agents:[],
         all_case_type:[],
          selected_agents:'-1',
         start_date:new Date(),
         end_date:new Date(),
         organisation_list:[],
          bv_or_rv:'0'
                     
         }
      },
      props:{
         currenSelectedCase:{
            type: Number
         }
      },
       validators: {
         reference_number: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         applicant_name: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         geo_limit: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         case_type: function(value) {
            return Validator.value(value).required('This field is required.');
         }         
      },
      created(){         
         axios.get("https://severify.com/api/bank/list-all")
            .then(response => {this.bankList = response.data.data;});
         axios.get("https://severify.com/api/company/list-all")
            .then(response => {this.company_list = response.data.data;});

         axios.get("https://severify.com/api/custom-category")
            .then(response => { this.misc_cat_list = response.data.data; });

         axios.get("https://severify.com/api/user/list-all")
            .then(response => {this.agent_list = response.data.data;});

            for(let i=0;i <= 23;i++){
               for(let j = 0;j <= 11; j++){
                  let time =("0" + i).slice(-2)+':'+("0" + (j*5)).slice(-2);
                  this.tat_time_list.push(time);

               }
            }

      },
      mounted(){
         this.getMyCaseDetails();
         this.user_id = this.currenSelectedCase;
      },
      methods:{
         getMyCaseDetails(){            
            let vm = this;
            this.$loading.show({delay:0})
            axios.get('https://severify.com/api/cases/get-my-case?id='+this.currenSelectedCase)
               .then(function (response) {
                  vm.$loading.hide();
                  vm.case_data = response.data.data[0];
                  vm.setData(vm.case_data);
                  let tat = vm.case_data.tat_time.split(':');
                  vm.tat_hour = tat[0]?tat[0]:0;
                  vm.tat_minute = tat[1]?tat[1]:0;
                  console.log('I am a hit', vm.case_data);
            })
            .catch(function (error) {
               console.log(error);
            });
         },
         updateChildRoles(event){
            let bank_id = event.target.value;
            this.product = '';
            let vm = this;
            this.productList = [];
            this.bankList.forEach(element => {
               if(element.id == bank_id){
                  vm.productList = element.products;
               }
            });
         },
         initalProduct(bank_id){
            console.log(bank_id, 'bank_id');
            
            this.product = '';
            let vm = this;
            this.productList = [];
            this.bankList.forEach(element => {
               if(element.id == bank_id){
                  vm.productList = element.products;
                  console.log(vm.productList, 'vm.productList');
               }
            });
         },
         setData(item){
               let vm  = this;
               this.case_type = item.case_type;
               this.selected_category = item.category_type_id;
               this.bank =item.bank_id;
               this.initalProduct(item.bank_id);
               setTimeout(function(){
                  vm.product = item.product_id;
               },1000);
               
               let fl_type = item.fl_type ;

               this.rv = fl_type == 'rv'? true:false;
               this.bv = fl_type == 'bv'? true:false;
               this.reference_number = item.reference_number;
               this.applicant_name = item.applicant_name;
               this.dob = item.dob;
               this.residence_house_no = item.residence_house_no;
               this.residence_colony_details = item.residence_colony_details;
               this.residence_city = item.residence_city;
               this.residence_phone_number = item.residence_phone_number;
               this.residence_landmark = item.residence_landmark;
               this.business_house_number = item.business_house_number;
               this.business_colony_details = item.business_colony_details;
               this.business_city = item.business_city;
               this.business_phone_number = item.business_phone_number;
               this.business_landmark = item.business_landmark;
               this.amount = item.amount;
               this.vehicle = item.vehicle;
               this.co_applicant_name = item.co_applicant_name;
               this.guarantee_name = item.guarantee_name;
               console.log(item.single_agent , 'item.single_agent ');
               this.single_agent = item.single_agent == 1?true:false;
               this.agent = item.agent;
               this.rv_agent = item.rv_agent;
               this.bv_agent = item.bv_agent;
               this.geo_limit = item.geo_limit;
               this.tat_time = item.tat_time;
               this.remark = item.remark;
               this.case_id = item.id;
               this.status = item.status;
               this.agent = item.agent_id;
               this.showRoleModal=true;
               this.roleModal = 'edit';
         },
         closeModal(){
            this.resetForm();
            this.$emit('closeModal', 'Value if required')
         },
          checkValidation(){
             let vm = this;
             this.$validate()
               .then(function(success) {
                  if (success) {
                     vm.submitForm();
                  }
               });
          },
          resetForm(){            
            this.bank='';
            this.product='';
            this.rv='';
            this.bv='';
            this.reference_number='';
            this.applicant_name='';
            this.dob='';
            this.residence_house_no='';
            this.residence_colony_details='';
            this.residence_city='';
            this.residence_phone_number='';
            this.residence_landmark='';
            this.business_house_number='';
            this.business_colony_details='';
            this.business_city='';
            this.business_phone_number='';
            this.business_landmark='';
            this.amount='';
            this.vehicle='';
            this.co_applicant_name='';
            this.guarantee_name='';
            this.single_agent=true;
            this.agent='';
            this.rv_agent='';
            this.bv_agent='';
            this.geo_limit='';
            this.tat_time='';
            this.remark='';
            this.case_type='';
            this.case_id = 0;
            this.status = 'accepted';
            this.validation.reset();
         },
          submitForm(){
             
             let vm = this;
               this.request_in_progress = 1;
               let url = 'https://severify.com/api/cases/add';
               if(vm.roleModal == 'edit'){
                  url = 'https://severify.com/api/cases/update';
               }
   
               let request = {
                  user_id:this.user_id,
                  case_type:this.case_type,
                  selected_category: this.selected_category,
                  case_type:this.case_type,
                  bank_id:this.bank,
                  product_id:this.product,
                  rv:this.rv,
                  bv:this.bv,
                  reference_number:this.reference_number,
                  applicant_name:this.applicant_name,
                  dob:this.dob,
                  residence_house_no:this.residence_house_no,
                  residence_colony_details:this.residence_colony_details,
                  residence_city:this.residence_city,
                  residence_phone_number:this.residence_phone_number,
                  residence_landmark:this.residence_landmark,
                  business_house_number:this.business_house_number,
                  business_colony_details:this.business_colony_details,
                  business_city:this.business_city,
                  business_phone_number:this.business_phone_number,
                  business_landmark:this.business_landmark,
                  amount:this.amount,
                  vehicle:this.vehicle,
                  co_applicant_name:this.co_applicant_name,
                  guarantee_name:this.guarantee_name,
                  single_agent:this.single_agent,
                  agent:this.agent,
                   agent_id:this.agent,
                  rv_agent:this.rv_agent,
                  bv_agent:this.bv_agent,
                  geo_limit:this.geo_limit,
                  tat_time:this.tat_time,
                  remarks:this.remark,
                  status : this.status,
                  
                  case_id: this.case_id,
               };
               console.log(request);
               
               axios.post(url, request)
               .then(function (response) {
                  vm.request_in_progress = 0; 
                  vm.showRoleModal = false;
                  // vm.alertMsgShow = true;
                  // vm.alertMsg =  response.data.message; 
                  // vm.responseStatus =    response.data.status;

                  vm.$toast.open({
                     message:response.data.message,
                     type:response.data.status?'success':'error',
                     position:'top-right',
                     duration:3000,
                     dismissible:true
                  });                  
                  vm.closeModal();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          },
          changeCaseType(){
             console.log(this.bv_or_rv, '123')
            this.bv = 0;
            this.rv = 0;
             if(this.bv_or_rv == 0){
                this.bv = 0;
                this.rv = 0;

             }else if(this.bv_or_rv == 'rv'){
                this.bv = 1;
             }else{
                this.rv = 1;
             }
          }
      }
   
   }
</script>