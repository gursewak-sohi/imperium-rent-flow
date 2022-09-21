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
                  All Bank
               </CCol>
               <CCol sm="3" > 
               </CCol>
               <CCol sm="3" > 
                  <input placeholder="search bank by name"  class="form-control search-bank" style="float:right !important" v-model="searchByText" @keyup="getBank"/>
               </CCol>
               <CCol sm="3" >
                  <CButton  color="primary"  @click="roleModal = 'add';showRoleModal=true;resetForm();" size="sm" style="float:right;">                  
                        <CIcon name="cil-plus" size="sm" />
                    <span style="padding-top:10px"> Add Bank</span>
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
               :items="this.allBanks"
               :fields="['name', 'products','action']"
               :items-per-page="10"
               pagination
               >

               <template #products="{item}" >
                  <td style="width:80%"> 
                     {{ getAllProducts(item.products)}}
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
                     Are you sure you want to delete this bank?
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
            size="xl"
            
            >
            <CCard>
               <CForm >
                  <CCardBody>

                      <CRow class="form-group">
                        <CCol :col="12">
                           <div role="group" class="form-group" :class="{error: validation.hasError('bank_name')}">
                              <label for="name_field" class="">Bank Name<span class="required">*</span> </label>
                              <input id="name_field" v-model="bank_name" type="text" placeholder="Enter Bank Name..." class="form-control">
                              <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('bank_name') }}</small>
                           </div>
                        </CCol>
                        
                     </CRow>
                     <!-- <CRow class="form-group" style="margin-top:-22px">
                        <CCol :col="6">
                           <div role="group" class="form-group">
                              <label for="name_field" class="">All Products & Email Details</label>                        
                           </div>
                        </CCol>
                     </CRow> -->
                     <CRow class="form-group" style="margin-top:-12px;margin-bottom:-10px">
                        <CCol :col="5">
                           <div role="group" class="form-group">
                              <label for="name_field" class="">Product Name<span class="required">*</span> </label>
                              
                           </div>
                        </CCol>
                        <CCol :col="3">
                           <div role="group" class="form-group">
                              <label for="name_field" class="">To Email Address<span class="required">*</span> </label>
                              
                           </div>
                        </CCol>
                        <CCol :col="3">
                           <div role="group" class="form-group" >
                              <label for="name_field" class="">CC Email Adderss</label>
                              
                           </div>
                        </CCol>
                        <CCol :col="1">
                           <div role="group" class="form-group" >
                              
                           </div>
                        </CCol>
                     </CRow>
                     <CRow class="form-group" v-for="(row, index) in bank_products" :key="index" style="margin-top:-22px">
                        <CCol :col="5">
                           <div role="group" class="form-group">
                              <input id="name_field" v-model="row.product_name" type="text" placeholder="Enter Product Name..." class="form-control" @change="c_validate(index, 'product_name', 'name_error')">
                              <small class="form-text text-muted w-100 err-msg" v-if="row.name_error">{{ row.name_error }}</small>
                           </div>
                        </CCol>
                        <CCol :col="3">
                           <div role="group" class="form-group">
                              <input id="name_field" v-model="row.to_email" type="text" placeholder="Enter To Email Address..." class="form-control" @change="c_validate(index, 'to_email', 'to_error')">
                              <small class="form-text text-muted w-100 err-msg" v-if="row.to_error">{{ row.to_error }}</small>
                           </div>
                        </CCol>
                        <CCol :col="3">
                           <div role="group" class="form-group">
                              <input id="name_field" v-model="row.cc_email" type="text" placeholder="Enter CC Email Adderss..." class="form-control" @change="c_validate(index, 'cc_email', 'cc_error')">
                              <small class="form-text text-muted w-100 err-msg" v-if="row.cc_error">{{ row.cc_error }}</small>
                           </div>
                        </CCol>
                        <CCol :col="1">
                           <div role="group" class="form-group" >
                              <CButton v-on:click="deleteRow(index)" size="sm" color="danger" v-c-tooltip.hover.click="'Delete'">
                                 <CIcon name="cil-ban"/>
                              </CButton>
                           </div>
                        </CCol>
                     </CRow>
                     <CRow class="form-group">
                        <CCol :col="12">
                           <div role="group" class="form-group">
                              <CButton v-on:click="addNewRow()" size="sm" color="dark" v-c-tooltip.hover.click="'Add New Product'" style="float:right">
                                 <CIcon name="cil-plus"/> Add New Product
                              </CButton>                       
                           </div>
                        </CCol>
                     </CRow>
                     
                     

                    

                     
                     
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">{{ roleModal == 'add'?'Add Bank' : 'Edit Bank' }}</h6>
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
         searchByText:'',
         roleModal: '',
         confirmModal: false,
         showRoleModal: false,
         allBanks:[],
         bank_id:0,
         bank_name:'',
         bank_products:[{
            product_name:'',
            to_email:'',
            cc_email:'',
            name_error:'',
            to_error:'',
            cc_error:''
         }],
         parent_id:0,
         request_in_progress:0,
         alertMsgShow:false,
         alertMsg:'',
         responseStatus:1
         
       }
     },
     components: {  },
      created() {
         axios.get("https://severify.com/api/bank/list-all")
            .then(response => {
              this.allBanks = response.data.data;
            });
      },
       validators: {
         // bank_name: function(value) {
         // return Validator.value(value).required("This field is required.");
         // }
          bank_name: {
            cache: true,
            debounce: 200,
            validator: function (value) {
               let vm = this;
               if(value){
                  return Validator.value(value).required('This field is required.').maxLength(50).custom(function () {
                     if (!Validator.isEmpty(value)) {
                        return axios.post("https://severify.com/api/bank/check-name", {type:vm.roleModal, bank_id:vm.bank_id, name:value})
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
      },
      methods: {
         getFilteredBank(){
            axios.get("https://severify.com/api/bank/filtered-list?search-text="+this.searchByText)
            .then(response => {
              this.allBanks = response.data.data;
            });
         },
         getBank(){
            this.getFilteredBank();
         },

         c_validate(ind, key, error){
            if(this.bank_products[ind][key] == ''){
               this.bank_products[ind][error] = 'This field is required.';
            }else{
               this.bank_products[ind][error] = '';
            }

         },
         deleteRow(index){
            this.bank_products.splice(index, 1);
         },
         addNewRow(){
            this.bank_products.push({
            product_name:'',
            to_email:'',
            cc_email:'',
            name_error:'',
            to_error:'',
            cc_error:''
         });
            
         },
         getAllProducts(allPro){
            if(allPro.length > 0){
               let allP = [];
               allPro.forEach(element => {
                  allP.push(element.name);
               });
               return allP.join(',');

            }else{
               return 'N/A';
            }

         },
         getMyRoles(){
            axios.get("https://severify.com/api/bank/list-all")
            .then(response => {
              this.allBanks = response.data.data;
            });
   
         },
         confirmDelete(row){
            this.confirmModal = true;
            this.role_id=row.id;
         },
         
         deleteRole(){
            let vm = this;
            vm.request_in_progress = 0;
            let request = {
               bank_id:this.role_id
            }
            axios.post('https://severify.com/api/bank/delete', request)
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
             let vm = this;
             console.log(row, '321');
             this.bank_id = row.id;
             this.bank_name = row.name;
             this.bank_products = [];
             if(row.products.length > 0){
                row.products.forEach(element => {
                   vm.bank_products.push({
                      product_name:element.name,
                      to_email:element.to_email,
                      cc_email:element.cc_email,
                      name_error:'',
                      to_error:'',
                      cc_error:''
                   });
                   
                });

             }else{
                this.bank_products = [];
             }
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
            this.bank_name = '';
            this.bank_id = 0;
            this.bank_products = [{
               product_name:'',
               to_email:'',
               cc_email:'',
               name_error:'',
               to_error:'',
               cc_error:''

            }];
            this.validation.reset();
          },
          closeForm(){
             this.resetForm();
             this.showRoleModal = false;
          },
          checkValidation(){
             let vm = this;
             console.log('Su');
             this.$validate()
               .then(function(success) {
                  if (success) {
                     let error = false;
                     console.log('Su1');
                     vm.bank_products.forEach((element, index) => {
                        console.log('Su3');
                        if(element.product_name == '' || !element.product_name){
                           vm.bank_products[index]['name_error'] = 'This field is required.';
                           error = true;
                        }
                        if(element.to_email == '' || !element.to_email  ){
                           vm.bank_products[index]['to_error'] = 'This field is required.';
                           error = true;
                        }
                        // if(element.cc_email == '' || !element.cc_email){
                        //    vm.bank_products[index]['cc_error'] = 'This field is required.';
                        //    error = true;
                        // }
                     });
                     console.log('Su4', error);
                     if(!error){
                        vm.submitForm();
                     }
                     
                  }
               });
          },
          submitForm(){
             let vm = this;
               this.request_in_progress = 1;
               let url = 'https://severify.com/api/bank/add';
               if(vm.roleModal == 'edit'){
                  url = 'https://severify.com/api/bank/update';
               }
   
               let request = {
                  bank_id:this.bank_id,
                  bank_name: this.bank_name,
                  bank_products:this.bank_products
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
<style scoped>
.search-bank {
    float: right !important;
    margin-right: -64%;
}
</style>