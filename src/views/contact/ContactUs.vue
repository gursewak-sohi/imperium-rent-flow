<template>
   <div>
      <CCard>
         <CCardHeader>
            <slot name="header">
               <CRow class="align-items-center" >
                  <CCol sm="3" > 
                     <CIcon name="cil-grid"/>
                     All Enquries
                  </CCol>
                  <CCol sm="6" > 
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
               :fields="['name', 'email', 'mobile_number', 'description',  'query_resolved', 'remark', 'action']"
               :items-per-page="10"
               pagination
               >

               <template #query_resolved="{item}">
                  <td>
                     <CBadge :color="getBadge(item.query_resolved)">{{item.query_resolved == 0 ? 'No':'Yes'}}</CBadge>
                  </td>
               </template>

               <template #remark="{item}">
                  <td>
                     <CBadge >{{item.remark? item.remark:'N/A'}}</CBadge>
                  </td>
               </template>
              
               <template #action="{item}">
                  <td>
                     <template >
                        <CButton v-on:click="edit(item)" size="sm" color="primary">
                           <CIcon name="cil-pencil"/>
                           Edit
                        </CButton>
                        <span>&nbsp;</span>
                        <CButton v-on:click="confirmDelete(item);" size="sm" color="danger">
                           <CIcon name="cil-ban"/>
                           Delete
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
                     Are you sure you want to delete this?
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
                           <div role="group" class="" :class="{error: validation.hasError('name')}">
                              <label for="f_n" class=""> Name <span class="required">*</span></label>
                                 <input id="f_n" type="text" v-model="name" placeholder="Enter Name..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('name') }}</small>
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('email')}">
                              <label for="l_n" class=""> Email <span class="required">*</span></label>
                                 <input id="l_n" type="text" v-model="email" placeholder="Enter Email..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('email') }}</small>
                           </div>
                        </CCol>
                     </CRow>

                     <CRow class="form-group">
                        <CCol :col="6">
                           <div role="group" class="" :class="{error: validation.hasError('mobile_number')}">
                              <label for="u_n" class=""> Contact Number <span class="required">*</span></label>
                                 <input id="u_n" type="text" v-model="mobile_number" placeholder="Enter Contact Number..."  required="required" class="form-control">
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('mobile_number') }}</small>
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" class="" >
                              <label for="pass" class=""> Query Resolved </label>
                              <select id="uid-12" class="form-control"  v-model="query_resolved">
                                 <option value="1" > Yes </option>
                                 <option value="0" > No </option>
                              </select>
                           </div>
                        </CCol>
                     </CRow>

                      <CRow class="form-group">
                        <CCol :col="6">


                           <!-- ---------- -->
                           <div role="group" class="" >
                              <label for="conf_pass" class=""> Description <span class="required">*</span></label>
                                  <textarea id="uid-x4eg394jlr9" placeholder="Content..." rows="9" class="form-control"  v-model="description"></textarea>
                                 <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('description') }}</small>
                           </div>
                        </CCol>
                        <CCol :col="6">
                           <div role="group" class="" >
                              <label for="conf_pass" class=""> Remark </label>
                              <textarea id="uid-x4eg394jlr9" placeholder="Content..." rows="9" class="form-control" v-model="remark"></textarea>
                           </div>
                        </CCol>
                     </CRow>

                    
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">{{ roleModal == 'add'?'Add Employee' : 'Update Query' }}</h6>
               <CButtonClose @click="showRoleModal = false" class="text-white"/>
            </template>
            <template #footer>
               
               <!-- <CButton @click="resetForm" size="sm" color="danger" :disabled='request_in_progress == 1'>
                  <CIcon name="cil-ban"/>
                  Reset
               </CButton> -->
               <CButton @click="closeForm" color="danger" :disabled='request_in_progress == 1'>
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
         id:0,
         allList:[],
         allRoles:[],
         name:'',
         email:'',
         mobile_number:'',
         description:'',
         remark:'',
         query_resolved:0,
 
         request_in_progress:0,
         alertMsgShow:false,
         alertMsg:'',
         responseStatus:1,
         allParentRoles:[],
         
       }
     },
     components: {  },
      validators: {
         name: function(value) {
            return Validator.value(value).required();
         },
         mobile_number: function(value) {
            return Validator.value(value).required();
         },
         email: function(value) {
            return Validator.value(value).email();
         },
         description: function(value) {
            return Validator.value(value).required();
         },
      },
      created() {
         axios.get("https://severify.com/api/contact-us/list-all")
            .then(response => {this.allList = response.data.data;});
      },
    
     methods: {
        getBadge (status) {
            return status == 1 ? 'success':'danger';
          },
         getMyQuries(){
            axios.get("https://severify.com/api/contact-us/list-all")
            .then(response => {this.allList = response.data.data;});
         },
         resetForm(){
            this.id = 0;
            this.name = '';
            this.email = '';
            this.mobile_number = '';
            this.query_resolved = 0;
            this.description = '';
            this.remark = '';
            
            this.validation.reset();
         },
         closeForm(){
             this.resetForm();
             this.showRoleModal = false;
          },
         confirmDelete(row){
            this.confirmModal = true;
            this.id = row.id;
         },
         deleteRole(){
            let vm = this;
            vm.request_in_progress = 0;
            let request = {
               id:this.id
            }
            axios.post('https://severify.com/api/contact-us/delete', request)
               .then(function (response) {
                  vm.request_in_progress = 0; 
                  vm.showRoleModal = false;
                  vm.confirmModal = false;
                  vm.$toast.open({
                      message:response.data.message,
                      type:response.data.status?'success':'error',
                      position:'top-right',
                      duration:3000,
                      dismissible:true
                  });
                  vm.getMyQuries();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          },
         edit(item){
            this.showRoleModal=true;
            this.roleModal = 'edit';
            this.id = item.id;
            this.name = item.name;
            this.email = item.email;
            this.mobile_number = item.mobile_number;
            this.description = item.description;
            this.remark = item.remark;
            this.query_resolved = item.query_resolved;   
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
            let url = 'https://severify.com/api/contact-us/update';
            
            let request = {
               id:this.id,
               name:this.name ,
               email:this.email ,
               description:this.description ,
               mobile_number:this.mobile_number ,
               remark:this.remark ,
               query_resolved:this.query_resolved ,
               
            };
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
                     vm.getMyQuries();
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