<template>
   <div>
      <CCard>
         
         
         
            <CCard>
               <CForm novalidate>
                  <CCardBody>
                     <CRow class="form-group">
                        <CCol :col="12" v-if="user_auth_role == 'super_admin'">
                            <div role="group " class="form-group" >
                              <label for="role_group" > Organisation </label>
                              <select id="role_group" class="form-control" v-model="selected_organisation_for_case" @change="updateEmployee" >
                                 <option value="0" selected> Select Organisation </option>
                                 <option  :value="row.id" v-for="(row, index) in organisation_list" :key="index" > {{ row.name}} </option>
                                 
                              </select>
                              
                           </div>
                        </CCol>
                        <CCol :col="12">
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
                        <CCol :col="12" v-if="case_type == 'miscellaneous'">
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
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('product') }}</small>
                              
                           </div>
                        </CCol>
                     </CRow>

                     <CRow class="form-group">
                        <CCol :col="6">
                            <div role="group"  >
                              <label for="product" > FL Type <span class="required">*</span></label>
                             <CInputCheckbox
                                 key="1"
                                 label="RV"
                                 :value="true"
                                 :name="`RV`"
                                 :inline="false"
                                 @click="changeCaseType('rv')"
                              />

                              <CInputCheckbox
                                 key="2"
                                 label="BV"
                                 :value="true"
                                 :name="`BV`"
                                 :inline="false"
                                 @click="changeCaseType('bv')"
                              />
                               <small class="form-text text-muted w-100 err-msg">{{ type_error }}</small>
                              
                                 <!-- <select id="product" class="form-control" @change="changeCaseType" v-model="bv_or_rv" >
                                    <option value="0" > Select Type </option>
                                    <option value="rv"> RV</option>
                                    <option value="bv"> BV</option>
                                 </select> -->
                              
                           </div>
                          
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('reference_number')}">
                                 <label for="f_n" > Reference Number  <span class="required">*</span></label>
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


                     <CRow class="form-group" v-if="this.rv === true">
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
                        <label for="f_n" >Co-Applicant Name</label>
                           <input id="co_applicant_name" type="text" v-model="co_applicant_name" placeholder="Enter Co-Applicant Name..."   class="form-control">
                            <!-- <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('co_applicant_name') }}</small> -->
                     </div>
                          
                        </CCol>
                        <CCol :col="6">
                           <div role="group" >
                        <label for="f_n" >Guarantee Name</label>
                           <input id="guarantee_name" type="text" v-model="guarantee_name" placeholder="Enter Guarantee Name..."   class="form-control">
                            <!-- <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('guarantee_name') }}</small> -->
                     </div>
                           
                        </CCol>
                     </CRow>
                     
                     
                     
                     

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" >
                              <label for="rv_agent" > Single Agent<span class="required">*</span></label>
                                 <select id="rv_agent" class="form-control" v-model="single_agent" >
                                    <option :value="false" > No</option>
                                    <option :value="true"> Yes</option>
                                 </select>
                                 
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group"  :class="{error: validation.hasError('agent')}" v-if="this.single_agent">
                              <label for="agent" > Agent <span class="required">*</span></label>
                                 <select id="agent" class="form-control" v-model="agent" >
                                    <option value="0" > Select agent </option>
                                    <option :value="row.id"  v-for="(row, index) in selected_agent" :key="index"> {{row.full_name}} </option>
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
                           <div role="group"   :class="{error: validation.hasError('tat_time')}">
                              <label for="tat_time" > TAT Time <span class="required">*</span></label>
                                 <select id="tat_time" class="form-control" v-model="tat_time" >
                                    <option value="0" > Select Time </option>
                                    <option :value="row" v-for="(row, index) in this.tat_time_list" :key="index">{{row}} </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('tat_time') }}</small>
                           </div>
                        </CCol>
                     </CRow>
                     
                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group">
                              <label for="f_n" >Remarks</label>
                                 <input id="remark" type="text" v-model="remark" placeholder="Enter Reference Number..."   class="form-control">
                           </div>
                        </CCol>
                        <CCol :col="6" style="display:none"> 

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
               </CForm>
            </CCard>
            
            <CRow style="padding:10px">
                <CCol style="float:right">
                    <CButtonClose @click="showRoleModal = false" class="text-white"/>
         
         
               <CButton @click="closeForm" color="danger"  :disabled='request_in_progress == 1' class="create-case"> <CIcon name="cil-delete"/>Cancel</CButton>
               
                
                <CButton  @click="checkValidation" class="create-case"  color="primary" v-if="!request_in_progress">
                  <CIcon name="cil-check-circle"/>
                  Save
               </CButton>
                    
                </CCol>
            
            
                
            </CRow>
            
               
               <div class="spinner-border text-primary" role="status" v-if="request_in_progress">
                  <span class="sr-only">Loading...</span>
               </div>
           
     

         
      </CCard>
   </div>
</template>
<script>
   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator;
   import Datepicker from 'vuejs-datepicker';
   
   export default {
     name: 'Employees',
     data () {
       return {
          selected_organisation_for_case:'0',
          selected_agent:[],
         user_type:'all',
         user_auth_role:'',
         employee_case_list: [],
         role_group:[],
         organisation_list:[],
         all_case_type:[],
         selected_agents:'0',
         start_date:new Date(),
         end_date:new Date(),
         sd:'',
         ed:'',
         showMapModal:false,
         location : [],
         total_unassigned_cases:0,
         dead_cases:0,

         // Start End
         roleModal: '',
         showRoleModal:true,
         user_id:0,
         allList:[],
         allRoles:[],
         bank:'0',
         product:'0',
         rv:false,
         bv:false,
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
         agent:'0',
         rv_agent:'',
         bv_agent:'',
         geo_limit:'0',
         tat_time:'0',
         remark:'',
         case_type:'bank',
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
         selected_category:'0',
         case_id:0,

         all_agents:[],
         selected_organisation:'0',
         selected_case_type:'0',
         employee_case_list: [],
         all_case_type:[],
          selected_agents:'0',
         start_date:new Date(),
         end_date:new Date(),
         filter_type:'',
         organisation_list:[],

         
         currenSelectedCase:'',
         viewCase:false,
         editCaseShow:false,
         viewFormShow:false,
         addFinalStatusShow:false,
         editResponseShow:false,
         caseHistoryShow:false,
         assignCaseShow:false,
         addCommentShow:false,
         getCloneShow:false,
         verifyCaseShow:false,
         uploadImagesShow:false,
         downloadExcelShow:false,
         searchText:'',
         bv_or_rv:'0',
         type_error:''

       }
     },
   
     components: { 
        Datepicker
      },
      validators: {
         'bank, case_type':function(bank, case_type){
            if(case_type != 'bank'){
               return;
            }else{
               return Validator.custom(function () {
                  if ( bank == '0' ) {
                     
                     return 'Please select valid option.';
                  }
               });
            }
         },
         'product, case_type':function(product, case_type){
            if(case_type != 'bank'){
               return;
            }else{
               return Validator.custom(function () {
                  if ( product == '0') {
                     return 'Please select valid option.';
                  }
               });
            }
         },
         'selected_category, case_type':function(selected_category, case_type){
            if(case_type != 'miscellaneous'){
               return;
            }else{
               return Validator.custom(function () {
                  if ( selected_category == '0') {
                     return 'Please select valid option.';
                  }
               });
            }
         },
         reference_number: {
            cache: true,
            debounce: 200,
            validator: function (value) {
               let vm = this;
               if(value){
                  return Validator.value(value).required('This field is required.').maxLength(50).custom(function () {
                     if (!Validator.isEmpty(value)) {
                        return axios.post(process.env.VUE_APP_BASE_URL+`check-reference-number`, {type:'add',  reference_number:value})
                        .then(response => {
                           if (!response.data.status) {
                              return 'Already taken!';
                           }
                        });                  
                     }
                  });
               }
            }
         },
        
         // co_applicant_name: function(value) {
         //    return Validator.value(value).required('This field is required.');
         // },
         // guarantee_name: function(value) {
         //    return Validator.value(value).required('This field is required.');
         // },
         // reference_number: function(value) {
         //    return Validator.value(value).required('This field is required.');
         // },
         applicant_name: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         tat_time: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         geo_limit: function(value) {             
               return Validator.custom(function () {
                  if ( value == '0') {
                     return 'Please select valid option.';
                  }
               });
         },
         case_type: function(value) {
            return Validator.custom(function () {
                  if ( value == '0') {
                     return 'Please select valid option.';
                  }
               });
         },
         'agent, single_agent':function(agent, single_agent){
            if(!single_agent){
               return;
            }else{
               return Validator.custom(function () {
                  if ( agent == '0' ) {                     
                     return 'This field is required.';
                  }
               });
            }
         },
         tat_time: function(value) {
             return Validator.custom(function () {
                  if ( value == '0' ) {                     
                     return 'This field is required.';
                  }
               });
         },
         
      },
      created() {
         console.log(process.env.VUE_APP_BASE_URL, 'env');
         this.selected_organisation = this.$route.query.company_id?this.$route.query.company_id:'0';

         
         
         this.user_auth_role =  localStorage.getItem('role');
         var tthis = this;
         axios.post("https://severify.com/api/employee/all-cases")
            .then(response => {
               this.employee_case_list = response.data.data;
               this.all_agents = response.data.agents;
               this.all_case_type = response.data.products;
               this.total_unassigned_cases = response.data.total_unassigned_cases;
               this.dead_cases = response.data.dead_cases;
                if(this.user_auth_role != 'super_admin'){
                  let company_id =localStorage.getItem('company_id');
                  this.selected_organisation_for_case = company_id;
                  this.selected_organisation = company_id;

                  console.log(this.selected_organisation_for_case , 'Case Id');
                  this.updateEmployee();
               }

               // alert('I am here');

               
               
               
         });
         

         axios.get("https://severify.com/api/company/list-all")
            .then(
               response => {
                  this.organisation_list = response.data.data;
                  console.log(this.organisation_list);
         });

          axios.get("https://severify.com/api/bank/list-all")
            .then(response => {this.bankList = response.data.data;});
         axios.get("https://severify.com/api/company/list-all")
            .then(response => {this.company_list = response.data.data;});

         axios.get("https://severify.com/api/custom-category")
            .then(response => { this.misc_cat_list = response.data.data; });

         axios.get("https://severify.com/api/user/list-all")
            .then(response => {this.agent_list = response.data.data;this.updateOrgEmployee();});

         for(let i=0;i <= 23;i++){
               for(let j = 0;j <= 11; j++){
                  let time =("0" + i).slice(-2)+':'+("0" + (j*5)).slice(-2);
                  this.tat_time_list.push(time);

               }
            }
      },    
     methods: {
        formatDate(){
           let startDate = new Date(this.start_date);
           let smonth = startDate.getMonth() + 1;
           let syear = startDate.getFullYear();
           let sday = startDate.getDate();
           let sd = syear+'-'+(smonth <= 9 ? '0'+smonth:smonth)+'-'+(sday <= 9 ? '0'+sday:sday);
           this.sd = sd;

           let endDate = new Date(this.end_date);
           let emonth = endDate.getMonth() + 1;
           let eyear = endDate.getFullYear();
           let eday = endDate.getDate();
           let ed = eyear+'-'+(emonth <= 9 ? '0'+emonth:emonth)+'-'+(eday <= 9 ? '0'+eday:eday);
           this.ed = ed;

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
        getMyUsers(){

        },
        updateOrgEmployee(){
           let vm  = this;
           vm.selected_agent = [];
           this.all_agents.forEach(function(element){
              if(element.company_id == vm.selected_organisation)
                     vm.selected_agent.push(element);
           });
        },
        updateEmployee(){
           let vm  = this;
           vm.selected_agent = [];
           this.all_agents.forEach(function(element){
              console.log(element.company_id,' == ',vm.selected_organisation_for_case);
              if(element.company_id == vm.selected_organisation_for_case)
                     vm.selected_agent.push(element);
           });

           console.log(vm.selected_agent, 'asdasd');
        },
        checkValidation(){
             let vm = this;
             this.$validate()
               .then(function(success) {
                  if (success) {
                     if(!vm.rv && !vm.bv){
                        vm.type_error = 'Please select any option';
                     }else{
                        vm.submitForm();
                     }
                     
                  }
               });
        },
        submitForm(){
             
             let vm = this;
               this.request_in_progress = 1;
               let url = 'https://severify.com/api/cases/add';
               if(vm.roleModal == 'edit'){
                  url = 'https://severify.com/api/cases/update';
               }

               

               let creater_id =  localStorage.getItem('user_id');
               let company_id =localStorage.getItem('company_id');
               if(this.user_auth_role == 'super_admin'){
                  company_id = this.selected_organisation_for_case;
               }
               vm.selected_organisation_for_case
   
               let request = {
                  creater_id :creater_id,
                  company_id:company_id,
                  user_id:this.user_id,
                  case_type:this.case_type,
                  selected_category: this.selected_category == 0? '':this.selected_category,
                  case_type:this.case_type,
                  bank_id:this.bank == 0? '':this.bank,
                  product_id:this.product == 0? '':this.product,
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
                  agent:this.agent == '0' ? null:this.agent ,
                  agent_id:this.agent  == '0' ? null:this.agent ,
                  rv_agent:this.rv_agent,
                  bv_agent:this.bv_agent,
                  geo_limit:this.geo_limit,
                  tat_time:this.tat_time,
                  remarks:this.remark,
                  status : this.status,
                  
                  case_id: this.case_id,
               };
               console.log(request, 'My request');
               
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

                  vm.filterMyResult();
                  vm.resetForm();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
        },
        closeForm(){
             this.resetForm();
             this.showRoleModal = false;
        },
        filterMyResult(){
           let vm = this;
           this.formatDate();
           let formData = new FormData();
           formData.append('organisation_id', this.selected_organisation);
           formData.append('selected_case_type', this.selected_case_type);
           formData.append('agent_id', this.selected_agents);
           formData.append('start_date', this.sd+ ' 00:00:00');
           formData.append('end_date', this.ed+ ' 23:59:00');
           formData.append('type', this.user_type);
         //   formData.append('start_date', this.sd);
         //   formData.append('end_date', this.ed);

            axios.post('https://severify.com/api/employee/all-cases', formData)
               .then(function (response) {
                  vm.employee_case_list = response.data.data;
                  vm.total_unassigned_cases = response.data.total_unassigned_cases;
                  vm.dead_cases = response.data.dead_cases;
               })
               .catch(function (error) {
                  console.log(error);
               });
        },
        gotoEmployeeView(item){
           if(item.agent == 'Total') return;
           console.log(item, "testttt");
           this.formatDate();
           this.$router.push(
               { 
                  name: 'Employee Case Listing' , 
                  query: {
                     id:item.id, 
                     start_date: this.sd, 
                     end_date:this.ed, 
                     selected_organisation:this.selected_organisation, 
                     selected_case_type : this.selected_case_type,
                     page:''

                  }
            });

        },
        showPointers(rowDetails){
          
           this.location = rowDetails.location;
           console.log('I', rowDetails.location);
           this.showMapModal = true;

        },
         closeChildModel(){
            this.showMapModal = false;

         },
         goTo(page){
            this.formatDate();
            this.$router.push(
                  { 
                     name: 'Employee Case Listing' , 
                     query: {
                        id:'--', 
                        start_date: this.sd, 
                        end_date:this.ed, 
                        selected_organisation:this.selected_organisation, 
                        selected_case_type : this.selected_case_type,
                        page:page
                     }
               });

         },
         updateChildRoles(event){
            let bank_id = event.target.value;
            this.product = '0';
            let vm = this;
            this.productList = [];
            this.bankList.forEach(element => {
               if(element.id == bank_id){
                  vm.productList = element.products;
               }
            });
         },
         changeCaseType(type){
            if(type == 'rv')
               this.rv = !this.rv;
            else if(type == 'bv')
               this.bv = !this.bv;
             
            if(!this.bv && !this.rv){
                this.type_error = 'Please select any option';
            }else{
               this.type_error = '';
            }
          }
     }
   }
</script>
<style scoped>
.table tbody:nth-child(1)
{
  background: green !important;  
}
</style>