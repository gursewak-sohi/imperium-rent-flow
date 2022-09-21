<template>
   <div>
      <CAlert
         :color="responseStatus?'success':'danger'"
         closeButton
         :show.sync="alertMsgShow"
         >
         {{ alertMsg }}
      </CAlert>
      <CCard>
         
         <CCardHeader>
            <slot name="header">
               <CRow class="align-items-center" >
                  <CCol sm="3" > 
                     <CIcon name="cil-grid"/>
                     All Admin
                  </CCol>
                  <CCol sm="6" > 
                  </CCol>
                  <CCol sm="3" > 
                     <CButton  color="primary"  @click="roleModal = 'add';showRoleModal=true;resetForm()" size="sm" style="float:right;">                  
                           <CIcon name="cil-plus"/>
                        Add Admin
                     </CButton>
                  </CCol>
               </CRow>
            </slot>
         </CCardHeader>
         <CCardBody>
            <CDataTable
               :hover="false"
               striped
               fixed
               :items="this.allList"
               :fields="[ 'first_name', 'last_name', 'user_name', 'password', 'email',  'action']"
               :items-per-page="10"
               pagination
               >

              
               <template #first_name="{item}">
                  <td>
                     {{ item.first_name ? item.first_name:'N/A'}}
                  </td>
               </template>
               <template #last_name="{item}">
                  <td>
                     {{ item.last_name ? item.last_name:'N/A'}}
                  </td>
               </template>
               <template #user_name="{item}">
                  <td>
                     {{ item.user_name ? item.user_name:'N/A'}}
                  </td>
               </template>
               <template #password="{item}">
                  <td>
                     {{ item.password ? item.password:'N/A'}}
                  </td>
               </template>
               <template #email="{item}">
                  <td>
                     {{ item.email ? item.email:'N/A'}}
                  </td>
               </template>
               <template #reporting_user="{item}">
                  <td>
                     {{ item.reporting_user ? item.reporting_user:'N/A'}}
                  </td>
               </template>
              
               <template #action="{item}">
                  <td>
                     <template >
                        <CButton v-on:click="edit(item)" size="sm" color="primary" v-c-tooltip.hover.click="'Edit'">
                           <CIcon name="cil-pencil"/>
                        </CButton>
                        <span>&nbsp;</span>
                        <CButton v-on:click="confirmDelete(item);" size="sm" color="danger" v-c-tooltip.hover.click="'Delete'">
                           <CIcon name="cil-ban"/>
                        </CButton>
                     </template>
                  </td>
               </template>
            </CDataTable>
         </CCardBody>
         <CModal
            :show.sync="confirmModal"
            color="primary"
            :no-close-on-backdrop="true"
            :centered="true"
            >
            <CCard>
               <CForm novalidate>
                  <CCardBody>
                     Are you sure you want to delete this Admin?
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">Confirm</h6>
               <CButtonClose @click="confirmModal = false" class="text-white"/>
            </template>
            <template #footer>
               <CButton v-on:click="confirmModal=false" size="sm" color="danger">
                  <CIcon name="cil-ban"/>
                  NO
               </CButton>
               <CButton v-on:click="deleteRole()" size="sm" color="primary">
                  <CIcon name="cil-check-circle"/>
                  Yes
               </CButton>
            </template>
         </CModal>
         <CModal
            :show.sync="showRoleModal"
            color="primary"
            :no-close-on-backdrop="true"
            :centered="true"
             size="lg"
            >
            <CCard>
               <CForm novalidate>
                  <CCardBody>

                     

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('first_name')}">
                              <label for="f_n" class=""> First Name <span class="required">*</span></label>
                                 <input id="f_n" type="text" v-model="first_name" placeholder="Enter First Name..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('first_name') }}</small>
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('last_name')}">
                              <label for="l_n" class=""> Last Name <span class="required">*</span></label>
                                 <input id="l_n" type="text" v-model="last_name" placeholder="Enter Last Name..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('last_name') }}</small>
                           </div>
                        </CCol>
                     </CRow>

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('user_name')}">
                              <label for="u_n" class=""> User Name <span class="required">*</span></label>
                                 <input id="u_n" type="text" v-model="user_name" placeholder="Enter User Name..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('user_name') }}</small>
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('password')}">
                              <label for="pass" class=""> Password <span class="required">*</span></label>
                                 <input id="pass" type="password" v-model="password" placeholder="Enter Password..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('password') }}</small>
                           </div>
                        </CCol>
                     </CRow>

                      <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('confirm_password')}">
                              <label for="conf_pass" class=""> Confirm Password <span class="required">*</span></label>
                                 <input id="conf_pass" type="password" v-model="confirm_password" placeholder="Enter Confirm Password..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('confirm_password') }}</small>
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('mobile_number')}">
                              <label for="conf_pass" class=""> Mobile <span class="required">*</span></label>
                                 <input id="conf_pass" type="text" v-model="mobile_number" placeholder="Enter Mobile..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('mobile_number') }}</small>
                           </div>
                        </CCol>
                     </CRow>

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('email')}">
                              <label for="email" class=""> Email ID  <span class="required">*</span></label>
                                 <input id="email" type="text" v-model="email" placeholder="Enter Email ID..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('email') }}</small>
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" class="">
                              <label for="role_id" >Organisation<span class="required">*</span></label>
                                 <select id="role_id" class="form-control" v-model="organisation">
                                    <option value="0" > Select Organisation</option>
                                    <option  :value="row.id" v-for="(row, index) in this.company_list" :key="index" > {{ row.name}} </option>
                                 </select>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('organisation') }}</small>

                           </div>
                        </CCol>
                     </CRow>


                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">{{ roleModal == 'add'?'Add Admin' : 'Edit Admin' }}</h6>
               <CButtonClose @click="showRoleModal = false" class="text-white"/>
            </template>
            <template #footer>
               
               <!-- <CButton @click="resetForm" size="sm" color="danger" :disabled='request_in_progress == 1'>
                  <CIcon name="cil-ban"/>
                  Reset
               </CButton> -->
               <CButton @click="closeForm" color="danger" size="sm"  :disabled='request_in_progress == 1'>
                  <CIcon name="cil-delete"/>Cancel</CButton>

               <CButton  @click="checkValidation" size="sm" color="primary" v-if="!request_in_progress">
                  <CIcon name="cil-check-circle"/>
                  Save
               </CButton>
               <div class="spinner-border text-primary" role="status" v-if="request_in_progress">
                  <span class="sr-only">Loading...</span>
               </div>
            </template>
         </CModal>
      </CCard>
   </div>
</template>
<script>
   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator;
   
   export default {
     name: 'Employees',
     data () {
       return {
         roleModal: '',
         confirmModal: false,
         showRoleModal: false,
         user_id:0,
         allList:[],
         allRoles:[],
         first_name:'',
         last_name:'',
         user_name:'',
         password:'',
         name:'',
         confirm_password:'',
         mobile_number:'',
         email:'',
         employee_id:'',
         role_group:0,
         role_id:0,
         has_reporting_user:'no',
         is_demo_user:'0',
         organisation:'',
         role_id_list:[],
         company_list:[],
         request_in_progress:0,
         alertMsgShow:false,
         alertMsg:'',
         responseStatus:1,
         allParentRoles:[],
         allReportingUser:[],
         reporting_user_id:'',
         reporting_user:'0'
         
       }
     },
     components: {  },
    
      validators: {
         first_name: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         last_name: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         // user_name: function(value) {
         //    return Validator.value(value).required();
         // },
         user_name: {
            cache: true,
            debounce: 200,
            validator: function (value) {
               let vm = this;
               if(value){
                  return Validator.value(value).required('This field is required.').maxLength(50).custom(function () {
                     if (!Validator.isEmpty(value)) {
                        return axios.post("https://severify.com/api/user/check-user-name", {type:vm.roleModal, user_id:vm.user_id, user_name:value})
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
         email: {
            cache: true,
            debounce: 200,
            validator: function (value) {
               let vm = this;
               if(value){
                  return Validator.value(value).email('Please enter valid email.').maxLength(50).custom(function () {
                     if (!Validator.isEmpty(value)) {
                        return axios.post("https://severify.com/api/user/check-user-email", {type:vm.roleModal, user_id:vm.user_id, email:value})
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
         password: function(value) {
            return Validator.value(value).required('This field is required.').minLength(8);
         },
         'confirm_password, password': function (confirm_password, password) {
            if (this.validation.isTouched('confirm_password')) {
               return Validator.value(confirm_password).required('This field is required.').match(password);
            }
         },
         mobile_number: function(value) {
            return Validator.value(value).required('This field is required.');
         },
         
         // email: function(value) {
         //    return Validator.value(value).email('Please enter valid email.');
         // },
         organisation: function(value) {
            return Validator.value(value).required('This field is required.');
         }
      },
      created() {
         axios.get("https://severify.com/api/role/list-all?type=child")
            .then(response => {
               this.allRoles = response.data.data;
               this.allParentRoles =  response.data.parent_role;
               });
         axios.get("https://severify.com/api/user/list-all-admin")
            .then(response => {this.allList = response.data.data;});
         axios.get("https://severify.com/api/company/list-all")
            .then(response => {this.company_list = response.data.data;});

         axios.get("https://severify.com/api/user/reporting-user")
            .then(response => {
               this.allReportingUser = response.data.data;
               });
      },
    
     methods: {
         getMyUsers(){
            axios.get("https://severify.com/api/user/list-all-admin")
            .then(response => {this.allList = response.data.data;});
         },
         checkUserName(){
            let request = {

            }
            axios.post("https://severify.com/api/user/check-user-name", request)
            .then(response => {
               this.allList = response.data.data;
               });
         },
         updateChildRoles(event){
            let parent_id = event.target.value;
            let vm = this;
            this.role_id_list = [];
            this.allRoles.forEach(element => {
               if(element.parent_id == parent_id){
                  vm.role_id_list.push(element);
               }
            });
         },
         resetForm(){
            this.user_id = 0;
            this.first_name = '';
            this.last_name = '';
            this.user_name = '';
            this.password = '';
            this.name = '';
            this.confirm_password = '';
            this.mobile_number = '';
            this.email = '';
            this.employee_id = '';
            this.role_group = 0;
            this.role_id = 0;
            this.reporting_user = '0';
            this.is_demo_user = '0';
            this.organisation = '';
            this.validation.reset();
         },
         closeForm(){
             this.resetForm();
             this.showRoleModal = false;
          },
         confirmDelete(row){
            this.confirmModal = true;
            this.user_id = row.id;
         },
         deleteRole(){
            let vm = this;
            vm.request_in_progress = 0;
            let request = {
               user_id:this.user_id
            }
            axios.post('https://severify.com/api/user/delete', request)
               .then(function (response) {
                  vm.request_in_progress = 0; 
                  vm.showRoleModal = false;
                  // vm.alertMsgShow = true;
                  vm.confirmModal = false;
                  // vm.alertMsg =  response.data.message; 
                  // vm.responseStatus = response.data.status;

                  vm.$toast.open({
                      message:response.data.message,
                      type:response.data.status?'success':'error',
                      position:'top-right',
                      duration:3000,
                      dismissible:true
                  });

                  vm.getMyUsers();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          },
         edit(item){
            console.log(item)
            this.showRoleModal=true;
            this.roleModal = 'edit';
            this.user_id = item.id;
            this.first_name = item.first_name;
            this.last_name = item.last_name;
            this.user_name = item.user_name;
            this.password = item.password;
            this.confirm_password = item.password;
            //this.confirm_password = '';
            this.mobile_number = item.mobile_number;
            this.email = item.email;
            // this.employee_id = item.employee_id;
            // this.role_group = item.role_group;
            // this.role_id = item.role_id;
            // this.reporting_user = item.reporting_user;
            // this.is_demo_user = item.is_demo_user;
            this.organisation = item.company_id;
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
          submitForm(){
             let vm = this;
               this.request_in_progress = 1;
               let url = 'https://severify.com/api/user/add';
               if(vm.roleModal == 'edit'){
                  url = 'https://severify.com/api/user/update';
               }
   
               let request = {
                  user_id:this.user_id,
                  first_name:this.first_name ,
                  last_name:this.last_name ,
                  user_name:this.user_name ,
                  password:this.password ,
                  name:this.name ,
                  confirm_password:this.confirm_password ,
                  mobile_number:this.mobile_number ,
                  email:this.email ,
                  employee_id:this.employee_id ,
                  role_group:this.role_group ,
                  role_id:this.role_id ,
                  reporting_user:this.reporting_user ,
                  is_demo_user:this.is_demo_user ,
                  company_id:this.organisation ,
                  user_role:'admin'
               };
               console.log(request);
               axios.post(url, request)
               .then(function (response) {
                  console.log(response.data.message);
                  
                  if(response.data.status){
                     vm.request_in_progress = 0; 
                     vm.showRoleModal = false;
                     vm.$toast.open({
                        message:response.data.message,
                        type:response.data.status?'success':'error',
                        position:'top-right',
                        duration:3000,
                        dismissible:true
                     });
                     vm.getMyUsers();
                     vm.resetForm();
                  }else{
                     vm.request_in_progress = 0;
                     vm.$toast.open({
                        message:response.data.message,
                        type:response.data.status?'success':'error',
                        position:'top-right',
                        duration:3000,
                        dismissible:true
                     });
                  }
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          }
     }
   }
</script>