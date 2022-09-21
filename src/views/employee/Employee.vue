<template>
   <CCard>
      <CCardHeader>
         <slot name="header">
            <CIcon name="cil-grid"/>
            {{caption}}
         </slot>
      </CCardHeader>
      <CCardBody>
         <CDataTable
            :hover="hover"
            :striped="striped"
            :border="border"
            :small="small"
            :fixed="fixed"
            :items="items"
            :fields="fields"
            :items-per-page="small ? 10 : 5"
            :dark="dark"
            pagination
            >
            <template #status="{item}">
               <td>
                  <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
               </td>
            </template>
            <template #action="{item}">
               <td>
                  <template >
                     <CButton v-on:click="edit(item.id)" size="sm" color="primary">
                        <CIcon name="cil-pencil"/>
                        Edit
                     </CButton>
                     <span>&nbsp;</span>
                     <CButton v-on:click="confirmModal = true" size="sm" color="danger">
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
                  Are you sure you want to delete this Role?
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
         :show.sync="editRole"
         color="primary"
         :no-close-on-backdrop="true"
         :centered="true"
         >
         <CCard>
            <CForm novalidate>
               <CCardBody>
                  <CInput
                     type="text"
                     description="Please enter role name."
                     label="Name"
                     placeholder="Enter Role Name..."
                     required
                     />
                  <CInput
                     type="text"
                     description="Please enter description."
                     label="Description"
                     placeholder="Enter Description..."
                     required
                     was-validated
                     />
                  <CSelect
                     label="Status"
                     :options="['Active','Inactive']"
                     description="Please select status."
                     />
               </CCardBody>
            </CForm>
         </CCard>
         <template #header>
            <h6 class="modal-title">Edit Role</h6>
            <CButtonClose @click="editRole = false" class="text-white"/>
         </template>
         <template #footer>
            <CButton type="submit" size="sm" color="primary">
               <CIcon name="cil-check-circle"/>
               Submit
            </CButton>
            <CButton type="reset" size="sm" color="danger">
               <CIcon name="cil-ban"/>
               Reset
            </CButton>
            <CButton @click="darkModal = false" color="danger">Discard</CButton>
         </template>
      </CModal>
   </CCard>
</template>
<script>
   export default {
     name: 'Table',
      data () {
       return {
         confirmModal: false,
         editRole:false
       }
     },
     props: {
       items: Array,
       fields: {
         type: Array,
         default () {
           return ['name', 'description', 'status', 'action']
         }
       },
       caption: {
         type: String,
         default: 'Table'
       },
       hover: Boolean,
       striped: Boolean,
       border: Boolean,
       small: Boolean,
       fixed: Boolean,
       dark: Boolean
     },
     methods: {
       deleteRole(){
         
           alert('Item is deleted');
         
       },
       edit(id){
         this.editRole=true;
       },
       getBadge (status) {
         return status === 'Active' ? 'success'
           : status === 'Inactive' ? 'secondary'
             : status === 'Pending' ? 'warning'
               : status === 'Banned' ? 'danger' : 'primary'
       }
     }
   }
</script>