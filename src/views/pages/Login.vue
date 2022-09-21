<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="4">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  
                  <div role="group" class="form-group" :class="{error: validation.hasError('user_name')}">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon">
                            <path fill="var(--ci-primary-color, currentColor)" d="M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z" class="ci-primary"></path>
                          </svg>
                        </span>
                      </div>
                    <input id="uid-gmr4dmu76zp" v-model="user_name" type="text" placeholder="Email" autocomplete="email" class="form-control">
                    <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('user_name') }}</small>
                    </div>
                  </div>

                  <div role="group" class="form-group" :class="{error: validation.hasError('password')}">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="c-icon">
                            <path fill="var(--ci-primary-color, currentColor)" d="M384,200V144a128,128,0,0,0-256,0v56H88V328c0,92.635,75.364,168,168,168s168-75.365,168-168V200ZM160,144a96,96,0,0,1,192,0v56H160ZM392,328c0,74.99-61.01,136-136,136s-136-61.01-136-136V232H392Z" class="ci-primary"></path>
                          </svg>
                        </span>
                      </div>
                      <input id="uid-ad8mm8nd9" :type="show_pasword?'text':'password'" placeholder="Password" v-model="password" autocomplete="curent-password" class="form-control">
                       <span toggle="#password-field" class="field-icon toggle-password handPointer" @click="togglePassword">
                         <img :src="'https://severify.com/assets/images/icon/'+show_img_type+'.png'" style="width: 30px; padding-right:10px"/> 
                       </span>
                      
                      <small class="form-text text-muted w-100 err-msg">{{ validation.firstError('password') }}</small>
                    </div>
                  </div>
                  <CRow>
                    
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4" v-on:click="validateField">Login</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                    </CCol>
                    <p>
                      <small class="form-text text-muted w-100 err-msg" v-if="responseMsg">{{ responseMsg }}</small>
                    </p>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
  import axios from 'axios';
  import SimpleVueValidation from 'simple-vue-validator';
  const Validator = SimpleVueValidation.Validator;
  export default {
    name: 'Login',
    data(){
      return {
        show_pasword:false,
        show_img_type:'see_pass',
        user_name:'',
        password:'',
        responseMsg:''
      }
    },
    validators: {
      user_name: function(value) {
        return Validator.value(value).required('This field id required.');
      },
      password: function(value) {
        return Validator.value(value).required('This field id required.');
      }
    },
    methods:{
      togglePassword(){
        this.show_pasword = !this.show_pasword;
        this.show_img_type = this.show_pasword ? 'hide_pass' : 'see_pass';

      },
      validateField(){
        let vm = this;
        this.$validate()
          .then(function(success) {
            if (success) {
                vm.processLogin();
            }
        });
      },
      processLogin(){
        // vm = this;

        axios.post("https://severify.com/api/auth/admin-login",{
          user_name:this.user_name,password:this.password
        })
            .then(response => {
              console.log(response);
              if(response.data.status){
                localStorage.setItem('jwt', 'loggedIn');
                localStorage.setItem('role', response.data.data.user_auth_role);
                if(response.data.data.user_auth_role != 'super_admin'){
                  localStorage.setItem('user_id', response.data.data.id);
                  localStorage.setItem('company_id', response.data.data.company_id);
                  localStorage.setItem('token', response.data.data.id+'_&_'+response.data.data.company_id);
                } else{
                  localStorage.setItem('user_id', response.data.data.id);
                localStorage.setItem('company_id', '');
                localStorage.setItem('token', response.data.data.id+'_&_');
                }
                
                this.$store.commit('set', ['user_auth_role', response.data.data.user_auth_role]);
                localStorage.setItem('user', JSON.stringify(response.data.data));
                  this.$router.push({ name: 'Home' });
                this.$toast.open({                  
                    message:response.data.message,
                    type:response.data.status?'success':'error',
                    position:'top-right',
                    duration:3000,
                    dismissible:true
                });

              }else{
                this.responseMsg = response.data.message;

              }
        });
        //  localStorage.setItem('jwt', 'loggedIn');
        //   this.$router.push({ name: 'Home' });
      }
    }
}
</script>
<style scoped>
.field-icon {
  float: right;
    margin-left: -29px;
    margin-top: 5px;
    position: relative;
    z-index: 2;
}

</style>
