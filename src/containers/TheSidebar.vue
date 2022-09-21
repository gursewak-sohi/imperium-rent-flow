<template>
<CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/admin">

      <img src="https://severify.com/assets/images/logoWhiteBackGround.png" style="width: 50%; margin-top: 15px; margin-bottom: 10px;"/>  
    </CSidebarBrand>
  <ul class="c-sidebar-nav">

    
    <li class="c-sidebar-nav-dropdown handPointer" v-on:click.prevent="$event.currentTarget.classList.toggle('c-show')" v-for="(row, index) in nav_data" :key="index" v-if="row.permission.indexOf(user_role) != -1">
       
      <a class="c-sidebar-nav-link " v-on:click="goTo($event, row)">
        
       <img :src="'https://severify.com/assets/images/icon/admin/'+row.icon" style="width: 30px; padding-right:10px"/> 

       &nbsp;&nbsp;&nbsp;{{ row.name}}
      </a>
      <ul class="c-sidebar-nav-dropdown-items" >
        <li class="c-sidebar-nav-item handPointer" v-for="(sub_row, sub_index) in row.items" :key="sub_index" v-if="sub_row.permission.indexOf(user_role) != -1">
          <a class="c-sidebar-nav-link" v-on:click="goTo($event, sub_row)">
           <!-- <img src="https://severify.com/assets/images/icon/dashboard.png" style="width: 30px;"/>  -->
            <img :src="'https://severify.com/assets/images/icon/admin/'+sub_row.icon" style="width: 30px; padding-right:10px"/> 
            {{sub_row.name}}
          </a>
        </li>
      </ul>
    </li>
    
  </ul>
 <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
</CSidebar> 
  <!-- <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/admin">

      <img src="https://severify.com/assets/images/logoWhiteBackGround.png" style="width: 50%;
margin-top: 15px;
margin-bottom: 10px;"/>  
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar> -->
  
</template>

<script>
import nav from './_nav'
import { CSidebar, CNavItem } from '@coreui/vue'


export default {
  name: 'TheSidebar',
  data () {
       return {
         nav_data:[]
       }
  },
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    },
    user_role(){
      return this.$store.state.user_auth_role 
    }
  },
  created(){
    this.show_side_nav();
  },
  components: { 
    CSidebar, CNavItem
  },
  methods:{
    show_side_nav(){
      this.nav_data = nav[0]['_children'];
      console.log(this.nav_data);
    },
    goTo(e, row){
      e.preventDefault();
      
     
      if(row.hasOwnProperty('to')){
        let link=row.to;
        this.$router.push({
          path: link
      });

      }
      // e.stopPropagation();
      // else if(row.hasOwnProperty('route')){
      //   link=row.route;
      // }
      
    }
  }
}
</script>
