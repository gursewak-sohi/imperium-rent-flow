export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/admin/dashboard',
        icon: 'dashboard.png',
        permission:['super_admin','admin', 'reporting-user'],
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Manage Cases',
        to: '/admin/manage-cases',
        icon: 'list.png',
        permission:['super_admin','admin', 'reporting-user'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Download FI Templates',
        to: '/admin/download-fi-template',
        icon: 'download.png',
        permission:['super_admin','admin', 'reporting-user'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Bulk upload Cases',
        to: '/admin/bulk_upload_cases',
        icon: 'upload.png',
        permission:['super_admin','admin', 'reporting-user'],
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Reports',
        route: '/report',
        icon: 'report.png',
        permission:['super_admin','admin'],
        items: [
          
          {
            name: 'Billing Report',
            to: '/admin/billing-report',
            icon: 'rupee.png',
            permission:['super_admin','admin'],
          },
          {
            name: 'Pending Report',
            to: '/admin/pending-report',
            icon: 'rupee.png',
            permission:['super_admin','admin'],
          }
        ]
      },
      
      {
        _name: 'CSidebarNavItem',
        name: 'Manage Employee',
        to: '/admin/all-employee',
        icon: 'user.png',
        permission:['super_admin','admin', 'reporting-user'],
      },

      {
        _name: 'CSidebarNavDropdown',
        name: 'Settings',
        route: '/base',
        icon: 'settings.png',
        permission:['super_admin', 'admin'],
        items: [
          
          {
            name: 'Reporting User',
            to: '/admin/reporting-user',
            icon: 'user.png',
            permission:['super_admin', 'admin'],
          },
          {
            name: 'Role Groups',
            to: '/admin/role-group',
            icon: 'group.png',
            permission:['super_admin'],
          },
          {
            name: 'Manage Roles',
            to: '/admin/manage-roles',
            icon: 'roles.png',
            permission:['super_admin'],
          },
          {
            name: 'Manage Company',
            to: '/admin/company',
            icon: 'company.png',
            permission:['super_admin'],
          },
          {
            name: 'Manage Bank',
            to: '/admin/bank',
            icon: 'bank.png',
            permission:['super_admin'],
          },
          {
            name: 'Manage Admin',
            to: '/admin/manage-admin',
            icon: 'user.png',
            permission:['super_admin'],
          }
        ]
      },     
    ]
  }
]