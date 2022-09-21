import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import axios from 'axios';

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Employees = () => import('@/views/employee/Employees')
const EmployeesCases = () => import('@/views/employee-case-listing/EmployeesCases')
const RoleGroups = () => import('@/views/roleGroup/RoleGroup')
const Companys = () => import('@/views/company/Companys')
const Cases = () => import('@/views/cases/Cases')
const ReportingUser = () => import('@/views/reportingUser/ReportingUser')
const ContactUs = () => import('@/views/contact/ContactUs')

// Views - Components
const Tables = () => import('@/views/base/Tables')


// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')

// Case Nav
const DownloadFITemplate = () => import('@/views/new-case/DownloadFITemplete')
const UploadCaseForVerification = () => import('@/views/new-case/UploadCasesForVerification')

// Reports
const BillingReport = () => import('@/views/reports/BillingReport')
const PendingReport = () => import('@/views/reports/PendingReport')

// Bank & Products
const Bank = () => import('@/views/bank/Bank')
const Product = () => import('@/views/products/Product')

const Admin = () => import('@/views/admin/admins')
const CreateCase = () => import('@/views/create-case/create')
const ViewCase = () => import('@/views/cases/Viewcase')
const ViewForm = () => import('@/views/cases/ViewForm')

Vue.use(Router)


axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token;
  return config;
});

// export default new Router({
const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});
let user_auth_role = localStorage.getItem('role');
store.commit('set', ['user_auth_role', user_auth_role]);
          console.log(user_auth_role, 'qweewq');

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/admin/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          
          if(to.matched.some(record => record.meta.is_admin)) {
            console.log('as', '52');

              if(user.user_auth_role == 'admin'){
                  next()
              }
              else{
                  next({ name: 'Home'})
              }
          }else {
            console.log('user', '52');
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'Home'})
      }
  }else {
      next()
  }
})

function configRoutes () {
  return [
    {
      path: '/admin/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      name: 'Home',
      visible:false,
      component: TheContainer,
      meta: {
        requiresAuth: true,
        
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
         {
          path: 'manage-cases',
          redirect: '/admin/manage-cases/list-all',
          name: 'Manage Case',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list-all',
              name: 'List All',
              component: EmployeesCases
            },
            {
              path: 'employee-case-listing',
              name: 'Employee Case Listing',
              component: Cases

            }
          ]
        },
        {
          path: 'download-fi-template',
          name: 'Download FI Template',
          component: DownloadFITemplate
        },
        {
          path: 'bulk_upload_cases',
          name: 'Bulk Upload Cases',
          component: UploadCaseForVerification
        },
        {
          path: 'billing-report',
          name: 'Billing Report',
          component: BillingReport
        },
        {
          path: 'pending-report',
          name: 'Pending Report',
          component: PendingReport
        },
        
        {
          path: 'all-employee',
          name: 'All Employee',
          component: Employees
        },
        {
          path: 'reporting-user',
          name: 'Reposting User',
          component: ReportingUser
        },
        {
          path: 'role-group',
          name: 'Role Group',
          component: RoleGroups
        },
        {
          path: 'manage-roles',
          name: 'Manage Roles',
          component: Tables
        },
        {
          path: 'company',
          name: 'Manage Company',
          component: Companys
        },
        {
          path: 'bank',
          name: 'Manage Bank',
          component: Bank
        },
        {
          path: 'manage-admin',
          name: 'Manage Admin',
          component: Admin
        },
        {
          path: 'create-case',
          name: 'Create Case',
          component: CreateCase
        },
        {
          path: 'view-case',
          name: 'View Case',
          component: ViewCase
        },
        {
          path: 'view-form',
          name: 'View Form',
          component: ViewForm
        },
      ]
    },
    
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        }
      ]
    }
  ]
}

export default router

