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
                  
                  <CCol sm="3"  v-if="user_auth_role == 'super_admin'"> 
                     <div role="group " class="form-group" >
                              <label for="role_group" > Organisation </label>
                              <select id="role_group" class="form-control" v-model="selected_organisation" >
                                 <option value="0" > Select Organisation </option>
                                 <option  :value="row.id" v-for="(row, index) in company_list" :key="index" > {{ row.name}} </option>
                                 
                              </select>
                              
                           </div>
                  </CCol>
                  <CCol sm="3" > 
                     <div role="group" class="form-group" >
                              <label for="role_group" > Case Type </label>
                              <select id="role_group" class="form-control" v-model="selected_case_type" >
                                 <option value="0" > Select Role Group </option>
                                 <option  :value="index" v-for="(row, index) in all_case_type" :key="index" v-html="row">  </option>
                              </select>
                              
                           </div>
                  </CCol>
                  <CCol sm="3" > 
                     <div role="group" class="form-group" >
                              <label for="role_group" >Agent</label>
                              <select id="role_group" class="form-control" v-model="selected_agents" >
                                 <option value="0" selected> Select Agent </option>
                                  <option  :value="row.id" v-for="(row, index) in all_agents" :key="index" > {{ row.full_name}} </option>
                                 
                              </select>
                              
                           </div>
                  </CCol>
                  <CCol sm="3" > 
                     <div role="group" class="form-group">
                              <label for="conf_pass" > Start Date <span class="required">*</span></label>
                                 <!-- <input id="conf_pass" type="text" v-model="start_date" placeholder="Enter Confirm Password..."  required="required" class="form-control"> -->
                                 <datepicker v-model="start_date" name="uniquename" input-class="form-control"></datepicker>
                                
                                 
                           </div>
                  </CCol>
                  <CCol sm="3" > 
                     <div role="group" class="form-group">
                              <label for="conf_pass" class=""> End Date <span class="required">*</span></label>
                                 <!-- <input id="conf_pass" type="text" v-model="end_date" placeholder="Enter Confirm Password..."  required="required" class="form-control"> -->
                                 <datepicker v-model="end_date" name="uniquename"  input-class="form-control"></datepicker>
                                 
                           </div>
                  </CCol>
                  <!-- <CCol sm="3" > 
                     <div role="group" class="form-group" >
                              <label for="role_group" >Status</label>
                              <select id="role_group" class="form-control" v-model="selected_agents" >
                                 <option value="all" selected> All </option>
                                 <option value="new" selected> New </option>
                                 <option value="in-progress" selected> In Progress </option>
                                 <option value="resolved" selected> Resolved </option>
                                 <option value="rejected_by_field" selected> Rejected By Field </option>
                                 <option value="verified" selected> Verified </option>
                                 <option value="closed" selected> Closed </option>
                                 <option value="uploaded_to_bank" selected> Uploaded to bank </option>                                 
                              </select>
                              
                           </div>
                  </CCol>
                  <CCol sm="3" > 
                     <div role="group" class="form-group" >
                              <label for="role_group" >Sub Status</label>
                              <select id="role_group" class="form-control" v-model="selected_agents" >
                                 <option value="0" selected> Select Agent </option>
                                  <option  :value="row.id" v-for="(row, index) in all_agents" :key="index" > {{ row.full_name}} </option>
                                 
                              </select>
                              
                           </div>
                  </CCol> -->

                   <CCol sm="3" > 
                     <div role="group" class="form-group" >
                              <label for="role_group" >Search</label>
                              <input class="form-control" placeholder="Search" v-model="searchText" />
                              
                           </div>
                            
                  </CCol>
                  <CButton  color="primary"  @click="getEmployeeFilteredCases()" size="sm" style="margin-top:10px">                  
                           <CIcon name="cil-plus"/>
                        Filter
                     </CButton>
                  <!-- <CCol sm="12" > 
                     <CButton  color="primary"  @click="getEmployeeFilteredCases()" size="sm" style="float:right">                  
                           <CIcon name="cil-search"/>
                        Filter
                     </CButton>
                  </CCol> -->
               </CRow>
            </slot>
         </CCardHeader>
         
         <CCardHeader>
            <slot name="header">
               <CRow class="align-items-center" >
                  <CCol sm="3" > 
                     <CIcon name="cil-grid"/>
                     All Cases
                  </CCol>
                  <CCol sm="6" > 
                  </CCol>
                  <!-- <CCol sm="3" > 
                     <CButton  color="primary"  @click="roleModal = 'add';showRoleModal=true;" size="sm" style="float:right;">                  
                           <CIcon name="cil-plus"/>
                        Create Case
                     </CButton>
                  </CCol> -->
               </CRow>

            </slot>
         </CCardHeader>
         <CCardBody>
            <CDataTable
               :hover="false"
               striped
               fixed
               :items="this.allList"
               :fields="['app_id','name','mobile_number', 'fl_type', 'schedule_date', 'visited_date', 'agent', 'staus', 'sub_status', 'action']"
               :items-per-page="10"
               pagination
               >

             

              
               <template #app_id="{item}">
                  <td>
                     {{ item.app_id && item.app_id != '--' ?item.app_id:'N/A' }}
                  </td>
               </template>
               
               <template #mobile_number="{item}">
                  <td>
                     {{ item.mobile_number?item.mobile_number:'N/A' }}
                  </td>
               </template>
               <template #schedule_date="{item}">
                  <td>
                     {{ item.schedule_date | moment( "dddd, MMMM Do YYYY, h:mm:ss a") }}
                  </td>
               </template>

               <template #visited_date="{item}">
                  <td>
                     {{ item.visited_date | moment( "dddd, MMMM Do YYYY, h:mm:ss a") }}
                  </td>
               </template>
               
               <template #fl_type="{item}">
                  <td v-html="item.fl_type">
                     <!-- {{ item.fl_type }} -->
                  </td>
               </template>
               <template #staus="{item}">
                  <td>
                     {{ item.staus?item.staus:'N/A' }}
                  </td>
               </template>
               <template #sub_status="{item}">
                  <td>
                     {{ item.sub_status?item.sub_status:'N/A' }}
                  </td>
               </template>
               
              
              
               <template #action="{item}">
                  <td>
                     <template >  
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/user.png" @click="openModal('view-case',item.id, item)" v-c-tooltip.hover.click="'View Case'">
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/edit.png" @click="openModal('edit-case',item.id, item)" v-c-tooltip.hover.click="'Edit Case'">
                        <img class="mr-1 handPointer"  v-if="item.status =='submited' || item.status =='completed'"   src="https://severify.com/assets/images/icon/verified_cases.png" @click="openModal('view-form',item.id, item)"  v-c-tooltip.hover.click="'View Form'">
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/change_status.png"  @click="openModal('add-final-status',item.id, item)"  v-c-tooltip.hover.click="'Add Final Status'">
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/edit_Setting.png" @click="openModal('edit-response',item.id, item)" v-c-tooltip.hover.click="'Edit Response'">
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/history1.png" @click="openModal('case-history',item.id, item)" v-c-tooltip.hover.click="'Case History'">
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/stock_task-assigned-to.png" @click="openModal('assign-case',item.id, item)"   v-c-tooltip.hover.click="'Assign Case'">
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/comment_add.png" @click="openModal('add-comment',item.id, item)" v-c-tooltip.hover.click="'Add Comment'">
                        <!-- <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/add.png" @click="openModal('get-clone',item.id, item)"  v-c-tooltip.hover.click="'Get Clone'"> -->
                        <img class="mr-1 handPointer"  src="https://severify.com/assets/images/icon/add.png" @click="confirmClone(item)" v-c-tooltip.hover.click="'Get Clone'">
                        <img class="mr-1 handPointer"  v-if="(item.status =='submited' || item.status =='completed') && item.fb_status"  src="https://severify.com/assets/images/icon/verified.png" width="20px" @click="openModal('verify-case',item.id, item)"  v-c-tooltip.hover.click="'Verified'">
                        <img class="mr-1 handPointer"  v-if="(item.status =='submited' || item.status =='completed') && !item.fb_status"  src="https://severify.com/assets/images/icon/verify.png" @click="openModal('verify-case',item.id, item)"  v-c-tooltip.hover.click="'Verify Case'">
                        <img class="mr-1 handPointer"  v-if="item.status =='submited' || item.status =='completed'"   src="https://severify.com/assets/images/icon/uploadImg.png"  width="18px" @click="openModal('upload-image',item.id, item)" v-c-tooltip.hover.click="'Upload Images'">
                        <img class="mr-1 handPointer"  v-if="item.status =='submited' || item.status =='completed'"  src="https://severify.com/assets/images/icon/page_white_excel.png" @click="openModal('download-excel',item.id, item)"  v-c-tooltip.hover.click="'Download Excel'">
                        <img class="mr-1 handPointer"  v-if="item.status !='submited' && item.status !='completed'"  src="https://severify.com/assets/images/icon/trash.png" @click="confirmDelete(item)"  v-c-tooltip.hover.click="'Delete'" width="16">
                        <img class="mr-1 handPointer"   src="https://severify.com/assets/images/icon/admin/map.png" @click="shareFilesWithLOcation(item)"  v-c-tooltip.hover.click="'Share Geo Location'" width="16">
                        
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
                     Are you sure you want to delete this case?
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">Delete</h6>
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
            :show.sync="confirmCloneModal"
            color="primary"
            :no-close-on-backdrop="true"
            :centered="true"
            >
            <CCard>
               <CForm novalidate>
                  <CCardBody>
                     Are you sure you want to clone this case?
                  </CCardBody>
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">Clone</h6>
               <CButtonClose @click="confirmCloneModal = false" class="text-white"/>
            </template>
            <template #footer>
               <CButton v-on:click="confirmCloneModal=false" size="sm" color="danger">
                  <CIcon name="cil-ban"/>
                  NO
               </CButton>
               <CButton v-on:click="getClone()" size="sm" color="primary">
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
                            <div role="group"  :class="{error: validation.hasError('product')}">
                              <label for="product" > FL Type <span class="required">*</span></label>
                              
                                 <select id="product" class="form-control" @change="changeCaseType" v-model="bv_or_rv" >
                                    <option value="0" > Select Type </option>
                                    <option value="rv"> RV</option>
                                    <option value="bv"> BV</option>
                                 </select>
                                 <!-- <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('product') }}</small> -->
                              
                           </div>

                              <!-- <div class="form-group row">
                                 <label class="col-md-3 col-form-label">FL Type:</label>
                                 <div class="col-md-9 col-form-label">
                                    <div class="form-check form-check-inline mr-1">
                                       <input class="form-check-input" v-model="rv" id="inline-checkbox1" type="checkbox" value="1" @change="checkVal($event, 'rv')">
                                       <label class="form-check-label" for="inline-checkbox1">RV</label>
                                    </div>
                                    <div class="form-check form-check-inline mr-1">
                                       <input class="form-check-input" v-model="bv" id="inline-checkbox2" type="checkbox" value="1" @change="checkVal($event, 'bv')">
                                       <label class="form-check-label" for="inline-checkbox2">BV</label>
                                    </div>
                                 </div>
                              </div> -->
                          
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
                           <!-- <div class="form-group row" :col="6">
                                 <label class="col-md-4 col-form-label">Single Agent:</label>
                                 <div class="col-md-3 col-form-label">
                                    <div class="form-check form-check-inline mr-1">
                                       <input class="form-check-input" v-model="single_agent" id="inline-checkbox1" type="checkbox" value="" >
                                    </div>
                                    
                                 </div>
                              </div> -->
                           <div role="group" >
                              <label for="rv_agent" > Single Agent  <span class="required">*</span></label>
                                 <select id="rv_agent" class="form-control" v-model="single_agent" >
                                    <option :value="false" > No</option>
                                    <option :value="true"> Yes</option>
                                 </select>
                                 
                           </div>
                           <!-- <div >
                              <label class="col-form-label col-sm-5"> Single Agent </label>
                                 <div role="group" class="form-check form-check-inline">
                                    <input id="uid-7shkf4cf8hd" v-model="single_agent" type="checkbox" name="Option 1" class="form-check-input" value=""/>
                              </div>
                           </div> -->
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
               </CForm>
            </CCard>
            <template #header>
               <h6 class="modal-title">{{ roleModal == 'add'?'Add Case' : 'Edit Case' }}</h6>
               <CButtonClose @click="showRoleModal = false" class="text-white"/>
            </template>
            <template #footer>
               
               <!-- <CButton @click="resetForm" size="sm" color="danger" :disabled='request_in_progress == 1'>
                  <CIcon name="cil-ban"/>
                  Reset
               </CButton> -->
               <CButton @click="closeForm" color="danger" size="sm" :disabled='request_in_progress == 1'> <CIcon name="cil-delete"/>Cancel</CButton>
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

         <ViewCase  @closeModal="closeChildModel" v-if="viewCase" :currenSelectedCase="currenSelectedCase"/>
         <EditCase  @closeModal="closeChildModel" v-if="editCaseShow" :currenSelectedCase="currenSelectedCase"/>
         <ViewForm  @closeModal="closeChildModel" v-if="viewFormShow" :currenSelectedCase="currenSelectedCase"/>
         <AddFinalStatus  @closeModal="closeChildModel" v-if="addFinalStatusShow" :currenSelectedCase="currenSelectedCase"/>
         <EditResponse  @closeModal="closeChildModel" v-if="editResponseShow" :currenSelectedCase="currenSelectedCase"/>
         <CaseHistory  @closeModal="closeChildModel" v-if="caseHistoryShow" :currenSelectedCase="currenSelectedCase" :current_case_id="current_case_id"/>
         <AssignCase  @closeModal="closeChildModel" v-if="assignCaseShow" :currenSelectedCase="currenSelectedCase"/>
         <AddComment  @closeModal="closeChildModel" v-if="addCommentShow" :currenSelectedCase="currenSelectedCase"/>
         <GetClone  @closeModal="closeChildModel" v-if="getCloneShow" :currenSelectedCase="currenSelectedCase"/>
         <VerifyCase  @closeModal="closeChildModel" v-if="verifyCaseShow" :currenSelectedCase="currenSelectedCase"/>
         <UploadImage  @closeModal="closeChildModel" v-if="uploadImagesShow" :currenSelectedCase="currenSelectedCase"/>
         <DownloadExcelFile  @closeModal="closeChildModel" v-if="downloadExcelShow" :currenSelectedCase="currenSelectedCase"/>
   </div>
</template>
<script>



   import axios from 'axios';
   import SimpleVueValidation from 'simple-vue-validator';
   const Validator = SimpleVueValidation.Validator;
   import Datepicker from 'vuejs-datepicker';

   import ViewCase from './Viewcase.vue';
   import EditCase from './EditCase.vue';
   import ViewForm from './ViewForm.vue';
   import AddFinalStatus from './AddFinalStatus.vue';
   import EditResponse from './EditResponse.vue';
   import CaseHistory from './CaseHistory.vue';
   import AssignCase from './AssignCase.vue';
   import AddComment from './AddComment.vue';
   import GetClone from './GetClone.vue';
   import VerifyCase from './VerifyCase.vue';
   import UploadImage from './UploadImageW.vue';
   import DownloadExcelFile from './DownloadExcel.vue';
   
   export default {
     name: 'Employees',
     data () {
       return {
          user_auth_role:'',
         roleModal: '',
         confirmModal: false,
         confirmCloneModal: false,
         showRoleModal: false,
         user_id:0,
         allList:[],
         allRoles:[],
         bank:'0',
         product:'0',
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
         bv_or_rv:'0'
         
       }
     },     
     components: { 
        Datepicker,
        ViewCase,
        EditCase,
        ViewForm,
        AddFinalStatus,
         EditResponse,
         CaseHistory,
         AssignCase,
         AddComment,
         GetClone,
         VerifyCase,
         UploadImage,
         DownloadExcelFile
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
         // co_applicant_name: function(value) {
         //    return Validator.value(value).required('This field is required.');
         // },
         // guarantee_name: function(value) {
         //    return Validator.value(value).required('This field is required.');
         // },
         reference_number: function(value) {
            return Validator.value(value).required('This field is required.');
         },
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
         this.user_auth_role =  localStorage.getItem('role');
         this.selected_agents = this.$route.query.id;
         this.start_date = this.$route.query.start_date;
         this.end_date = this.$route.query.end_date;
         this.selected_organisation = this.$route.query.selected_organisation;
         this.selected_case_type = this.$route.query.selected_case_type;
         this.filter_type = this.$route.query.page;

         this.getEmployeeFilteredCases();
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
    
     methods: {
        openModal(type, id, item){ 
           let vm  = this;
           this.currenSelectedCase = id;   
           this.current_case_id = item.case_id;
           switch(type){
               case 'view-case':
               //   vm.viewCase = true;
                 let routeData = this.$router.resolve({name: 'View Case', query: {currenSelectedCase: vm.currenSelectedCase}});
                  window.open(routeData.href);
                 break;
               case 'edit-case':
                  vm.editCaseShow = true;
                  break;
               case 'view-form':
                  // vm.viewFormShow = true;
                  routeData = this.$router.resolve({name: 'View Form', query: {currenSelectedCase: vm.currenSelectedCase}});
                  window.open(routeData.href);
                  break;
               case 'add-final-status':
                  vm.addFinalStatusShow = true;
                  break;
               case 'edit-response':
                  vm.editResponseShow = true;
                  break;
               case 'case-history':
                  vm.caseHistoryShow = true;
                  break;
               case 'assign-case':
                  vm.assignCaseShow = true;
                  break;
               case 'add-comment':
                  vm.addCommentShow = true;
                  break;
               case 'get-clone':
                  // vm.getCloneShow = true;
                  vm.getClone();
                  break;
               case 'verify-case':
                  vm.verifyCaseShow = true;
                  break;
               case 'upload-image':
                  vm.uploadImagesShow = true;
                  break;
               case 'download-excel':
                  vm.downloadExcelShow = true;
                  break;
           }
        },
        getClone(){
           this.$loading.show({delay:0})   //delay 0ms, default is 300ms
              let vm  = this;              
              let formData = new FormData();            
               formData.append('case_id', this.currenSelectedCase);            
               axios.post('https://severify.com/api/cases/get-clone', formData, {
                  headers: {
                        'Content-Type': 'multipart/form-data'
                  },
                  }
               ).then(function(response){
                  vm.$loading.hide();
                  vm.confirmCloneModal = false;
                  let msg = 'New case created.';
                  if(response.data.status){
                     vm.getEmployeeFilteredCases();
                  }else{
                     msg = 'Some error occured, please try again.';
                  }
                  vm.$toast.open({
                     message:msg,
                     type:response.data.status?'success':'error',
                     position:'top-right',
                     duration:3000,
                     dismissible:true
                  });
               })
               .catch(function(){
               }); 
        },
        closeChildModel(){
            this.viewCase = false;
            this.editCaseShow = false;
            this.viewFormShow = false;
            this.addFinalStatusShow = false;
            this.editResponseShow = false;
            this.caseHistoryShow = false;
            this.assignCaseShow = false;
            this.addCommentShow = false;
            this.getCloneShow = false;
            this.verifyCaseShow = false;
            this.uploadImagesShow = false;
            this.downloadExcelShow = false;
            this.getEmployeeFilteredCases();
        },
        getEmployeeFilteredCases(){
           this.$loading.show({delay:0})

           let vm = this;
           let startDate = new Date(this.start_date);
           let smonth = startDate.getMonth() + 1;
           let syear = startDate.getFullYear();
           let sday = startDate.getDate();
           let sd = syear+'-'+(smonth <= 9 ? '0'+smonth:smonth)+'-'+(sday <= 9 ? '0'+sday:sday);

           let endDate = new Date(this.end_date);
           let emonth = endDate.getMonth() + 1;
           let eyear = endDate.getFullYear();
           let eday = endDate.getDate();
           let ed = eyear+'-'+(emonth <= 9 ? '0'+emonth:emonth)+'-'+(eday <= 9 ? '0'+eday:eday);
           console.log(sd, ed);

           let formData = new FormData();

           formData.append('organisation_id', this.selected_organisation);
           formData.append('selected_case_type', this.selected_case_type);
           formData.append('agent_id', this.selected_agents);
           formData.append('start_date', sd+ ' 00:00:00');
           formData.append('end_date', ed+ ' 23:59:00');
           formData.append('filter_type', this.filter_type);
           formData.append('searchText', this.searchText);

            axios.post('https://severify.com/api/cases/list-all-employee-cases', formData)
               .then(function (response) {
                  vm.allList = response.data.data;
                  vm.all_agents = response.data.agents;

                  console.log(vm.all_agents, '123');
                  vm.all_case_type = response.data.products;
                  vm.$loading.hide();
               })
               .catch(function (error) {
                  console.log(error);
               });
        
        },
         getMyCases(){
            axios.get("https://severify.com/api/cases/list-all?id="+this.selected_agents )
            .then(response => {this.allList = response.data.data;});
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
         closeForm(){
             this.resetForm();
             this.showRoleModal = false;
          },
         confirmDelete(row){
            this.confirmModal = true;
            this.user_id = row.id;
         },
         confirmClone(row){
            this.confirmCloneModal = true;
            this.currenSelectedCase = row.id;
         },
         deleteRole(){
            let vm = this;
            vm.request_in_progress = 0;
            let request = {
               case_id:this.user_id
            }
            axios.post('https://severify.com/api/cases/delete', request)
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
                  vm.getMyCases();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          },
         edit(item){
            console.log(item)
               this.case_type = item.case_type;
               this.selected_category = item.category_type_id;
               this.bank =item.bank_id;
               this.product = item.product_id;
               let fl_type = item.fl_type ;

               this.rv = fl_type == 'rv'? true:false;
               this.bv = fl_type == 'bv' ? true:false;
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
               this.single_agent = item.single_agent;
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
            this.validation.reset();
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
               let url = 'https://severify.com/api/cases/add';
               if(vm.roleModal == 'edit'){
                  url = 'https://severify.com/api/cases/update';
               }
               let creater_id =  localStorage.getItem('user_id');
               let company_id =localStorage.getItem('company_id');
   
   
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
               console.log(request, 'myrequest');
               
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

                  vm.getEmployeeFilteredCases();
                  vm.resetForm();
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });
          },
          checkVal(event){
             console.log(event.target.value);
             console.log(this.rv, this.bv);
          },
          changeCaseType(){
             console.log(this.bv_or_rv, '123')
            this.bv = 0;
            this.rv = 0;
             if(this.bv_or_rv == 0){
                this.bv = 0;
                this.rv = 0;

             }else if(this.bv_or_rv == 'rv'){
                this.rv = 1;
             }else{
                this.bv = 1;
             }
          },
          confirmShareLocation(item){
            let vm  = this;
            this.$loading.show({delay:0, background:'#1C00ff00'})   //delay 0ms, default is 300ms

            vm.request_in_progress = 1;
            let request = {
               case_id:item.id
            }
            axios.post('https://severify.com/api/cases/send-geo-location', request)
               .then(function (response) {
                  vm.request_in_progress = 0; 
                  vm.showRoleModal = false;
                  vm.confirmModal = false;
                  vm.$loading.hide();


                  vm.$toast.open({
                      message:response.data.message,
                      type:response.data.status?'success':'error',
                      position:'top-right',
                      duration:3000,
                      dismissible:true
                  });
               })
               .catch(function (error) {
                  vm.request_in_progress = 0;
                  console.log(error);
               });

          },
         shareFilesWithLOcation(item){
            let vm  =this;

            this.$dialog({
               title: 'Share Geo Location.',
               content: 'Are you sure you wand to share geo location?',
               btns: [{
                              label: 'OK',
                              color: '#09f',
                              callback: () => {
                                 vm.confirmShareLocation(item);
                              },
                        },
                        {
                              label: 'Cancel',
                              color: '#444',
                              ghost: true,
                              callback: () => {
                                 // vm.confirmShareLocation(item);
                              },
                        }],
            })

          
         }
     }
   }
</script>