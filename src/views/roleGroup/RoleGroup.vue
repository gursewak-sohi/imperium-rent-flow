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
                  All Role Goups
               </CCol>
               <CCol sm="6" > 
               </CCol>
               <CCol sm="3" > 
                  <CButton  color="primary"  @click="roleModal = 'add';showRoleModal=true;resetForm();" size="sm" style="float:right;">                  
                        <CIcon name="cil-plus"/>
                     Add Role Group
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
               :items="this.allRoles"
               :fields="['name', 'description', 'status', 'action']"
               :items-per-page="10"
               pagination
               >

               <template #description="{item}">
                  <td>
                     {{item.description  ? item.description:'N/A'}}
                  </td>
               </template>
               <template #status="{item}">
                  <td>
                     <CBadge :color="getBadge(item.status)">{{item.status == 0 ? 'Inactive':'Active'}}</CBadge>
                  </td>
               </template>
               <template #action="{item}">
                  <td>
                     <template >
                        <CButton v-on:click="edit(item)" size="sm" color="primary" v-c-tooltip.hover.click="'Edit'">
                           <CIcon name="cil-pencil"/>
                        </CButton>
                        <span>&nbsp;</span>
                        <CButton v-on:click="confirmDelete(item)" size="sm" color="danger" v-c-tooltip.hover.click="'Delete'">
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
                     Are you sure you want to delete this Role Group?
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
               <CButton v-on:click="confirmModal=false;deleteRole()" size="sm" color="primary" >
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
               <CForm >
                  <CCardBody>
                     <div role="group" class="form-group" :class="{error: validation.hasError('name')}">
                        <label for="name_field" class=""> Name<span class="required">*</span> </label>
                        <input id="name_field" v-model="name" type="text" placeholder="Enter Name..." class="form-control">
                        <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('name') }}</small>
                     </div>
                    

                     <CTextarea
                           v-model="description"
                        label="Description"
                        placeholder="Enter Description..."
                           
                           rows="4"
                        />
                     <div role="group" class="form-group">
                        <label for="uid-12" class=""> Status </label>
                        <select id="uid-12" class="form-control"  v-model="status">
                           <option value="1" > Active </option>
                           <option value="0" > In-Active </option>
                        </select>
                        
                     </div>
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">{{ roleModal == 'add'?'Add Role Group' : 'Edit Role Group' }}</h6>
               <CButtonClose @click="showRoleModal = false" class="text-white"/>
            </template>
            <template #footer>
              
               <!-- <CButton @click="resetForm" size="sm" color="danger" :disabled='request_in_progress == 1'>
                  <CIcon name="cil-ban"/>
                  Reset
               </CButton> -->
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
   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator;
   export default {
     name: 'Tables',
     data () {
       return {
         roleModal: '',
         confirmModal: false,
         showRoleModal: false,
         allRoles:[],
         role_id:0,
         name:'',
         description:'',
         status:1,
         parent_id:0,
         request_in_progress:0,
         alertMsgShow:false,
         alertMsg:'',
         responseStatus:1
         
       }
     },
     components: {  },
      created() {
         axios.get("https://severify.com/api/role/list-all?type=parent")
            .then(response => {this.allRoles = response.data.data;});
      },
       validators: {
         name: function(value) {
         // return Validator.value(value).required().regex('^[A-Za-z]*$', 'Must only contain alphabetic characters.');
         return Validator.value(value).required("This field is required.");
         }
      },
      methods: {
         getMyRoles(){
            axios.get("https://severify.com/api/role/list-all?type=parent")
            .then(response => {this.allRoles = response.data.data;});
   
         },
         confirmDelete(row){
            this.confirmModal = true;
            this.role_id=row.id;
         },
         deleteRole(){
            let vm = this;
            vm.request_in_progress = 0;
            let request = {
               role_id:this.role_id
            }
            axios.post('https://severify.com/api/role/delete', request)
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
                  vm.getMyRoles();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          },
          edit(row){
            this.role_id=row.id;
            this.name=row.name;
            this.description=row.description;
            this.status=row.status;
            this.parent_id=row.parent_id;
            this.showRoleModal=true;
            this.roleModal = 'edit';
          },
          getBadge (status) {
            return status === 1 ? 'success'
              : status === 0 ? 'danger'
                : status === 2 ? 'warning'
                  : status === 3 ? 'danger' : 'primary'
          },
          resetForm(){
            this.name='  ';
            this.role_id = 0;
            this.description='';
            this.status=1;
            this.parent_id=0;
            this.validation.reset();
          },
          closeForm(){
             this.resetForm();
             this.showRoleModal = false;
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
               let url = 'https://severify.com/api/role/add';
               if(vm.roleModal == 'edit'){
                  url = 'https://severify.com/api/role/update';
               }
   
               let request = {
                  role_id:this.role_id,
                  name: this.name,
                  description:this.description,
                  status:this.status,
                  parent_id:this.parent_id,
               };
               console.log(request);
               axios.post(url, request)
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
                  vm.getMyRoles();
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