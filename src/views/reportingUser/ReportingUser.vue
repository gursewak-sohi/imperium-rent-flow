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
                   All Reporting User
               </CCol>
               <CCol sm="6" > 
               </CCol>
               <CCol sm="3" > 

                  <CButton  color="primary"  @click="roleModal = 'add';showRoleModal=true;" size="sm" style="float:right;"> <CIcon name="cil-plus"/> Add Reporting User</CButton>
                  
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
               :fields="['employee_id', 'first_name', 'last_name', 'user_name', 'password', 'email', 'mobile_number', 'action']"
               :items-per-page="10"
               pagination
               >
               
              
               <template #action="{item}">
                  <td>
                     <template >
                        <span>&nbsp;</span>
                        <CButton v-on:click="confirmDelete(item);" size="sm" color="danger"  v-c-tooltip.hover.click="'Delete'">
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
                     Are you sure you want to remove this user as reporting user?
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
                     <div role="group" class="form-group form-row" :class="{error: validation.hasError('selectedUsers')}">
                        <label for="uid-h1s8dbilva6" class="col-form-label col-sm-3"> Select User <span class="required">*</span></label>
                        <div class="col-sm-9">
                           <multiselect v-model="selectedUsers" id="ajax" label="full_name" track-by="code" placeholder="Type to search" 
                           open-direction="bottom" 
                           :options="users" 
                           :multiple="false" 
                           :searchable="true" 
                           :loading="isLoading" 
                           :internal-search="true" 
                           :clear-on-select="true" 
                           :close-on-select="true" 
                           :options-limit="300" 
                           :limit="13" 
                           :limit-text="limitText" 
                           :max-height="600" 
                           :show-no-results="true" 
                           :hide-selected="true" 
                           @search-change="asyncFind">
                           <template slot="tag" slot-scope="{ option, remove }">
                              <span class="custom__tag">
                                 <span>{{ option.full_name}}</span>
                                 <span class="custom__remove" @click="remove(option)">  ❌</span>
                              </span>
                           </template>
                           <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                        </multiselect>
                        <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('selectedUsers') }}</small>
                        </div>
                     </div>
                      
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">{{ roleModal == 'add'?'Add Reporting User' : 'Edit Reporting User' }}</h6>
               <CButtonClose @click="showRoleModal = false" class="text-white"/>
            </template>
            <template #footer>
               <CButton @click="closeForm" color="danger" size="sm"  :disabled='request_in_progress == 1'>
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
   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator;
   import Multiselect from 'vue-multiselect'
   
   export default {
     name: 'Employees',
     data () {
       return {
         roleModal: '',
         confirmModal: false,
         showRoleModal: false,
         allList:[],
         request_in_progress:0,
         alertMsgShow:false,
         alertMsg:'',
         responseStatus:1,
         selectedUsers: [],
         users: [],
         user_id:0,
         isLoading: false,
         inProgress:false
       }
     },
     created() {
         axios.get("https://severify.com/api/user/reporting-user")
            .then(response => {
               this.allList = response.data.data;
               });
      },
     components: { Multiselect },
      validators: {
         selectedUsers: function(value) {
         return Validator.value(value).required();
         }
      },
     methods: {
         limitText (count) {
            return `and ${count} other users`
         },
         asyncFind (query) {
            this.isLoading = true;
            this.users = [];
            if(!this.inProgress  || true){
               axios.get("https://severify.com/api/user/normal-user?searchText="+query)
               .then(response => {
                  this.users = response.data.data;
                  this.isLoading = false;
                  this.inProgress = true;
                  // setTimeout(function(){this.inProgress = false;},2000);
                  console.log(1);
               });

            }
           
         },
         clearAll () {
            this.selectedUsers = [];
         },
         getAllReportingUsers(){
           axios.get("https://severify.com/api/user/reporting-user")
            .then(response => {
               this.allList = response.data.data;
               });
        },
         resetForm(){
            this.user_id = 0;
         },
         closeForm(){
             this.resetForm();
             this.showRoleModal = false;
          },
         confirmDelete(row){
            this.confirmModal = true;
            this.user_id=row.id;
         },
         deleteRole(){
            let vm = this;
            vm.request_in_progress = 0;
            let request = {
               user_id:this.user_id,
               type:'delete',
            }
            axios.post('https://severify.com/api/user/update-reporting-user', request)
               .then(function (response) {
                  vm.request_in_progress = 0; 
                  vm.showRoleModal = false;
                  vm.$toast.open({
                      message:response.data.message,
                      type:response.data.status?'success':'error',
                      position:'top-right',
                      duration:3000,
                      dismissible:true
                  });
                  vm.getAllReportingUsers();
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
               let url = 'https://severify.com/api/user/update-reporting-user';   
               let request = {
                  user_id:this.selectedUsers.id ,
                  type:'add',
               };

               axios.post(url, request)
               .then(function (response) {
                  console.log(response);
                  vm.request_in_progress = 0; 
                  vm.showRoleModal = false;
                  vm.$toast.open({
                      message:response.data.message,
                      type:response.data.status?'success':'error',
                      position:'top-right',
                      duration:3000,
                      dismissible:true
                  });
                  vm.getAllReportingUsers();
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
<style scoped>
input#ajax {
    width: 100% !important;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>