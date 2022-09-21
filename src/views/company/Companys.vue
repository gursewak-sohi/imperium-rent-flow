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
                   All Company
               </CCol>
               <CCol sm="6" > 
               </CCol>
               <CCol sm="3" > 

                  <CButton  color="primary"  @click="roleModal = 'add';showRoleModal=true;resetForm();" size="sm" style="float:right;"> <CIcon name="cil-plus"/> Add Company</CButton>
                  
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
               :fields="['name', 'super_viser', 'number', 'email', 'state', 'action']"
               :items-per-page="10"
               pagination
               >

               <template #super_viser="{item}">
                  <td>
                     {{item.super_viser?item.super_viser:'N/A'}}
                  </td>
               </template>

               <template #number="{item}">
                  <td>
                     {{item.number?item.number:'N/A'}}
                  </td>
               </template>
               <template #email="{item}">
                  <td>
                     {{item.email?item.email:'N/A'}}
                  </td>
               </template>
               <template #state="{item}">
                  <td>
                     {{item.state?item.state:'N/A'}}
                  </td>
               </template>

               <template #status="{item}">
                  <td>
                     <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
                  </td>
               </template>
               <template #action="{item}">
                  <td>
                     <template >
                        <CButton v-on:click="edit(item)" size="sm" color="primary">
                           <CIcon name="cil-pencil" v-c-tooltip.hover.click="'Edit'"/>
                           
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
                     Are you sure you want to delete this Company?
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
               <CButton v-on:click="confirmModal=false;deleteRole()" size="sm" color="primary">
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
            >
            <CCard>
               <CForm novalidate>
                  <CCardBody>


                     <div role="group" class="form-group form-row" :class="{error: validation.hasError('name')}">
                        <label for="uid-h1s8dbilva6" class="col-form-label col-sm-3"> Name <span class="required">*</span></label>
                        <div class="col-sm-9">
                           <input id="uid-h1s8dbilva6" type="text" placeholder="Enter Name..." v-model="name" required="required" class="form-control">
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('name') }}</small>
                        </div>
                     </div>

                     <!-- <CInput
                      type="text"
                      label="Super Viser"
                      v-model="super_viser"
                      placeholder="Enter Super Viser..."
                      required
                      horizontal
                      /> -->

                      <CInput
                      type="text"
                      label="Phone"
                      v-model="number"
                      placeholder="Enter Phone Number..."
                      required
                      horizontal
                      />
                      
                      

                     <div role="group" class="form-group form-row" :class="{error: validation.hasError('email')}">
                        <label for="uid-h1s8dbilva6" class="col-form-label col-sm-3"> Email</label>
                        <div class="col-sm-9">
                           <input id="uid-h1s8dbilva6" type="email" placeholder="Enter Email ID..." v-model="email" required="required" class="form-control">
                           <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('email') }}</small>
                        </div>
                     </div>
                     <CInput
                        type="text"
                        v-model="address"
                        label="Address "
                        placeholder="Address"
                        required
                        horizontal
                        />
                      <CInput
                      type="text"
                      label="City"
                      v-model="city"
                      placeholder="Enter City..."
                      required
                      horizontal
                      />
                      <CInput
                      type="text"
                      label="State"
                      v-model="state"
                      placeholder="Enter State..."
                      required
                      horizontal
                      />

                      
                     <CInput
                      type="text"
                      label="Pin Code"
                      v-model="pin"
                      placeholder="Enter PIN Code..."
                      required
                      horizontal
                      />
                      
                      
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">{{ roleModal == 'add'?'Add Company' : 'Edit Company' }}</h6>
               <CButtonClose @click="showRoleModal = false" class="text-white"/>
            </template>
            <template #footer>
               <CButton @click="closeForm" color="danger" size="sm" :disabled='request_in_progress == 1'>
                  <CIcon name="cil-delete"/>
                  Cancel</CButton>

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
   // import CTableWrapper from './Table.vue'
   import usersData from './CompanyData'
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
         allList:[],
         company_id:0,
         name:'',
         super_viser:'',
         number:'',
         email:'',
         address:'',
         city:'',
         state:'',
         pin:'',
         request_in_progress:0,
         alertMsgShow:false,
         alertMsg:'',
         responseStatus:1
       }
     },
     created() {
         axios.get("https://severify.com/api/company/list-all")
            .then(response => {this.allList = response.data.data;});
      },
     components: {  },
      validators: {
         name: function(value) {
         return Validator.value(value).required('This field is required.');
         },
         email: function(value) {
         return Validator.value(value).email('Please enter valid email.');
         }
      },
     methods: {
        getMyCompany(){
           axios.get("https://severify.com/api/company/list-all")
            .then(response => {this.allList = response.data.data;});
        },
        
         resetForm(){
            this.company_id = 0;
            this.name = '';
            this.super_viser = '';
            this.number = '';
            this.email = '';
            this.address = '';
            this.city = '';
            this.state = '';
            this.pin = '';
             this.validation.reset();
         },
         closeForm(){
             this.resetForm();
             this.showRoleModal = false;
          },
         confirmDelete(row){
            this.confirmModal = true;
            this.company_id=row.id;
         },
         deleteRole(){
            let vm = this;
            vm.request_in_progress = 0;
            let request = {
               company_id:this.company_id
            }
            axios.post('https://severify.com/api/company/delete', request)
               .then(function (response) {
                  vm.request_in_progress = 0; 
                  vm.showRoleModal = false;
                  // vm.alertMsgShow = true;
                  // vm.alertMsg =  response.data.message; 
                  // vm.responseStatus = response.data.status;

                  vm.$toast.open({
                      message:response.data.message,
                      type:response.data.status?'success':'error',
                      position:'top-right',
                      duration:3000,
                      dismissible:true
                  });
                  vm.getMyCompany();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          },
         edit(row){
            this.showRoleModal=true;
            this.roleModal = 'edit';
            this.company_id = row.id;
            this.name = row.name;
            this.super_viser = row.super_viser;
            this.number = row.number;
            this.email = row.email;
            this.address = row.address;
            this.city = row.city;
            this.state = row.state;
            this.pin = row.pin;
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
               let url = 'https://severify.com/api/company/add';
               if(vm.roleModal == 'edit'){
                  url = 'https://severify.com/api/company/update';
               }
   
               let request = {
                  company_id:this.company_id ,
                  name:this.name,
                  super_viser:this.super_viser,
                  number:this.number,
                  email:this.email,
                  address:this.address,
                  city:this.city,
                  state:this.state,
                  pin:this.pin
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
                  vm.getMyCompany();
                  vm.resetForm();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          }
     }
   }
</script>